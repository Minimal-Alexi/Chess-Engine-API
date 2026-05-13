import {createBoardMap} from "../utils/boardMapUtils";
import { Player } from "./player.model";

export class Game {
    id: number;
    turnCounter: number;
    state: string;
    players: Array<Player>

    constructor(id: number, turnCounter: number, state: string | undefined, players: Array<Player> | undefined) {
        this.id = id;
        this.turnCounter = turnCounter;
        this.state = state || "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";
        this.players = players || []
    }

    isUserInGame(userId: number): boolean {
        if (!this.players) {
            throw new Error("Player list not initialized for game " + this.id);
        }

        return this.players.some(player => player.userId === userId);
    }

    verifyTurnOrder(userId: number):boolean{
        if(!this.players){
            throw new Error("Player list not initialized for game " + this.id);
        }
        const player = this.players.find(player => player.userId === userId);
        return (player?.team === 'white' && this.turnCounter % 2 === 0) ||
        (player?.team !== 'white' && this.turnCounter % 2 !== 0);
    }

    getPlayerTeam(userId:number):string{
        if (!this.players) {
            throw new Error("Player list not initialized for game " + this.id);
        }

        return this.players.find(player => player.userId === userId)?.team!
    }

    async toJSON() {
        return {
            id: this.id,
            turnCounter: this.turnCounter,
            state: {
                fen: this.state,
                board: createBoardMap(this.state)
            },
            players: this.players?.length == 2
                ? {
                    ...(this.players[0] ? await this.players[0].toJSON() : {}),
                    ...(this.players[1] ? await this.players[1].toJSON() : {})
                }
                : {}
        };
    }
}