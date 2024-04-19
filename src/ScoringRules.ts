export class ScoringRules {
    points: number;
    multipliers: number[];

    constructor(points?: number, multipliers?: number[]) {
        this.points = points || 0;
        this.multipliers = multipliers || [40, 100, 300, 1200];
    }

    getPoints() {
        return this.points;
    }

    toString() {
        return `Score: ${this.points}`;
    }

}