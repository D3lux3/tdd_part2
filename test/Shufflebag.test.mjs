import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Shufflebag } from "../src/Shufflebag.ts";
import { Tetromino } from "../src/Tetromino.ts";

describe("Shufflebag", () => {
    let shufflebag
    beforeEach(() => {
        shufflebag = new Shufflebag(undefined, 6);
    });

    test("contains six tetrominos initially", () => {
        expect(shufflebag.getTetrominos().length).equal(6);
    })

    test("contains three T shape two O shape and one I shape tetrominos initially", () => {
        const tetrominos = shufflebag.getTetrominos();
        const t_shapes = tetrominos.filter((tetromino) => tetromino === Tetromino.T_SHAPE).length;
        const o_shapes = tetrominos.filter((tetromino) => tetromino === Tetromino.O_SHAPE).length;
        const i_shapes = tetrominos.filter((tetromino) => tetromino === Tetromino.I_SHAPE).length;

        expect(t_shapes).equal(3);
        expect(o_shapes).equal(2);
        expect(i_shapes).equal(1);
    })
})