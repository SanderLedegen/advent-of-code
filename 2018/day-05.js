const fs = require('fs')
let input = fs.readFileSync('./inputs/day-05.txt', 'utf-8')

const reactPolymers = (polymer, regex) => {
  let oldLength

  do {
    oldLength = polymer.length
    polymer = polymer.replace(regex, '')
  } while (polymer.length !== oldLength)

  return polymer
}

// Part one
let regexString = ''

for (let ii = 0; ii < 26; ii += 1) {
  const lowercase = String.fromCharCode(97 + ii) // a...z
  const uppercase = String.fromCharCode(65 + ii) // A...Z
  regexString += `${lowercase}${uppercase}|${uppercase}${lowercase}|`
}

const reactRegex = new RegExp(regexString.slice(0, -1), 'g')

const answerPartOne = reactPolymers(input, reactRegex).length
console.log('Answer part one:', answerPartOne)

// Part two
const map = {}

for (let ii = 0; ii < 26; ii += 1) {
  const letter = String.fromCharCode(97 + ii)
  const singleLetterRegex = new RegExp(`${letter}`, 'gi')
  const inputWithoutLetter = input.replace(singleLetterRegex, '')
  map[letter] = reactPolymers(inputWithoutLetter, reactRegex).length
}

const answerPartTwo = Math.min(...Object.values(map))
console.log('Answer part two:', answerPartTwo)
