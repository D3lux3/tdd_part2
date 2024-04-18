import { Tetromino } from './Tetromino';
import { Coordinate } from './types';

export class Board {
  width: number;
  height: number;
  blocksOnBoard: Map<Coordinate, string>;
  fallingBlock: Tetromino | undefined;

  constructor(width: number, height: number, boardState?: string) {
    this.width = width;
    this.height = height;
    this.blocksOnBoard = new Map();
    if (boardState) {
      this.initBoardState(boardState);
    }
  }

  private initBoardState(boardState: string) {
    const boardArray = boardState.split('\n');
    boardArray.forEach((row, y) => {
      row.split('').forEach((symbol, x) => {
        if (symbol !== '.') {
          this.blocksOnBoard.set({ x, y }, symbol);
        }
      });
    });
  }

  private isCoordinatesValid(coordinate: Coordinate): boolean {
    return coordinate.y < this.height && coordinate.y >= 0 && coordinate.x >= 0 && coordinate.x < this.width
  }

  private isSquareValid(tetromino: Tetromino): boolean {
    const union = [...this.blocksOnBoard.keys(), ...tetromino.coordinates].map(({ x, y }) => `(${y},${x})`); // Coordinates to string, so that Set works.
    return tetromino.coordinates.filter((coordinate) => !this.isCoordinatesValid(coordinate)).length === 0 && new Set(union).size === union.length
  }

  private moveFalling(movedBlock: Tetromino): boolean {
    if (this.isSquareValid(movedBlock)) {
      this.fallingBlock = movedBlock;
      return true;
    }
    return false;
  }

  moveFallingToLeft(): void {
    const fallingBlock = this.getFallingTetromino();
    if (fallingBlock) {
      const movedBlockToLeft = fallingBlock.moveToLeft();
      this.moveFalling(movedBlockToLeft);
    }
  }

  moveFallingToRight(): void {
    const fallingBlock = this.getFallingTetromino();
    if (fallingBlock) {
      const movedBlockToRight = fallingBlock.moveToRight();
      this.moveFalling(movedBlockToRight);
    }
  }

  moveFallingToDown(): boolean {
    const fallingBlock = this.getFallingTetromino();
    if (fallingBlock) {
      const movedBlockToDown = fallingBlock.moveDown();
      return this.moveFalling(movedBlockToDown);
    }
    return false;
  }

  getFallingTetromino(): Tetromino | undefined {
    return this.fallingBlock;
  }

  tick(): void {
    const isBlockFalling = this.moveFallingToDown();
    if (!isBlockFalling) {
      this.addFallingToBlocksOnBoard();
      this.clearFullLines();
    }
  }

  hasFalling(): boolean {
    return Boolean(this.fallingBlock);
  }

  private clearFullLines2() {
    const blocksOnBoardKeys = [...this.blocksOnBoard.keys()];

    const clearedLines = new Map([...this.blocksOnBoard].filter(([coordinate, _]) => {
      const isLineFull = blocksOnBoardKeys.filter(({ y }) => y === coordinate.y).length === this.width;
      return !isLineFull;
    }));
    const clearedLinesCount = (blocksOnBoardKeys.length - clearedLines.size) / this.width;
    for (let i = 0; i < clearedLinesCount; i++) {
      for (const [coordinate, symbol] of [...clearedLines]) {
        const newCoords = { ...coordinate, y: coordinate.y + 1 };
        if (clearedLines.get(newCoords) === undefined && this.isCoordinatesValid(newCoords)) {
          clearedLines.set(newCoords, symbol)
          clearedLines.delete(coordinate);
        }
      }
    }
    this.blocksOnBoard = new Map(clearedLines);
  }

  clearFullLines() {
    if (!this.fallingBlock) {
      const blocksOnBoardKeys = [...this.blocksOnBoard.keys()];
      const fullRows = blocksOnBoardKeys.reduce((acc: { [key: number]: number }, coordinate) => {
        acc[coordinate.y] = (acc[coordinate.y] || 0) + 1;
        return acc;
      }, {});
      this.blocksOnBoard = new Map([...this.blocksOnBoard].filter(([coordinate, _]) => fullRows[coordinate.y] !== this.width));
    }
  }

  private addFallingToBlocksOnBoard() {
    if (this.fallingBlock) {
      const symbol = this.fallingBlock.symbol;
      const fallingCoordinates = new Map(this.fallingBlock.coordinates.map(coord => [coord, symbol]));
      this.blocksOnBoard = new Map([...this.blocksOnBoard, ...fallingCoordinates])
      delete this.fallingBlock;
    }
  }

  private toTetromino(block: string | Tetromino) {
    return typeof (block) === "string" ? new Tetromino(4, 0, block, { x: 0, y: 0 }, [[{ x: 2, y: 0 }]]) : block;
  }

  rotateFallingBlockRight() {
    const fallingBlock = this.getFallingTetromino();
    if (fallingBlock) {
      if (!this.moveFalling(fallingBlock.rotateRight())) {
        const movedLeftAndRotated = fallingBlock.moveToLeft().rotateRight();
        if (!this.moveFalling(movedLeftAndRotated)) {
          const movedRightAndRotated = fallingBlock.moveToRight().rotateRight();
          this.moveFalling(movedRightAndRotated);
        }
      }
    }
  }

  rotateFallingBlockLeft() {
    const fallingBlock = this.getFallingTetromino();
    if (fallingBlock) {
      if (!this.moveFalling(fallingBlock.rotateLeft())) {
        const movedLeftAndRotated = fallingBlock.moveToLeft().rotateLeft();
        if (!this.moveFalling(movedLeftAndRotated)) {
          const movedRightAndRotated = fallingBlock.moveToRight().rotateLeft();
          this.moveFalling(movedRightAndRotated);
        }
      }
    }
  }

  drop(block: string | Tetromino): void {
    if (!this.fallingBlock) {
      const converted = this.toTetromino(block).moveToMiddle(this.width);
      this.fallingBlock = converted;
      return;
    }
    throw new Error("already falling");
  }

  toString() {
    const emptyBoard = (".".repeat(this.width) + "\n").repeat(this.height);
    const boardArray = emptyBoard.split('');
    if (this.fallingBlock) {
      for (const { x, y } of this.fallingBlock.coordinates) {
        const blockIndexOnBoard = (y * (this.width + 1)) + x;
        boardArray[blockIndexOnBoard] = this.fallingBlock.symbol;
      }
    }
    for (const [coordinate, symbol] of this.blocksOnBoard) {
      const blockIndexOnBoard = (coordinate.y * (this.width + 1)) + coordinate.x;
      boardArray[blockIndexOnBoard] = symbol;
    }
    return boardArray.join("");
  }
}
