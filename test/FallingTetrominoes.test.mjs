
import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.ts";
import { Tetromino } from "../src/Tetromino.ts";

function fallToBottom(board) {
  for (let i = 0; i < 10; i++) {
    board.tick();
  }
}

function moveToLeftOfBoard(board) {
  for (let i = 0; i < 10; i++) {
    board.moveFallingToLeft();
  }
}

function moveToDownOfBoard(board) {
  for (let i = 0; i < 10; i++) {
    board.moveFallingToDown();
  }
}

function moveToRightOfBoard(board) {
  for (let i = 0; i < 10; i++) {
    board.moveFallingToRight();
  }
}

describe("Falling tetrominoes", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  test("start from the top middle", () => {
    board.drop(Tetromino.T_SHAPE);

    expect(board.toString()).to.equalShape(
      `....T.....
       ...TTT....
       ..........
       ..........
       ..........
       ..........`
    );
  });

  test("stop when they hit the bottom", () => {
    board.drop(Tetromino.T_SHAPE);
    fallToBottom(board);

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ....T.....
       ...TTT....`
    );
  });

  test("stop when they land on another block", () => {
    board.drop(Tetromino.T_SHAPE);
    fallToBottom(board);
    board.drop(Tetromino.T_SHAPE);
    fallToBottom(board);

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ....T.....
       ...TTT....
       ....T.....
       ...TTT....`
    );
  });

  test("moves to left by one unit when moving left", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveFallingToLeft();

    expect(board.toString()).to.equalShape(
      `...T......
       ..TTT.....
       ..........
       ..........
       ..........
       ..........`
    );
  });

  test("moves to right by one unit when moving right", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveFallingToRight();

    expect(board.toString()).to.equalShape(
      `.....T....
       ....TTT...
       ..........
       ..........
       ..........
       ..........`
    );
  });

  test("moves to down by one unit when moving down", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveFallingToDown();

    expect(board.toString()).to.equalShape(
      `..........
       ....T.....
       ...TTT....
       ..........
       ..........
       ..........`
    );
  });

  test("cannot be moved left over board", () => {
    board.drop(Tetromino.T_SHAPE);
    moveToLeftOfBoard(board);
    expect(board.toString()).to.equalShape(
      `.T........
       TTT.......
       ..........
       ..........
       ..........
       ..........`
    );
  });

  test("cannot be moved right over board", () => {
    board.drop(Tetromino.T_SHAPE);
    moveToRightOfBoard(board);
    expect(board.toString()).to.equalShape(
      `........T.
       .......TTT
       ..........
       ..........
       ..........
       ..........`
    );
  });

  test("cannot be moved down beyond the board (will stop falling)", () => {
    board.drop(Tetromino.T_SHAPE);
    moveToDownOfBoard(board);
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ....T.....
       ...TTT....`
    );
  });

  test("cannot be moved left through other blocks", () => {
    board.drop(Tetromino.T_SHAPE);
    moveToLeftOfBoard(board);
    fallToBottom(board);
    board.drop(Tetromino.T_SHAPE);
    moveToDownOfBoard(board);
    moveToLeftOfBoard(board);
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       .T..T.....
       TTTTTT....`
    );
  });

  test("cannot be moved right through other blocks", () => {
    board.drop(Tetromino.T_SHAPE);
    moveToRightOfBoard(board);
    fallToBottom(board);
    board.drop(Tetromino.T_SHAPE);
    moveToDownOfBoard(board);
    moveToRightOfBoard(board);
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       .....T..T.
       ....TTTTTT`
    );
  });

  test("it cannot be moved down through other blocks (will stop falling)", () => {
    board.drop(Tetromino.T_SHAPE);
    fallToBottom(board);
    board.drop(Tetromino.T_SHAPE);
    moveToDownOfBoard(board);
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ....T.....
       ...TTT....
       ....T.....
       ...TTT....`
    );
  });

  test("can be rotated right", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateFallingBlockRight();

    expect(board.toString()).to.equalShape(
      `....T.....
       ....TT....
       ....T.....
       ..........
       ..........
       ..........`
    );
  });

  test("can be rotated left", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateFallingBlockLeft();

    expect(board.toString()).to.equalShape(
      `....T.....
       ...TT.....
       ....T.....
       ..........
       ..........
       ..........`
    );
  });

});
