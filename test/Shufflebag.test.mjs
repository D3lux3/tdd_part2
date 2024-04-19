import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Shufflebag } from "../src/Shufflebag.ts";
import { Tetromino } from "../src/Tetromino.ts";

describe("Shufflebag", () => {
    let shufflebag
    beforeEach(() => {
        shufflebag = new Shufflebag("init", undefined, 6);
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

    test("id does not change if bag contains tetromino", () => {
        const [_, newShuffle] = shufflebag.pull();
        expect(newShuffle.id).equal("init");
        expect(newShuffle.getTetrominos().length).equal(5);
    })

    test("starts over after running out of tetrominos", () => {
        let shuffle = shufflebag;
        for (let i = 0; i < 6; ++i) {
            if (i < 6) {
                expect(shuffle.id).equal("init");
            }
            const [_, newBag] = shuffle.pull();
            shuffle = newBag;
        }
        expect(shuffle.id).not.eq("init");
        expect(shuffle.getTetrominos().length).equal(6);

    })
})