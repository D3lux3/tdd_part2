import { RotatingShape } from "./RotatingShape";

export class Tetromino {

    static readonly T_SHAPE = new Tetromino(4, 0, `.T.\nTTT\n...`);
    static readonly I_SHAPE = new Tetromino(2, 0, `.....\n.....\nIIII.\n.....\n.....`)

    readonly orientations: RotatingShape[];

    readonly shape: RotatingShape;
    readonly currentOrientation: number;

    constructor(maxOrientations: number, currentOrientation: number, shape: string) {
        this.shape = new RotatingShape(shape);
        this.orientations = this.createOrientations(1, [this.shape], maxOrientations);
        this.currentOrientation = currentOrientation;
    }

    private createOrientations(i: number, shapes: RotatingShape[], maxOrientations: number): RotatingShape[] {
        return i == maxOrientations ? shapes : this.createOrientations(i + 1, [...shapes, (shapes.pop() as RotatingShape).rotateRight()], maxOrientations)
    }

    private scaleOrientation(orientation: number) {
        return (this.orientations.length + orientation) % this.orientations.length
    }

    rotateRight(): Tetromino {
        const scaled = this.scaleOrientation(this.currentOrientation + 1);
        return new Tetromino(this.orientations.length, scaled, this.orientations[scaled].shape);
    }

    rotateLeft(): Tetromino {
        const scaled = this.scaleOrientation(this.currentOrientation - 1);
        return new Tetromino(this.orientations.length, scaled, this.orientations[scaled].shape);
    }


    toString(): string {
        return this.shape.toString();
    }
}

