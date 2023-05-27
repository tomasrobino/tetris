import { getBoard } from ".";

class Block {
    x;
    y = 0;
    shape;
    color;

    constructor(x, shape, rot, color) {
        this.x = x;
        this.shape = shape;
        this.color = color;
    }
}

export default Block;