import { Request, Response } from 'express';
import { createGameService } from '../service/game.service';
import { findUserById } from '../service/user.service';

export const createGame = async (req: Request, res: Response) => {
  const targetUserId = Number(req.params.targetUserId);
  const userId = req.body.user;


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

  return res.status(201).json({
    message: "Game has been created, you may start!",
    game: game.toJSON()
    
  })
};

export const getGameById = async (req: Request, res: Response) => {
  const { gameId } = req.params;
};

export const getAllUserGames = (req: Request, res: Response) => {
  
}

export const getPieceLegalMoves = async (req: Request, res: Response) => {
  const { gameId } = req.params;
};

export const playTurn = async (req: Request, res: Response) => {
  const { gameId } = req.params;
};