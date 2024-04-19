import { Subscriber } from './Subscriber';
import { Tetromino } from './Tetromino';
import { Coordinate } from './types';

export class Board {
  width: number;
  height: number;
  blocksOnBoard: Map<Coordinate, string>;
  fallingBlock: Tetromino | undefined;
  subscribers: Subscriber[];

  constructor(width: number, height: number, boardState?: string) {
    this.width = width;
    this.height = height;
    this.blocksOnBoard = new Map();
    this.subscribers = [];
    if (boardState) {
      this.initBoardState(boardState);
    }
  }

  private initBoardState(boardState: string) {
    const boardArray = boardState.split('\n');
    boardArray.forEach((row, y) => {
      row.split('').forEach((symbol, x) => {
        if (symbol !== '.') {
          this.blocksOnBoard.set({ x, y }, symbol);
        }
      });
    });
  }

  private isCoordinatesValid(coordinate: Coordinate): boolean {
    return coordinate.y < this.height && coordinate.y >= 0 && coordinate.x >= 0 && coordinate.x < this.width
  }

  private isCoordinatesEmpty(boardCoordinates: Coordinate[], coordinates: Coordinate[]): boolean {
    const union = [...boardCoordinates, ...coordinates].map(({ x, y }) => `(${y},${x})`); // Coordinates to string, so that Set works.
    return new Set(union).size === union.length
  }

  private isSquareValid(tetromino: Tetromino): boolean {
    const isOverlapping = this.isCoordinatesEmpty([...this.blocksOnBoard.keys()], tetromino.coordinates);
    return isOverlapping && tetromino.coordinates.filter((coordinate) => !this.isCoordinatesValid(coordinate)).length === 0
  }

  private moveFalling(movedBlock: Tetromino): boolean {
    if (this.isSquareValid(movedBlock)) {
      this.fallingBlock = movedBlock;
      return true;
    }
    return false;
  }

  moveFallingToLeft(): void {
    const fallingBlock = this.getFallingTetromino();
    if (fallingBlock) {
      const movedBlockToLeft = fallingBlock.moveToLeft();
      this.moveFalling(movedBlockToLeft);
    }
  }

  moveFallingToRight(): void {
    const fallingBlock = this.getFallingTetromino();
    if (fallingBlock) {
      const movedBlockToRight = fallingBlock.moveToRight();
      this.moveFalling(movedBlockToRight);
    }
  }

  moveFallingToDown(): boolean {
    const fallingBlock = this.getFallingTetromino();
    if (fallingBlock) {
      const movedBlockToDown = fallingBlock.moveDown();
      return this.moveFalling(movedBlockToDown);
    }
    return false;
  }

  getFallingTetromino(): Tetromino | undefined {
    return this.fallingBlock;
  }

  tick(): void {
    const isBlockFalling = this.moveFallingToDown();
    if (!isBlockFalling) {
      this.addFallingToBlocksOnBoard();
      this.clearFullLines();
    }
  }

  hasFalling(): boolean {
    return Boolean(this.fallingBlock);
  }

  private getFullRowsOnBoard() {
    const blocksOnBoardKeys = [...this.blocksOnBoard.keys()];
    const blockCountPerRow = blocksOnBoardKeys.reduce((acc: { [key: number]: number }, coordinate) => {
      acc[coordinate.y] = (acc[coordinate.y] || 0) + 1;
      return acc;
    }, {});
    return Object.fromEntries(Object.entries(blockCountPerRow).filter(([_, count]) => count === this.width));
  }

  private toCoordinates(stringCoordinates: string) {
    const splitted = stringCoordinates.split(',').map((v) => parseInt(v));
    return { x: splitted[0], y: splitted[1] };
  }

  private coordinatesToString({ x, y }: Coordinate) {
    return `${x},${y}`
  }


  clearFullLines() {
    if (!this.fallingBlock) {
      const fullRows = this.getFullRowsOnBoard();
      const clearedBoard = new Map([...this.blocksOnBoard].filter(([coordinate, symbol]) => !fullRows[coordinate.y]));
      const clearedStringed = new Map([...clearedBoard].map(([{ x, y }, v]) => [`${x},${y}`, v]));
      const visitedBlocks = new Map<string, boolean>();
      for (const { x, y } of [...clearedBoard.keys()]) {
        const coordinates = new Array(0, 1, -1).map((value) => ({ strCoords: this.coordinatesToString(({ x: x + (value), y: y })), droppedCoordinates: { x: x + (value), y: y + 1 } })).map(({ strCoords, ...rest }) => ({ coordinates: strCoords, symbol: clearedStringed.get(strCoords), ...rest })).filter((obj) => !visitedBlocks.get(obj.coordinates) && obj.symbol);
        const droppedCoordinates = coordinates.map((obj) => (obj.droppedCoordinates));
        if (this.isCoordinatesEmpty([...clearedBoard.keys()], droppedCoordinates)
          && droppedCoordinates.filter((coord) => !this.isCoordinatesValid(coord)).length === 0
        ) {
          coordinates.forEach((obj) => {
            clearedStringed.set(this.coordinatesToString(obj.droppedCoordinates), obj.symbol || '?')
            clearedStringed.delete(obj.coordinates)
            visitedBlocks.set(obj.coordinates, true);
          });
        }
      }
      this.blocksOnBoard = new Map([...clearedStringed].map(([k, v]) => [this.toCoordinates(k), v]));
    }
  }

  private addFallingToBlocksOnBoard() {
    if (this.fallingBlock) {
      const symbol = this.fallingBlock.symbol;
      const fallingCoordinates = new Map(this.fallingBlock.coordinates.map(coord => [coord, symbol]));
      this.blocksOnBoard = new Map([...this.blocksOnBoard, ...fallingCoordinates])
      delete this.fallingBlock;
    }
  }

  private toTetromino(block: string | Tetromino) {
    return typeof (block) === "string" ? new Tetromino(4, 0, block, { x: 0, y: 0 }, [[{ x: 2, y: 0 }]]) : block;
  }

  rotateFallingBlockRight() {
    const fallingBlock = this.getFallingTetromino();
    if (fallingBlock) {
      if (!this.moveFalling(fallingBlock.rotateRight())) {
        const movedLeftAndRotated = fallingBlock.moveToLeft().rotateRight();
        if (!this.moveFalling(movedLeftAndRotated)) {
          const movedRightAndRotated = fallingBlock.moveToRight().rotateRight();
          this.moveFalling(movedRightAndRotated);
        }
      }
    }
  }

  rotateFallingBlockLeft() {
    const fallingBlock = this.getFallingTetromino();
    if (fallingBlock) {
      if (!this.moveFalling(fallingBlock.rotateLeft())) {
        const movedLeftAndRotated = fallingBlock.moveToLeft().rotateLeft();
        if (!this.moveFalling(movedLeftAndRotated)) {
          const movedRightAndRotated = fallingBlock.moveToRight().rotateLeft();
          this.moveFalling(movedRightAndRotated);
        }
      }
    }
  }

  drop(block: string | Tetromino): void {
    if (!this.fallingBlock) {
      const converted = this.toTetromino(block).moveToMiddle(this.width);
      this.fallingBlock = converted;
      return;
    }
    throw new Error("already falling");
  }

  addSubscriber(subscriber: Subscriber) {
    this.subscribers = [...this.subscribers, subscriber];
  }

  getSubscribers() {
    return this.subscribers;
  }

  notifySubscribers(rowsCleared: number) {
    this.subscribers = this.subscribers.map((sub) => sub.addPoints(rowsCleared));
  }

  toString() {
    const emptyBoard = (".".repeat(this.width) + "\n").repeat(this.height);
    const boardArray = emptyBoard.split('');
    if (this.fallingBlock) {
      for (const { x, y } of this.fallingBlock.coordinates) {
        const blockIndexOnBoard = (y * (this.width + 1)) + x;
        boardArray[blockIndexOnBoard] = this.fallingBlock.symbol;
      }
    }
    for (const [coordinate, symbol] of this.blocksOnBoard) {
      const blockIndexOnBoard = (coordinate.y * (this.width + 1)) + coordinate.x;
      boardArray[blockIndexOnBoard] = symbol;
    }
    return boardArray.join("");
  }
}
