const fs = require('fs');
const input = fs.readFileSync('./inputs/day-12.txt', 'utf-8');

console.log(partOne(input));
console.log(partOne(input, { c: 1 }));

function partOne(input, registers) {
  const instructions = input.split('\n').map((instruction) => {
    const parts = instruction.split(' ');
    return {
      op: parts[0],
      x: isNaN(parts[1]) ? parts[1] : +parts[1],
      y: isNaN(parts[2]) ? parts[2] : +parts[2],
    };
  });

  const outputRegisters = interpret(instructions, registers);
  return outputRegisters.a;
}

function interpret(instructions, inputRegisters) {
  const defaultRegisters = {
    a: 0,
    b: 0,
    c: 0,
    d: 0,
  };
  
  const registers = {
    ...defaultRegisters,
    ...inputRegisters,
  };

  let pointer = 0;

  while (true) {
    const i = instructions[pointer];

    if (!i) {
      break;
    }

    switch (i.op) {
      case 'cpy':
        registers[i.y] = getValue(registers, i.x);
        pointer++;
        break;

      case 'inc':
        registers[i.x]++;
        pointer++;
        break;

      case 'dec':
        registers[i.x]--;
        pointer++;
        break;

      case 'jnz':
        if (getValue(registers, i.x) !== 0) {
          pointer += i.y;
        } else {
          pointer++;
        }
        break;
    }
  }

  return registers;
}

function getValue(registers, value) {
  return isNaN(value) ? registers[value] : +value;
}
