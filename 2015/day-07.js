const fs = require('fs');
const input = fs.readFileSync('./inputs/day-07.txt', 'utf-8');

let wires;

console.log(partOne(input));
console.log(partTwo(input));

function resolve(wire) {
  if (!isNaN(+wire)) {
    return wire;
  }

  if (isNaN(+wires[wire])) {
    const instruction = wires[wire];

    switch (instruction.op) {
      case 'SET':
        wires[wire] = resolve(instruction.value);
        break;

      case 'AND':
        wires[wire] =
          resolve(instruction.argA) & resolve(instruction.argB) & 0xffff;
        break;

      case 'OR':
        wires[wire] =
          (resolve(instruction.argA) | resolve(instruction.argB)) & 0xffff;
        break;

      case 'NOT':
        wires[wire] = ~resolve(instruction.argA) & 0xffff;
        break;

      case 'LSHIFT':
        wires[wire] = (resolve(instruction.argA) << instruction.argB) & 0xffff;
        break;

      case 'RSHIFT':
        wires[wire] = (resolve(instruction.argA) >> instruction.argB) & 0xffff;
        break;
    }
  }

  return wires[wire];
}

function partOne() {
  wires = parseInput(input);
  return resolve('a');
}

function partTwo(input) {
  wires = parseInput(input);
  const a = resolve('a');
  wires = parseInput(input);
  wires['b'] = a;
  return resolve('a');
}

function parseInput(input) {
  return input.split('\n').reduce((instructions, line) => {
    const groups = line.split(' -> ');

    let shiz = {};

    if (
      groups[0].includes('AND') ||
      groups[0].includes('OR') ||
      groups[0].includes('LSHIFT') ||
      groups[0].includes('RSHIFT')
    ) {
      const parts = groups[0].split(' ');
      const isShift = ['LSHIFT', 'RSHIFT'].includes(parts[1]);

      shiz = {
        op: parts[1],
        argA: parts[0],
        argB: isShift ? +parts[2] : parts[2],
      };
    } else if (groups[0].startsWith('NOT')) {
      shiz = { op: 'NOT', argA: groups[0].substring(4) };
    } else if (isNaN(+groups[0])) {
      shiz = { op: 'SET', value: groups[0] };
    } else {
      shiz = +groups[0];
    }

    instructions[groups[1]] = shiz;

    return instructions;
  }, {});
}
