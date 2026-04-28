import {User, createUser} from '../models/user.model';



const registerUser = async (username: string, email: string, password: string) => {
    return await createUser(username, email, password);
}

export { registerUser };