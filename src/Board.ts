export class Board {
  width: number;
  height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  drop(block: string): void {

  }

  toString() {
    return `...\n...\n...\n`;
  }
}
