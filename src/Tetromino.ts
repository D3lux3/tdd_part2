import { RotatingShape } from "./RotatingShape";
import { Shape } from "./Shape";
import { Coordinate } from "./types";

export class Tetromino {

    static readonly T_SHAPE = new Tetromino(4, 0, `.T.\nTTT\n...`, Shape.T_SHAPE.symbol, undefined, Shape.T_SHAPE.old_orientations[0]);
    static readonly I_SHAPE = new Tetromino(2, 0, `.....\n.....\nIIII.\n.....\n.....`, Shape.I_SHAPE.symbol, undefined, Shape.I_SHAPE.old_orientations[0]);
    static readonly O_SHAPE = new Tetromino(1, 1, `.OO\n.OO\n...`, Shape.O_SHAPE.symbol, undefined, Shape.O_SHAPE.orientations[0]);

    readonly coordinates: Coordinate[];
    readonly orientations: RotatingShape[];
    readonly maxOrientations: number;
    readonly rotatingShape: RotatingShape;
    readonly currentOrientation: number;
    readonly shape: string;
    readonly symbol: string;

    constructor(maxOrientations: number, currentOrientation: number, shape: string, symbol: string, orientations?: RotatingShape[], coordinates?: Coordinate[]) {
        this.rotatingShape = new RotatingShape(shape);
        this.shape = this.rotatingShape.shape;
        this.coordinates = coordinates ? coordinates : [{ x: 0, y: 0 }];
        this.maxOrientations = maxOrientations;
        this.orientations = orientations ? orientations : this.createOrientations(1, [this.rotatingShape]);
        this.currentOrientation = currentOrientation;
        this.symbol = symbol;
    }

    private createOrientations(i: number, shapes: RotatingShape[]): RotatingShape[] {
        return (i >= this.maxOrientations || i > 4) ? shapes : this.createOrientations(i + 1, [...shapes, (shapes.pop() as RotatingShape).rotateRight()])
    }

    private scaleOrientation(orientation: number) {
        return (this.maxOrientations + orientation) % this.maxOrientations;
    }

    moveToMiddle(width: number) {
        const maxX = Math.max(...this.coordinates.map(coord => coord.x));
        const boardWidth = Math.floor(width / 2);
        return new Tetromino(this.maxOrientations, this.currentOrientation, this.shape, this.symbol, this.orientations, this.coordinates.map(({ x: oldX, y }) => ({ x: oldX + (boardWidth - maxX), y })));
    }

    moveToLeft() {
        return new Tetromino(this.maxOrientations, this.currentOrientation, this.shape, this.symbol, this.orientations, this.coordinates.map(({ x: oldX, y }) => ({ x: (oldX - 1), y })));
    }

    moveToRight() {
        return new Tetromino(this.maxOrientations, this.currentOrientation, this.shape, this.symbol, this.orientations, this.coordinates.map(({ x: oldX, y }) => ({ x: (oldX + 1), y })));
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
        return new Tetromino(this.maxOrientations, this.currentOrientation, this.shape, this.symbol, this.orientations, coordinates);
    }

    moveDown(): Tetromino {
        return new Tetromino(this.maxOrientations, this.currentOrientation, this.shape, this.symbol, this.orientations, this.coordinates.map(({ x, y: oldY }) => ({ x, y: oldY + 1 })));
    }

    getCenter(): Coordinate {
        const centerX = this.coordinates.reduce((sum, coord) => sum + coord.x, 0) / this.coordinates.length;
        const centerY = this.coordinates.reduce((sum, coord) => sum + coord.y, 0) / this.coordinates.length;
        return { x: Math.round(centerX), y: Math.round(centerY) };
    }

    rotateRight(): Tetromino {
        const scaled = this.scaleOrientation(this.currentOrientation + 1);
        const pivot = this.getCenter();
        const rotatedCoordinates = this.coordinates.map(({ x, y }) => ({
            x: pivot.x + (pivot.y - y),
            y: pivot.y + (x - pivot.x)
        }));
        return new Tetromino(this.maxOrientations, scaled, this.orientations[scaled].shape, this.symbol, this.orientations, rotatedCoordinates);
    }

    rotateLeft(): Tetromino {
        const scaled = this.scaleOrientation(this.currentOrientation - 1);
        const pivot = this.getCenter();
        const rotatedCoordinates = this.coordinates.map(({ x, y }) => ({
            x: pivot.x - (pivot.y - y),
            y: pivot.y - (x - pivot.x)
        }));
        return new Tetromino(this.maxOrientations, scaled, this.orientations[scaled].shape, this.symbol, this.orientations, rotatedCoordinates);
    }

    toString(): string {
        return this.rotatingShape.toString();
    }
}

