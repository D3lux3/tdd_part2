
export class RotatingShape {

    readonly shape: string

    constructor(shape: string) {
        this.shape = shape.split("\n").map((str) => str.trim()).join("\n");
    }

    rotateRight(): RotatingShape {
        const lines = this.shape.split("\n")
        const transpose = lines[0].split('').map((_, col) => {
            return lines.map(line => line[col]).reverse().join('')
        }).join("\n");
        return new RotatingShape(transpose);
    }

    toString(): string {
        return this.shape + "\n";
    }
}