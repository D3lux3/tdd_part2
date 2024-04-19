import { ScoringRules } from "./ScoringRules";


export class Subscriber {
    subscriber: ScoringRules

    constructor() {
        this.subscriber = new ScoringRules();
    }

    getPoints() {
        return this.subscriber.getPoints();
    }
}