import { RotatingShape } from "./RotatingShape";

export class Tetromino {

    static readonly T_SHAPE = new Tetromino(4, 0, `.T.\nTTT\n...`);
    static readonly I_SHAPE = new Tetromino(2, 0, `.....\n.....\nIIII.\n.....\n.....`)

    readonly orientations: RotatingShape[];
    readonly maxOrientations: number;

    readonly shape: RotatingShape;
    readonly currentOrientation: number;

    constructor(maxOrientations: number, currentOrientation: number, shape: string) {
        this.shape = new RotatingShape(shape);
        this.maxOrientations = maxOrientations;
        this.orientations = this.createOrientations(1, [this.shape]);
        this.currentOrientation = currentOrientation;
    }

    private createOrientations(i: number, shapes: RotatingShape[]): RotatingShape[] {
        return i == this.maxOrientations ? shapes : this.createOrientations(i + 1, [...shapes, (shapes.pop() as RotatingShape).rotateRight()])
    }

    private scaleOrientation(orientation: number) {
        return (this.maxOrientations + orientation) % this.maxOrientations;
    }

    rotateRight(): Tetromino {
        const scaled = this.scaleOrientation(this.currentOrientation + 1);
        return new Tetromino(this.maxOrientations, scaled, this.orientations[scaled].shape);
    }

    rotateLeft(): Tetromino {
        const scaled = this.scaleOrientation(this.currentOrientation - 1);
        return new Tetromino(this.maxOrientations, scaled, this.orientations[scaled].shape);
    }


    toString(): string {
        return this.shape.toString();
    }
}

