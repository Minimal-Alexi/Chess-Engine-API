import { pointwiseMaximum } from "../../src/utils/matrixManipulation"

describe("Testing pointwiseMaximum function", () => {
    it("Should return the maximum at both positions", () => {
        const firstMatrix = [[0,5],[0,6]]
        const secondMatrix = [[7,3],[2,6]]
        expect(pointwiseMaximum(firstMatrix,secondMatrix)).toStrictEqual([[7,5],[2,6]])
    })
})
