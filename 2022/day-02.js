import { readFileSync } from 'fs';
const input = readFileSync('2022/inputs/day-02.txt', 'utf-8');

// A/X: Rock, B/Y: Paper, C/Z: Scissors
// Loss: 0, Draw: 3, Win: 6
// Rock: 1, Paper: 2, Scissors: 3
const scoringTable = {
  X: { A: 4, B: 1, C: 7 },
  Y: { A: 8, B: 5, C: 2 },
  Z: { A: 3, B: 9, C: 6 },
};

// A/X: Rock, B/Y: Paper, C/Z: Scissors
const recommendedShapeTable = {
  X: { A: 'Z', B: 'X', C: 'Y' }, // Loss
  Y: { A: 'X', B: 'Y', C: 'Z' }, // Draw
  Z: { A: 'Y', B: 'Z', C: 'X' }, // Win
};

function partOne(input) {
  const rounds = input.split('\n');

  return rounds.reduce((score, round) => {
    const [opponent, you] = round.split(' ');
    return score + scoringTable[you][opponent];
  }, 0);
}

function partTwo(input) {
  const rounds = input.split('\n');

  return rounds.reduce((score, round) => {
    const [opponent, result] = round.split(' ');
    const recommendedYou = recommendedShapeTable[result][opponent];
    return score + scoringTable[recommendedYou][opponent];
  }, 0);
}

console.log(partOne(input));
console.log(partTwo(input));
