const fs = require('fs');
let input = fs.readFileSync('./inputs/day-06.txt', 'utf-8');

console.log(count(input, 80));
console.log(count(input, 256));

function count(input, days) {
  let fish = {
    0: 0n,
    1: 0n,
    2: 0n,
    3: 0n,
    4: 0n,
    5: 0n,
    6: 0n,
    7: 0n,
    8: 0n,
  };

  for (let age of input.split(',').map(Number)) {
    fish[age] += 1n;
  }

  for (let day = 1; day <= days; day += 1) {
    const numAgeZeroFish = fish[0];

    for (let age = 0; age <= 7; age += 1) {
      fish[age] = fish[age + 1];
    }

    fish[6] += numAgeZeroFish;
    fish[8] = numAgeZeroFish;
  }

  return Object.values(fish).reduce((sum, value) => (sum += value), 0n);
}
