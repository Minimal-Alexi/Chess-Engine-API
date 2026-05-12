import { findUserById } from "../service/user.service";

export class Player{
    userId : number;
    gameId : number;
    team : string;

    constructor(userId:number,gameId:number,team:string){
        this.userId = userId;
        this.gameId = gameId;
        this.team = team;
    }

    async toJSON() {
        const user = await findUserById(this.userId)
        return {
            [this.team]:{
                userId: this.userId,
                username: user?.username
            }
        }
    }
}