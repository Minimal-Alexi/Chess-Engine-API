import { Request, Response } from 'express';
import {User} from '../models/user.model'
import { findUserByEmail, createUser } from '../service/user.service';
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
            "user": user.toJSON()
        });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Failed to create user' });
    }
}

const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ "message": "Email and password are required" });
        }
        const user = await findUserByEmail(email);
        if (!user || user.password !== password) {
            return res.status(401).json({ "message": "Invalid email or password" });
        }
        res.status(200).json({
            "message": "Login successful",
            "user": user.toJSON()
        });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ error: 'Failed to login user' });
    }
}

export { registerUser,loginUser };