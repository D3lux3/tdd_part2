import { v4 as uuidv4 } from 'uuid';
import { Tetromino } from './Tetromino';
import { Coordinate } from './types';

export class Board {
  width: number;
  height: number;
  tetrominos: Map<string, Tetromino>;
  fallingBlockId: string | undefined;
  blocksOnBoard: Map<Coordinate, string>;
  fallingBlock: Tetromino | undefined;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.tetrominos = new Map();
    this.blocksOnBoard = new Map();
  }

  private isSquareValid(tetromino: Tetromino): boolean {
    const filtered = new Map([...this.tetrominos].filter(([k, _]) => k != this.fallingBlockId));
    const filteredCoordinates = [...filtered.values()].map(val => val.coordinates).flat();
    const union = [...filteredCoordinates, ...tetromino.coordinates].map(({ x, y }) => `(${y},${x})`); // Coordinates to string, so that Set works.
    return tetromino.coordinates.filter((coordinate) => coordinate.y >= this.height || coordinate.y < 0 || coordinate.x < 0 || coordinate.x >= this.width).length === 0 && new Set(union).size === union.length
  }

  private moveFalling(movedBlock: Tetromino): boolean {
    if (this.isSquareValid(movedBlock)) {
      this.tetrominos.set((this.fallingBlockId as string), movedBlock);
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
    return this.fallingBlockId ? this.tetrominos.get(this.fallingBlockId) : undefined;
  }

  tick(): void {
    const isBlockFalling = this.moveFallingToDown();
    if (!isBlockFalling) {
      if (this.fallingBlock) {
        this.fallingBlock.coordinates.forEach(({ x, y }) => {
          this.blocksOnBoard.set({ x, y }, this.fallingBlock?.symbol as string);
        });
      }
      delete this.fallingBlockId;
    }
  }

  hasFalling(): boolean {
    return this.fallingBlockId !== undefined;
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
