import { Board } from "../src/Board.ts";
import { ScoringRules } from "../src/ScoringRules.ts";
import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";


describe("Board", () => {
    let board;
    beforeEach(() => {
        board = new Board(10, 6);
    });

    test("allows adding new subscribers", () => {
        const scoringSystem = new ScoringRules();
        board.addSubscriber(scoringSystem);
    });


});