
export class RotatingShape {

    readonly shape: string

    constructor(shape: string) {
        this.shape = shape.split("\n").map((str) => str.trim()).join("\n");
    }

    private shapeAsLines(): string[] {
        return this.shape.split("\n");
    }

    private rotate(lines: string[]): string[] {
        return lines[0].split('').map((_, col) => lines.map(line => line[col]).join(''));
    }

    rotateRight(): RotatingShape {
        const lines = this.shapeAsLines();
        const rotated = this.rotate(lines.reverse()).join("\n");
        return new RotatingShape(rotated);
    }

    rotateLeft(): RotatingShape {
        const lines = this.shapeAsLines();
        const rotated = this.rotate(lines).reverse().join("\n");
        return new RotatingShape(rotated);
    }

    toString(): string {
        return this.shape + "\n";
    }
}