import { pointwiseMaximum } from "./matrixManipulation";

const inBounds = (x: number, y: number) => x >= 0 && x <= 7 && y >= 0 && y <= 7;
const isLower = (x: string) => x >= 'a' && x <= 'z';
const isUpper = (x: string) => x >= 'A' && x <= 'Z';
const teamCond = (team: string, map: Array<Array<string>>, i: number, j: number) => team == "white" ? isLower(map[i][j]) : isUpper(map[i][j])
const differentTeamCheck = (piece: string, target: string) => target != ' ' && isUpper(target) !== isUpper(piece)

export const createBoardMap = (fen: string): Array<Array<string>> | null => {
    const size = 8;
    const boardMap: Array<Array<string>> = [];
    const rows = fen.split("/");
    if (rows.length !== size) {
        return null;
    }
    for (let i = 0; i < size; i++) {
        const row: Array<string> = [];
        for (const char of rows[i]) {
            if (char >= '1' && char <= '8') {
                for (let j = 0; j < parseInt(char); j++) {
                    row.push(' ');
                }
            } else if ((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z')) {
                row.push(char);
            }
        }
        if (row.length !== size) {
            return null;
        }
        boardMap.push(row);
    }
    return boardMap
};

export const createFenString = (boardMap: Array<Array<string>>): string | null => {
    const size = 8;
    if (boardMap.length !== size) {
        return null;
    }
    for (let i = 0; i < size; i++) {
        if (boardMap[i].length !== size) {
            return null;
        }
    }
    let fen = "";
    for (let i = 0; i < size; i++) {
        let emptyCount = 0;
        for (let j = 0; j < size; j++) {
            const char = boardMap[i][j]
            if (char == ' ') {
                emptyCount++;
            }
            else if ((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z')) {
                // console.log('Concatenating at ' + i + ',' + j + ': ' + emptyCount.toString() + char)
                fen += ((emptyCount != 0) ? emptyCount.toString() + char : char);
                emptyCount = 0;
            }
        }
        // console.log('Concatenating at ' + i + ': ' + (emptyCount != 0) ? emptyCount.toString() + '/' : '/')
        if (i < size - 1) {
            fen += ((emptyCount != 0) ? emptyCount.toString() + '/' : '/')
        }
        else {
            fen += ((emptyCount != 0) ? emptyCount.toString() : '')
        }
    }
    return fen;

}


/*
    Name: movePiece
    Creator: Minimal
    Variables:
        * map: A board map
        * start: The starting pieces' location.
        * destination: The destination of the piece.
    Explanation:
    Moves a piece from one tile to another, without checking for constraints. This is a helper function which should be called ONLY inside makeMove.
*/
const movePiece = (
    map: Array<Array<string>>, start: [number, number], destination: [number, number]) => {
    const newMap = map.map(row => [...row])

    newMap[destination[0]][destination[1]] =
        newMap[start[0]][start[1]]

    newMap[start[0]][start[1]] = ' '

    return newMap
}

// TODO: Create getEndangeredTilesByPieceArray and getLegalMovesArray function


/*
    Name: checkEndangeredTilesByPiece
    Creator: Minimal
    Variables:
        * map: A board map
        * selectedPieceLocation: The coordinates of the piece that can be moved.
    Explanation:
    This function checks the tiles that are endangered by the selected piece.
*/
export const getEndangeredTilesByPiece = (
    map: Array<Array<string>>,
    selectedPieceLocation: [number, number]
): Array<Array<number>> => {

    let mappedAttacks = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0]
    ];
    const selectedPiece = map[selectedPieceLocation[0]][selectedPieceLocation[1]];
    const selectedPieceType = selectedPiece.toLowerCase();
    const coordsX = selectedPieceLocation[0], coordsY = selectedPieceLocation[1];
    const isWhite = (selectedPiece >= 'A' && selectedPiece <= 'Z');

    switch (selectedPieceType) {

        case 'p': {
            const moves = [[1, 1], [1, -1]];
            const dir = isWhite == true ? -1 : 1;
            for (const move of moves) {
                if (inBounds(coordsX + move[0] * dir, coordsY + move[1])) {
                    mappedAttacks[coordsX + move[0] * dir][coordsY + move[1]] = 1;
                }
            }
            break
        }

        case 'n': {
            const moves = [[2, 1], [2, -1], [-2, 1], [-2, -1],
            [1, 2], [1, -2], [-1, 2], [-1, -2]]
            for (const move of moves) {
                if (inBounds(coordsX + move[0], coordsY + move[1]) &&
                    (
                        differentTeamCheck(selectedPiece, map[coordsX + move[0]][coordsY + move[1]])
                        || map[coordsX + move[0]][coordsY + move[1]] == ' '
                    )
                ) {
                    mappedAttacks[coordsX + move[0]][coordsY + move[1]] = 1;
                }
            }
            break
        }

        case 'b': {
            const directions = [[1, 1], [1, -1], [-1, 1], [-1, -1]]
            for (const dir of directions) {
                let i = coordsX + dir[0], j = coordsY + dir[1];
                while (inBounds(i, j) && map[i][j] == ' ') {
                    mappedAttacks[i][j] = 1;
                    i += dir[0];
                    j += dir[1];
                }
                if (inBounds(i, j) && differentTeamCheck(selectedPiece, map[i][j])) {
                    mappedAttacks[i][j] = 1;
                }
            }
            break
        }

        case 'r': {
            const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]]
            for (const dir of directions) {
                let i = coordsX + dir[0], j = coordsY + dir[1];
                while (inBounds(i, j) && map[i][j] == ' ') {
                    mappedAttacks[i][j] = 1;
                    i += dir[0];
                    j += dir[1];
                }
                if (inBounds(i, j) && differentTeamCheck(selectedPiece, map[i][j])) {
                    mappedAttacks[i][j] = 1;
                }
            }
            break
        }

        case 'q': {
            const directions = [[-1, 0], [1, 0], [0, -1], [0, 1],
            [1, 1], [1, -1], [-1, 1], [-1, -1]]
            for (const dir of directions) {
                let i = coordsX + dir[0], j = coordsY + dir[1];
                while (inBounds(i, j) && map[i][j] == ' ') {
                    mappedAttacks[i][j] = 1;
                    i += dir[0];
                    j += dir[1];
                }
                if (inBounds(i, j) && differentTeamCheck(selectedPiece, map[i][j])) {
                    mappedAttacks[i][j] = 1;
                }
            }
            break
        }

        case 'k': {
            const moves = [[-1, -1], [-1, 0], [-1, 1],
            [0, -1], [0, 1],
            [1, -1], [1, 0], [1, 1]];
            for (let move of moves) {
                if (inBounds(coordsX + move[0], coordsY + move[1]) &&
                    (
                        map[coordsX + move[0]][coordsY + move[1]] == ' ' ||
                        differentTeamCheck(selectedPiece, map[coordsX + move[0]][coordsY + move[1]])
                    )
                ) {
                    mappedAttacks[coordsX + move[0]][coordsY + move[1]] = 1;
                }
            }
            break
        }
    }
    return mappedAttacks
}

/*
    Name: getLegalMoves
    Creator: Minimal
    Variables:
        * map: A board map
        * selectedPieceLocation: The coordinates of the piece that can be moved.
    Explanation:
    This function uses endangeredTilesMap with some extra logic to ensure the only legal moves are visible.
*/
export const getLegalMoves = (
    map: Array<Array<string>>,
    selectedPieceLocation: [number, number]
): Array<Array<number>> => {
    const piece = map[selectedPieceLocation[0]][selectedPieceLocation[1]]
    const pieceType = piece.toLowerCase()
    const [coordsX, coordsY] = selectedPieceLocation
    let mappedLegalMoves = getEndangeredTilesByPiece(map, selectedPieceLocation)
    if (pieceType == 'p') {
        const isWhite = (piece >= 'A' && piece <= 'Z');
        const endangeredTiles = [[1, 1], [1, -1]];
        const dir = isWhite == true ? -1 : 1;
        for (const endangeredTile of endangeredTiles) {
            if (inBounds(coordsX + endangeredTile[0] * dir, coordsY + endangeredTile[1])) {
                const target = map[coordsX + endangeredTile[0] * dir][coordsY + endangeredTile[1]];
                if (target == ' ') {
                    mappedLegalMoves[coordsX + endangeredTile[0] * dir][coordsY + endangeredTile[1]] = 0;
                }
            }
        }
        if (inBounds(coordsX + dir, coordsY) && map[coordsX + dir][coordsY] == ' ') {
            mappedLegalMoves[coordsX + dir][coordsY] = 1;
            if ((isWhite ? coordsX == 6 : coordsX == 1) && map[coordsX + dir * 2][coordsY] == ' ') {
                mappedLegalMoves[coordsX + dir * 2][coordsY] = 1
            }
        }
    }
    return mappedLegalMoves
}


/*
    Name: isCheck
    Creator: Minimal
    Variables:
        * map: A board map
        * team: The team that needs to be verified if it's in check.
    Explanation:
    This function verifies if the appropiate teams' king is in check.
    It finds the kings position, then it finds every single opposing piece and combines their attack maps together.
*/
export const isCheck = (map: Array<Array<string>>, team: string): boolean => {

    let kingPosition: [number, number] | undefined;
    for (let i = 0; i <= 7; ++i) {
        for (let j = 0; j <= 7; ++j) {
            if (
                (team == 'white'
                    ? isUpper(map[i][j])
                    : isLower(map[i][j]))
                && map[i][j].toLowerCase() == 'k'
            ) {
                kingPosition = [i, j]
            }
        }
    }

    if (!kingPosition) return false

    for (let i = 0; i <= 7; ++i) {
        for (let j = 0; j <= 7; ++j) {
            if (teamCond(team, map, i, j)) {
                const attackPattern = getEndangeredTilesByPiece(map, [i, j])
                if (attackPattern[kingPosition[0]][kingPosition[1]] == 1) {
                    return true
                }
            }
        }
    }

    return false
}

/*
    Name: isCheckMate
    Creator: Minimal
    Variables:
        * map: A board map
        * team: The team that needs to be verified if it's in check.
    Explanation:
    This function verifies if the appropiate teams' king is in check.
*/
export const isCheckMate = (map: Array<Array<string>>, team: string): boolean => {
    if (!isCheck(map, team)) {
        return false
    }
    
    let kingPosition: [number, number] | undefined;
    for (let i = 0; i <= 7; ++i) {
        for (let j = 0; j <= 7; ++j) {
            if (
                (team == 'white'
                    ? isUpper(map[i][j])
                    : isLower(map[i][j]))
                && map[i][j].toLowerCase() == 'k'
            ) {
                kingPosition = [i, j];
            }
        }
    }
    
    if(!kingPosition) return false;

    const checkingPieces : Array<[number,number]> = []
    for (let i = 0; i <= 7; ++i) {
        for (let j = 0; j <= 7; ++j) {
            const tile = map[i][j];
            if(tile != ' ' && (isUpper(tile) != isUpper(map[kingPosition[0]][kingPosition[1]]))){
                const endangeredTiles = getEndangeredTilesByPiece(map,[i,j])
                if(endangeredTiles[kingPosition[0]][kingPosition[1]] == 1){
                    checkingPieces.push([i,j]);
                }
            }
        }
    }

    // TODO: This should be done in a more efficient manner, but the last thing I want to work on is the fucking chess logic.

    if(checkingPieces.length >= 2){
        const kingsEscapeRoutes = getLegalMoves(map,kingPosition);
        for (let i = 0; i <= 7; ++i) {
            for (let j = 0; j <= 7; ++j) {
                if(kingsEscapeRoutes[i][j] == 1
                    && validateMove(map,kingPosition,[i,j],team) == true
                ){
                    return false;
                }
            }
        }
        return true
    }

    for (let i = 0; i <= 7; ++i) {
        for (let j = 0; j <= 7; ++j) {
            const tile = map[i][j]
            if(tile != ' ' && (isUpper(tile) == isUpper(map[kingPosition[0]][kingPosition[1]]))){
                const pieceLegalMoves = getLegalMoves(map,[i,j]);
                for(let ii = 0; ii <= 7; ++ii){
                    for(let jj = 0; jj <= 7; ++jj){
                        if(pieceLegalMoves[ii][jj] == 1){
                            if(validateMove(map,[i,j],[ii,jj],team)){
                                return false
                            }
                        }
                    }
                }

            }
        }
    }

    return true
}
/*
    Name: validateMove
    Creator: Minimal
    Variables:
        * map: A board map
        * start: The starting pieces' location.
        * destination: The destination of the piece.
        * team: The team string.
    Explanation:
    First check if the piece selected is from the correct team, then check if the move is legal.
    While checking if the move is legal, first check if the king is in danger, if the king is in danger, the move must save the king.
    Lastly, the move itself is validated.
*/
export const validateMove = (map: Array<Array<string>>, start: [number, number], destination: [number, number], team: string): boolean => {
    const piece = map[start[0]][start[1]]

    if ((team == "white" && !(piece >= 'A' && piece <= 'Z')) ||
        team == "black" && !(piece >= 'a' && piece <= 'z')) {
        return false
    }

    if (isCheck(movePiece(map, start, destination), team)) {
        return false
    }

    const pieceMoves = getLegalMoves(map,start)
    if(pieceMoves[destination[0]][destination[1]] == 1){
        return true
    }

    // Something went wrong if this is reached.
    return false;
}

/*
    Name: makeMove
    Creator: Minimal
    Variables:
        * fen: The fen string of the board map
        * start: The starting pieces' location.
        * destination: The destination of the piece.
        * team: The team string.
    Explanation:
    Check if the destination and start are within bounds, then validates the move,
    Change the fen string.
*/
export const makeMove = (fen: string, start: [number, number], destination: [number, number], team: string): string => {
    return "";
}