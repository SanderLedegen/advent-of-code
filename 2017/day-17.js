const input = 376

// Answers to the challenge 🤓
console.log(solvePartOne(input)) // 777
console.log(solvePartTwo(input)) // 39289581

function solvePartOne(input) {
  const buffer = [0]
  let curPos = 0

  for (let ii = 1; ii <= 2017; ii++) {
    const indexToInsertAt = (curPos + input) % buffer.length
    buffer.splice(indexToInsertAt + 1, 0, ii)
    curPos = indexToInsertAt + 1
  }

  const indexOf2017 = buffer.indexOf(2017)
  return buffer[indexOf2017 + 1]
}

function solvePartTwo(input) {
  /**
   * Alright, so... 50 million iterations need to be done. In itself, that's relatively easy peasy but those
   * buffer modifications are quite expensive. If those are taken out, the whole thing should run significantly
   * faster. Of course, this implies that following all numbers is more difficult. Fortunately, we only need to
   * know what's the value just after zero and we know where zero is from the start. Having heavily abused
   * `console.log` to print the first element in the buffer for a few thousands of times and some additional
   * trial-and-error, I can say it is always at the first position... 😌
   */
  let curPos = 0
  let result

  for (let ii = 1; ii <= 50*1000*1000; ii++) {
    const indexToInsertAt = (curPos + input) % ii
    if (indexToInsertAt === 0) {
      result = ii
    }

    curPos = indexToInsertAt + 1
  }

  return result
}
