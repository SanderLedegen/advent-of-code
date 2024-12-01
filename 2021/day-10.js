const fs = require('fs');
const input = fs.readFileSync('./inputs/day-10.txt', 'utf-8');

const openingChars = ['{', '[', '<', '('];
const closingCharMap = {
  '{': '}',
  '[': ']',
  '<': '>',
  '(': ')',
};

console.log(partOne(input));
console.log(partTwo(input));

function partOne(input) {
  const lines = input.split('\n');
  const scoreMap = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137,
  };
  let score = 0;

  for (const line of lines) {
    const chars = line.split('');
    const stack = [];

    for (let char of chars) {
      if (openingChars.includes(char)) {
        stack.push(char);
      } else {
        const lastOpeningChar = stack.pop();

        if (char !== closingCharMap[lastOpeningChar]) {
          score += scoreMap[char];
          break;
        }
      }
    }
  }

  return score;
}

function partTwo(input) {
  const lines = input.split('\n');
  const scoreMap = {
    ')': 1,
    ']': 2,
    '}': 3,
    '>': 4,
  };
  const scores = [];

  for (const line of lines) {
    const chars = line.split('');
    const stack = [];
    let isCorruptLine = false;

    for (let char of chars) {
      if (openingChars.includes(char)) {
        stack.push(char);
      } else {
        const lastOpeningChar = stack.pop();

        if (char !== closingCharMap[lastOpeningChar]) {
          isCorruptLine = true;
          break;
        }
      }
    }

    if (isCorruptLine) {
      continue;
    }

    let score = 0;

    while (stack.length) {
      score *= 5;
      const char = stack.pop();
      const closingChar = closingCharMap[char];
      score += scoreMap[closingChar];
    }

    scores.push(score);
  }

  scores.sort((a, b) => a - b);

  return scores[Math.floor(scores.length / 2)];
}
