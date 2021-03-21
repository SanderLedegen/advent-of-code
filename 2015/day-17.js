const fs = require('fs');
let input = fs.readFileSync('./inputs/day-17.txt', 'utf-8');

console.log(partOne(input, 150));
console.log(partTwo(input, 150));

function partOne(input, liters) {
  const containers = input.split('\n').map(Number);
  const combinations = getCombinations(containers);
  return combinations.filter((c) => liters === c.reduce((sum, curr) => sum + curr, 0)).length;
}

function partTwo(input, liters) {
  const containers = input.split('\n').map(Number);

  const combinations = getCombinations(containers);
  const possibleCombinations = combinations.filter(
    (c) => liters === c.reduce((sum, curr) => sum + curr, 0)
  );

  const numLeastContainers = possibleCombinations.reduce(
    (min, curr) => Math.min(min, curr.length),
    Infinity
  );

  return possibleCombinations.reduce((sum, curr) => {
    sum += curr.length === numLeastContainers ? 1 : 0;
    return sum;
  }, 0);
}

function getCombinations(arr) {
  const result = [];

  const f = function (prev, arr) {
    for (let i = 0; i < arr.length; i++) {
      result.push([...prev, arr[i]]);
      f([...prev, arr[i]], arr.slice(i + 1));
    }
  };

  f([], arr);

  return result;
}
