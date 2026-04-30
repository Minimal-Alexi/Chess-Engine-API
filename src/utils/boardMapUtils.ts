const createBoardMap = (fen: string): Array<Array<string>> | null => {
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
}
export default createBoardMap;