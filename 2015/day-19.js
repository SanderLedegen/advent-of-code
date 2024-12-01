const fs = require('fs');
let input = fs.readFileSync('./inputs/day-19.txt', 'utf-8');

console.log(partOne(input));
console.log(partTwo(input));

function partOne(input) {
  const { replacements, molecule } = parseInput(input);
  const distinctMolecules = new Set();

  const moleculeParts = molecule
    .replace(/([A-Z])/g, ' $1')
    .trim()
    .split(' ');

  moleculeParts.forEach((part, idx) => {
    const existingReplacements = replacements[part] || [];
    existingReplacements.forEach((replacement) => {
      const prefix = moleculeParts.slice(0, idx).join('');
      const suffix = moleculeParts.slice(idx + 1).join('');
      distinctMolecules.add(`${prefix}${replacement}${suffix}`);
    });
  });

  return distinctMolecules.size;
}

function partTwo(input) {
  let { replacements, molecule } = parseInput(input);

  const reverseReplacements = Object.keys(replacements).reduce((map, key) => {
    replacements[key].forEach((r) => {
      map[r] = map[r] || [];
      map[r].push(key);
    });

    return map;
  }, {});

  let steps = 0;

  while (molecule !== 'e') {
    Object.entries(reverseReplacements).forEach(([element, replacement]) => {
      if (molecule.includes(element)) {
        molecule = molecule.replace(element, replacement[0]);
        steps += 1;
      }
    });
  }

  return steps;
}

function parseInput(input) {
  const lines = input.split('\n');

  return lines.reduce(
    (ret, line) => {
      const parts = line.split(' => ');

      if (parts.length !== 2) {
        ret.molecule = parts[0];
        return ret;
      }

      if (ret.replacements[parts[0]]) {
        ret.replacements[parts[0]].push(parts[1]);
      } else {
        ret.replacements[parts[0]] = [parts[1]];
      }

      return ret;
    },
    { replacements: {}, molecule: '' }
  );
}
