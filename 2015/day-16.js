const fs = require('fs');
let input = fs.readFileSync('./inputs/day-16.txt', 'utf-8');

const tickerInput = `children: 3
cats: 7
samoyeds: 2
pomeranians: 3
akitas: 0
vizslas: 0
goldfish: 5
trees: 3
cars: 2
perfumes: 1`;

console.log(partOne(input));
console.log(partTwo(input));

function partOne(input) {
  const ticker = tickerInput.split('\n').reduce((map, line) => {
    const parts = line.split(': ');
    map[parts[0]] = +parts[1];
    return map;
  }, {});

  return (
    parseInput(input).findIndex((s) => {
      const propNames = Object.keys(s);
      for (let ii = 0; ii < propNames.length; ii += 1) {
        const propName = propNames[ii];

        const match = ticker[propName] === s[propName];
        if (!match) {
          return false;
        }
      }

      return true;
    }) + 1 // The number of aunt Sue is not zero based
  );
}

function partTwo(input) {
  const ticker = tickerInput.split('\n').reduce((map, line) => {
    const parts = line.split(': ');
    map[parts[0]] = +parts[1];
    return map;
  }, {});

  return (
    parseInput(input).findIndex((s) => {
      const propNames = Object.keys(s);
      for (let ii = 0; ii < propNames.length; ii += 1) {
        const propName = propNames[ii];
        let match;

        switch (propName) {
          case 'cats':
          case 'trees':
            match = ticker[propName] < s[propName];
            break;

          case 'pomeranians':
          case 'goldfish':
            match = ticker[propName] > s[propName];
            break;

          default:
            match = ticker[propName] === s[propName];
        }

        if (!match) {
          return false;
        }
      }

      return true;
    }) + 1 // The number of aunt Sue is not zero based
  );
}

function parseInput(input) {
  return input.split('\n').map((line, idx) => {
    const props = line.substring(line.indexOf(':') + 2);
    const parts = props.split(', ');
    const ret = {};

    parts.forEach((p) => {
      const subParts = p.split(': ');
      ret[subParts[0]] = +subParts[1];
    });

    return ret;
  });
}
