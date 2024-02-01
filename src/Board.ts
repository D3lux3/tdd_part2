export class Board {
  width: number;
  height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  toString() {
    return `...\n...\n...\n`;
  }
}
