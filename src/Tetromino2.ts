import { Shape } from "./Shape";
import { Coordinate } from "./types";

export class Tetromino2 {

    static readonly T_SHAPE = new Tetromino2(4, 0, Shape.T_SHAPE.symbol, Shape.T_SHAPE.new_orientations[0], { x: 0, y: 0 }, Object.values(Shape.T_SHAPE.new_orientations));
    static readonly I_SHAPE = new Tetromino2(2, 0, Shape.I_SHAPE.symbol, Shape.I_SHAPE.new_orientations[0], { x: 0, y: 0 }, Object.values(Shape.I_SHAPE.new_orientations));
    static readonly O_SHAPE = new Tetromino2(1, 0, Shape.O_SHAPE.symbol, Shape.O_SHAPE.new_orientations[0], { x: 0, y: 0 }, Object.values(Shape.O_SHAPE.new_orientations));

    readonly coordinates: Coordinate[];
    readonly orientations: Coordinate[][];
    readonly maxOrientations: number;
    readonly origin: Coordinate;
    readonly currentOrientation: number;
    readonly symbol: string;

    constructor(maxOrientations: number, currentOrientation: number, symbol: string, coordinates: Coordinate[], origin: Coordinate, orientations: Coordinate[][]) {
        this.coordinates = orientations[currentOrientation].map(({ x, y }) => ({ x: x + origin.x, y: y + origin.y }));
        this.orientations = orientations ?? [];
        this.maxOrientations = maxOrientations;
        this.currentOrientation = currentOrientation;
        this.symbol = symbol;
        this.origin = origin;
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

    private scaleOrientation(orientation: number) {
        return (this.maxOrientations + orientation) % this.maxOrientations;
    }

    moveToMiddle(width: number) {
        const maxX = Math.max(...this.coordinates.map(coord => coord.x));
        const boardWidth = Math.floor(width / 2);
        return new Tetromino2(this.maxOrientations, this.currentOrientation, this.symbol, this.coordinates.map(({ x: oldX, y }) => ({ x: oldX + (boardWidth - maxX), y })), { x: 0, y: 0 }, this.orientations);
    }

    moveToLeft() {
        return new Tetromino2(this.maxOrientations, this.currentOrientation, this.symbol, this.coordinates.map(({ x: oldX, y }) => ({ x: (oldX - 1), y })), { x: 0, y: 0 }, this.orientations);
    }

    moveToRight() {
        return new Tetromino2(this.maxOrientations, this.currentOrientation, this.symbol, this.coordinates.map(({ x: oldX, y }) => ({ x: (oldX + 1), y })), { x: 0, y: 0 }, this.orientations);
    }

    setCoordinates(coordinates: Coordinate[]): Tetromino2 {
        return new Tetromino2(this.maxOrientations, this.currentOrientation, this.symbol, coordinates, { x: 0, y: 0 }, this.orientations);
    }

    moveDown(): Tetromino2 {
        return new Tetromino2(this.maxOrientations, this.currentOrientation, this.symbol, this.coordinates.map(({ x, y: oldY }) => ({ x, y: oldY + 1 })), { x: 0, y: 0 }, this.orientations);
    }

    rotateRight(): Tetromino2 {
        const scaled = this.scaleOrientation(this.currentOrientation + 1);
        return new Tetromino2(this.maxOrientations, scaled, this.symbol, this.orientations[scaled], this.origin, this.orientations);
    }

    rotateLeft(): Tetromino2 {
        const scaled = this.scaleOrientation(this.currentOrientation - 1);
        return new Tetromino2(this.maxOrientations, scaled, this.symbol, this.orientations[scaled], this.origin, this.orientations);
    }

    toString(): string {
        return this.createShape();
    }
}

