import * as PIXI from "pixi.js";

const { default: Block } = require("./Block");

const WIDTH = 640;
const HEIGHT = 500;
const BRD_HEIGHT = 20;
const BRD_WIDTH = 10;
const OFFSET = 70;
const SQUARE_SIZE = 25;

//Makes the board a BRD_HEIGHT * BRD_WIDTH filled with zeroes
const board = new Array(BRD_HEIGHT);
for (let m = 0; m < board.length; m++) {
    board[m] = [];
    for (let k = 0; k < BRD_WIDTH; k++) {
        board[m].push(0);
    }
}

//Buffer for creating new tetrominoes
for (let m = 0; m < 4; m++) {
    board.push([]);
    for (let k = 0; k < BRD_WIDTH; k++) {
        board[board.length-1].push(0);
    }
}

function setBoard(y, x, value) {
    board[y][x] = value;
}

function getBoard() {
    return board;
}

window.onload = function() {
    var app = new PIXI.Application({ width: WIDTH, height: HEIGHT, backgroundColor: 0x000000 });
    document.body.appendChild(app.view);
    //Each square 50 width
    //Total width of playing field BRD_WIDTH * 50 = 500

    //############################################
    //#                                          #
    //#         DRAWING BACKGROUND STUFF         #
    //#                                          #
    //############################################

    //Draw background for playing field
    var fieldBackground = new PIXI.Graphics();
    fieldBackground.beginFill(0xf52c1d);
    fieldBackground.drawRect(OFFSET, 0, SQUARE_SIZE*BRD_WIDTH, SQUARE_SIZE*BRD_HEIGHT);

    //Creates lines dividing squares
    var linesV = [];
    for (let i = 0; i < BRD_WIDTH; i++) {
        linesV[i] = new PIXI.Graphics();
        linesV[i].lineStyle(1, 0x544948);
        linesV[i].moveTo(i*SQUARE_SIZE + OFFSET, 0)
        linesV[i].lineTo(i*SQUARE_SIZE + OFFSET, BRD_HEIGHT*SQUARE_SIZE);
    }
    var linesH = [];
    for (let i = 0; i < BRD_HEIGHT; i++) {
        linesH[i] = new PIXI.Graphics();
        linesH[i].lineStyle(1, 0x544948);
        linesH[i].moveTo(OFFSET, i*SQUARE_SIZE)
        linesH[i].lineTo(BRD_WIDTH*SQUARE_SIZE + OFFSET, i*SQUARE_SIZE);
    }

    app.stage.addChild(fieldBackground);
    
    linesV.forEach(element => {
        app.stage.addChild(element);
    });

    linesH.forEach(element => {
        app.stage.addChild(element);
    });


    //#######################################
    //#                                     #
    //#         DRAWING GAME ITSELF         #
    //#                                     #
    //#######################################

    //Creates instance of Block, spaws it in the buffer
    var blockLanded = true;

    function spawner() {
        //If block has already settled spawns a new block
        if (blockLanded) {
            //Creates a new block
            var block = new Block(Math.floor(Math.random() * 7), Math.floor(Math.random() * 4)); //7 block shapes
            block.x = Math.floor(Math.random() * (board.length-(block.size-1)));
        }
    }

    //setInterval(spawner, 5000);
}


export { getBoard, setBoard };