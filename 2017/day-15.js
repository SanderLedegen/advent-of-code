// Input values
const startValueGeneratorA = 618
const startValueGeneratorB = 814

// Challenge constants
const factorGeneratorA = 16807
const factorGeneratorB = 48271
const division = 2147483647
const numOfIterationsPartOne = 40*1000*1000
const numOfIterationsPartTwo = 5*1000*1000

// Answers to the challenge 🤓
console.log(solvePartOne(startValueGeneratorA, startValueGeneratorB)) // 577
console.log(solvePartTwo(startValueGeneratorA, startValueGeneratorB)) // 316

function solvePartOne(startValueGeneratorA, startValueGeneratorB) {
  let matches = 0

  for (let ii = 0; ii < numOfIterationsPartOne; ii++) {
    startValueGeneratorA = getNextValueGenerator(startValueGeneratorA, factorGeneratorA) % division
    startValueGeneratorB = getNextValueGenerator(startValueGeneratorB, factorGeneratorB) % division

    if (doLowest16BitsMatch(startValueGeneratorA, startValueGeneratorB)) {
      matches += 1
    }
  }

  return matches
}

function solvePartTwo(startValueGeneratorA, startValueGeneratorB) {
  let matches = 0

  const valuesGeneratorA = []
  const valuesGeneratorB = []

  while (valuesGeneratorA.length < numOfIterationsPartTwo || valuesGeneratorB.length < numOfIterationsPartTwo) {
    if (valuesGeneratorA.length < numOfIterationsPartTwo) {
      startValueGeneratorA = getNextValueGenerator(startValueGeneratorA, factorGeneratorA) % division

      if (startValueGeneratorA % 4 === 0) {
        valuesGeneratorA.push(startValueGeneratorA)
      }
    }

    if (valuesGeneratorB.length < numOfIterationsPartTwo) {
      startValueGeneratorB = getNextValueGenerator(startValueGeneratorB, factorGeneratorB) % division
  
      if (startValueGeneratorB % 8 === 0) {
        valuesGeneratorB.push(startValueGeneratorB)
      }
    }
  }

  for (let ii = 0; ii < numOfIterationsPartTwo; ii++) {
    if (doLowest16BitsMatch(valuesGeneratorA[ii], valuesGeneratorB[ii])) {
      matches += 1
    }
  }

  return matches
}

function getNextValueGenerator(previousValue, factor) {
  return previousValue * factor
}

function doLowest16BitsMatch(a, b) {
  return (a & 0xFFFF) === (b & 0xFFFF)
}
