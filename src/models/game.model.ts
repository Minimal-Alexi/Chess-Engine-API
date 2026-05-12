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