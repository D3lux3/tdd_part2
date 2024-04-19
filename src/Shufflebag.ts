import { Tetromino } from "./Tetromino"
import { v4 as uuid } from 'uuid';
export class Shufflebag {

    static readonly T_SHAPE_COUNT = 2;
    static readonly O_SHAPE_COUNT = 3;
    static readonly I_SHAPE_COUNT = 5;

    bagSize: number;
    bag: Tetromino[];
    id: string;

    constructor(id?: string, bag?: Tetromino[], bagSize?: number) {
        this.bagSize = bagSize || 10;
        this.id = id || "";
        this.bag =
            bag
                ? bag.length > 0 ? bag : this.generateTetrominos()
                : this.generateTetrominos(id);
    }

    private generateTetrominos(id?: string) {
        const t_shapes = Math.floor(this.bagSize / Shufflebag.T_SHAPE_COUNT)
        const o_shapes = Math.floor(this.bagSize / Shufflebag.O_SHAPE_COUNT)
        const i_shapes = Math.floor(this.bagSize / Shufflebag.I_SHAPE_COUNT)
        this.id = id || uuid();
        return [...Array(t_shapes).fill(Tetromino.T_SHAPE), ...Array(o_shapes).fill(Tetromino.O_SHAPE), ...Array(i_shapes).fill(Tetromino.I_SHAPE)].map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);;
    }

    pull() {
        const popped = this.bag.pop();
        return [popped, new Shufflebag(this.id, this.bag, this.bagSize)]
    }

    getTetrominos() {
        return this.bag
    }
}