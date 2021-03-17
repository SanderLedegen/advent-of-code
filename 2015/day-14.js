const fs = require('fs');
let input = fs.readFileSync('./inputs/day-14.txt', 'utf-8');

console.log(partOne(input, 2503).distance);
console.log(partTwo(input, 2503).points);

function partOne(input, time) {
  const reindeer = parseInput(input).map((r) => ({ ...r, distance: 0 }));

  return reindeer.reduce(
    (winner, deer) => {
      const numCompleteCycles = Math.floor(time / (deer.duration + deer.rest));
      const remainder = time % (deer.duration + deer.rest);

      const distCompleteCycles = numCompleteCycles * deer.speed * deer.duration;
      const distRemainder = Math.min(remainder, deer.duration) * deer.speed;

      deer.distance = distCompleteCycles + distRemainder;

      if (deer.distance > winner.distance) {
        return deer;
      } else {
        return winner;
      }
    },
    { distance: 0 }
  );
}

function partTwo(input, time) {
  const reindeer = parseInput(input).map((r) => ({
    ...r,
    distance: 0,
    points: 0,
    flyTimer: r.duration,
    restTimer: r.rest,
  }));

  for (let sec = 0; sec < time; sec += 1) {
    reindeer.forEach((deer) => {
      if (deer.flyTimer > 0) {
        deer.distance += deer.speed;
        deer.flyTimer -= 1;
      } else {
        deer.restTimer -= 1;
        if (deer.restTimer === 0) {
          deer.flyTimer = deer.duration;
          deer.restTimer = deer.rest;
        }
      }
    });

    reindeer.sort((a, b) => {
      return b.distance - a.distance;
    });

    reindeer[0].points += 1;
    const winningDistance = reindeer[0].distance;

    // Tie with other reindeer?
    for (let ii = 1; ii < reindeer.length; ii += 1) {
      if (reindeer[ii].distance === winningDistance) {
        reindeer[ii].points += 1;
      } else {
        // Reindeer are sorted on distance so it's safe to break
        break;
      }
    }
  }

  return reindeer.reduce(
    (winner, deer) => {
      if (deer.points > winner.points) {
        return deer;
      } else {
        return winner;
      }
    },
    { points: 0 }
  );
}

function parseInput(input) {
  return input.split('\n').reduce((list, line) => {
    const regex = /(\w+) can fly (\d+) km\/s for (\d+) .*?(\d+) seconds\.$/g;
    const [, name, speed, duration, rest] = regex.exec(line);

    const reindeer = {
      name,
      speed: +speed,
      duration: +duration,
      rest: +rest,
    };

    list.push(reindeer);

    return list;
  }, []);
}
