import { Router } from "express";
import { loginUser, registerUser, getUserById, getAllUsers } from "../controllers/user.controller";
import { requireAuth } from "../middleware/auth";

const router = Router();
    
router.post('/register', registerUser);
router.post('/login', loginUser);
router.use(requireAuth);
router.get('/',getAllUsers);
router.get('/:userId',getUserById);

export default router;
