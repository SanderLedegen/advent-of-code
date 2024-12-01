import { readFileSync } from 'fs';

const input = readFileSync('2023/inputs/day-02.txt', 'utf-8');

function parseInput(input) {
  const lines = input.split('\n');
  const games = [];

  for (let line of lines) {
    const id = +line.match(/Game (\d+):/).at(1);
    const sections = line.split(';');
    const sets = [];

    for (let section of sections) {
      const red = +section.match(/(\d+) red/)?.at(1) || 0;
      const green = +section.match(/(\d+) green/)?.at(1) || 0;
      const blue = +section.match(/(\d+) blue/)?.at(1) || 0;

      sets.push({ red, green, blue });
    }

    games.push({ id, sets });
  }

  return games;
}

function partOne(games) {
  const isGamePossible = (game) => {
    return game.sets.every(({ red, green, blue }) => red <= 12 && green <= 13 && blue <= 14);
  };

  return games.reduce((sum, game) => (isGamePossible(game) ? sum + game.id : sum), 0);
}

function partTwo(games) {
  const findMinimumPerGame = (game) => {
    return game.sets.reduce(
      (minObj, { red, green, blue }) => {
        return {
          red: red > 0 ? Math.max(red, minObj.red) : minObj.red,
          green: green > 0 ? Math.max(green, minObj.green) : minObj.green,
          blue: blue > 0 ? Math.max(blue, minObj.blue) : minObj.blue,
        };
      },
      { red: -Infinity, green: -Infinity, blue: -Infinity }
    );
  };

  return games.reduce((sum, game) => {
    const { red, green, blue } = findMinimumPerGame(game);
    return sum + red * green * blue;
  }, 0);
}

const games = parseInput(input);

console.log(partOne(games));
console.log(partTwo(games));
