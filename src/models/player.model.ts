import { findUserById } from "../service/user.service";

export class Player{
    user_id : number;
    game_id : number;
    team : string;

    constructor(user_id:number,game_id:number,team:string){
        this.user_id = user_id;
        this.game_id = game_id;
        this.team = team;
    }
}