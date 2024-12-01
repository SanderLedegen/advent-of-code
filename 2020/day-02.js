const fs = require('fs');
const input = fs.readFileSync('./inputs/day-02.txt', 'utf-8');

const policies = parseInput(input);

console.log(partOne(policies));
console.log(partTwo(policies));

function partOne(policies) {
  return policies.filter((policy) => {
    const pattern = new RegExp(`${policy.char}`, 'g');
    const occurrences = (policy.string.match(pattern) || []).length;
    return occurrences >= policy.min && occurrences <= policy.max;
  }).length;
}

function partTwo(policies) {
  return policies.filter((policy) => {
    return (
      policy.string[policy.min - 1] === policy.char ^
      policy.string[policy.max - 1] === policy.char
    );
  }).length;
}

function parseInput(input) {
  return input.split('\n').reduce((policies, line) => {
    const groups = line.match(/(\d+)-(\d+)\s(\w):\s(\w+)/);
    policies.push({
      min: +groups[1],
      max: +groups[2],
      char: groups[3],
      string: groups[4],
    });

    return policies;
  }, []);
}
