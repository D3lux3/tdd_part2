
export class RotatingShape {

    readonly shape: string

    constructor(shape: string) {
        this.shape = shape.split("\n").map((str) => str.trim() + "\n").join("");
    }

    toString() {
        return this.shape;
    }
}