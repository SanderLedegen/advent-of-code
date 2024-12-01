const fs = require('fs');
let input = fs.readFileSync('./inputs/day-07.txt', 'utf-8');

const rules = parseInput(input);

console.log(partOne(rules));
console.log(partTwo(rules));

function partOne(rules) {
  const uniqueBagColors = new Set();
  const queue = ['shiny gold'];

  while (queue.length > 0) {
    const target = queue.shift();

    Object.entries(rules).forEach(([outerBag, innerBags]) => {
  
      if (!innerBags.length) {
        return;
      }
  
      innerBags.forEach(bag => {
        if (bag.inner === target) {
          queue.push(outerBag);
          uniqueBagColors.add(outerBag);
        }
      });
    });
  }

  return uniqueBagColors.size;
}

function partTwo(rules) {
  const count = (bag) => {
    const innerBags = rules[bag];
    if (!innerBags.length) {
      return 0;
    }

    return innerBags.reduce((sum, innerBag) => {
      return (sum += count(innerBag.inner) * innerBag.amount + innerBag.amount);
    }, 0);
  };

  return count('shiny gold');
}

function parseInput(input) {
  return input.split('\n').reduce((rules, line) => {
    const split = line.split(' contain ');

    const outer = split[0].slice(0, -5);
    const innerBags = [];

    if (!split[1].startsWith('no')) {
      split[1].split(', ').forEach((s) => {
        const t = s.split(' ');
        innerBags.push({
          inner: `${t[1]} ${t[2]}`,
          amount: +t[0],
        });
      });
    }

    rules[outer] = innerBags;

    return rules;
  }, {});
}
