// IMPORTANT: The input is validated before it is put into the function. Can't afford adding error handling to this function.
export const pointwiseMaximum = (firstMatrix:Array<Array<number>>, secondMatrix:Array<Array<number>>):Array<Array<number>> => {
    let matrix = firstMatrix
    for(let i = 0; i < secondMatrix.length; i++){
        for(let j = 0; j < secondMatrix.length; j++){
            matrix[i][j] = Math.max(matrix[i][j],secondMatrix[i][j])
        }
    }
    return matrix
}