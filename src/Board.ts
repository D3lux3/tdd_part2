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
  fallingBlock: string | undefined

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.blocks = new Map();
  }

  tick(): void {
    this.blocks = this.blocks.map((block) => { return { ...block, location: { x: block.location.x, y: block.location.y + 1 } } })
  }

  hasFalling(): boolean {
    return this.fallingBlock !== undefined;
  }

  drop(block: string): void {
    if (!this.fallingBlock) {
      const boardMiddlePoint = Math.floor(this.width / 2);
      const blockId = uuidv4();
      this.blocks.set(blockId, { block, location: { x: boardMiddlePoint, y: 0 } })
      this.fallingBlock = blockId;
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
