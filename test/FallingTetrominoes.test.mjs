
import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.ts";
import { Tetromino } from "../src/Tetromino.ts";
import { Subscriber } from "../src/Subscriber.ts";

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
      `..........
       ...TTT....
       ....T.....
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
       ...TTT....
       ....T.....`
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
       ...TTT....
       ....T.....
       ...TTT....
       ....T.....`
    );
  });



  test("moves to left by one unit when moving left", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveFallingToLeft();

    expect(board.toString()).to.equalShape(
      `..........
       ..TTT.....
       ...T......
       ..........
       ..........
       ..........`
    );
  });

  test("moves to right by one unit when moving right", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveFallingToRight();

    expect(board.toString()).to.equalShape(
      `..........
       ....TTT...
       .....T....
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
       ..........
       ...TTT....
       ....T.....
       ..........
       ..........`
    );
  });


  test("cannot be moved left over board", () => {
    board.drop(Tetromino.T_SHAPE);
    moveToLeftOfBoard(board);
    expect(board.toString()).to.equalShape(
      `..........
       TTT.......
       .T........
       ..........
       ..........
       ..........`
    );
  });

  test("cannot be moved right over board", () => {
    board.drop(Tetromino.T_SHAPE);
    moveToRightOfBoard(board);
    expect(board.toString()).to.equalShape(
      `..........
       .......TTT
       ........T.
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
       ...TTT....
       ....T.....`
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
       TTTTTT....
       .T..T.....`
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
       ....TTTTTT
       .....T..T.`
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
       ...TTT....
       ....T.....
       ...TTT....
       ....T.....`
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
  test.skip("cannot be rotated right when no space", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateFallingBlockRight();
    moveToLeftOfBoard(board);
    board.rotateFallingBlockRight();

    expect(board.toString()).to.equalShape(
      `T.........
       TT........
       T.........
       ..........
       ..........
       ..........`
    );
  });

  test.skip("cannot be rotated left when no space", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateFallingBlockLeft();
    moveToRightOfBoard(board);
    board.rotateFallingBlockLeft();

    expect(board.toString()).to.equalShape(
      `.........T
       ........TT
       .........T
       ..........
       ..........
       ..........`
    );
  });

  test("performs wallkick if against left wall", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateFallingBlockRight();
    moveToLeftOfBoard(board);
    board.rotateFallingBlockRight();

    expect(board.toString()).to.equalShape(
      `..........
       .T........
       TTT.......
       ..........
       ..........
       ..........`
    );
  });

  test("performs wallkick if against right wall", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateFallingBlockLeft();
    moveToRightOfBoard(board);
    board.rotateFallingBlockLeft();

    expect(board.toString()).to.equalShape(
      `..........
       ........T.
       .......TTT
       ..........
       ..........
       ..........`
    );
  });

  test("I-shaped block can be moved against right wall", () => {
    board.drop(Tetromino.I_SHAPE);
    board.rotateFallingBlockRight();
    moveToRightOfBoard(board);

    expect(board.toString()).to.equalShape(
      `.........I
       .........I
       .........I
       .........I
       ..........
       ..........`
    );
  });

  test("I-shaped block performs wallkick if against right wall", () => {
    board.drop(Tetromino.I_SHAPE);
    board.rotateFallingBlockRight();
    moveToRightOfBoard(board);
    board.rotateFallingBlockRight();

    expect(board.toString()).to.equalShape(
      `..........
       ......IIII
       ..........
       ..........
       ..........
       ..........`
    );
  });

  test("bottom row gets cleared if full", () => {
    const halfSizedTetromino = new Tetromino(1, 0, 'F', { x: 0, y: 0 }, [[...Array(5).keys()].map((i) => ({ x: i, y: 0 }))]);

    board.drop(halfSizedTetromino);
    moveToLeftOfBoard(board);
    fallToBottom(board);

    board.drop(halfSizedTetromino);
    moveToRightOfBoard(board);

    expect(board.toString()).to.equalShape(
      `.....FFFFF
       ..........
       ..........
       ..........
       ..........
       FFFFF.....`
    );

    fallToBottom(board);


    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ..........
       ..........`
    );
  });

  test("after clearing bottom row, rows above should drop down", () => {
    board.drop(Tetromino.I_SHAPE);
    moveToLeftOfBoard(board);
    fallToBottom(board);

    board.drop(Tetromino.I_SHAPE);
    board.moveFallingToRight();
    fallToBottom(board);

    board.drop(Tetromino.O_SHAPE);
    moveToRightOfBoard(board);
    fallToBottom(board);

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ..........
       ........OO`
    );
  });

  test("Performs sticky gravity after clearing lines", () => {
    const boardState = `..........
..........
..........
X.....Y...
IIIIIIIII.
.T.....OO.
TTTIIIIOO.`
    const initializedBoard = new Board(10, 7, boardState);
    initializedBoard.drop(Tetromino.T_SHAPE);
    initializedBoard.rotateFallingBlockLeft();
    moveToRightOfBoard(initializedBoard);
    fallToBottom(initializedBoard);

    expect(initializedBoard.toString()).to.equalShape(
      `..........
       ..........
       ..........
       .........T
       ........TT
       XT....YOO.
       TTTIIIIOO.`
    );
  });

  test("after clearing one line, player gets 10 points", () => {
    const boardState = `..........
..........
..........
..........
..........
IIIIIIIII.`

    const initializedBoard = new Board(10, 6, boardState);
    const scoringSystem = new Subscriber(0, [10]);
    initializedBoard.addSubscriber(scoringSystem);
    expect(scoringSystem.getPoints()).equal(0);
    initializedBoard.drop(Tetromino.I_SHAPE);
    initializedBoard.rotateFallingBlockRight();
    moveToRightOfBoard(initializedBoard);
    fallToBottom(initializedBoard);

    expect(initializedBoard.toString()).to.equalShape(
      `..........
       ..........
       ..........
       .........I
       .........I
       .........I`
    );
    expect(initializedBoard.getSubscribers()[0].getPoints()).equal(10);
  })


});
