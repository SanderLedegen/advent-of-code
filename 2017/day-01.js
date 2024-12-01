const fs = require('fs')
const path = require('path')
const input = fs.readFileSync('2017/inputs/day-01.txt', 'utf-8')

// Answers to the challenge 🤓
console.log(solvePartOne(input)) // 1341
console.log(solvePartTwo(input)) // 1348

function solvePartOne(input) {
  const characters = [...input]

  return characters.reduce((sum, value, index) => {
    const indexToUse = index + 1 < characters.length ? index + 1 : 0
  
    return value === characters[indexToUse] ? sum + +value : sum
  }, 0)
}

function solvePartTwo(input) {
  const characters = [...input]
  
  return characters.reduce((sum, value, index) => {
    const indexToUse = (index + characters.length / 2) % characters.length
  
    return value === characters[indexToUse] ? sum + +value : sum
  }, 0)
}
