import { describe, test } from "vitest";
import { expect } from "chai";
import { Tetromino2 } from "../src/Tetromino2.ts";

function distinctOrientations(shape) {
  const distinct = new Set();
  let goingRight = shape;
  let goingLeft = shape;
  for (let i = 0; i < 10; i++) {
    distinct.add(goingRight.toString());
    goingRight = goingRight.rotateRight();
    distinct.add(goingLeft.toString());
    goingLeft = goingLeft.rotateLeft();
  }
  return distinct;
}

describe("The T shape Arika system", () => {
  const shape = Tetromino2.T_SHAPE;

  test("initial Arika orientation", () => {
    expect(shape.toString()).to.equalShape(
      `....
       TTT.
       .T..
       ....`
    );
  });


  test("can be rotated left/counter-clockwise", () => {
    expect(shape.rotateLeft().toString()).to.equalShape(
      `.T..
       TT..
       .T..
       ....`
    );
  });

  test("can be rotated right/clockwise", () => {
    expect(shape.rotateRight().toString()).to.equalShape(
      `.T..
       .TT.
       .T..
       ....`
    );
  });


  test("has 4 distinct orientations", () => {
    expect(distinctOrientations(shape).size).to.equal(4);
  });
});


describe("The I shape Arika system", () => {
  const shape = Tetromino2.I_SHAPE;

  test("initial orientation", () => {
    expect(shape.toString()).to.equalShape(
      `....
       IIII
       ....
       ....`
    );
  });

  test("can be rotated right/clockwise", () => {
    expect(shape.rotateRight().toString()).to.equalShape(
      `..I.
       ..I.
       ..I.
       ..I.`
    );
  });

  test("can be rotated left/counter-clockwise", () => {
    expect(shape.rotateLeft().toString()).to.equalShape(
      `..I.
       ..I.
       ..I.
       ..I.`
    );
  });

  test("has 2 distinct orientations", () => {
    expect(distinctOrientations(shape).size).to.equal(2);
  });
});



describe("The O shape Arika system", () => {
  const shape = Tetromino2.O_SHAPE;

  test("initial orientation", () => {
    expect(shape.toString()).to.equalShape(
      `....
       .OO.
       .OO.
       ....`
    );
  });

  test.skip("cannot be rotated right/clockwise", () => {
    expect(shape.rotateRight().toString()).to.equalShape(
      `.OO
     .OO
     ...`
    );
  });

  test.skip("cannot be rotated left/counter-clockwise", () => {
    expect(shape.rotateLeft().toString()).to.equalShape(
      `.OO
     .OO
     ...`
    );
  });

  test.skip("has 1 distinct orientations", () => {
    expect(distinctOrientations(shape).size).to.equal(1);
  });
});

