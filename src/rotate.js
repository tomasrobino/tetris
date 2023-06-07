function rotate(shapeArray) {
    //Rotate shape as many times as asked
    let auxArr = new Array(shapeArray.length);
    for (let m = 0; m < auxArr.length; m++) {
        auxArr[m] = [];
        for (let k = 0; k < shapeArray[0].length; k++) {
            auxArr[m].push(0);
        }
    }

    //Rotates matrix if result is within bounds, if it's not, stores it in outOfBoundsList
    let outOfBoundsList = [];
    for (let m=0; m < shapeArray.length; m++) {
        for (let k=0; k < shapeArray[m].length; k++) {
            if(shapeArray[m][k] === 1) {
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

module.exports = rotate;