const fs = require('fs');
let input = fs.readFileSync('./inputs/day-09.txt', 'utf-8');

console.log(partOneAndTwo(input));

function partOneAndTwo(input) {
  const { cities, distances } = parseInput(input);

  const permutations = permutator(Array.from(cities));

  return permutations.reduce((minMax, perm) => {
    let dist = 0;

    for (let ii = 0; ii < perm.length - 1; ii++) {
      let a = perm[ii];
      let b = perm[ii + 1];

      if (!distances[a] || !distances[a][b]) {
        [b, a] = [a, b];
      }

      dist += distances[a][b];
    }

    return {
      min: Math.min(dist, minMax.min),
      max: Math.max(dist, minMax.max),
    };
  }, { min: Infinity, max: -Infinity });
}

function parseInput(input) {
  const cities = new Set();

  const distances = input.split('\n').reduce((list, line) => {
    const [, from, to, dist] = line.match(/(\w+) to (\w+) = (\d+)/);
    cities.add(from);
    cities.add(to);

    if (!list[from]) {
      list[from] = {};
    }

    list[from] = { ...list[from], [to]: +dist };
    return list;
  }, {});

  return { cities, distances };
}

function permutator(inputArr) {
  let result = [];

  const permute = (arr, m = []) => {
    if (arr.length === 0) {
      result.push(m);
    } else {
      for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice();
        let next = curr.splice(i, 1);
        permute(curr.slice(), m.concat(next));
      }
    }
  };

  permute(inputArr);

  return result;
}
