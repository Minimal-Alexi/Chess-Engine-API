import createBoardMap from "../utils/boardMapUtils";

export class Game {
    id: number;
    turnCounter: number;
    state: string;

    constructor(id: number, turnCounter: number, state: string | undefined) {
        this.id = id;
        this.turnCounter = turnCounter;
        this.state = state || "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";
    }

    toJSON() {
        return {
            id: this.id,
            turnCounter: this.turnCounter,
            state: {
                fen: this.state,
                board: createBoardMap(this.state)
            }
        };
    }
}