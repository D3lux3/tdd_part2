import { v4 as uuidv4 } from 'uuid';
import { Tetromino } from './Tetromino';

interface Block {
  block: string,
  location: {
    x: number,
    y: number
  }
}

export class Board {
  width: number;
  height: number;
  blocks: Map<string, Block>;
  fallingBlockId: string | undefined

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.blocks = new Map();
  }

  private isSquareValid(x: number, y: number): boolean {
    return y < this.height && [...this.blocks.values()].filter(({ location: { x: blockX, y: blockY } }) => blockX === x && blockY === y).length === 0;
  }

  getFallingBlock(): Block | undefined {
    return this.fallingBlockId ? this.blocks.get(this.fallingBlockId) : undefined;
  }

  tick(): void {
    const fallingBlock = this.getFallingBlock();
    if (fallingBlock) {
      const newYCoord = fallingBlock.location.y + 1;
      if (this.isSquareValid(fallingBlock.location.x, newYCoord)) {
        this.blocks.set((this.fallingBlockId as string), { ...fallingBlock, location: { x: fallingBlock.location.x, y: newYCoord } })
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
      const boardMiddlePoint = Math.floor(this.width / 2);
      const blockId = uuidv4();
      const converted = this.tetrominoConverter(block);
      this.blocks.set(blockId, { block: converted.shape.shape, location: { x: boardMiddlePoint, y: 0 } })
      this.fallingBlockId = blockId;
      return;
    }
    throw new Error("already falling");
  }

  toString() {
    const emptyBoard = (".".repeat(this.width) + "\n").repeat(this.height);
    return [...this.blocks.values()].reduce((b, block) => {
      const { x, y } = block.location;
      const blockIndexOnBoard = (y * (this.width + 1)) + x;
      return b.substring(0, blockIndexOnBoard) + `${block.block}` + b.substring(blockIndexOnBoard + 1);
    }, emptyBoard);
  }
}
