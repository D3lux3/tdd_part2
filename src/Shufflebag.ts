import { Tetromino } from "./Tetromino"
export class Shufflebag {
    bagSize: number;
    bag: Tetromino[];

    constructor(bag: Tetromino[], bagSize?: number) {
        this.bagSize = bagSize || 10;
        this.bag = bag;
    }

    getTetrominos() {
        return [Tetromino.T_SHAPE, Tetromino.T_SHAPE, Tetromino.T_SHAPE, Tetromino.O_SHAPE, Tetromino.O_SHAPE, Tetromino.I_SHAPE]
    }
}