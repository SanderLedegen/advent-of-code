const fs = require('fs');
let input = fs.readFileSync('./inputs/day-23.txt', 'utf-8');

console.log(partOne(input));
console.log(partTwo(input));

function partOne(input) {
  const instructions = parseInput(input);

  const registers = {
    a: 0,
    b: 0,
  };

  const { b } = interpret(registers, instructions);

  return b;
}

function partTwo() {
  const instructions = parseInput(input);

  const registers = {
    a: 1,
    b: 0,
  };

  const { b } = interpret(registers, instructions);

  return b;
}

function interpret(registers, instructions) {
  let ip = 0;

  while (ip < instructions.length) {
    const instr = instructions[ip];

    if (!instr) {
      break;
    }

    switch (instr.op) {
      case 'hlf': {
        registers[instr.reg] = Math.floor(registers[instr.reg] / 2);
        ip += 1;
        break;
      }
      case 'tpl': {
        registers[instr.reg] *= 3;
        ip += 1;
        break;
      }
      case 'inc': {
        registers[instr.reg] += 1;
        ip += 1;
        break;
      }
      case 'jmp': {
        ip += instr.value;
        break;
      }
      case 'jie': {
        if (registers[instr.reg] % 2 === 0) {
          ip += instr.value;
        } else {
          ip += 1;
        }
        break;
      }
      case 'jio': {
        if (registers[instr.reg] === 1) {
          ip += instr.value;
        } else {
          ip += 1;
        }
        break;
      }
      default:
        throw `Unknown op code ${instr.op}`;
    }
  }

  return registers;
}

function parseInput(input) {
  return input.split('\n').reduce((instructions, line) => {
    const split = line.split(',');
    const ssplit = split[0].split(' ');

    const instruction = {
      op: ssplit[0],
      reg: ssplit[1].length === 1 ? ssplit[1] : undefined,
      value: split[1]
        ? parseInt(split[1])
        : !isNaN(parseInt(ssplit[1]))
        ? parseInt(ssplit[1])
        : undefined,
    };

    instructions.push(instruction);

    return instructions;
  }, []);
}
