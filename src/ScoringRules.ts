export class ScoringRules {
    points: number;

    constructor() {
        this.points = 0;
    }

    getPoints() {
        return this.points;
    }

    toString() {
        return `Score: ${this.points}`;
    }

}