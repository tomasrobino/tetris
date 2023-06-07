const rotate = require("../src/rotate");

test("tests rotate()", () => {
    expect(rotate([[1,1,1],[0,1,0],[0,0,0]])).toStrictEqual([[0,1,0],[1,1,0],[0,1,0]]);
});