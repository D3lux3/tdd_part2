import { Tetromino } from "./Tetromino"
export class Shufflebag {

    constructor() {

    }

    getTetrominos() {
        return [Tetromino.T_SHAPE, Tetromino.T_SHAPE, Tetromino.T_SHAPE, Tetromino.O_SHAPE, Tetromino.O_SHAPE, Tetromino.I_SHAPE]
    }
}