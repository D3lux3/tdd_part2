import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Subscriber } from "../src/Subscriber.js";
import { Board } from '../src/Board.js';

describe("Subscriber", () => {
    let subscriber: Subscriber;
    beforeEach(() => {
        subscriber = new Subscriber(0, [1, 2, 4, 8]);
    });

    test("points are zero initially", () => {
        expect(subscriber.getPoints()).equal(0);
    })

    test("toString is in right format", () => {
        expect(subscriber.toString()).to.equal(`Score: 0`)
    })

    test("points can be added", () => {
        const updated = subscriber.addPoints(1);
        expect(updated.getPoints()).equal(1);
    })

    test("board notification adds points", () => {
        const board = new Board(1, 1);
        board.addSubscriber(subscriber);
        board.notifySubscribers(1);
        expect(board.getSubscribers()[0].getPoints()).equal(1);
    })
})