import { Tetromino } from "./Tetromino"
export class Shufflebag {

    static readonly T_SHAPE_COUNT = 2;
    static readonly O_SHAPE_COUNT = 3;
    static readonly I_SHAPE_COUNT = 5;

    bagSize: number;
    bag: Tetromino[];

    constructor(bag?: Tetromino[], bagSize?: number) {
        this.bagSize = bagSize || 10;
        this.bag = bag || this.generateTetrominos();
    }

    private generateTetrominos() {
        const t_shapes = Math.floor(this.bagSize / Shufflebag.T_SHAPE_COUNT)
        const o_shapes = Math.floor(this.bagSize / Shufflebag.O_SHAPE_COUNT)
        const i_shapes = Math.floor(this.bagSize / Shufflebag.I_SHAPE_COUNT)
        return [...Array(t_shapes).fill(Tetromino.T_SHAPE), ...Array(o_shapes).fill(Tetromino.O_SHAPE), ...Array(i_shapes).fill(Tetromino.I_SHAPE)]
    }

    getTetrominos() {
        return this.bag
    }
}