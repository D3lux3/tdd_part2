import { RotatingShape } from "./RotatingShape";

export class Tetromino {

    static readonly T_SHAPE = new Tetromino(`.T.\nTTT\n...`);
    static readonly I_SHAPE = new Tetromino(`.....\n.....\nIIII.\n.....\n.....`)


    readonly shape: RotatingShape;

    constructor(shape: string) {
        this.shape = new RotatingShape(shape);
    }

    rotateRight(): Tetromino {
        return new Tetromino(this.shape.rotateRight().shape)
    }

    rotateLeft(): Tetromino {
        return new Tetromino(this.shape.rotateLeft().shape)
    }


    toString(): string {
        return this.shape.toString();
    }
}

