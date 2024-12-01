const fs = require('fs');
const input = fs.readFileSync('./inputs/day-06.txt', 'utf-8');

const GRID_WIDTH = 1000;
const GRID_HEIGHT = 1000;

console.log(partOne(parseInput(input)));
console.log(partTwo(parseInput(input)));

function partOne(instructions) {
  const grid = new Array(GRID_HEIGHT)
    .fill(0)
    .map(() => new Array(GRID_WIDTH).fill(0));

  instructions.forEach(instr => {
    switch (instr.op) {
      case 'turn off':
        for (let yy = instr.y1; yy <= instr.y2; yy += 1) {
          for (let xx = instr.x1; xx <= instr.x2; xx += 1) {
            grid[yy][xx] = 0;
          }
        }
        break;

      case 'turn on':
        for (let yy = instr.y1; yy <= instr.y2; yy += 1) {
          for (let xx = instr.x1; xx <= instr.x2; xx += 1) {
            grid[yy][xx] = 1;
          }
        }
        break;

      case 'toggle':
        for (let yy = instr.y1; yy <= instr.y2; yy += 1) {
          for (let xx = instr.x1; xx <= instr.x2; xx += 1) {
            grid[yy][xx] = grid[yy][xx] === 1 ? 0 : 1;
          }
        }
        break;
    }
  });

  let sum = 0;

  for (let yy = 0; yy < GRID_HEIGHT; yy += 1) {
    for (let xx = 0; xx < GRID_WIDTH; xx += 1) {
      sum += grid[yy][xx];
    }
  }

  return sum;
}

function partTwo(instructions) {
  const grid = new Array(GRID_HEIGHT)
    .fill(0)
    .map(() => new Array(GRID_WIDTH).fill(0));

  instructions.forEach((instr) => {
    switch (instr.op) {
      case 'turn off':
        for (let yy = instr.y1; yy <= instr.y2; yy += 1) {
          for (let xx = instr.x1; xx <= instr.x2; xx += 1) {
            grid[yy][xx] = Math.max(0, grid[yy][xx] - 1);
          }
        }
        break;

      case 'turn on':
        for (let yy = instr.y1; yy <= instr.y2; yy += 1) {
          for (let xx = instr.x1; xx <= instr.x2; xx += 1) {
            grid[yy][xx] += 1;
          }
        }
        break;

      case 'toggle':
        for (let yy = instr.y1; yy <= instr.y2; yy += 1) {
          for (let xx = instr.x1; xx <= instr.x2; xx += 1) {
            grid[yy][xx] += 2;
          }
        }
        break;
    }
  });

  let brightness = 0;

  for (let yy = 0; yy < GRID_HEIGHT; yy += 1) {
    for (let xx = 0; xx < GRID_WIDTH; xx += 1) {
      brightness += grid[yy][xx];
    }
  }

  return brightness;
}

function parseInput(input) {
  return input
    .split('\n')
    .reduce((instructions, line) => {
      const groups = line.split(/(\d+),(\d+)[a-z\s]+(\d+),(\d+)/);
      instructions.push({
        op: groups[0].trim(),
        x1: +groups[1],
        y1: +groups[2],
        x2: +groups[3],
        y2: +groups[4],
      })
      return instructions;
    }, []);
}
