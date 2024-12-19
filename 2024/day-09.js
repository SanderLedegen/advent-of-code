import { readFileSync } from 'fs';

const input = readFileSync('2024/inputs/day-09.txt', 'utf-8');

function partOne(m) {
  const memory = [...m];
  let checksum = 0;
  let left = 0;
  let right = memory.length - 1;
  let index = 0;

  while (left < right) {
    // Iterating file blocks
    let numBlocks = memory[left];
    while (numBlocks--) {
      const id = Math.floor(left / 2);
      const checkSumToAdd = index * id;
      checksum += checkSumToAdd;
      index += 1;
    }
    left += 1;

    // Handling free space
    let numFreeSpace = memory[left];
    let timesDone = 0;
    while (numFreeSpace--) {
      if (timesDone >= memory[right]) {
        right -= 2;
        timesDone = 0;
      }
      const id = Math.floor(right / 2);
      const checkSumToAdd = index * id;
      checksum += checkSumToAdd;
      index += 1;
      timesDone += 1;
    }

    memory[right] -= timesDone;
    if (memory[right] <= 0) {
      right -= 2;
    }

    left += 1;
  }

  // Taking checksum(s) of last file block(s) into account
  while (memory[right]--) {
    const id = Math.floor(right / 2);
    const checkSumToAdd = index * id;
    checksum += checkSumToAdd;
    index += 1;
  }

  return checksum;
}

function partTwo(m) {
  const getExpandedIndex = (memory, index) => {
    let expIdx = 0;
    for (let ii = 0; ii < index; ii++) {
      expIdx += memory[ii];
    }
    return expIdx;
  };

  const memory = [...m];
  let checksum = 0;

  for (let ii = memory.length - 1; ii > 0; ii -= 2) {
    const id = Math.floor(ii / 2);
    let fileSize = memory[ii];
    let spaceFound = false;

    for (let jj = 1; jj < ii && !spaceFound; jj += 2) {
      if (memory[jj] >= fileSize) {
        const spacesAlreadyUsed = m[jj] - memory[jj];
        memory[jj] -= fileSize;
        let times = 0;
        while (fileSize--) {
          const idx = getExpandedIndex(m, jj) + times + spacesAlreadyUsed;
          const checkSumToAdd = idx * id;
          checksum += checkSumToAdd;
          times++;
        }

        spaceFound = true;
      }
    }

    if (spaceFound) continue;

    // At this point, file block was not moved, but calculating its checksum is
    // still required.
    const idx = getExpandedIndex(m, ii);
    for (let jj = 0; jj < fileSize; jj++) {
      const checkSumToAdd = (idx + jj) * id;
      checksum += checkSumToAdd;
    }
  }

  return checksum;
}

const memory = input.split('').map(Number);

console.log(partOne(memory));
console.log(partTwo(memory));
