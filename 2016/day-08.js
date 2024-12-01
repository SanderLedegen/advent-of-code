const fs = require('fs');
const input = fs.readFileSync('./inputs/day-08.txt', 'utf-8');

console.log(partOneAndTwo(50, 6, input));

function partOneAndTwo(screenWidth, screenHeight, input) {
  const instructions = input.split('\n').map((line) => {
    let type, a, b;

    if (line.startsWith('rect')) {
      const matches = line.split(/(rect)\s(\d+)x(\d+)/g);
      type = matches[1];
      a = +matches[2];
      b = +matches[3];
    } else if (line.startsWith('rotate')) {
      const matches = line.split(
        /rotate\s(column|row)\s(?:x|y)=(\d+)\sby\s(\d+)/g
      );
      type = matches[1];
      a = +matches[2];
      b = +matches[3];
    }

    return {
      type,
      a,
      b,
    };
  });

  const screen = new Array(screenHeight)
    .fill(0)
    .map(() => new Array(screenWidth).fill(0));

  instructions.forEach((instruction) => {
    switch (instruction.type) {
      case 'rect':
        for (let yy = 0; yy < instruction.b; yy += 1) {
          for (let xx = 0; xx < instruction.a; xx += 1) {
            screen[yy][xx] = 1;
          }
        }
        break;

      case 'column':
        const colCopy = [];
        for (let yy = 0; yy < screen.length; yy += 1) {
          colCopy.push(screen[yy][instruction.a]);
        }

        for (let yy = 0; yy < screen.length; yy += 1) {
          const idx = (yy + instruction.b) % screen.length;
          screen[idx][instruction.a] = colCopy[yy];
        }
        break;

      case 'row':
        const rowCopy = screen[instruction.a].slice();
        for (let xx = 0; xx < screen[instruction.a].length; xx += 1) {
          const idx = (xx + instruction.b) % screen[instruction.a].length;
          screen[instruction.a][idx] = rowCopy[xx];
        }
        break;
    }
  });
  
  printScreen(screen);

  let pixelsLit = 0;

  for (let yy = 0; yy < screen.length; yy += 1) {
    for (let xx = 0; xx < screen[yy].length; xx += 1) {
      pixelsLit += screen[yy][xx];
    }
  }

  return pixelsLit;
}

function printScreen(screen) {
  let buffer = '';

  for (let yy = 0; yy < screen.length; yy += 1) {
    for (let xx = 0; xx < screen[yy].length; xx += 1) {
      buffer += screen[yy][xx] === 1 ? '#' : '.';
    }

    buffer += '\n';
  }

  console.log(buffer);
}
