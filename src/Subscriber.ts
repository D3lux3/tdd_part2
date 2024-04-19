import { ScoringRules } from "./ScoringRules";


export class Subscriber {
    subscriber: ScoringRules

    constructor(points?: number, multiplier?: number) {
        this.subscriber = new ScoringRules(points, multiplier);
    }

    getPoints() {
        return this.subscriber.getPoints();
    }
}