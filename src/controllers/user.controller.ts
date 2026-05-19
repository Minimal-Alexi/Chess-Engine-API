import { Request, Response } from 'express';
import { findUserByEmail, createUser, getAllUsersList, findUserById } from '../service/user.service';
import bcrypt from 'bcrypt';
import { NR_OF_SALTING_ROUNDS } from '../config/constants';
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

        if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).json({ "message": "Invalid email format" });
        }

        const user = await createUser(username, email, bcrypt.hashSync(password, NR_OF_SALTING_ROUNDS).toString());
        res.status(201).json({
            "message": "User registered successfully",
            "user": {
                "session_id":createToken(user.id),
                ...user.toJSON()
            }
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
        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ "message": "Invalid email or password" });
        }
        res.status(200).json({
            "message": "Login successful",
            "user": {
                "session_id":createToken(user.id),
                ...user.toJSON()
            }
        });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ error: 'Failed to login user' });
    }
}

const getAllUsers = async (req: Request, res:Response) => {
    try{
        const usersArray = await getAllUsersList()
        console.log
        const usersArrayJson = usersArray.map(user => ({
            id: user.id,
            username: user.username
        }));
        res.status(200).json({
            "message":"Succesfully got all users.",
            "users":usersArrayJson
        })
    }catch(error){
        console.error('Error fetching users: ',error);
        res.status(500).json({error: 'Failed to get users.'})
    }
}

const getUserById = async (req: Request, res:Response) => {
    try{
        const targetUserId = Number(req.params.targetUserId);
        const userId = (req as any).user;

        const user = await findUserById(targetUserId);
        
        if(!user){
            return res.status(404).json({"message":"Couldn't find user."})
        }

        if (userId == targetUserId) {
            return res.status(200).json({
                "user": user.toJSON()
            })
        }
        return res.status(200).json({
            "user": {
                "username": user.username,
                "id": user.id
            }
        })
    }catch(error){
        console.error('Error fetching user: ',error);
        res.status(500).json({error: 'Failed to get user.'})
    }
}

export { registerUser,loginUser, getAllUsers, getUserById };