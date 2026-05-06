import e from "express";
import {createBoardMap, createFenString, vaildateMove} from "../../src/utils/boardMapUtils";

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

        const boardMap3 = [
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', 'k', ' ', ' ', ' ', ' ', ' ', ' '],
        ]
        const expectedFen3 = "8/8/8/8/8/8/8/1k6"
        const fen3 = createFenString(boardMap3)
        expect(fen3).toEqual(expectedFen3)

        const boardMap4 = [
            [' ', ' ', ' ', 'k', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        ]
        const expectedFen4 ="3k4/8/8/8/8/8/8/8"
        const fen4 = createFenString(boardMap4)
        expect(fen4).toEqual(expectedFen4)


        const boardMap5 = [
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', 'r'],
        ]
        const expectedFen5 = "8/8/8/8/8/8/8/7r"
        const fen5 = createFenString(boardMap5)
        expect(fen5).toEqual(expectedFen5)

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

        const boardMap2 = [
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        ];
        const fen2 = createFenString(boardMap2);
        expect(fen2).toBeNull();

        const boardMap3 = [
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ','q'],
        ];
        const fen3 = createFenString(boardMap3);
        expect(fen3).toBeNull();

    });
});

describe("Test createFenString and createBoardMap compitability", () => {
    it("createFenString and createBoardMap should be compatible with eachother.", () => {
        const boardMap = [
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', 'r'],
        ]
        const fen = "8/8/8/8/8/8/8/7r"

        expect(createFenString(createBoardMap(fen)!)).toBe(fen)
        expect(createBoardMap(createFenString(boardMap)!)).toStrictEqual(boardMap)

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
        const fen2 = "r1bqkbnr/pppppppp/2n5/8/8/8/PPPPPPPP/RNBQKBNR";

        expect(createFenString(createBoardMap(fen2)!)).toBe(fen2)
        expect(createBoardMap(createFenString(boardMap2)!)).toStrictEqual(boardMap2)
    })
})

describe("Test validateMove function", () => {
    describe("Test a pawn being able to move", () => {
        it("One tile away.", () => {
            const boardMap = [
                ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
                ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
                ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
            ]
            expect(vaildateMove(boardMap,[6,0],[5,0],"white")).toBe(true)
            expect(vaildateMove(boardMap,[1,0],[2,0],"black")).toBe(true)

            const boardMapClose = [
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', 'p', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', 'P', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
            ]
            expect(vaildateMove(boardMapClose,[4,2],[3,2],"white")).toBe(false)
            expect(vaildateMove(boardMapClose,[3,2],[4,2],"black")).toBe(false)
        })
        it("Two tiles away.", () => {
            const boardMap = [
                ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
                ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
                ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
            ]
            expect(vaildateMove(boardMap,[6,0],[4,0],"white")).toBe(true)
            expect(vaildateMove(boardMap,[1,0],[3,0],"black")).toBe(true)

            const boardMapClose = [
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', 'p', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', 'P', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
            ]
            expect(vaildateMove(boardMapClose,[4,2],[2,2],"white")).toBe(false)
            expect(vaildateMove(boardMapClose,[3,2],[5,2],"black")).toBe(false)

            const twoTilesAlreadyMoved = [
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', 'p', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', 'P', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
            ]
            expect(vaildateMove(twoTilesAlreadyMoved,[4,3],[2,3],"white")).toBe(false)
            expect(vaildateMove(twoTilesAlreadyMoved,[3,2],[5,2],"black")).toBe(false)
        })
        it("Should take pawns one tile diagonally.", () => {
            const boardMap =  [
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', 'p', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', 'P', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
            ]
            expect(vaildateMove(boardMap,[4,3],[3,2],"white")).toBe(true)
            expect(vaildateMove(boardMap,[3,2],[4,3],"black")).toBe(true)
        })
/*         it("En Passant", () => {
            IMPORTANT: IMPOSSIBLE TO VALIDATE RIGHT NOW, AS THERE IS NO WAY TO KNOW IF A PAWN HAS JUST MOVED TWO TILES, WHICH IS NECESSARY FOR EN PASSANT.
            THIS CAN BE FIXED BY ADDING A VARIABLE TO THE BOARD MAP THAT TRACKS THIS, BUT IT WOULD REQUIRE SIGNIFICANT CHANGES TO THE CODE, SO I'LL PROBABLY JUST LEAVE THIS OUT FOR NOW.
        }) */
    })
    describe("Test a knight being able to move",() => {
        it("L shape.", () => {
            const boardMap = [
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                ['n', ' ', 'P', ' ', ' ', ' ', ' ', ' '],
                ['p', ' ', 'N', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
            ]
            expect(vaildateMove(boardMap,[4,2],[3,0],"white")).toBe(true)
            expect(vaildateMove(boardMap,[3,0],[4,2],"black")).toBe(true)
            expect(vaildateMove(boardMap,[4,2],[3,4],"white")).toBe(true)
            expect(vaildateMove(boardMap,[3,0],[1,1],"black")).toBe(true)
        })
    })
    describe("Test a bishop being able to move",() => {
        it("Diagonal move.", () => {
            const boardMap = [
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                ['P', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', 'p', ' ', ' '],
                [' ', ' ', 'b', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', 'B', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
            ]
            expect(vaildateMove(boardMap,[4,3],[3,2],"white")).toBe(true)
            expect(vaildateMove(boardMap,[3,2],[4,3],"black")).toBe(true)
            expect(vaildateMove(boardMap,[4,3],[2,5],"white")).toBe(true)
            expect(vaildateMove(boardMap,[3,2],[1,0],"black")).toBe(true)
            
            const blockingPieceBoardMap = [
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', 'P', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', 'b', ' ', 'p', ' ', ' ', ' '],
                [' ', ' ', ' ', 'B', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
            ]            
            expect(vaildateMove(boardMap,[4,3],[2,5],"white")).toBe(false)
            expect(vaildateMove(blockingPieceBoardMap,[3,2],[1,0],"black")).toBe(false)
            
        })
    })
    describe("Test a rook being able to move",() => {
        it("Horizontal move.", () => {
            const boardMap = [
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', 'r', ' ', ' ', ' ', ' ', 'P'],
                [' ', ' ', 'R', ' ', ' ', ' ', ' ', 'p'],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
            ]
            expect(vaildateMove(boardMap,[4,2],[4,0],"white")).toBe(true)
            expect(vaildateMove(boardMap,[3,2],[3,0],"black")).toBe(true)
            expect(vaildateMove(boardMap,[4,2],[4,7],"white")).toBe(true)
            expect(vaildateMove(boardMap,[3,2],[3,7],"black")).toBe(true)

            const blockingPieceBoardMap = [
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', 'r', ' ', 'P', ' ', ' ', ' '],
                [' ', ' ', 'R', ' ', 'p', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
            ]
            expect(vaildateMove(blockingPieceBoardMap,[4,2],[4,7],"white")).toBe(false)
            expect(vaildateMove(blockingPieceBoardMap,[3,2],[3,7],"black")).toBe(false)
        })
        it("Vertical move.", () => {
            const boardMap = [
                ['r', ' ', 'p', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', 'R', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                ['P', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
            ]
            expect(vaildateMove(boardMap,[3,2],[0,2],"white")).toBe(true)
            expect(vaildateMove(boardMap,[0,0],[7,0],"black")).toBe(true)
            expect(vaildateMove(boardMap,[3,2],[7,2],"white")).toBe(true)

            const blockingPieceBoardMap =  [
                ['r', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', 'p', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', 'R', ' ', ' ', ' ', ' ', ' '],
                ['P', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
            ]
            expect(vaildateMove(blockingPieceBoardMap,[3,2],[0,2],"white")).toBe(false)
            expect(vaildateMove(blockingPieceBoardMap,[0,0],[7,0],"black")).toBe(false)
        })
/*         it("Castle move.", () => {
IMPORTANT: IMPOSSIBLE TO VALIDATE RIGHT NOW, AS THERE IS NO WAY TO KNOW IF THE KING OR ROOK HAS MOVED BEFORE, WHICH IS NECESSARY FOR CASTLING.
THIS CAN BE FIXED BY ADDING A VARIABLE TO THE BOARD MAP THAT TRACKS THIS, BUT IT WOULD REQUIRE SIGNIFICANT CHANGES TO THE CODE, SO I'LL PROBABLY JUST LEAVE THIS OUT FOR NOW.
        }) */
    })
    describe("Test a queen being able to move", () => {
        it("Should move like the bishop.", () => {
            const boardMap = [
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', 'q', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', 'Q', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
            ]
            expect(vaildateMove(boardMap,[4,2],[2,0],"white")).toBe(true)
            expect(vaildateMove(boardMap,[3,2],[1,0],"black")).toBe(true)
            expect(vaildateMove(boardMap,[4,2],[2,4],"white")).toBe(true)
            expect(vaildateMove(boardMap,[3,2],[1,4],"black")).toBe(true)

            const blockingPieceBoardMap = [
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', 'P', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', 'q', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', 'Q', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', 'p', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
            ]
            expect(vaildateMove(blockingPieceBoardMap,[3,2],[5,4],"white")).toBe(false)
            expect(vaildateMove(blockingPieceBoardMap,[2,2],[0,0],"black")).toBe(false)
        })
        it("Should move like the rook.", () => {
            const boardMap = [
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', 'q', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', 'Q', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
            ]
            expect(vaildateMove(boardMap,[4,2],[4,0],"white")).toBe(true)
            expect(vaildateMove(boardMap,[3,2],[3,0],"black")).toBe(true)
            expect(vaildateMove(boardMap,[4,2],[7,2],"white")).toBe(true)
            expect(vaildateMove(boardMap,[3,2],[0,2],"black")).toBe(true)

            const blockingPieceBoardMap = [
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', 'P', 'q', ' ', ' ', ' ', ' ', ' '],
                [' ', 'p', 'Q', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
            ]
            expect(vaildateMove(blockingPieceBoardMap,[4,2],[4,0],"white")).toBe(false)
            expect(vaildateMove(blockingPieceBoardMap,[3,2],[3,0],"black")).toBe(false)
        })
    })
    describe("Test a king being able to move", () => {
        it("Should be able to move one tile at a time.", () => {
            const boardMap = [
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', 'k', 'P', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
            ]
            expect(vaildateMove(boardMap,[2,3],[1,3],"black")).toBe(true)
            expect(vaildateMove(boardMap,[2,3],[3,3],"black")).toBe(false)
            expect(vaildateMove(boardMap,[2,3],[2,4],"black")).toBe(true)
            expect(vaildateMove(boardMap,[2,3],[2,2],"black")).toBe(true)
            expect(vaildateMove(boardMap,[2,3],[1,4],"black")).toBe(true)
            expect(vaildateMove(boardMap,[2,3],[1,2],"black")).toBe(true)
        })
/*         it("Should be able to be castled.", () => {
IMPORTANT: IMPOSSIBLE TO VALIDATE RIGHT NOW, AS THERE IS NO WAY TO KNOW IF THE KING OR ROOK HAS MOVED BEFORE, WHICH IS NECESSARY FOR CASTLING.
THIS CAN BE FIXED BY ADDING A VARIABLE TO THE BOARD MAP THAT TRACKS THIS, BUT IT WOULD REQUIRE SIGNIFICANT CHANGES TO THE CODE, SO I'LL PROBABLY JUST LEAVE THIS OUT FOR NOW.
        }) */
        it("Should be moved out of check, or saved from check, instead of any other move being legal.", () => {
            const boardMap = [
                ['k', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', 'B', ' ', ' ', ' ', ' ', ' '],
                ['n', ' ', ' ', ' ', ' ', ' ', ' ', 'p'],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
            ]
            expect(vaildateMove(boardMap,[3,7],[4,7],"black")).toBe(false)
            expect(vaildateMove(boardMap,[3,0],[4,2],"black")).toBe(false)
            expect(vaildateMove(boardMap,[3,0],[1,1],"black")).toBe(true)
            expect(vaildateMove(boardMap,[3,0],[2,2],"black")).toBe(true)
        })
    })
    describe("Ensure teams are checked, so that players can't move illegal pieces.", () => {
        const boardMap = [
            ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
            ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
            ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
        ]
        expect(vaildateMove(boardMap,[6,0],[5,0],"black")).toBe(false)
        expect(vaildateMove(boardMap,[1,0],[2,0],"white")).toBe(false)
    })
    describe("Ensure players can't move onto tiles occupied by their own pieces.", () => {
        const boardMap = [
            ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
            ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
            ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
        ]
        expect(vaildateMove(boardMap,[7,0],[6,0],"white")).toBe(false)
        expect(vaildateMove(boardMap,[0,0],[1,0],"black")).toBe(false)
    })
})