import { Game } from "../models/game.model"
import { Player } from "../models/player.model";
const pool = require('../config/database').pool;

export const createGameService = async (playerOneId:number, playerTwoId:number):Promise<Game> => {
    const gameResult = (await pool.query(`
    INSERT INTO games (turn_counter, game_state)
    VALUES (DEFAULT, DEFAULT)
    RETURNING game_id, turn_counter, game_state;
    `)).rows[0];
    
    const whitePlayer = (await pool.query(
        `
        INSERT INTO players(game_id,user_id,team) VALUES ($1, $2, $3) RETURNING *;
        `
        ,[gameResult.game_id, playerOneId, "white"]
    )).rows[0]

    const blackPlayer = (await pool.query(
        `
        INSERT INTO players(game_id,user_id,team) VALUES ($1, $2, $3) RETURNING *;
        `
        ,[gameResult.game_id, playerTwoId, "black"]
    )).rows[0]

    return new Game
    (
        gameResult.game_id,
        gameResult.turn_counter,
        gameResult.game_state,
        [new Player(whitePlayer.user_id,gameResult.game_id,"white"), new Player(blackPlayer.user_id,gameResult.game_id,"black")])
}

export const findGameById = async(id:number):Promise<Game|null> => {
    const gameSearch = await pool.query(`SELECT * FROM games WHERE game_id = $1`, [id])
    const playerSearch = await pool.query(`SELECT * FROM players WHERE game_id = $1`, [id])

    const gameRow = gameSearch.rows[0]
    if(!gameRow){
        return null;
    }

    const playerArray : Array<Player> = []

    for(const player of playerSearch.rows){
        playerArray.push(new Player(player.user_id,player.game_id,player.team))
    }

    return new Game(
        gameRow.game_id,
        gameRow.turn_counter,
        gameRow.game_state,
        playerArray
    )

}

export const findUsersGames = async(userId:number):Promise<Array<Game>> => {
    const gameSearch = await pool.query(
        `
    SELECT games.*
    FROM games
    JOIN players
        ON games.game_id = players.game_id
    WHERE players.user_id = $1
  `,
        [userId]
    )

    const gameArray: Array<Game> = []

    for(const game of gameSearch.rows){
        gameArray.push(new Game(game.game_id,game.turn_counter,game.game_state,undefined))
    }

    return gameArray
}

export const calculatePieceLegalMoves = async(gameId:number,piecePos: [number,number]):Promise<Array<Array<number>>> => {
    return []
}

export const executeTurn = async(game: Game,playerId:number, start: [number, number], destination: [number, number]):Promise<Game|null> => {
    return null;
}

