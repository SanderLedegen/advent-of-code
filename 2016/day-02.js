const fs = require('fs');
const input = fs.readFileSync('./inputs/day-02.txt', 'utf-8');

console.log(partOne(input));
console.log(partTwo(input));

function partOne(input) {
  const lines = input.split('\n');
  const keypad = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];
  // Start initially on "5"
  let pointerX = 1;
  let pointerY = 1;
  let code = '';

  lines.forEach((line) => {
    line.split('').forEach((direction) => {
      switch (direction) {
        case 'U':
          pointerY = Math.max(pointerY - 1, 0);
          break;

        case 'R':
          pointerX = Math.min(pointerX + 1, 2);
          break;

        case 'L':
          pointerX = Math.max(pointerX - 1, 0);
          break;

        case 'D':
          pointerY = Math.min(pointerY + 1, 2);
          break;
      }
    });

    code += keypad[pointerY][pointerX];
  });

  return code;
}

function partTwo(input) {
  const lines = input.split('\n');
  const keypad = [
    [undefined, undefined, 1],
    [undefined, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [undefined, 'A', 'B', 'C'],
    [undefined, undefined, 'D'],
  ];
  // Start initially on "5"
  let pointerX = 0;
  let pointerY = 2;
  let code = '';

  lines.forEach((line) => {
    line.split('').forEach((direction) => {
      switch (direction) {
        case 'U':
          if (
            keypad[pointerY - 1] !== undefined &&
            keypad[pointerY - 1][pointerX] !== undefined
          ) {
            pointerY -= 1;
          }
          break;

        case 'R':
          if (
            keypad[pointerY] !== undefined &&
            keypad[pointerY][pointerX + 1] !== undefined
          ) {
            pointerX += 1;
          }
          break;

        case 'L':
          if (
            keypad[pointerY] !== undefined &&
            keypad[pointerY][pointerX - 1] !== undefined
          ) {
            pointerX -= 1;
          }
          break;

        case 'D':
          if (
            keypad[pointerY + 1] !== undefined &&
            keypad[pointerY + 1][pointerX] !== undefined
          ) {
            pointerY += 1;
          }
          break;
      }
    });

    code += keypad[pointerY][pointerX];
  });

  return code;
}
