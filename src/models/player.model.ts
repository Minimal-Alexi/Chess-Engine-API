import { User } from "./user.model";

export class Player{
    user : User;
    gameId : number;
    team : string;

    constructor(user:User,gameId:number,team:string){
        this.user = user;
        this.gameId = gameId;
        this.team = team;
    }

    toJSON() {
        return {
            [this.team]:{
                userId: this.user.id,
                username: this.user.username
            }
        }
    }
}