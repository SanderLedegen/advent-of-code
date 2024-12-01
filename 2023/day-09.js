import { readFileSync } from 'fs';

const input = readFileSync('2023/inputs/day-09.txt', 'utf-8');

const findDiffs = (sequence) => {
  const differences = [];

  for (let ii = 1; ii < sequence.length; ii += 1) {
    const diff = sequence[ii] - sequence[ii - 1];
    differences.push(diff);
  }

  return differences;
};

const findSequences = (histories) => {
  return histories.reduce((arr, sequence) => {
    const sequences = [sequence];

    while (!sequence.every((val) => val === 0)) {
      sequence = findDiffs(sequence);
      sequences.push(sequence);
    }

    arr.push(sequences);

    return arr;
  }, []);
};

function partOne(sequences) {
  const sumLastValues = (sequence) => sequence.reduce((sum, history) => sum + history.at(-1), 0);

  return sequences.reduce((sum, sequence) => {
    return sum + sumLastValues(sequence);
  }, 0);
}

function partTwo(sequences) {
  const sumFirstValues = (sequence) =>
    sequence.reduce((sum, history, idx) => sum + history.at(0) * (idx % 2 === 1 ? -1 : 1), 0);

  return sequences.reduce((sum, sequence) => {
    return sum + sumFirstValues(sequence);
  }, 0);
}

function parseInput(input) {
  const histories = input.split('\n').reduce((histories, line) => {
    const history = line.split(' ').map(Number);
    histories.push(history);
    return histories;
  }, []);

  return histories;
}

const histories = parseInput(input);
const sequences = findSequences(histories);

console.log(partOne(sequences));
console.log(partTwo(sequences));
