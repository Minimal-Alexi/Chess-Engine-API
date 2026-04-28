import { Router } from "express";
import { registerUser } from "../controllers/user.controller";

const router = Router();
    
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const user = await registerUser(username, email, password);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
    }
});


export default router;
