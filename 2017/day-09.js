const fs = require('fs')
const path = require('path')
const input = fs.readFileSync('2017/inputs/day-09.txt', 'utf-8')

const result = solvePartOneAndTwo(input)

// Answers to the challenge 🤓
console.log(result.sum) // 14212
console.log(result.numOfGarbageCharacters) // 6569

function solvePartOneAndTwo(input) {
  const chars = [...input]
  let nestedLevel = 0
  let isGarbage = false
  let ignoreNextCharacter = false
  let numOfGarbageCharacters = 0

  const sum = chars.reduce((sum, char) => {
    if (ignoreNextCharacter) {
      ignoreNextCharacter = false
      return sum
    }

    switch (char) {
      case '{':
        if (!isGarbage) {
          nestedLevel += 1
        } else {
          numOfGarbageCharacters += 1
        }
        break
      case '}':
        if (!isGarbage) {
          sum += nestedLevel
          nestedLevel -= 1
        } else {
          numOfGarbageCharacters += 1
        }
        break
      case '<':
        // If the current characters in the stream were already marked as garbage, this char is garbage as well.
        if (isGarbage) {
          numOfGarbageCharacters += 1
        }
        isGarbage = true
        break
      case '>':
        isGarbage = false
        break
      case '!':
        ignoreNextCharacter = true
        break
      default:
        if (isGarbage) {
          numOfGarbageCharacters += 1
        }
        break
    }

    return sum
  }, 0)

  return { sum, numOfGarbageCharacters }
}
