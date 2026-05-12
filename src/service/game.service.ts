import { Game } from "../models/game.model"

export const createGameService = async (playerOneId:number, playerTwoId:number):Promise<Game> => {
    return new Game(0,0,undefined);
}

export const findGameById = async(id:number):Promise<Game|null> => {
    return null;
}

export const calculatePieceLegalMoves = async(gameId:number,piecePos: [number,number]):Promise<Array<Array<number>>> => {
    return []
}

export const executeTurn = async(game: Game,playerId:number, start: [number, number], destination: [number, number]):Promise<Game|null> => {
    return null;
}

