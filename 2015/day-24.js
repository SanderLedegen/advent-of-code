const fs = require('fs');
let input = fs.readFileSync('./inputs/day-24.txt', 'utf-8');

console.log(partOne(input));
console.log(partTwo(input));

function partOne(input) {
  const weights = input.split('\n').map(Number).reverse();
  const sum = sumArr(weights);
  const weightPerGroup = sum / 3;

  const configurations = getWeightCombinations(weightPerGroup, weights);

  return findQE(configurations);
}

function partTwo(input) {
  const weights = input.split('\n').map(Number).reverse();
  const sum = sumArr(weights);
  const weightPerGroup = sum / 4;

  const configurations = getWeightCombinations(weightPerGroup, weights);

  return findQE(configurations);
}

function getWeightCombinations(targetWeight, weights, partial = [], combinations = []) {
  const sum = sumArr(partial);

  if (sum === targetWeight) {
    combinations.push(partial);
    return partial;
  } else if (sum > targetWeight) {
    return [];
  }

  for (let ii = 0; ii < weights.length; ii += 1) {
    const subWeights = weights.slice(ii + 1);
    getWeightCombinations(targetWeight, subWeights, partial.concat(weights[ii]), combinations);
  }

  return combinations;
}

function findQE(configurations) {
  const bestConfiguration = configurations.reduce(
    (bestConf, conf) => {
      if (conf.length < bestConf.numPackages) {
        bestConf = { numPackages: conf.length, qe: prodArr(conf) };
      } else if (conf.length === bestConf.numPackages && prodArr(conf) < bestConf.qe) {
        bestConf = { numPackages: conf.length, qe: prodArr(conf) };
      }

      return bestConf;
    },
    { numPackages: Infinity, qe: Infinity }
  );

  return bestConfiguration.qe;
}

function sumArr(arr) {
  return arr.reduce((sum, v) => sum + v, 0);
}

function prodArr(arr) {
  return arr.reduce((product, v) => product * v, 1);
}
