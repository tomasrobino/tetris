import * as PIXI from "pixi.js";

const BRD_HEIGHT = 20;
const BRD_WIDTH = 10;

//Makes the board a BRD_HEIGHT * BRD_WIDTH filled with zeroes
const board = new Array(BRD_HEIGHT).fill(new Array(BRD_WIDTH).fill(0));

function setBoard(y, x, value) {
    board[y][x] = value;
}

function getBoard() {
    return board;
}

window.onload = function() {
    var app = new PIXI.Application({ width: 640, height: 480, backgroundColor: 0x000000 });
    document.body.appendChild(app.view);
}


export { getBoard, setBoard };