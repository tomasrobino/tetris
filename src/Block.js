import { getBoard } from ".";

export default class Block {
    x;
    y = 0;
    shapeArray;
    color;

    constructor(x, shape, rot, color) {
        this.x = x;
        this.color = color;

        //Parses shape name to array
        switch(shape) {
            case "I":
                this.shapeArray = [[1,1,1,1],[0,0,0,0],[0,0,0,0],[0,0,0,0]]
                break;
            case "O":
                this.shapeArray = [[1,1],[1,1],[0,0],[0,0]];
                break;
            case "T":
                this.shapeArray = [[1,1,1],[0,1,0],[0,0,0]];
                break;
            case "S":
                this.shapeArray = [[0,1,1],[1,1,0],[0,0,0]];
                break;
            case "Z":
                this.shapeArray = [[1,1,0],[0,1,1],[0,0,0]];
                break;
            case "J":
                this.shapeArray = [[1,0,0],[1,1,1],[0,0,0]];
                break;
            case "L":
                this.shapeArray = [[0,0,1],[1,1,1],[0,0,0]];
                break;
        }
        for (let i = 0; i < rot; i++) {
            this.shapeArray = this.rotate();
        }
    }

    rotate() {
        //Rotate shape as many times as asked
        let auxArr = new Array(this.shapeArray.length);
        for (let m = 0; m < auxArr.length; m++) {
            auxArr[m] = [];
            for (let k = 0; k < this.shapeArray[0].length; k++) {
                auxArr[m].push(0);
            }
        }
    
        //Rotates matrix if result is within bounds, if it's not, stores it in outOfBoundsList
        let outOfBoundsList = [];
        for (let m=0; m < this.shapeArray.length; m++) {
            for (let k=0; k < this.shapeArray[m].length; k++) {
                if(this.shapeArray[m][k] === 1) {
                    if (m*(-1) < 0) {
                        outOfBoundsList.push([k, m]);
                    } else{
                        auxArr[k][m*(-1)] = 1;
                    } 
                }
            }
        }
    
        //Looks for how many squares would be out of bounds
        let limit = 0;
        for (let m = 0; m < outOfBoundsList.length; m++) {
            if (outOfBoundsList[m][1] > limit) {
                limit = outOfBoundsList[m][1];
            }
        }
    
        //Adds a new column at the start and removes one at the end for each out of bounds square
        for (let m = 0; m < auxArr.length; m++) {
            for (let k = 0; k < limit; k++) {
                auxArr[m].unshift(0);
                auxArr[m].pop();
            }
        }
        //Adds all previously out of bounds squares
        for (let m = 0; m < outOfBoundsList.length; m++) {
            auxArr[outOfBoundsList[m][0]][limit - outOfBoundsList[m][1]] = 1;
        }
        return auxArr;
    }
}