import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Shufflebag } from "../src/Shufflebag.ts";

describe("Shufflebag", () => {
    let Shufflebag
    beforeEach(() => {
        Shufflebag = new Shufflebag(6);
    });

    test("contains six tetrominos initially", () => {
        expect(subscriber.getPoints()).equal(0);
    })
})