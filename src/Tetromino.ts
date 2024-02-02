import { RotatingShape } from "./RotatingShape";

export class Tetromino {

    static readonly T_SHAPE = new Tetromino(`.T.\nTTT\n...`);

    readonly shape: RotatingShape;

    constructor(shape: string) {
        this.shape = new RotatingShape(shape);
    }

    toString(): string {
        return this.shape.toString();
    }
}

