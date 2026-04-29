import { Request, Response } from 'express';
import {User, createUser, findUserByEmail} from '../models/user.model';
import createToken from '../utils/createToken';

const registerUser = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    try {
        if (!username || !email || !password) {
            return res.status(400).json({ "message": "Username, email and password are required" });
        }

        if (await findUserByEmail(email)) {
            return res.status(400).json({ "message": "User with this email already exists" });
        }

        const user = await createUser(username, email, password);
        res.status(201).json({
            "message": "User registered successfully",
            "user": {
                "session_id": createToken(user.id),
                "username": user.username,
                "email": user.email
            }
        });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Failed to create user' });
    }
}

export { registerUser };