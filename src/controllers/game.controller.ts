import { Request, Response } from 'express';
import { createGameService } from '../service/game.service';
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
    console.error(error)
    return res.status(500).json({ message: "Server error, alert the server operator." })
  }
};

export const getGameById = async (req: Request, res: Response) => {
  const { gameId } = req.params;
  return res.status(404).json({ message: "Not implemented" });
};

export const getAllUserGames = (req: Request, res: Response) => {
  return res.status(404).json({ message: "Not implemented" });
}

export const getPieceLegalMoves = async (req: Request, res: Response) => {
  const { gameId } = req.params;
  return res.status(404).json({ message: "Not implemented" });
};

export const playTurn = async (req: Request, res: Response) => {
  const { gameId } = req.params;
  return res.status(404).json({ message: "Not implemented" });
};