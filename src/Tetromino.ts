import { Shape } from "./Shape";
import { Coordinate } from "./types";

export class Tetromino {

    static readonly T_SHAPE = new Tetromino(4, 0, Shape.T_SHAPE.symbol, { x: 0, y: 0 }, Object.values(Shape.T_SHAPE.orientations));
    static readonly I_SHAPE = new Tetromino(2, 0, Shape.I_SHAPE.symbol, { x: 0, y: 0 }, Object.values(Shape.I_SHAPE.orientations));
    static readonly O_SHAPE = new Tetromino(1, 0, Shape.O_SHAPE.symbol, { x: 0, y: 0 }, Object.values(Shape.O_SHAPE.orientations));

    readonly coordinates: Coordinate[];
    readonly orientations: Coordinate[][];
    readonly maxOrientations: number;
    readonly origin: Coordinate;
    readonly currentOrientation: number;
    readonly symbol: string;

    constructor(maxOrientations: number, currentOrientation: number, symbol: string, origin: Coordinate, orientations: Coordinate[][]) {
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
        const boardWidth = Math.floor(width / 2);
        return new Tetromino(this.maxOrientations, this.currentOrientation, this.symbol, { x: (boardWidth - 2), y: 0 }, this.orientations);
    }

    moveToLeft() {
        return new Tetromino(this.maxOrientations, this.currentOrientation, this.symbol, { x: this.origin.x - 1, y: this.origin.y }, this.orientations);
    }

    moveToRight() {
        return new Tetromino(this.maxOrientations, this.currentOrientation, this.symbol, { x: this.origin.x + 1, y: this.origin.y }, this.orientations);
    }

    moveDown(): Tetromino {
        return new Tetromino(this.maxOrientations, this.currentOrientation, this.symbol, { x: this.origin.x, y: this.origin.y + 1 }, this.orientations);
    }

    rotateRight(): Tetromino {
        const scaled = this.scaleOrientation(this.currentOrientation + 1);
        return new Tetromino(this.maxOrientations, scaled, this.symbol, this.origin, this.orientations);
    }

    rotateLeft(): Tetromino {
        const scaled = this.scaleOrientation(this.currentOrientation - 1);
        return new Tetromino(this.maxOrientations, scaled, this.symbol, this.origin, this.orientations);
    }

    toString(): string {
        return this.createShape();
    }
}

