export class ScoringRules {
    points: number;
    multiplier: number;

    constructor(points?: number, multiplier?: number) {
        this.points = points || 0;
        this.multiplier = multiplier || 1;
    }

    getPoints() {
        return this.points;
    }

    toString() {
        return `Score: ${this.points}`;
    }

}