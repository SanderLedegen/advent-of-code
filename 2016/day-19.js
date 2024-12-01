const input = 3005290;

console.log(partOne(input));
console.log(partTwo(input));

function partOne(numElves) {
  let elves = new Array(numElves);
  for (let ii = 0; ii < numElves; ii += 1) {
    elves[ii] = { id: ii + 1, skipped: false };
  }

  const findIndexNextUnskippedElf = (elves, idx) => {
    for (let ii = 1; ii < numElves; ii += 1) {
      if (!elves[(idx + ii) % numElves].skipped) {
        return (idx + ii) % numElves;
      }
    }
  };

  let numSkipped = 0;
  let ptr = 0;

  while (numSkipped + 1 < numElves) {
    if (elves[ptr].skipped) {
      ptr = (ptr + 1) % numElves;
      continue;
    }

    const idx = findIndexNextUnskippedElf(elves, ptr);
    elves[idx].skipped = true;
    numSkipped += 1;
    ptr = (ptr + 1) % numElves;
  }

  const nonSkippedElf = elves.find(elf => !elf.skipped);

  return nonSkippedElf.id;
}

function partTwo(numElves) {
  let elves = new Array(numElves);
  for (let ii = 0; ii < numElves; ii += 1) {
    elves[ii] = ii + 1;
  }

  let numSkipped = 0;
  let ptr = 0;

  while (numSkipped + 1 < numElves) {
    let numElvesStillPlaying = numElves - numSkipped;
    let numElvesToSkip = Math.floor(numElvesStillPlaying / 2);
    let indexToRemove = (ptr + numElvesToSkip) % numElvesStillPlaying;

    const firstPart = elves.subarray(0, indexToRemove)
    const lastPart = elves.subarray(indexToRemove + 1);
    elves = new Uint16Array(firstPart.length + lastPart.length);
    elves.set(firstPart, 0);
    elves.set(lastPart, firstPart.length);

    numSkipped += 1;
    ptr = (ptr + 1) % numElvesStillPlaying;
  }
  
  return elves.find(e => e !== undefined); // 32283 too low
}