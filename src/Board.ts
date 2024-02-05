import { v4 as uuidv4 } from 'uuid';
import { Tetromino } from './Tetromino';
import { Coordinate } from './types';

export class Board {
  width: number;
  height: number;
  tetrominos: Map<string, Tetromino>;
  fallingBlockId: string | undefined

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.tetrominos = new Map();
  }

  private isSquareValid(tetromino: Tetromino): boolean {
    const yCoordinates = [...this.tetrominos.values()].map((block) => block.coordinates).flat().map((coordinate) => coordinate.y)
    return tetromino.coordinates.filter((coordinate) => coordinate.y >= this.height).length === 0 &&
      Math.max(...yCoordinates) !== Math.max(...tetromino.coordinates.map(coordinate => coordinate.y));
  }

  getFallingTetromino(): Tetromino | undefined {
    return this.fallingBlockId ? this.tetrominos.get(this.fallingBlockId) : undefined;
  }

  tick(): void {
    const fallingBlock = this.getFallingTetromino();
    if (fallingBlock) {
      if (this.isSquareValid(fallingBlock.fallDown())) {
        this.tetrominos.set((this.fallingBlockId as string), fallingBlock.fallDown())
        return;
      }
      delete this.fallingBlockId;
    }
  }

  hasFalling(): boolean {
    return this.fallingBlockId !== undefined;
  }

  private toTetromino(block: string | Tetromino) {
    return typeof (block) === "string" ? new Tetromino(4, 1, block, undefined) : block;
  }

  drop(block: string | Tetromino): void {
    if (!this.fallingBlockId) {
      const blockId = uuidv4();
      const converted = this.toTetromino(block).moveToMiddle(this.width);
      this.tetrominos.set(blockId, converted);
      this.fallingBlockId = blockId;
      return;
    }
    throw new Error("already falling");
  }

  toString() {
    const emptyBoard = (".".repeat(this.width) + "\n").repeat(this.height);
    const boardArray = emptyBoard.split('');
    for (const block of this.tetrominos.values()) {
      for (const { x, y } of block.coordinates) {
        const blockIndexOnBoard = (y * (this.width + 1)) + x;
        boardArray[blockIndexOnBoard] = block.symbol;
      }
    }
    return boardArray.join("");
  }
}
