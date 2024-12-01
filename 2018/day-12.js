const fs = require('fs')
const input = fs.readFileSync('./inputs/day-12.txt', 'utf-8')

let { pots, combinations } = parseInput(input)

const grow = (pots, numGenerations) => {
  pots = `..${pots}..`

  for (let generation = 0; generation < numGenerations; generation += 1) {
    let newPots = ''

    for (let index = 0; index < pots.lastIndexOf('#') + 2; index += 1) {
      let window = ''
      for (let ii = -2; ii <= 2; ii += 1) {
        window += pots[index + ii] === '#' ? '#' : '.'
      }

      const match = combinations.find(c => c === window)
      newPots = replaceAt(newPots, index, match ? '#' : '.')
    }

    pots = `..${newPots}..`
  }

  return pots
}

const processedPots = grow(pots, 20)
const answerPartOne = sum(processedPots, 20)
console.log(`Answer part one: ${answerPartOne}`)

function sum(pots, generations) {
  const offset = generations * 2 + 2
  let sum = 0

  for (let ii = 0; ii < pots.length; ii += 1) {
    sum += pots[ii] === '#' ? (ii - offset) : 0
  }

  return sum
}

function replaceAt(str, index, char) {
  return `${str.substring(0, index)}${char}${str.substring(index + 1)}`
}

function parseInput(input) {
  const combinations = []
  let pots = ''

  input.split('\n').forEach((line, index) => {
    if (index === 0) {
      pots = line.split('initial state: ')[1]
      return
    }

    if (index === 1) {
      return
    }

    const parts = line.split(' => ')
    // Only consider combinations that result into a plant.
    if (parts[1] == '#') {
      combinations.push(parts[0])
    }
  })

  return {
    pots,
    combinations,
  }
}
