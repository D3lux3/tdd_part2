import { v4 as uuidv4 } from 'uuid';
import { Tetromino } from './Tetromino';
import { Coordinate } from './types';

interface Block {
  block: Tetromino,
  location: Coordinate[]
}

export class Board {
  width: number;
  height: number;
  blocks: Map<string, Tetromino>;
  fallingBlockId: string | undefined

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.blocks = new Map();
  }

  private isSquareValid(x: number, y: number): boolean {
    return y < this.height && [...this.blocks.values()].map((block) => block.coordinates[0]).filter(({ x: blockX, y: blockY }) => blockX === x && blockY === y).length === 0;
  }

  getFallingBlock(): Tetromino | undefined {
    return this.fallingBlockId ? this.blocks.get(this.fallingBlockId) : undefined;
  }

  tick(): void {
    const fallingBlock = this.getFallingBlock();
    if (fallingBlock) {
      const newYCoord = fallingBlock.coordinates[0].y + 1;
      if (this.isSquareValid(fallingBlock.coordinates[0].x, newYCoord)) {
        this.blocks.set((this.fallingBlockId as string), fallingBlock.setCoordinates([{ x: fallingBlock.coordinates[0].x, y: newYCoord }]))
        return;
      }
      delete this.fallingBlockId;
    }
  }

  hasFalling(): boolean {
    return this.fallingBlockId !== undefined;
  }

  private tetrominoConverter(block: string | Tetromino) {
    return typeof (block) === "string" ? new Tetromino(4, 1, block) : block;
  }

  drop(block: string | Tetromino): void {
    if (!this.fallingBlockId) {
      const blockId = uuidv4();
      const startingCoordinates: Coordinate[] = [{ x: Math.floor(this.width / 2), y: 0 }]
      const converted = this.tetrominoConverter(block).setCoordinates(startingCoordinates);
      this.blocks.set(blockId, converted)
      this.fallingBlockId = blockId;
      return;
    }
    throw new Error("already falling");
  }

  toString() {
    const emptyBoard = (".".repeat(this.width) + "\n").repeat(this.height);
    return [...this.blocks.values()].reduce((b, block) => {
      const { x, y } = block.coordinates[0];
      const blockIndexOnBoard = (y * (this.width + 1)) + x;
      return b.substring(0, blockIndexOnBoard) + `${block.shape}` + b.substring(blockIndexOnBoard + 1);
    }, emptyBoard);
  }
}
