import { Tetromino } from "./Tetromino"
export class Shufflebag {
    bagSize: number;

    constructor(bagSize?: number) {
        this.bagSize = bagSize || 10;
    }

    getTetrominos() {
        return [Tetromino.T_SHAPE, Tetromino.T_SHAPE, Tetromino.T_SHAPE, Tetromino.O_SHAPE, Tetromino.O_SHAPE, Tetromino.I_SHAPE]
    }
}