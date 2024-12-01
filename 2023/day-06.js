import { readFileSync } from 'fs';

let input = readFileSync('2023/inputs/day-06.txt', 'utf-8');

const getDistance = (chargeTime, durationRace) => {
  return Math.max(0, chargeTime * durationRace - chargeTime ** 2);
};

const range = (range) => Array.from({ length: range }, (_, i) => i + 1);

const getAmountOfWins = (time, recordDist) => {
  return range(time).reduce((count, x) => {
    const dist = getDistance(x, time);
    return dist > recordDist ? count + 1 : count;
  }, 0);
};

function partOne(input) {
  const matches = input.match(/(\d+)/g).map(Number);
  const races = [];
  for (let ii = 0; ii < matches.length / 2; ii += 1) {
    races.push([matches[ii], matches[ii + matches.length / 2]]);
  }

  return races.reduce((product, [time, recordDist]) => {
    const amount = getAmountOfWins(time, recordDist);
    return product * amount;
  }, 1);
}

function partTwo(input) {
  const matches = input.match(/(\d+)/g);
  const time = +matches.slice(0, matches.length / 2).join('');
  const recordDist = +matches.slice(matches.length / 2).join('');
  
  return getAmountOfWins(time, recordDist);
}

console.log(partOne(input));
console.log(partTwo(input));
