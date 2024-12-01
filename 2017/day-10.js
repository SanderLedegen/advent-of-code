const fs = require('fs')
const path = require('path')
const input = fs.readFileSync('2017/inputs/day-10.txt', 'utf-8')

// This checks if this file is run directly or run through a "require" (e.g. day 14)
if (require.main === module) {
  // Answers to the challenge 🤓
  console.log(solvePartOne(input)) // 2928
  console.log(solvePartTwo(input)) // 0c2f794b2eb555f7830766bf8fb65a16
}

function solvePartOne(input) {
  const lengths = input.split(',').map(i => +i)
  const result = calculateHash(lengths)
  return result.list[0] * result.list[1]
}

function solvePartTwo(input) {
  // Set up the required parameters for hashing the first round
  const lengths = toASCII(input.trim()).concat([17, 31, 73, 47, 23])
  let list
  let curPos = 0
  let skipSize = 0

  for (let ii = 0; ii < 64; ii++) {
    const result = calculateHash(lengths, list, curPos, skipSize)
    list = result.list
    curPos = result.curPos
    skipSize = result.skipSize
  }

  let denseHash = []
  for (let block = 0; block < 16; block++) {
    let xorredResult = 0
    for (let ii = 0; ii < 16; ii++) {
      xorredResult ^= list[block * 16 + ii]
    }
    denseHash.push(xorredResult)
  }

  const hash = denseHash.reduce((hexString, number) => {
    hexString += number.toString(16).padStart(2, '0')
    return hexString
  }, '')

  return hash
}

function calculateHash(lengths, list = [...new Array(256).keys()], curPos = 0, skipSize = 0) {
  lengths.forEach(length => {
    let subList = list.slice(curPos, curPos + length)

    // If what we sliced has not the correct length, it's an indication a wrap-around is needed.
    if (subList.length !== length) {
      subList = subList.concat(list.slice(0, length - subList.length))
    }

    subList.reverse()

    // Write the reversed sublist back to the actual list
    for (let ii = 0; ii < subList.length; ii++) {
      list[(ii + curPos) % list.length] = subList[ii]
    }

    curPos = (curPos + length + skipSize) % list.length
    skipSize += 1
  })

  return { list, curPos, skipSize }
}

function toASCII(input) {
  return [...input].map(c => c.charCodeAt(0))
}

module.exports = { knotHash: solvePartTwo }
