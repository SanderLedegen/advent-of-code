import { readFileSync } from 'fs';

const input = readFileSync('2024/inputs/day-05.txt', 'utf-8');

function parseInput(input) {
  const updates = [];
  const ruleMap = new Map();
  let isProcessingRules = true;

  const lines = input.split('\n');
  for (const line of lines) {
    if (line === '') {
      isProcessingRules = false;
      continue;
    }

    if (isProcessingRules) {
      const [left, right] = line.split('|').map(Number);
      const get = ruleMap.get(left);
      get ? ruleMap.set(left, [...get, right]) : ruleMap.set(left, [right]);
    } else {
      updates.push(line.split(',').map(Number));
    }
  }

  return { ruleMap, updates };
}

function partOne(validUpdates) {
  return validUpdates.reduce((sum, update) => sum + update[Math.floor(update.length / 2)], 0);
}

function partTwo(invalidUpdates) {
  for (let updateIdx = 0; updateIdx < invalidUpdates.length; updateIdx += 1) {
    const update = invalidUpdates[updateIdx];

    update.sort((a, b) => {
      const aRules = ruleMap.get(a) || [];
      const bRules = ruleMap.get(b) || [];

      if (aRules.includes(b)) return -1;
      if (bRules.includes(a)) return 1;
      return 0;
    });
  }

  return invalidUpdates.reduce((sum, update) => sum + update[Math.floor(update.length / 2)], 0);
}

const { ruleMap, updates } = parseInput(input);

const invalidUpdates = [];

const validUpdates = updates.filter((update) => {
  for (let pageNumIdx = 1; pageNumIdx < update.length; pageNumIdx += 1) {
    const after = update.slice(pageNumIdx);
    const valid = after.every((a) => {
      const b = ruleMap.get(a);
      if (!b) return true;
      return !b.includes(update[pageNumIdx - 1]);
    });

    if (!valid) {
      invalidUpdates.push(update);
      return false;
    }
  }

  return true;
});

console.log(partOne(validUpdates));
console.log(partTwo(invalidUpdates));
