import { Board } from "../src/Board.js";
import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Subscriber } from "../src/Subscriber.js";


describe("Board", () => {
    let board: Board;
    beforeEach(() => {
        board = new Board(10, 6);
    });

    test("allows getting all subscribers", () => {
        const subscribers: Subscriber[] = board.getSubscribers();
        expect(subscribers.length === 0);
    });

    test("allows adding new subscribers", () => {
        const scoringSystem = new Subscriber();
        board.addSubscriber(scoringSystem);
    });

});