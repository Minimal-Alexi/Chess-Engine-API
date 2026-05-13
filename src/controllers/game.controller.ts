import { Request, Response } from 'express';
import { calculatePieceLegalMoves, createGameService, findGameById, findUsersGames } from '../service/game.service';
import { findUserById } from '../service/user.service';

export const createGame = async (req: Request, res: Response) => {
  try {
    const targetUserId = Number(req.params.targetUserId);
    const userId = (req as any).user;

    if (userId === targetUserId) {
      return res.status(400).json({
        message: "You cannot create a game with yourself",
      });
    }

    const user = await findUserById(userId);
    const targetUser = await findUserById(targetUserId);

    if (!user || !targetUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const game = await createGameService(userId, targetUserId)
    const gameJson = await game.toJSON()

    return res.status(201).json({
      message: "Game has been created, you may start!",
      game: gameJson

    })
  } catch (error) {
    console.error("Error creating new board game: " + error)
    return res.status(500).json({ error: "Server error, alert the server operator." })
  }
};

export const getGameById = async (req: Request, res: Response) => {
    try {
      const gameId = Number(req.params.gameId);
      const userId = (req as any).user;
      const game = await findGameById(gameId);

      if(!game){
        return res.status(404).json({message:"Couldn't find game. Are you sure that's the ID you were looking for?"})
      }

      if(!game.isUserInGame(userId)){
        return res.status(403).json({message:"You are not participating in this game."})
      }

      const gameJson = await game.toJSON()

      return res.status(200).json({
        message:"Successfully found a game.",
        game: gameJson
      })

  } catch (error) {
    console.error("Error getting board game: " + error)
    return res.status(500).json({ error: "Server error, failed to get game." })
  }
};

export const getAllUserGames = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user;
    const gameArray = await findUsersGames(userId)
    let message = "Found some games.";
    if(gameArray.length == 0){
      message = "No games were found, maybe it's time you found a worth opponent!";
    }
    return res.status(200).json({
      message: message,
      games: gameArray.map(game => game.toJSON())
    });

  } catch (error) {
    console.error("Error getting all of users board games: " + error)
    return res.status(500).json({ error: "Server error, failed to get your games." })
  }
}

export const getPieceLegalMoves = async (req: Request, res: Response) => {
  try{
    const gameId = Number(req.params.gameId);
    const userId = (req as any).user;
    const game = await findGameById(gameId);
    const position: [number,number] = req.body.position;

    if(!game){
        return res.status(404).json({message:"Couldn't find game. Are you sure that's the ID you were looking for?"});
    }

    if(!game.isUserInGame(userId)){
        return res.status(403).json({message:"You are not participating in this game."});
    }

    if(!game.verifyTurnOrder(userId)){
      return res.status(409).json({message:"It's currently not you turn."});
    }

    const player = game.players.find(player => player.userId === userId);
    const moves = await calculatePieceLegalMoves(game,position, player!.team)

    return res.status(200).json({message:"Successfully found your pieces moves.",
      moves:moves
    })
  }catch(error){
    console.error("Error fetching pieces moves: " + error)
    return res.status(500).json({error: "Server error, failed to get your pieces moves."})
  }
};

export const playTurn = async (req: Request, res: Response) => {
  const { gameId } = req.params;
  return res.status(404).json({ message: "Not implemented" });
};