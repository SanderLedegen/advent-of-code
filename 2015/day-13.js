const fs = require('fs');
let input = fs.readFileSync('./inputs/day-13.txt', 'utf-8');

console.log(partOne(input));
console.log(partTwo(input));

function partOne(input) {
  const map = parseInput(input);
  let persons = Object.keys(map);

  const arrangements = generateTableArrangements(persons);

  return arrangements.reduce((max, table) => {
    const happiness = calcHappiness(table, map);
    return Math.max(max, happiness);
  }, 0);
}

function partTwo(input) {
  const map = parseInput(input);
  map['Myself'] = {};

  let persons = Object.keys(map);
  persons.forEach((person) => {
    map['Myself'][person] = 0;

    if (person === 'Myself') return;
    map[person]['Myself'] = 0;
  });

  persons = Object.keys(map);

  const arrangements = generateTableArrangements(persons);

  return arrangements.reduce((max, table) => {
    const happiness = calcHappiness(table, map);
    return Math.max(max, happiness);
  }, 0);
}

function generateTableArrangements(persons) {
  // Lazy as fuck, I know, but if it works... ¯\_(ツ)_/¯
  const shuffle = (a) => {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    return a;
  };

  const set = new Set();

  for (let ii = 0; ii < 100_000; ii += 1) {
    set.add(shuffle(persons).join(','));
  }

  return Array.from(set).map((personString) => personString.split(','));
}

function calcHappiness(table, map) {
  return table.reduce((sum, person, idx) => {
    const rightPerson = table[(idx + 1) % table.length];
    const leftPerson = table[idx === 0 ? table.length - 1 : idx - 1];

    return sum + map[person][rightPerson] + map[person][leftPerson];
  }, 0);
}

function parseInput(input) {
  return input.split('\n').reduce((map, line) => {
    const [, persA, res, amount, persB] = /(\w+).*?(gain|lose).*?(\d+).*?(\w+)\.$/g.exec(line);
    if (!map[persA]) {
      map[persA] = {};
    }

    map[persA][persB] = res === 'gain' ? +amount : -amount;

    return map;
  }, {});
}
