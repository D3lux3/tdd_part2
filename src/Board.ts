
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
  blocks: Block[];

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.blocks = [];
  }

  tick(): void {
    this.blocks = this.blocks.map((block) => { return { ...block, location: { x: block.location.x, y: block.location.y + 1 } } })
  }

  drop(block: string): void {
    const boardMiddlePoint = Math.floor(this.width / 2);
    const newBlock = { block, location: { x: boardMiddlePoint, y: 0 } };
    this.blocks = [newBlock, ...this.blocks];
  }

  toString() {
    const emptyBoard = (".".repeat(this.width) + "\n").repeat(this.height);
    return this.blocks.reduce((b, block) => {
      const { x, y } = block.location;
      const blockIndexOnBoard = (y * (this.width + 1)) + x;
      return b.substring(0, blockIndexOnBoard) + `${block.block}` + b.substring(blockIndexOnBoard + 1);
    }, emptyBoard);
  }
}
