const fs = require('fs');
const input = fs.readFileSync('./inputs/day-02.txt', 'utf-8');

const steps = input.split('\n');

console.log(partOne(steps));
console.log(partTwo(steps));

function partOne(steps) {
  let x = 0;
  let depth = 0;

  for (const step of steps) {
    const [dir, amount] = step.split(' ');

    if (dir === 'forward') x += +amount;
    if (dir === 'down') depth += +amount;
    if (dir === 'up') depth -= +amount;
  }

  return x * depth;
}

function partTwo(steps) {
  let x = 0;
  let depth = 0;
  let aim = 0;

  for (let step of steps) {
    const [dir, amount] = step.split(' ');

    if (dir === 'forward') {
      x += +amount;
      depth += aim * +amount;
    }
    if (dir === 'down') aim += +amount;
    if (dir === 'up') aim -= +amount;
  }

  return x * depth;
}
