import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Shufflebag } from "../src/Shufflebag.ts";

describe("Shufflebag", () => {
    let shufflebag
    beforeEach(() => {
        shufflebag = new Shufflebag(6);
    });

    test("contains six tetrominos initially", () => {
        expect(shufflebag.getTetrominos().length).equal(6);
    })
})