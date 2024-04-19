import { Board } from "../src/Board.ts";
import { beforeEach, describe, test, vi, } from "vitest";
import { expect } from "chai";
import { Subscriber } from "../src/Subscriber.ts";

vi.mock('../src/Subscriber.ts', () => {
    const Subscriber = vi.fn(() => ({
        getPoints: vi.fn(),
        addPoints: vi.fn()
    }))
    return { Subscriber }
})

describe("Board", () => {
    let board;

    beforeEach(() => {
        board = new Board(10, 6);
    });

    test("allows getting all subscribers", () => {
        const subscribers = board.getSubscribers();
        expect(subscribers.length).equal(0);
    });

    test("allows adding new subscribers", () => {
        const subscriber = new Subscriber();
        board.addSubscriber(subscriber);
        expect(board.getSubscribers().length).equal(1);
    });

    test("board notify subscribers of one line clear", () => {
        const a = new Subscriber();
        const b = new Subscriber();
        board.addSubscriber(a);
        board.addSubscriber(b);

        board.notifySubscribers();
        expect(a.addPoints.mock.calls.length).equal(1)
        expect(b.addPoints.mock.calls.length).equal(1)
    })
});