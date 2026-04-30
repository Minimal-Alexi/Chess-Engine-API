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