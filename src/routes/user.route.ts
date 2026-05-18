import { Router } from "express";
import { loginUser, registerUser, getUserById, getAllUsers } from "../controllers/user.controller";
import { requireAuth } from "../middleware/auth";

const router = Router();
    
router.post('/register', registerUser);
router.post('/login', loginUser);
router.use(requireAuth);
router.get('/',getUserById);
router.get('/:userId',getAllUsers);

export default router;
