import { v4 as uuidv4 } from 'uuid';

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

  tick(): void {
    if (this.fallingBlockId) {
      const block = this.blocks.get(this.fallingBlockId);
      if (block) {
        this.blocks.set(this.fallingBlockId, { ...block, location: { x: block.location.x, y: block.location.y + 1 } })
      }
    }
  }

  hasFalling(): boolean {
    return this.fallingBlockId !== undefined;
  }

  drop(block: string): void {
    if (!this.fallingBlockId) {
      const boardMiddlePoint = Math.floor(this.width / 2);
      const blockId = uuidv4();
      this.blocks.set(blockId, { block, location: { x: boardMiddlePoint, y: 0 } })
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
