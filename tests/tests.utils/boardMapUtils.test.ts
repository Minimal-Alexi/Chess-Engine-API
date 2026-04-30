import {createBoardMap, createFenString} from "../../src/utils/boardMapUtils";

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

        const fen3 = "8/8/8/8/8/8/8/1k6"
        const expectedBoardMap3 = [ 
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', 'k', ' ', ' ', ' ', ' ', ' ', ' '],
        ]
        const boardMap3 = createBoardMap(fen3)
        expect(boardMap3).toEqual(expectedBoardMap3)

        const fen4 = "3k4/8/8/8/8/8/8/8"
        const expectedBoardMap4 = [
            [' ', ' ', ' ', 'k', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        ]
        const boardMap4 = createBoardMap(fen4)
        expect(boardMap4).toEqual(expectedBoardMap4)

        const fen5 = "8/8/8/8/8/8/8/7r"
        const expectedBoardMap5 = [
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', 'r'],
        ]
        const boardMap5 = createBoardMap(fen5)
        expect(boardMap5).toEqual(expectedBoardMap5)
    });
    
    it("Should return null for an invalid FEN string", () => {
        const fen = "invalid-fen-string";
        const boardMap = createBoardMap(fen);
        expect(boardMap).toBeNull();

        const fen2 = "8/8/8/8/8/8/8";
        const boardMap2 = createBoardMap(fen2);
        expect(boardMap2).toBeNull();

        const fen3 = "8/8/8/8/8/8/8q";
        const boardMap3 = createBoardMap(fen3);
        expect(boardMap3).toBeNull();
    }
    )
});

describe ("Test createFenString function", () => {
    it("Should create a FEN string from a board map", () => {
        const boardMap = [
            ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
            ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
            ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
        ];
        const expectedFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";
        const fen = createFenString(boardMap);
        expect(fen).toEqual(expectedFen);

        const boardMap2 = [
            ['r', ' ', 'b', 'q', 'k', 'b', 'n', 'r'],
            ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
            [' ', ' ', 'n', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
            ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
        ];
        const expectedFen2 = "r1bqkbnr/pppppppp/2n5/8/8/8/PPPPPPPP/RNBQKBNR";
        const fen2 = createFenString(boardMap2)
        expect(fen2).toEqual(expectedFen2)

    });
    it("Should return null for an invalid board map", () => {
        const boardMap = [
            ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
            ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
            ['R', 'N', 'B', 'Q', 'K', 'B', 'N']
        ];
        const fen = createFenString(boardMap);
        expect(fen).toBeNull();
    });
});

describe("Test createFenString and createBoardMap compitability", () => {
    it("createFenString and createBoardMap should be compatible with eachother.", () => {

    })
})