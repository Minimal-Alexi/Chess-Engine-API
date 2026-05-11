import { Game } from "../models/game.model"

export const createGame = async (playerOneId:number, playerTwoId:number):Promise<Game | null> => {
    return null;
}

export const getGameById = async(id:number):Promise<Game|null> => {
    return null;
}

export const playTurn = async(game: Game,playerId:number, start: [number, number], destination: [number, number]):Promise<Game|null> => {
    return null;
}

