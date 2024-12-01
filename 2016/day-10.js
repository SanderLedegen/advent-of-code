const fs = require('fs');
const input = fs.readFileSync('./inputs/day-10.txt', 'utf-8');

partOne(input, 17, 61);
partTwo(input);

function partOne(input, compareMin, compareMax) {
  const bots = parseInput(input);

  let actionBot = findBotWithTwoValues(bots);

  while (actionBot) {
    act(bots, actionBot, { min: compareMin, max: compareMax });
    actionBot = findBotWithTwoValues(bots);
  }
}

function partTwo(input) {
  const bots = parseInput(input);

  let actionBot = findBotWithTwoValues(bots);

  while (actionBot) {
    act(bots, actionBot);
    actionBot = findBotWithTwoValues(bots);
  }

  console.log(
    bots['output 0'].values[0] *
      bots['output 1'].values[0] *
      bots['output 2'].values[0]
  );
}

function act(bots, botName, compare = {}) {
  const bot = bots[botName];
  const min = Math.min(...bot.values);
  const max = Math.max(...bot.values);
  if (min === compare.min && max === compare.max) {
    console.log(botName);
  }
  bots[bot.low].values.push(min);
  bots[bot.high].values.push(max);
  bot.values = [];
}

function findBotWithTwoValues(bots) {
  return Object.keys(bots).find((botName) => {
    return bots[botName].values.length === 2;
  });
}

function parseInput(input) {
  const bots = {};

  input.split('\n').forEach((line) => {
    if (line.startsWith('bot')) {
      const matches = line.split(/^(bot \d+).+?(\w+ \d+).+?(\w+ \d+)/g);

      bots[matches[1]] = bots[matches[1]] || {
        values: [],
        low: undefined,
        high: undefined,
      };
      bots[matches[1]].low = matches[2];
      bots[matches[1]].high = matches[3];

      bots[matches[2]] = bots[matches[2]] || {
        values: [],
        low: undefined,
        high: undefined,
      };

      bots[matches[3]] = bots[matches[3]] || {
        values: [],
        low: undefined,
        high: undefined,
      };
    } else if (line.startsWith('value')) {
      const matches = line.split(/^value (\d+).*?(\w+ \d+)/g);

      bots[matches[2]] = bots[matches[2]] || {
        values: [],
        low: undefined,
        high: undefined,
      };
      bots[matches[2]].values.push(+matches[1]);
    }
  });

  return bots;
}
