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

//Board for keeping account of drawn squares
const colorBoard = new Array(BRD_HEIGHT);
for (let m = 0; m < colorBoard.length; m++) {
    colorBoard[m] = [];
    for (let k = 0; k < BRD_WIDTH; k++) {
        colorBoard[m].push(0);
    }
}

//Buffer for creating new tetrominoes
for (let m = 0; m < 4; m++) {
    board.push([]);
    colorBoard.push([]);
    for (let k = 0; k < BRD_WIDTH; k++) {
        board[board.length-1].push(0);
        colorBoard[colorBoard.length-1].push(0);
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
    fieldBackground.endFill();

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
    var block;

    spawn();
    setInterval(downer, 1000);

    function spawn() {
        //Creates a new block
        block = new Block(Math.floor(Math.random() * 7), Math.floor(Math.random() * 4)); //7 block shapes
        block.x = Math.floor(Math.random() * (BRD_WIDTH-(block.size-1))); //TODO: Check it's not overwriting another block
        
        //Copy block's shapeArray to board array at defined spawn place
        //It'll spawn first in the invisible buffer zone (first 4 elements)
        for (let i = 0; i < block.shapeArray.length; i++) {
            for (let k = 0; k < block.shapeArray[i].length; k++) {
                if (block.shapeArray[i][k] === 1) {
                    board[i][k+block.x] = 2;
                    colorBoard[i][k+block.x] = new PIXI.Graphics();
                    colorBoard[i][k+block.x].beginFill(block.color);
                    colorBoard[i][k+block.x].drawRect(OFFSET + (k+block.x)*SQUARE_SIZE, (i-4)*SQUARE_SIZE, SQUARE_SIZE, SQUARE_SIZE);
                    colorBoard[i][k+block.x].endFill();
                    app.stage.addChild(colorBoard[i][k+block.x]);
                }
            }
        }

        w:
        while (true) {
            for (let k = 0; k < board[3].length; k++) {
                if (board[3][k] === 2) {
                    break w;
                }
            }
            downer();
        }
    }

    function downer() {
        if (block !== null) {
            console.log("moving");
            for (let i = block.shapeArray.length-1; i > -1; i--) {
                for (let k = 0; k < block.shapeArray[i].length; k++) {
                    if (block.shapeArray[i][k] === 1) {
                        if (i+1+block.y === BRD_HEIGHT+4) {
                            //Block reached bottom
                            //Solidify Block
                            console.log("block reached bottom");
                            solidify();
                            setTimeout(spawn, 3000);
                            
                            return 1;
                        } else if (board[i+1+block.y][k+block.x] === 1) {
                            //TODO: Found a square directly below the Block
                            console.log("block reached square");
                            solidify();
                            setTimeout(spawn, 3000);
                            return 2;
                        }
                    }
                }
            }
    
            //Moves the block logically
            for (let i = block.shapeArray.length-1; i > -1; i--) {
                for (let k = 0; k < block.shapeArray[i].length; k++) {
                    if (block.shapeArray[i][k] === 1) {
                        board[i+block.y][k+block.x] = 0;
                        board[i+1+block.y][k+block.x] = 2;
                        colorBoard[i+1+block.y][k+block.x] = colorBoard[i+block.y][k+block.x];
                        colorBoard[i+block.y][k+block.x] = 0;
                        colorBoard[i+1+block.y][k+block.x].position.y += SQUARE_SIZE;
    
                    }
                }
            }
            block.y++;
        }
    }

    function solidify() {
        console.log("solidifying");
        for (let i = 0; i < block.shapeArray.length; i++) {
            for (let k = 0; k < block.shapeArray[i].length; k++) {
                if (block.shapeArray[i][k] === 1) {
                    board[i+block.y][k+block.x] = 1;
                }
            }
        }

        delete block.x;
        delete block.y;
        delete block.shapeArray;
        delete block.color;
        delete block.size;
        block = null;
    }
}


export { getBoard, setBoard };