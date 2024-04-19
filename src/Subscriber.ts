import { ScoringRules } from "./ScoringRules";


export class Subscriber {
    subscriber: ScoringRules

    constructor(points?: number, multipliers?: number[]) {
        this.subscriber = new ScoringRules(points, multipliers);
    }

    getPoints() {
        return this.subscriber.getPoints();
    }

    addPoints(rows: number) {
        const multipliers = this.subscriber.multipliers
        const index = Math.min(Math.abs(rows), 4)
        return new Subscriber(this.subscriber.getPoints() + multipliers[index], multipliers);
    }

    toString() {
        return this.subscriber.toString();
    }
}