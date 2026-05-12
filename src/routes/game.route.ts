import { Router } from "express";
import { requireAuth } from "../middleware/auth";
import { createGame, getGameById, getPieceLegalMoves, playTurn} from "../controllers/game.controller";

const router = Router();

router.use(requireAuth)
router.post('/createGame/:targetUserId', createGame);
router.get('/:gameId', getGameById)
router.get('/:gameId/legalMoves', getPieceLegalMoves)
router.post('/:gameId/playTurn', playTurn);

export default router;