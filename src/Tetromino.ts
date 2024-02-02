import { RotatingShape } from "./RotatingShape";

export class Tetromino {

    static readonly T_SHAPE = new Tetromino(4, `.T.\nTTT\n...`);
    static readonly I_SHAPE = new Tetromino(2, `.....\n.....\nIIII.\n.....\n.....`)

    readonly orientations: number;
    readonly shape: RotatingShape;

    constructor(orientations: number, shape: string) {
        this.shape = new RotatingShape(shape);
        this.orientations = orientations;
    }

    rotateRight(): Tetromino {
        return new Tetromino(this.orientations, this.shape.rotateRight().shape)
    }

    rotateLeft(): Tetromino {
        return new Tetromino(this.orientations, this.shape.rotateLeft().shape);
    }


    toString(): string {
        return this.shape.toString();
    }
}

