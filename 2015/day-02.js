const fs = require('fs');
const input = fs.readFileSync('./inputs/day-02.txt', 'utf-8');

const dimensions = input.split('\n').map(dim => dim.split('x').map(Number));

console.log(partOne(dimensions));
console.log(partTwo(dimensions));

function partOne(dimensions) {
  return dimensions.reduce((area, dim) => {
    const lw = 2 * dim[0] * dim[1];
    const wh = 2 * dim[1] * dim[2];
    const hl = 2 * dim[0] * dim[2];
    const slack = Math.min(lw, wh, hl) / 2;

    return area + lw + wh + hl + slack;
  }, 0);
}

function partTwo(dimensions) {
  return dimensions.reduce((feet, dim) => {
    const [a, b, c] = dim.sort((a, b) => a - b);

    return feet + 2 * a + 2 * b + a * b * c;
  }, 0);
}


