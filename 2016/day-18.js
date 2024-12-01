const fs = require('fs');
const input = fs.readFileSync('./inputs/day-18.txt', 'utf-8');

console.log(partOne(input, 40));
console.log(partOne(input, 400_000));

function partOne(startingRow, numRows) {
  let previousRow = startingRow.split('');
  let sum = previousRow.reduce((sum, char) => sum + (char === '.' ? 1 : 0), 0);

  for (let idx = 1; idx < numRows; idx += 1) {
    let newRow = new Array(previousRow.length);
    
    for (let w = 0; w < newRow.length; w += 1) {
      newRow[w] = isTrap(previousRow, w) ? '^' : '.';
      sum += newRow[w] === '.' ? 1 : 0;
    }

    previousRow = newRow;
  }
  
  return sum;
}

function isTrap(previousRow, index) {
  const left = index - 1 < 0 ? '.' : previousRow[index - 1];
  const center = previousRow[index];
  const right = index + 1 > previousRow.length - 1 ? '.' : previousRow[index + 1];

  return (
    (left === '^' && center === '^' && right !== '^') || // Rule 1
    (left !== '^' && center === '^' && right === '^') || // Rule 2
    (left === '^' && center !== '^' && right !== '^') || // Rule 3
    (left !== '^' && center !== '^' && right === '^') // Rule 4
  );
}
