import { v4 as uuidv4 } from 'uuid';
import { Tetromino } from './Tetromino';

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
    const filtered = new Map([...this.tetrominos].filter(([k, _]) => k != this.fallingBlockId));
    const filteredCoordinates = [...filtered.values()].map(val => val.coordinates).flat();
    const union = [...filteredCoordinates, ...tetromino.coordinates].map(({ x, y }) => `(${y},${x})`); // Coordinates to string, so that Set works.
    return tetromino.coordinates.filter((coordinate) => coordinate.y >= this.height).length === 0 && new Set(union).size === union.length
  }

  moveFallingToLeft(): void {
    const fallingBlock = this.getFallingTetromino();
    if (fallingBlock) {
      const movedBlockToLeft = fallingBlock.moveToLeft();
      this.tetrominos.set((this.fallingBlockId as string), movedBlockToLeft)
    }
  }

  moveFallingToRight(): void {
    const fallingBlock = this.getFallingTetromino();
    if (fallingBlock) {
      const movedBlockToRight = fallingBlock.moveToRight();
      this.tetrominos.set((this.fallingBlockId as string), movedBlockToRight)
    }
  }
  getFallingTetromino(): Tetromino | undefined {
    return this.fallingBlockId ? this.tetrominos.get(this.fallingBlockId) : undefined;
  }

  tick(): void {
    const fallingBlock = this.getFallingTetromino();
    if (fallingBlock) {
      const falledBlock = fallingBlock.fallDown();
      if (this.isSquareValid(falledBlock)) {
        this.tetrominos.set((this.fallingBlockId as string), falledBlock)
        return;
      }
      delete this.fallingBlockId;
    }
  }

  hasFalling(): boolean {
    return this.fallingBlockId !== undefined;
  }

  private toTetromino(block: string | Tetromino) {
    return typeof (block) === "string" ? new Tetromino(4, 1, block) : block;
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
