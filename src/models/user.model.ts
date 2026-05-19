import createToken from "../utils/createToken";
export class User {
    id: number;
    username: string;
    email: string;
    password: string;

    constructor(id: number, username: string, email: string, password: string) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
    }

    toJSON() {
        return {
            id: this.id,
            username: this.username,
            email: this.email
        };
    }
}


