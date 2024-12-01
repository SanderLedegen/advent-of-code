const fs = require('fs');
let input = fs.readFileSync('./inputs/day-12.txt', 'utf-8');

console.log(partOne(input));
console.log(partTwo(input));

function partOne(input) {
  let x = 0;
  let y = 0;
  let facing = 'E';
  const dirs = 'NESW';

  input.split('\n').forEach((instr) => {
    const action = instr.substring(0, 1);
    const value = +instr.substring(1);

    switch (action) {
      case 'N':
        y -= value;
        break;

      case 'S':
        y += value;
        break;

      case 'E':
        x += value;
        break;

      case 'W':
        x -= value;
        break;

      case 'L':
        facing = dirs[(dirs.indexOf(facing) + value / 30) % 4];
        break;

      case 'R':
        facing = dirs[(dirs.indexOf(facing) + value / 90) % 4];
        break;

      case 'F':
        if (facing === 'N') y -= value;
        if (facing === 'S') y += value;
        if (facing === 'E') x += value;
        if (facing === 'W') x -= value;
        break;

      default:
        throw new Error(`Unknown action ${action}`);
    }
  });

  return Math.abs(x) + Math.abs(y);
}

function partTwo(input) {
  let waypoint = { x: 10, y: -1 };
  let ship = { x: 0, y: 0 };

  const rotate = (pos, angle) => {
    const cos = Math.cos(angle * Math.PI / 180) | 0;
    const sin = Math.sin(angle * Math.PI / 180) | 0;

    return {
      x: pos.x * cos + pos.y * -sin,
      y: pos.x * sin + pos.y * cos
    };
  };

  input.split('\n').forEach((instr) => {
    const action = instr.substring(0, 1);
    const value = +instr.substring(1);

    switch (action) {
      case 'N':
        waypoint.y -= value;
        break;

      case 'S':
        waypoint.y += value;
        break;

      case 'E':
        waypoint.x += value;
        break;

      case 'W':
        waypoint.x -= value;
        break;

      case 'L':
        waypoint = rotate(waypoint, -value);
        break;

      case 'R':
        waypoint = rotate(waypoint, value);
        break;

      case 'F':
        ship.x += value * waypoint.x;
        ship.y += value * waypoint.y;
        break;

      default:
        throw new Error(`Unknown action ${action}`);
    }
  });

  return Math.abs(ship.x) + Math.abs(ship.y);
}
