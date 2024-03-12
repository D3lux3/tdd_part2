import { RotatingShape } from "./RotatingShape";
import { Shape } from "./Shape";
import { Coordinate } from "./types";

export class Tetromino2 {

    static readonly T_SHAPE = new Tetromino2(4, 0, `....\nTTT.\n.T..\n....`, Shape.T_SHAPE.symbol, Shape.T_SHAPE.new_orientations[0], undefined, undefined, Object.values(Shape.T_SHAPE.new_orientations));
    static readonly I_SHAPE = new Tetromino2(2, 0, `.....\n.....\nIIII.\n.....\n.....`, Shape.I_SHAPE.symbol, Shape.I_SHAPE.old_orientations[0]);
    static readonly O_SHAPE = new Tetromino2(1, 1, `.OO\n.OO\n...`, Shape.O_SHAPE.symbol, Shape.O_SHAPE.orientations[0]);

    readonly coordinates: Coordinate[];
    readonly orientations: RotatingShape[];
    readonly orientations2: Coordinate[][];
    readonly maxOrientations: number;
    readonly origin: Coordinate;
    readonly currentOrientation: number;
    readonly shape: string;
    readonly symbol: string;

    constructor(maxOrientations: number, currentOrientation: number, shape: string, symbol: string, coordinates: Coordinate[], orientations?: RotatingShape[], origin?: Coordinate, orientations2?: Coordinate[][]) {
        this.coordinates = coordinates;
        this.orientations2 = orientations2 ?? [];
        this.maxOrientations = maxOrientations;
        //this.orientations = orientations ? orientations : this.createOrientations(1, [ts]);
        this.currentOrientation = currentOrientation;
        this.symbol = symbol;
        this.origin = origin || { x: 0, y: 0 };
        this.shape = this.createShape();
    }

    private createShape() {
        const emptyBoard = (".".repeat(4) + "\n").repeat(4);
        const boardArray = emptyBoard.split('');
        for (const { x, y } of this.coordinates) {
            const blockIndexOnBoard = (y * (4 + 1)) + x;
            boardArray[blockIndexOnBoard] = this.symbol;
        }
        return boardArray.join("");
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
        return new Tetromino2(this.maxOrientations, this.currentOrientation, this.shape, this.symbol, this.coordinates.map(({ x: oldX, y }) => ({ x: oldX + (boardWidth - maxX), y })), this.orientations);
    }

    moveToLeft() {
        return new Tetromino2(this.maxOrientations, this.currentOrientation, this.shape, this.symbol, this.coordinates.map(({ x: oldX, y }) => ({ x: (oldX - 1), y })), this.orientations);
    }

    moveToRight() {
        return new Tetromino2(this.maxOrientations, this.currentOrientation, this.shape, this.symbol, this.coordinates.map(({ x: oldX, y }) => ({ x: (oldX + 1), y })), this.orientations);
    }

    setCoordinates(coordinates: Coordinate[]): Tetromino2 {
        return new Tetromino2(this.maxOrientations, this.currentOrientation, this.shape, this.symbol, coordinates, this.orientations);
    }

    moveDown(): Tetromino2 {
        return new Tetromino2(this.maxOrientations, this.currentOrientation, this.shape, this.symbol, this.coordinates.map(({ x, y: oldY }) => ({ x, y: oldY + 1 })), this.orientations);
    }

    getCenter(): Coordinate {
        const centerX = this.coordinates.reduce((sum, coord) => sum + coord.x, 0) / this.coordinates.length;
        const centerY = this.coordinates.reduce((sum, coord) => sum + coord.y, 0) / this.coordinates.length;
        return { x: Math.round(centerX), y: Math.round(centerY) };
    }

    rotateRight(): Tetromino2 {
        const scaled = this.scaleOrientation(this.currentOrientation + 1);
        const pivot = this.getCenter();
        const rotatedCoordinates = this.coordinates.map(({ x, y }) => ({
            x: pivot.x + (pivot.y - y),
            y: pivot.y + (x - pivot.x)
        }));
        return new Tetromino2(this.maxOrientations, scaled, this.orientations[scaled].shape, this.symbol, rotatedCoordinates, this.orientations);
    }

    rotateLeft(): Tetromino2 {
        const scaled = this.scaleOrientation(this.currentOrientation - 1);
        return new Tetromino2(this.maxOrientations, scaled, '', this.symbol, this.orientations2[scaled], undefined, this.origin, this.orientations2);
    }

    toString(): string {
        return this.shape;
    }
}

