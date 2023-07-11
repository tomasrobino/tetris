import { getBoard } from ".";

export default class Block {
    x;
    y = 0;
    shapeArray;
    color;
    size = 3;
    start = 0;
    end = 3;

    constructor(shape, rot) {
        //Parses shape name to array
        switch(shape) {
            case 0:
                this.shapeArray = [[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0]]
                this.color = 0x00FFFF; //cyan
                this.size = 4;
                this.end = 1;
                break;
            case 1:
                this.shapeArray = [[1,1,0,0],[1,1,0,0],[0,0,0,0],[0,0,0,0]];
                this.color = 0xFFFF00; //yellow
                this.size = 2;
                this.end = 2;
                break;
            case 2:
                this.shapeArray = [[1,1,1],[0,1,0],[0,0,0]];
                this.color = 0x800080; //purple
                break;
            case 3:
                this.shapeArray = [[0,1,1],[1,1,0],[0,0,0]];
                this.color = 0x008000; //green
                break;
            case 4:
                this.shapeArray = [[1,1,0],[0,1,1],[0,0,0]];
                this.color = 0xFF0000; //red
                break;
            case 5:
                this.shapeArray = [[1,0,0],[1,1,1],[0,0,0]];
                this.color = 0x0000FF; //blue
                break;
            case 6:
                this.shapeArray = [[0,0,1],[1,1,1],[0,0,0]];
                this.color = 0xFFA500; //orange
                break;
        }
        //Rotate shape as many times as asked
        for (let i = 0; i < rot; i++) {
            this.shapeArray = this.rotate()[0];
        }
    }

    rotate() {
        let auxArr = new Array(this.shapeArray.length);
        let start = 0;
        let end = 0;
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

        //Update start field
        for1:
        for (let k = 0; k < auxArr.length; k++) {
            for (let i = 0; i < auxArr[k].length; i++) {
                if (auxArr[i][k] === 1) {
                    start = k;
                    break for1;
                }
            }
        }

        //Update end field
        for2:
        for (let k = auxArr.length-1; k > -1; k--) {
            for (let i = 0; i < auxArr[k].length; i++) {
                if (auxArr[i][k] === 1) {
                    end = k+1;
                    break for2;
                }
            }
        }
        
        return [auxArr, start, end];
    }
}