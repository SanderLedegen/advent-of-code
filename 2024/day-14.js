import { readFileSync, writeFileSync } from 'fs';

const input = readFileSync('2024/inputs/day-14.txt', 'utf-8');
const roomWidth = 101;
const roomHeight = 103;

function step(robots) {
  robots.forEach((robot) => {
    if (robot.x + robot.vx >= 0) {
      robot.x = (robot.x + robot.vx) % roomWidth;
    } else {
      robot.x = (roomWidth - Math.abs(robot.x + robot.vx)) % roomWidth;
    }

    if (robot.y + robot.vy >= 0) {
      robot.y = (robot.y + robot.vy) % roomHeight;
    } else {
      robot.y = (roomHeight - Math.abs(robot.y + robot.vy)) % roomHeight;
    }
  });
}

function partOne(robots) {
  for (let second = 1; second <= 100; second += 1) {
    step(robots);
  }

  const quadWidth = Math.floor(roomWidth / 2);
  const quadHeight = Math.floor(roomHeight / 2);

  return robots
    .reduce(
      (quadCount, robot) => {
        if (robot.x < quadWidth && robot.y < quadHeight) {
          quadCount[0] += 1;
        } else if (robot.x > quadWidth && robot.y < quadHeight) {
          quadCount[1] += 1;
        } else if (robot.x < quadWidth && robot.y > quadHeight) {
          quadCount[2] += 1;
        } else if (robot.x > quadWidth && robot.y > quadHeight) {
          quadCount[3] += 1;
        }
        return quadCount;
      },
      [0, 0, 0, 0]
    )
    .reduce((product, count) => product * count, 1);
}

function partTwo(robots) {
  for (let second = 1; second <= 10_000; second += 1) {
    step(robots);

    const robotsOnSameSpot = robots.some((robot) => {
      return robots.some((other) => robot !== other && robot.x === other.x && robot.y === other.y);
    });

    if (!robotsOnSameSpot) {
      print(second, robots);
    }
  }
}

function parseInput(input) {
  return input.split('\n').reduce((robots, line) => {
    const [x, y, vx, vy] = line.match(/-?\d+/g).map(Number);
    robots.push({ x, y, vx, vy });
    return robots;
  }, []);
}

function print(second, robots) {
  let data = `Second: ${second}\n`;

  for (let yy = 0; yy < roomHeight; yy += 1) {
    let line = '';
    for (let xx = 0; xx < roomWidth; xx += 1) {
      if (robots.some((robot) => robot.x === xx && robot.y === yy)) {
        line += '█';
      } else {
        line += ' ';
      }
    }
    data += line + '\n';
  }

  data += '\n';

  writeFileSync('./day-14.txt', data, { flag: 'a', encoding: 'utf-8' });
}

console.log(partOne(parseInput(input)));
console.log(partTwo(parseInput(input)));
