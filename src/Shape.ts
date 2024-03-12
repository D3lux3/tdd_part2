
export class Shape {
    static readonly T_SHAPE = {
        symbol: "T",
        old_orientations: {
            0: [{ x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }], // Facing up
            1: [{ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 1 }], // Facing right
            2: [{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 2 }], // Facing down
            3: [{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 1, y: 0 }, { x: 1, y: 2 }], // Facing left

        },
        new_orientations: {
            0: [{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 2 }], // Facing down
            1: [{ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 1 }], // Facing right
            2: [{ x: 1, y: 1 }, { x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }], // Facing up
            3: [{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 1, y: 0 }, { x: 1, y: 2 }], // Facing left
        }
    }
    static readonly I_SHAPE = {
        symbol: "I",
        old_orientations: {
            0: [{ x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 3, y: 2 }], // Horizontal
            1: [{ x: 2, y: 0 }, { x: 2, y: 1 }, { x: 2, y: 2 }, { x: 2, y: 3 }], // Vertical
        },
        new_orientations: {
            0: [{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 }], // Horizontal
            1: [{ x: 2, y: 0 }, { x: 2, y: 1 }, { x: 2, y: 2 }, { x: 2, y: 3 }], // Vertical
        }
    }
    static readonly O_SHAPE = {
        symbol: "O",
        old_orientations: {
            0: [{ x: 1, y: 0 }, { x: 2, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 1 }] // Changed this to old Y
        },
        new_orientations: {
            0: [{ x: 1, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 2 }] // Changed this to old Y
        }
    }
}