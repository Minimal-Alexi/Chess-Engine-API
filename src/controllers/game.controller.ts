import { Request, Response } from 'express';

export const createGame = async (req: Request, res: Response) => {
  const { targetUserId } = req.params;
};

export const getGameById = async (req: Request, res: Response) => {
  const { gameId } = req.params;
};

export const getAllUsersGame = (req: Request, res: Response) => {
  
}

export const getPieceLegalMoves = async (req: Request, res: Response) => {
  const { gameId } = req.params;
};

export const playTurn = async (req: Request, res: Response) => {
  const { gameId } = req.params;
};