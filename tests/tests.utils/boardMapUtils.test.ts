import { getEndangeredTilesByPiece, createBoardMap, createFenString, isCheck, isCheckMate, validateMove } from "../../src/utils/boardMapUtils";

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

describe("Test createFenString function", () => {
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
        const expectedFen4 = "3k4/8/8/8/8/8/8/8"
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
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'q'],
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

describe("Test getEndangeredTilesByPiece function", () => {
    it("Should create a pawns' attack map.", () => {
        // Coords: [4, 2] (white pawn)
        // Coords: [3, 2] (black pawn)
        const boardMap = [
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', 'p', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', 'P', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
        ]
        const expectedPawnAttackMapWhite = [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0]
        ]
        const expectedPawnAttackMapBlack = [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0]
        ]
        expect(getEndangeredTilesByPiece(boardMap, [4, 2])).toEqual(expectedPawnAttackMapWhite)
        expect(getEndangeredTilesByPiece(boardMap, [3, 2])).toEqual(expectedPawnAttackMapBlack)
    })
    it("Should create a knights' attack map.", () => {
        // Coords: [3, 3] (black knight)
        const boardMap = [
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', 'n', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
        ]
        const expectedKnightAttackMap = [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 0, 1, 0, 0, 0],
            [0, 1, 0, 0, 0, 1, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 1, 0, 0],
            [0, 0, 1, 0, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0]
        ]
        expect(getEndangeredTilesByPiece(boardMap, [3, 3])).toEqual(expectedKnightAttackMap)
    })
    describe("Should create a bishops' attack map", () => {
        it("Without blocking pieces.", () => {
            // Coords: [3, 3] (black bishop)
            const boardMap = [
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', 'b', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
            ]
            const expectedBishopAttackMap = [
                [1, 0, 0, 0, 0, 0, 1, 0],
                [0, 1, 0, 0, 0, 1, 0, 0],
                [0, 0, 1, 0, 1, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 1, 0, 1, 0, 0, 0],
                [0, 1, 0, 0, 0, 1, 0, 0],
                [1, 0, 0, 0, 0, 0, 1, 0],
                [0, 0, 0, 0, 0, 0, 0, 1]
            ]
            expect(getEndangeredTilesByPiece(boardMap, [3, 3])).toEqual(expectedBishopAttackMap)
        })
        it("With blocking pieces.", () => {
            // Coords: [3, 3] (black bishop)
            // Coords: [1, 1] (blocking piece)
            const boardMap = [
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', 'P', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', 'b', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
            ]
            const expectedBishopAttackMap = [
                [0, 0, 0, 0, 0, 0, 1, 0],
                [0, 1, 0, 0, 0, 1, 0, 0],
                [0, 0, 1, 0, 1, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 1, 0, 1, 0, 0, 0],
                [0, 1, 0, 0, 0, 1, 0, 0],
                [1, 0, 0, 0, 0, 0, 1, 0],
                [0, 0, 0, 0, 0, 0, 0, 1]
            ]
            expect(getEndangeredTilesByPiece(boardMap, [3, 3])).toEqual(expectedBishopAttackMap)
        })
    })
    describe("Should create a rooks' attack map.", () => {
        it("Without blocking pieces.", () => {
            // Coords: [3, 3] (black rook)
            const boardMap = [
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', 'r', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
            ]
            const expectedRookAttackMap = [
                [0, 0, 0, 1, 0, 0, 0, 0],
                [0, 0, 0, 1, 0, 0, 0, 0],
                [0, 0, 0, 1, 0, 0, 0, 0],
                [1, 1, 1, 0, 1, 1, 1, 1],
                [0, 0, 0, 1, 0, 0, 0, 0],
                [0, 0, 0, 1, 0, 0, 0, 0],
                [0, 0, 0, 1, 0, 0, 0, 0],
                [0, 0, 0, 1, 0, 0, 0, 0]
            ]
            expect(getEndangeredTilesByPiece(boardMap, [3, 3])).toEqual(expectedRookAttackMap)
        })
        it("With blocking pieces.", () => {
            // Coords: [3, 3] (black rook)
            // Coords: [1, 3] (blocking piece)
            const boardMap = [
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', 'P', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', 'r', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
            ]
            const expectedRookAttackMap = [
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 1, 0, 0, 0, 0],
                [0, 0, 0, 1, 0, 0, 0, 0],
                [1, 1, 1, 0, 1, 1, 1, 1],
                [0, 0, 0, 1, 0, 0, 0, 0],
                [0, 0, 0, 1, 0, 0, 0, 0],
                [0, 0, 0, 1, 0, 0, 0, 0],
                [0, 0, 0, 1, 0, 0, 0, 0]
            ]
            expect(getEndangeredTilesByPiece(boardMap, [3, 3])).toEqual(expectedRookAttackMap)
        })
    })
    describe("Should create a queens' attack map.", () => {
        it("Without blocking pieces.", () => {
            // Coords: [3, 3] (black queen)
            const boardMap = [
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', 'q', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
            ]
            const expectedQueenAttackMap = [
                [1, 0, 0, 1, 0, 0, 1, 0],
                [0, 1, 0, 1, 0, 1, 0, 0],
                [0, 0, 1, 1, 1, 0, 0, 0],
                [1, 1, 1, 0, 1, 1, 1, 1],
                [0, 0, 1, 1, 1, 0, 0, 0],
                [0, 1, 0, 1, 0, 1, 0, 0],
                [1, 0, 0, 1, 0, 0, 1, 0],
                [0, 0, 0, 1, 0, 0, 0, 1]
            ]
            expect(getEndangeredTilesByPiece(boardMap, [3, 3])).toEqual(expectedQueenAttackMap)
        })
        it("With blocking pieces.", () => {
            // Coords: [3, 3] (black queen)
            // Coords: [1, 1] (blocking piece)
            // Coords: [1, 3] (blocking piece)
            const boardMap = [
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', 'P', ' ', 'P', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', 'q', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
            ]
            const expectedQueenAttackMap = [
                [0, 0, 0, 0, 0, 0, 1, 0],
                [0, 1, 0, 1, 0, 1, 0, 0],
                [0, 0, 1, 1, 1, 0, 0, 0],
                [1, 1, 1, 0, 1, 1, 1, 1],
                [0, 0, 1, 1, 1, 0, 0, 0],
                [0, 1, 0, 1, 0, 1, 0, 0],
                [1, 0, 0, 1, 0, 0, 1, 0],
                [0, 0, 0, 1, 0, 0, 0, 1]
            ]
            expect(getEndangeredTilesByPiece(boardMap, [3, 3])).toEqual(expectedQueenAttackMap)
        })
    })
    it("Should create a kings' attack map", () => {
        // Coords: [3, 3] (black king)
        const boardMap = [
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', 'k', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
        ]
        const expectedKingAttackMap = [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 1, 0, 0, 0],
            [0, 0, 1, 0, 1, 0, 0, 0],
            [0, 0, 1, 1, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0]
        ]
        expect(getEndangeredTilesByPiece(boardMap, [3, 3])).toEqual(expectedKingAttackMap)
    })
})
describe("Test isCheck", () => {
    it("Should return true if the king is in danger", () => {
        const boardMapBlack = [
            ['k', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', 'B', ' ', ' ', ' ', ' ', ' '],
            ['n', ' ', ' ', ' ', ' ', ' ', ' ', 'p'],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
        ]
        expect(isCheck(boardMapBlack,"black")).toBe(true)
        const boardMapWhite = [
            ['K', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', 'b', ' ', ' ', ' ', ' ', ' '],
            ['N', ' ', ' ', ' ', ' ', ' ', ' ', 'P'],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
        ]
        expect(isCheck(boardMapWhite,"white")).toBe(true)
    })
    it("Should return false if the king is not in danger", () => {
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
        expect(isCheck(boardMap,"white")).toBe(false)
        expect(isCheck(boardMap,"black")).toBe(false)
    })
    it("Should return false if there is no king. NOTE: TESTING ONLY", () => {
        const boardMap = [
            ['r', 'n', 'b', 'q', ' ', 'b', 'n', 'r'],
            ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
            ['R', 'N', 'B', 'Q', ' ', 'B', 'N', 'R']
        ]
        expect(isCheck(boardMap,"white")).toBe(false)
        expect(isCheck(boardMap,"black")).toBe(false)
    })
})
describe("Test isCheckMate", () => {
    it("Should return true if it's a mate.", () => {
        const foolMate = [
            ['r', 'n', 'b', ' ', 'k', 'b', 'n', 'r'],
            ['p', 'p', 'p', 'p', ' ', 'p', 'p', 'p'],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', 'p', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', 'P', 'q'],
            [' ', ' ', ' ', ' ', ' ', 'P', ' ', ' '],
            ['P', 'P', 'P', 'P', 'P', ' ', ' ', 'P'],
            ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
        ];
        expect(isCheckMate(foolMate,"white")).toBe(true)
        const shepherdMate = [
            ['r', ' ', 'b', 'q', 'k', 'b', 'n', 'r'],
            ['p', 'p', 'p', ' ', ' ', 'Q', 'p', 'p'],
            [' ', ' ', 'n', 'p', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', 'p', ' ', ' ', ' '],
            [' ', ' ', 'B', ' ', 'P', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            ['P', 'P', 'P', 'P', ' ', 'P', 'P', 'P'],
            ['R', 'N', 'B', ' ', 'K', ' ', 'N', 'R']
        ]
        expect(isCheckMate(shepherdMate,"black")).toBe(true)
    })
    it("Should return false if it's not a mate.", () => {
        // Check, but not checkmate!
        const boardMapCheck = [
            ['K', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', 'b', ' ', ' ', ' ', ' ', ' '],
            ['N', ' ', ' ', ' ', ' ', ' ', ' ', 'P'],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
        ]
        expect(isCheckMate(boardMapCheck,"white")).toBe(false)

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
        expect(isCheckMate(boardMap,"white")).toBe(false)
        expect(isCheckMate(boardMap,"black")).toBe(false)
    })
})
describe("Test validateMove function", () => {
    it("Ensure teams are checked, so that players can't move illegal pieces.", () => {
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
        expect(validateMove(boardMap, [6, 0], [5, 0], "black")).toBe(false)
        expect(validateMove(boardMap, [1, 0], [2, 0], "white")).toBe(false)
    })

    it("Ensure players can't move onto tiles occupied by their own pieces.", () => {
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
        expect(validateMove(boardMap, [7, 0], [6, 0], "white")).toBe(false)
        expect(validateMove(boardMap, [0, 0], [1, 0], "black")).toBe(false)
    })
    it("Should check if the move can save the king from a check.", () => {
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
        expect(validateMove(boardMap, [3, 7], [4, 7], "black")).toBe(false)
        expect(validateMove(boardMap, [3, 0], [4, 2], "black")).toBe(false)
        expect(validateMove(boardMap, [3, 0], [1, 1], "black")).toBe(true)
        expect(validateMove(boardMap, [3, 0], [2, 2], "black")).toBe(true)
    })
    it("Should check if the move endangers the king into a checkmate.", () => {
        const boardMap = [
            ['k', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', 'p', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', 'B', ' ', ' ', ' ', ' ', ' '],
            ['n', ' ', ' ', ' ', ' ', ' ', ' ', 'p'],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
        ]
        expect(validateMove(boardMap,[1,1],[2,1],"black")).toBe(false)
    })

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
            expect(validateMove(boardMap, [6, 0], [5, 0], "white")).toBe(true)
            expect(validateMove(boardMap, [1, 0], [2, 0], "black")).toBe(true)

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
            expect(validateMove(boardMapClose, [4, 2], [3, 2], "white")).toBe(false)
            expect(validateMove(boardMapClose, [3, 2], [4, 2], "black")).toBe(false)
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
            expect(validateMove(boardMap, [6, 0], [4, 0], "white")).toBe(true)
            expect(validateMove(boardMap, [1, 0], [3, 0], "black")).toBe(true)

            const boardMapClose = [
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', 'p', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', 'P', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
            ]
            expect(validateMove(boardMapClose, [6, 2], [4, 2], "white")).toBe(false)

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
            expect(validateMove(twoTilesAlreadyMoved, [4, 3], [2, 3], "white")).toBe(false)
            expect(validateMove(twoTilesAlreadyMoved, [3, 2], [5, 2], "black")).toBe(false)
        })
        it("Should take pawns one tile diagonally.", () => {
            const boardMap = [
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', 'p', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', 'P', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
            ]
            expect(validateMove(boardMap, [4, 3], [3, 2], "white")).toBe(true)
            expect(validateMove(boardMap, [3, 2], [4, 3], "black")).toBe(true)
            expect(validateMove(boardMap, [3, 2], [4, 1], "black")).toBe(false)
        })
        /*         it("En Passant", () => {
                    IMPORTANT: IMPOSSIBLE TO VALIDATE RIGHT NOW, AS THERE IS NO WAY TO KNOW IF A PAWN HAS JUST MOVED TWO TILES, WHICH IS NECESSARY FOR EN PASSANT.
                    THIS CAN BE FIXED BY ADDING A VARIABLE TO THE BOARD MAP THAT TRACKS THIS, BUT IT WOULD REQUIRE SIGNIFICANT CHANGES TO THE CODE, SO I'LL PROBABLY JUST LEAVE THIS OUT FOR NOW.
                }) */
    })
    describe("Test a knight being able to move", () => {
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
            expect(validateMove(boardMap, [4, 2], [3, 0], "white")).toBe(true)
            expect(validateMove(boardMap, [3, 0], [4, 2], "black")).toBe(true)
            expect(validateMove(boardMap, [4, 2], [3, 4], "white")).toBe(true)
            expect(validateMove(boardMap, [3, 0], [1, 1], "black")).toBe(true)
        })
    })
    describe("Test a bishop being able to move", () => {
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
            expect(validateMove(boardMap, [4, 3], [3, 2], "white")).toBe(true)
            expect(validateMove(boardMap, [3, 2], [4, 3], "black")).toBe(true)
            expect(validateMove(boardMap, [4, 3], [2, 5], "white")).toBe(true)
            expect(validateMove(boardMap, [3, 2], [1, 0], "black")).toBe(true)

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
            expect(validateMove(blockingPieceBoardMap, [4, 3], [2, 5], "white")).toBe(false)
            expect(validateMove(blockingPieceBoardMap, [3, 2], [1, 0], "black")).toBe(false)

        })
    })
    describe("Test a rook being able to move", () => {
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
            expect(validateMove(boardMap, [4, 2], [4, 0], "white")).toBe(true)
            expect(validateMove(boardMap, [3, 2], [3, 0], "black")).toBe(true)
            expect(validateMove(boardMap, [4, 2], [4, 7], "white")).toBe(true)
            expect(validateMove(boardMap, [3, 2], [3, 7], "black")).toBe(true)

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
            expect(validateMove(blockingPieceBoardMap, [4, 2], [4, 7], "white")).toBe(false)
            expect(validateMove(blockingPieceBoardMap, [3, 2], [3, 7], "black")).toBe(false)
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
            expect(validateMove(boardMap, [3, 2], [0, 2], "white")).toBe(true)
            expect(validateMove(boardMap, [0, 0], [7, 0], "black")).toBe(true)
            expect(validateMove(boardMap, [3, 2], [7, 2], "white")).toBe(true)

            const blockingPieceBoardMap = [
                ['r', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', 'p', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', 'R', ' ', ' ', ' ', ' ', ' '],
                ['P', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
            ]
            expect(validateMove(blockingPieceBoardMap, [3, 2], [0, 2], "white")).toBe(false)
            expect(validateMove(blockingPieceBoardMap, [0, 0], [7, 0], "black")).toBe(false)
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
            expect(validateMove(boardMap, [4, 2], [2, 0], "white")).toBe(true)
            expect(validateMove(boardMap, [3, 2], [1, 0], "black")).toBe(true)
            expect(validateMove(boardMap, [4, 2], [2, 4], "white")).toBe(true)
            expect(validateMove(boardMap, [3, 2], [1, 4], "black")).toBe(true)

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
            expect(validateMove(blockingPieceBoardMap, [3, 2], [5, 4], "white")).toBe(false)
            expect(validateMove(blockingPieceBoardMap, [2, 2], [0, 0], "black")).toBe(false)
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
            expect(validateMove(boardMap, [4, 2], [4, 0], "white")).toBe(true)
            expect(validateMove(boardMap, [3, 2], [3, 0], "black")).toBe(true)
            expect(validateMove(boardMap, [4, 2], [7, 2], "white")).toBe(true)
            expect(validateMove(boardMap, [3, 2], [0, 2], "black")).toBe(true)

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
            expect(validateMove(blockingPieceBoardMap, [4, 2], [4, 0], "white")).toBe(false)
            expect(validateMove(blockingPieceBoardMap, [3, 2], [3, 0], "black")).toBe(false)
        })
    })
    describe("Test a king being able to move", () => {
        it("Should be able to move one tile at a time.", () => {
            const boardMap = [
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', 'K', 'p', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
            ]
            expect(validateMove(boardMap, [2, 3], [1, 3], "white")).toBe(true)
            expect(validateMove(boardMap, [2, 3], [3, 3], "white")).toBe(false)
            expect(validateMove(boardMap, [2, 3], [2, 4], "white")).toBe(true)
            expect(validateMove(boardMap, [2, 3], [2, 2], "white")).toBe(true)
            expect(validateMove(boardMap, [2, 3], [1, 4], "white")).toBe(true)
            expect(validateMove(boardMap, [2, 3], [1, 2], "white")).toBe(true)
        })
        /*         it("Should be able to be castled.", () => {
        IMPORTANT: IMPOSSIBLE TO VALIDATE RIGHT NOW, AS THERE IS NO WAY TO KNOW IF THE KING OR ROOK HAS MOVED BEFORE, WHICH IS NECESSARY FOR CASTLING.
        THIS CAN BE FIXED BY ADDING A VARIABLE TO THE BOARD MAP THAT TRACKS THIS, BUT IT WOULD REQUIRE SIGNIFICANT CHANGES TO THE CODE, SO I'LL PROBABLY JUST LEAVE THIS OUT FOR NOW.
                }) */
    })
})