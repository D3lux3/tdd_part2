
export class RotatingShape {

    readonly shape: string

    constructor(shape: string) {
        this.shape = shape.split("\n").map((str) => str.trim()).join("\n");
    }

    private shapeAsLines(): string[] {
        return this.shape.split("\n");
    }

    rotateRight(): RotatingShape {
        const lines = this.shapeAsLines();
        const transpose = lines[0].split('').map((_, col) => {
            return lines.map(line => line[col]).reverse().join('')
        }).join("\n");
        return new RotatingShape(transpose);
    }

    rotateLeft(): RotatingShape {
        const lines = this.shapeAsLines();
        const transpose = lines[0].split('').map((_, col) => {
            return lines.map(line => line.split('').reverse().join('')[col]).join('')
        }).join("\n");
        return new RotatingShape(transpose);
    }

    toString(): string {
        return this.shape + "\n";
    }
}