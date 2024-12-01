import { readFileSync } from 'fs';

const input = readFileSync('2022/inputs/day-10.txt', 'utf-8');

function partOne(instructions) {
  const registers = {
    x: 1,
  };

  const cycles = [20, 60, 100, 140, 180, 220];
  let signalStrength = 0;
  let ptr = 0;

  for (let cycle = 1; ptr < instructions.length; cycle += 0) {
    const [op, arg] = instructions[ptr];

    switch (op) {
      case 'noop':
        for (let ii = 0; ii < 1; ii += 1) {
          if (cycles.includes(cycle)) {
            signalStrength += (cycle) * registers.x;
          }
          cycle += 1;
        }
        break;

      case 'addx':
        for (let ii = 0; ii < 2; ii += 1) {
          if (cycles.includes(cycle)) {
            signalStrength += (cycle) * registers.x;
          }
          cycle += 1;
        }
        registers.x += Number(arg);
        break;

      default:
        console.log(`Unknown operand ${op}`);
        break;
    }

    ptr += 1;
  }

  return signalStrength;
}

function partTwo(instructions) {
  const registers = {
    x: 1,
  };

  let ptr = 0;
  let screen = new Array(6);
  for (let ii = 0; ii < screen.length; ii += 1) {
    screen[ii] = new Array(40).fill(false);
  }

  for (let cycle = 1; ptr < instructions.length; cycle += 0) {
    const [op, arg] = instructions[ptr];

    switch (op) {
      case 'noop':
        for (let ii = 0; ii < 1; ii += 1) {
          const y = Math.floor((cycle - 1) / 40);
          screen[y][(cycle - 1) % 40] = Math.abs(registers.x - (cycle - 1) % 40) < 2;
          
          cycle += 1;
        }
        break;

      case 'addx':
        for (let ii = 0; ii < 2; ii += 1) {
          const y = Math.floor((cycle - 1) / 40);
          screen[y][(cycle - 1) % 40] = Math.abs(registers.x - (cycle - 1) % 40) < 2;

          cycle += 1;
        }
        registers.x += Number(arg);
        break;

      default:
        console.log(`Unknown operand ${op}`);
        break;
    }

    ptr += 1;
  }

  return screen.reduce((buffer, line) => {
    return buffer + line.map((_) => _ ? '█' : '.').join('') + '\n';
  }, '');
}

const instructions = input.split('\n').map((line) => line.split(' '));

console.log(partOne(instructions));
console.log(partTwo(instructions));
