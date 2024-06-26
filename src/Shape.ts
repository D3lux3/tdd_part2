
export class Shape {
    static readonly T_SHAPE = {
        symbol: "T",
        orientations: {
            0: [{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 2 }], // Facing down
            1: [{ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 1 }], // Facing right
            2: [{ x: 1, y: 1 }, { x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }], // Facing up
            3: [{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 1, y: 0 }, { x: 1, y: 2 }], // Facing left
        }
    }
    static readonly I_SHAPE = {
        symbol: "I",
        orientations: {
            0: [{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 }], // Horizontal
            1: [{ x: 2, y: 0 }, { x: 2, y: 1 }, { x: 2, y: 2 }, { x: 2, y: 3 }], // Vertical
        }
    }
    static readonly O_SHAPE = {
        symbol: "O",
        orientations: {
            0: [{ x: 1, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 2 }]
        }
    }
}