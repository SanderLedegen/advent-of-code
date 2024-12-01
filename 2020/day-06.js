const fs = require('fs');
let input = fs.readFileSync('./inputs/day-06.txt', 'utf-8');

// input = `abc

// a
// b
// c

// ab
// ac

// a
// a
// a
// a

// b`;

console.log(partOne(input));
console.log(partTwo(input));

function partOne(input) {
  const groups = parseInput(input);

  return groups.reduce((count, group) => {
    const set = new Set();
    group.forEach(person => person.split('').forEach(answer => set.add(answer)));

    return count + set.size;
  }, 0);
}

function partTwo(input) {
  const groups = parseInput(input);
  return groups.reduce((count, group) => {
    
    const map = group.reduce((map, person) => {
      person.split('').forEach(char => {
        if (!map[char]) {
          map[char] = 0;
        }

        map[char] += 1;
      });

      return map;
    }, {});

    Object.entries(map).forEach(([key, val]) => {
      if (val === group.length) {
        count += 1;
      }
    })

    return count;
  }, 0);
}

function parseInput(input) {
  const lines = input.split('\n');
  const groups = [];
  let group = [];

  lines.forEach((line, idx) => {
    if (line.length) {
      group.push(line);
    }

    if (!line.length || idx === lines.length - 1) {
      groups.push(group);
      group = [];
    }
  });

  return groups;
}
