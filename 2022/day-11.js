import { readFileSync } from 'fs';

let input = readFileSync('2022/inputs/day-11.txt', 'utf-8');

function parseInput(input) {
  const lines = input.split('\n');
  const monkeys = [];

  for (let ii = 0; ii < lines.length; ii += 7) {
    const id = +lines[ii].match(/(\d+)/).at(0);
    const items = lines[ii + 1].split('Starting items: ').at(1).split(', ').map(Number);
    const operation = lines[ii + 2].split('Operation: new = ').at(1);
    const test = +lines[ii + 3].match(/(\d+)/).at(0);
    const ifTrue = +lines[ii + 4].match(/(\d+)/).at(0);
    const ifFalse = +lines[ii + 5].match(/(\d+)/).at(0);

    monkeys.push({
      id,
      items,
      operation,
      test,
      ifTrue,
      ifFalse,
      numInspections: 0,
    });
  }

  return monkeys;
}

function partOne(monkeys) {
  for (let round = 1; round <= 20; round += 1) {
    for (let monkey of monkeys) {
      if (!monkey.items) {
        continue;
      }

      while (monkey.items.length) {
        monkey.numInspections += 1;
        const item = monkey.items.shift();
        const newItem = eval(monkey.operation.replaceAll('old', item));
        const relief = Math.floor(newItem / 3);

        if (relief % monkey.test === 0) {
          monkeys[monkey.ifTrue].items.push(relief);
        } else {
          monkeys[monkey.ifFalse].items.push(relief);
        }
      }
    }
  }

  return monkeys
    .sort((a, b) => b.numInspections - a.numInspections)
    .slice(0, 2)
    .reduce((level, monkey) => level * monkey.numInspections, 1);
}

function partTwo(monkeys) {
  const divisor = monkeys.reduce((product, monkey) => product * monkey.test, 1);

  for (let round = 1; round <= 10_000; round += 1) {
    for (let monkey of monkeys) {
      if (!monkey.items) {
        continue;
      }

      while (monkey.items.length) {
        monkey.numInspections += 1;
        const item = monkey.items.shift();
        const [left, op, right] = monkey.operation.replaceAll('old', `${item}`).split(' ');
        const relief = eval(`(${left} ${op} ${right}) % ${divisor}`);

        if (relief % monkey.test === 0) {
          monkeys[monkey.ifTrue].items.push(relief);
        } else {
          monkeys[monkey.ifFalse].items.push(relief);
        }
      }
    }
  }

  return monkeys
    .sort((a, b) => b.numInspections - a.numInspections)
    .slice(0, 2)
    .reduce((level, monkey) => level * monkey.numInspections, 1);
}

console.log(partOne(parseInput(input)));
console.log(partTwo(parseInput(input)));
