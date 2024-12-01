const fs = require('fs');
const input = fs.readFileSync('./inputs/day-03.txt', 'utf-8');

console.log(partOne(input));
console.log(partTwo(input));

function partOne(input) {
  const locations = new Set();
  let x = 0, y = 0;

  locations.add(`${x},${y}`);

  input.split('').forEach(char => {
    switch (char) {
      case '^':
        y -= 1;
        break;

      case 'v':
        y += 1;
        break;

      case '<':
        x -= 1;
        break;

      case '>':
        x += 1;
        break;
    }

    locations.add(`${x},${y}`);
  });

  return locations.size;
}

function partTwo(input) {
  const santaLocations = new Set();
  const roboSantaLocations = new Set();

  let santaX = 0;
  let santaY = 0;
  let roboSantaX = 0;
  let roboSantaY = 0;

  santaLocations.add(`${santaX},${santaY}`);
  roboSantaLocations.add(`${roboSantaX},${roboSantaY}`);

  input.split('').forEach((char, idx) => {
    switch (char) {
      case '^':
        idx % 2 === 0 ? santaY -= 1 : roboSantaY -= 1;
        break;

      case 'v':
        idx % 2 === 0 ? (santaY += 1) : (roboSantaY += 1);
        break;

      case '<':
        idx % 2 === 0 ? (santaX -= 1) : (roboSantaX -= 1);
        break;

      case '>':
        idx % 2 === 0 ? (santaX += 1) : (roboSantaX += 1);
        break;
    }

    santaLocations.add(`${santaX},${santaY}`);
    roboSantaLocations.add(`${roboSantaX},${roboSantaY}`);
  });

  return new Set([...santaLocations, ...roboSantaLocations]).size;
}


