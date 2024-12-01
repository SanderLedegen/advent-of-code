const fs = require('fs');
let input = fs.readFileSync('./inputs/day-12.txt', 'utf-8');

console.log(partOne(input));
console.log(partTwo(input));

function partOne(input) {
  return input.match(/-?\d+/g).reduce((sum, val) => sum + +val, 0);
}

function partTwo(input) {
  const resolve = (nodes) => {
    let sum = 0;

    nodes.forEach(node => {
      if (typeof node === 'number') {
        sum += node;
      } else if (Array.isArray(node)) {
        sum += resolve(node);
      } else if (typeof node === 'object') {
        const values = Object.values(node);
        if (!values.includes('red')) {
          sum += resolve(values);
        }
      }
    });

    return sum;
  };

  const nodes = JSON.parse(input);

  return resolve(nodes);
}
