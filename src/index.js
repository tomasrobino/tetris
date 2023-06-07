import * as PIXI from "pixi.js";

const { default: Block } = require("./Block");

const BRD_HEIGHT = 20;
const BRD_WIDTH = 10;

//Makes the board a BRD_HEIGHT * BRD_WIDTH filled with zeroes
const board = new Array(BRD_HEIGHT);
for (let m = 0; m < board.length; m++) {
    board[m] = [];
    for (let k = 0; k < BRD_WIDTH; k++) {
        board[m].push(0);
    }
}

//Buffer for creating new tetrominoes
const buffer = new Array(4).fill(new Array(BRD_WIDTH).fill(0));
for (let m = 0; m < buffer.length; m++) {
    buffer[m] = [];
    for (let k = 0; k < BRD_WIDTH; k++) {
        buffer[m].push(0);
    }
}

function setBoard(y, x, value) {
    board[y][x] = value;
}

function getBoard() {
    return board;
}

window.onload = function() {
    var app = new PIXI.Application({ width: 640, height: 480, backgroundColor: 0x000000 });
    document.body.appendChild(app.view);
    console.log(new Block(0, "T" , 3, "red"));
    //console.log(a.rotate());
}


export { getBoard, setBoard };