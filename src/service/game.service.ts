import { Game } from "../models/game.model"
import { Player } from "../models/player.model";
import { User } from "../models/user.model";
import { createBoardMap, getLegalMoves, isCheckMate, makeMove } from "../utils/boardMapUtils";
const pool = require('../config/database').pool;

export const createGameService = async (playerOne:User, playerTwo:User):Promise<Game> => {
    const gameResult = (await pool.query(`
    INSERT INTO games (turn_counter, game_state)
    VALUES (DEFAULT, DEFAULT)
    RETURNING game_id, turn_counter, game_state;
    `)).rows[0];
    
    await pool.query(
        `
        INSERT INTO players(game_id,user_id,team) VALUES ($1, $2, $3);
        `
        ,[gameResult.game_id, playerOne.id, "white"]
    )

    await pool.query(
        `
        INSERT INTO players(game_id,user_id,team) VALUES ($1, $2, $3);
        `
        ,[gameResult.game_id, playerTwo.id, "black"]
    )

    return new Game
    (
        gameResult.game_id,
        gameResult.turn_counter,
        gameResult.game_state,
        [new Player(playerOne,gameResult.game_id,"white"), new Player(playerTwo,gameResult.game_id,"black")])
}

export const findGameById = async(id:number):Promise<Game|null> => {
    const result = await pool.query(`
    SELECT
        g.*,
        p.team,
        u.user_id,
        u.username
    FROM games g
    LEFT JOIN players p
        ON g.game_id = p.game_id
    LEFT JOIN users u
        ON p.user_id = u.user_id
    WHERE g.game_id = $1
    `, [id]);

    const rows = result.rows;

    if (rows.length === 0) {
        return null;
    }

    const game = rows[0];

    const players = rows.map((row: { user_id: number; username: string; game_id: number; team: string; }) => {
        const user = new User(
            row.user_id,
            row.username,
            "irrelevant",
            "irrelevant"
        );

        return new Player(
            user,
            row.game_id,
            row.team
        );
    });

    return new Game(
        game.game_id,
        game.turn_counter,
        game.game_state,
        players
    )

}

export const findUsersGames = async (userId: number): Promise<Array<Game>> => {
    const gameSearch = await pool.query(
        `
        SELECT
            g.game_id,
            g.turn_counter,
            g.game_state,

            p.team,

            u.user_id,
            u.username

        FROM games g

        INNER JOIN players current_player
            ON g.game_id = current_player.game_id

        LEFT JOIN players p
            ON g.game_id = p.game_id

        LEFT JOIN users u
            ON p.user_id = u.user_id

        WHERE current_player.user_id = $1
        `,
        [userId]
    );
    const gameMap = new Map<number, Game>();
    for (const row of gameSearch.rows) {
        // Create game once
        if (!gameMap.has(row.game_id)) {
            gameMap.set(
                row.game_id,
                new Game(
                    row.game_id,
                    row.turn_counter,
                    row.game_state,
                    []
                )
            );
        }
        const game = gameMap.get(row.game_id)!;
        if (row.user_id) {
            const user = new User(
                row.user_id,
                row.username,
                "irrelevant",
                "irrelevant"
            );
            const player = new Player(
                user,
                row.game_id,
                row.team
            );
            game.players.push(player);
        }
    }
    return Array.from(gameMap.values());
};

export const calculatePieceLegalMoves = async(game:Game,piecePos: [number,number], team: string):Promise<Array<Array<number>>> => {
    const boardMap = createBoardMap(game.state)
    if(!boardMap){
        throw new Error("Error creating board map for " + game.id)
    }
    return getLegalMoves(boardMap,piecePos,team)
}

export const executeTurn = async (game: Game, playerId: number, start: [number, number], destination: [number, number]): Promise<Game | null> => {
    try {
        const newState = makeMove(game.state, start, destination, game.getPlayerTeam(playerId))
        game.state = newState;
        game.turnCounter = game.turnCounter + 1
        const newGame = await updateGame(game)
        return newGame
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const updateGame = async (game: Game): Promise<Game | null> => {
    const gameUpdate = await pool.query(`
            UPDATE games
            SET game_state = $1, turn_counter = $2
            WHERE game_id = $3
            RETURNING *;
        `, [game.state, game.turnCounter, game.id])

    if (!gameUpdate) {
        return null;
    }

    return new Game(
        gameUpdate.game_id,
        gameUpdate.turn_counter,
        gameUpdate.game_state,
        game.players
    )
}

export const winCheck = async (game: Game): Promise<boolean | string> => {
    const boardMap = createBoardMap(game.state)
    if (!boardMap) {
        throw new Error("Error creating board map for " + game.id)
    }

    if (isCheckMate(createBoardMap(game.state)!, "white")) {
        return "Black has won the game."
    }
    if (isCheckMate(createBoardMap(game.state)!, "blacks")) {
        return "White has won the game."
    }

    return false;
}

