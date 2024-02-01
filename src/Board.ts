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
    return (".".repeat(this.width) + "\n").repeat(this.height);
  }
}
