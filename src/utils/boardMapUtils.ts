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
        if(i < size - 1){
            fen += ((emptyCount != 0) ? emptyCount.toString() + '/' : '/')
        }
        else{
            fen += ((emptyCount != 0) ? emptyCount.toString() : '')
        }
    }
    return fen;

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
    First check if the piece selected is from the correct team, check if the destination has a piece of the same team as the moving piece,
    then check if the move is legal.
*/
export const validateMove = (map : Array<Array<String>>, start: [number, number], destination: [number, number], team: String): boolean => {
    const piece = map[start[0]][start[1]]
    if((team == "white" && !(piece >= 'A' && piece <= 'Z')) || team == "black" && !(piece >= 'a' && piece <= 'z')){
        return false
    }
    return true;
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
    Code checks if the right team tried to move a chess piece, check if the destination and start are within bounds, then validates the move,
    changes the fen string.
*/
export const makeMove = (fen : String, start: [number, number], destination: [number, number], team: String): String => {
    return "";
}