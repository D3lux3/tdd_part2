
export class RotatingShape {

    readonly shape: string

    constructor(shape: string) {
        this.shape = shape.split("\n").map((str) => str.trim() + "\n").join("");
    }

    rotateRight(): RotatingShape {
        const lines = this.shape.split("\n").slice(0, -1)
        const transpose = lines[0].split('').map((_, col) => {
            return lines.map(line => line[col]).reverse().join('')
        }).join("\n");
        return new RotatingShape(transpose);
    }

    toString(): string {
        return this.shape;
    }
}