const fs = require('fs');
let input = fs.readFileSync('./inputs/day-03.txt', 'utf-8');

console.log(partOne(input));
console.log(partTwo(input));

function partOne(input) {
  const rows = input.split('\n');
  return traverse(rows, 3, 1);
}

function partTwo(input) {
  const rows = input.split('\n');
  const trees = [
    traverse(rows, 1, 1),
    traverse(rows, 3, 1),
    traverse(rows, 5, 1),
    traverse(rows, 7, 1),
    traverse(rows, 1, 2),
  ];

  return trees.reduce((product, numTrees) => product * numTrees, 1);
}

function traverse(rows, slopeX, slopeY) {
  let x = 0;
  let y = 0;
  let numTrees = 0;

  while (y < rows.length) {
    const cols = rows[y].split('');
    numTrees += cols[x % cols.length] === '#' ? 1 : 0;
    x += slopeX;
    y += slopeY;
  }

  return numTrees;
}
