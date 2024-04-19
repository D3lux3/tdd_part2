import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Subscriber } from "../src/Subscriber.js";


describe("Subscriber", () => {
    let subscriber: Subscriber;
    beforeEach(() => {
        subscriber = new Subscriber(0, 1);
    });

    test("points are zero initially", () => {
        expect(subscriber.getPoints()).equal(0);
    })
})