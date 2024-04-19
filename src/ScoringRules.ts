export class ScoringRules {
    points: number;

    constructor() {
        this.points = 0;
    }


    toString() {
        return `Score: ${this.points}`;
    }

}