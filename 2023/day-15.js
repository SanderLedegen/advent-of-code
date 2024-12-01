import { readFileSync } from 'fs';

const input = readFileSync('2023/inputs/day-15.txt', 'utf-8');

const hash = (string) => {
  let currVal = 0;

  for (let char of string) {
    currVal += char.charCodeAt();
    currVal *= 17;
    currVal %= 256;
  }

  return currVal;
};

function partOne(sequence) {
  return sequence.reduce((sum, seq) => sum + hash(seq), 0);
}

function partTwo(sequence) {
  const boxes = new Array(256);

  for (let seq of sequence) {
    const matches = seq.match(/(\w+)[=\-](\d)?/);
    const label = matches[1];
    const focalLength = matches[2] ? +matches[2] : undefined;
    const hashedLabel = hash(label);

    if (focalLength) {
      // =
      if (boxes[hashedLabel]) {
        const existingLabelIdx = boxes[hashedLabel].findIndex(l => l.label === label);
        if (existingLabelIdx === -1) {
          boxes[hashedLabel].push({ label, focalLength});
        } else {
          boxes[hashedLabel][existingLabelIdx] = { label, focalLength};
        }
      } else {
        boxes[hashedLabel] = [{ label, focalLength}];
      }
    } else {
      // -
      boxes[hashedLabel] = boxes[hashedLabel] ? boxes[hashedLabel].filter(s => s.label !== label) : [];
    }
  }

  return boxes.reduce((sum, box, boxIdx) => {
    for (let lensIdx = 0; lensIdx < box.length; lensIdx += 1) {
      let shiz = 1;
      shiz *= boxIdx + 1;
      shiz *= lensIdx + 1;
      shiz *= box[lensIdx].focalLength;
      sum += shiz;
    }
    return sum;
  }, 0);
}

const sequence = input.split(',');

console.log(partOne(sequence));
console.log(partTwo(sequence));
