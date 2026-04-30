import createBoardMap from "../../src/utils/boardMapUtils";

describe("Test createBoardMap function", () => {
    it("Should create a board map from a FEN string", () => {
        const fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";
        const expectedBoardMap = [
            ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
            ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
            ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
        ];
        const boardMap = createBoardMap(fen);
        expect(boardMap).toEqual(expectedBoardMap);

        const fen2 = "r1bqkbnr/pppppppp/2n5/8/8/8/PPPPPPPP/RNBQKBNR";
        const expectedBoardMap2 = [
            ['r', ' ', 'b', 'q', 'k', 'b', 'n', 'r'],
            ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
            [' ', ' ', 'n', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
            ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
        ];
        const boardMap2 = createBoardMap(fen2);
        expect(boardMap2).toEqual(expectedBoardMap2);
    });
    it("Should return null for an invalid FEN string", () => {
        const fen = "invalid-fen-string";
        const boardMap = createBoardMap(fen);
        expect(boardMap).toBeNull();
    }
    )
});
