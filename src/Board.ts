
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

  drop(block: string): void {
    const boardMiddlePoint = Math.floor(this.width / 2);
    const newBlock = { block, location: { x: boardMiddlePoint, y: 0 } };
    this.blocks = [newBlock, ...this.blocks];
  }

  toString() {
    return (".".repeat(this.width) + "\n").repeat(this.height);
  }
}
