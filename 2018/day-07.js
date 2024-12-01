const fs = require('fs')
const input = fs.readFileSync('./inputs/day-07.txt', 'utf-8')

const statements = input.split('\n').map((line) => {
  return [
    line.substr(5, 1),
    line.substr(36, 1),
  ]
})

const statementsStartingWithLetter = (letter) => {
  return statements.filter((pair) => pair[0] === letter).map((pair) => pair[1])
}

// Find starting point(s)
const startingLetters = new Set()
for (let ii = 0; ii < 26; ii += 1) {
  startingLetters.add(String.fromCharCode(65 + ii))
}

statements.forEach((pair) => startingLetters.delete(pair[1]))

let steps = ''
let availableLetters = [...startingLetters]

while (availableLetters.length > 0) {
  const letter = availableLetters.sort().shift()
  steps += letter

  statementsStartingWithLetter(letter).forEach((l) => {
    if (!availableLetters.includes(l)) {
      availableLetters.push(l)
    }
  })
}

// Remove the duplicate chars, only keeping the last occurrence of each.
let answerPartOne = ''
for (let xx = 0; xx < steps.length; xx += 1) {
  answerPartOne += steps.lastIndexOf(steps[xx]) === xx ? steps[xx] : ''
}

console.log('Answer part one:', answerPartOne)
