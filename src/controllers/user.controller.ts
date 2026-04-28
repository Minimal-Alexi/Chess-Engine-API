import { User } from "../models/user.model";

const createUser = async (username: string, email: string, password: string) => {
    const user = new User({ username, email, password });
    return await user.save();
}

export { createUser };
