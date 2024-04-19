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
        if (rows > 0) {
            const multipliers = this.subscriber.multipliers
            const index = Math.min(Math.abs(rows), multipliers.length) - 1
            return new Subscriber(this.subscriber.getPoints() + multipliers[index], multipliers);
        }
        return new Subscriber(this.subscriber.getPoints(), this.subscriber.multipliers)
    }

    toString() {
        return this.subscriber.toString();
    }
}