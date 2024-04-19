import { ScoringRules } from "./ScoringRules";


export class Subscriber {
    subscriber: ScoringRules

    constructor(points?: number, multiplier?: number) {
        this.subscriber = new ScoringRules(points, multiplier);
    }

    getPoints() {
        return this.subscriber.getPoints();
    }

    addPoints(rows: number) {
        const multiplier = this.subscriber.multiplier
        return new Subscriber(this.subscriber.getPoints() + (rows * multiplier), multiplier)
    }

    toString() {
        return this.subscriber.toString();
    }
}