import { RotatingShape } from "./RotatingShape";
import { Coordinate } from "./types";

export class Tetromino {

    static readonly T_SHAPE = new Tetromino(4, 0, `.T.\nTTT\n...`);
    static readonly I_SHAPE = new Tetromino(2, 0, `.....\n.....\nIIII.\n.....\n.....`);
    static readonly O_SHAPE = new Tetromino(1, 1, `.OO\n.OO\n...`);

    readonly coordinates: Coordinate[];
    readonly orientations: RotatingShape[];
    readonly maxOrientations: number;
    readonly rotatingShape: RotatingShape;
    readonly currentOrientation: number;
    readonly shape: string;
    readonly symbol: string;

    constructor(maxOrientations: number, currentOrientation: number, shape: string, orientations?: RotatingShape[], coordinates?: Coordinate[]) {
        this.rotatingShape = new RotatingShape(shape);
        this.shape = this.rotatingShape.shape;
        this.coordinates = coordinates ? coordinates : this.parseCoordinates();
        this.maxOrientations = maxOrientations;
        this.orientations = orientations ? orientations : this.createOrientations(1, [this.rotatingShape]);
        this.currentOrientation = currentOrientation;
        this.symbol = this.parseSymbol();
    }

    private createOrientations(i: number, shapes: RotatingShape[]): RotatingShape[] {
        return (i >= this.maxOrientations || i > 4) ? shapes : this.createOrientations(i + 1, [...shapes, (shapes.pop() as RotatingShape).rotateRight()])
    }

    private scaleOrientation(orientation: number) {
        return (this.maxOrientations + orientation) % this.maxOrientations;
    }

    private parseSymbol(): string {
        const pattern = new RegExp('([\\w+])', 'gm');
        const match = pattern.exec(this.shape);
        return match ? match[0] : "X";
    }

    moveToMiddle(width: number) {
        const maxX = Math.max(...this.coordinates.map(coord => coord.x));
        const boardWidth = Math.floor(width / 2);
        return new Tetromino(this.maxOrientations, this.currentOrientation, this.shape, this.orientations, this.coordinates.map(({ x: oldX, y }) => ({ x: oldX + (boardWidth - maxX), y })));
    }

    moveToLeft() {
        return new Tetromino(this.maxOrientations, this.currentOrientation, this.shape, this.orientations, this.coordinates.map(({ x: oldX, y }) => ({ x: (oldX - 1), y })));
    }

    moveToRight() {
        return new Tetromino(this.maxOrientations, this.currentOrientation, this.shape, this.orientations, this.coordinates.map(({ x: oldX, y }) => ({ x: (oldX + 1), y })));
    }
    parseCoordinates(): Coordinate[] {
        const pattern = new RegExp('([\\w+])', 'gm');
        const splitted = this.shape.split("\n");
        const coordinates: Coordinate[] = [];
        splitted.forEach((line, index) => {
            let match;
            while ((match = pattern.exec(line)) !== null) {
                const coordinate: Coordinate = {
                    x: match.index,
                    y: index
                };
                coordinates.push(coordinate);
            }
        })
        return coordinates;
    }

    setCoordinates(coordinates: Coordinate[]): Tetromino {
        return new Tetromino(this.maxOrientations, this.currentOrientation, this.shape, this.orientations, coordinates);
    }

    fallDown(): Tetromino {
        return new Tetromino(this.maxOrientations, this.currentOrientation, this.shape, this.orientations, this.coordinates.map(({ x, y: oldY }) => ({ x, y: oldY + 1 })));
    }

    rotateRight(): Tetromino {
        const scaled = this.scaleOrientation(this.currentOrientation + 1);
        return new Tetromino(this.maxOrientations, scaled, this.orientations[scaled].shape, this.orientations);
    }

    rotateLeft(): Tetromino {
        const scaled = this.scaleOrientation(this.currentOrientation - 1);
        return new Tetromino(this.maxOrientations, scaled, this.orientations[scaled].shape, this.orientations);
    }


    toString(): string {
        return this.rotatingShape.toString();
    }
}

