const input = '372037-905157'

const [from, to] = input.split('-').map(Number)

// Predicates
const equalAdjacentDigits = num => {
  let passed = false;

  for (let ii = 0; ii < num.length - 1 && !passed; ii += 1) {
    passed = num[ii] === num[ii + 1]
  }

  return passed
}

const equalAdjacentDigitsNotPartOfLargerGroup = num => {
  let passed = false;

  for (let ii = 0; ii < num.length - 1 && !passed; ii += 1) {
    passed = num[ii] === num[ii + 1] && num[ii] !== num[ii + 2] && num[ii] !== num[ii - 1]
  }

  return passed
}

const increasingDigits = num => num.split('').sort().join('') === num

// Part one
const partOne = range(from, to)
  .filter(equalAdjacentDigits)
  .filter(increasingDigits)
  .length

console.log(partOne)

// Part two
const partTwo = range(from, to)
  .filter(equalAdjacentDigitsNotPartOfLargerGroup)
  .filter(increasingDigits)
  .length

console.log(partTwo)

// Utils
function range(from, to) {
  return Array.from({ length: to - from }, (_, i) => `${i + from}`)
}
