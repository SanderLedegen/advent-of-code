const fs = require('fs')
const path = require('path')
const input = fs.readFileSync('2017/inputs/day-16.txt', 'utf-8')

// Answers to the challenge 🤓
console.log('Please be a little patient... 😇', )
console.log(solvePartOne(input)) // kpfonjglcibaedhm
console.log(solvePartTwo(input)) // odiabmplhfgjcekn

function solvePartOne(input) {
  const danceMoves = input.split(',')
  return dance('abcdefghijklmnop', danceMoves)
}

function solvePartTwo(input) {
  let programs = 'abcdefghijklmnop'
  const danceMoves = input.split(',')
  const cache = new Map()

  for (let ii = 0; ii < 1*1000*1000*1000; ii++) {
    const cachedPrograms = cache.get(programs)

    if (cachedPrograms) {
      programs = cachedPrograms
    } else {
      cache.set(programs, dance(programs, danceMoves))
      programs = cache.get(programs)
    }
  }

  return programs
}

function dance(programs, danceMoves) {
  let indices

  danceMoves.forEach(danceMove => {
    const type = danceMove[0]

    switch (type) {
      case 's':
        const amount = danceMove.substring(1)
        programs = `${programs.slice(-amount)}${programs.substring(0, programs.length - amount)}`
        break
      case 'x':
        indices = danceMove.substring(1).split('/').map(i => +i).sort((a, b) => a - b)
        programs = swapChars(programs, indices[0], indices[1])
        break
      case 'p':
        const chars = danceMove.substring(1).split('/')
        indices = [programs.indexOf(chars[0]), programs.indexOf(chars[1])].sort((a, b) => a - b)
        programs = swapChars(programs, indices[0], indices[1])
        break
      default:
        throw new Error('Uh-oh, an unknown dance move!')
    }
  })

  return programs
}

function swapChars(input, indexA, indexB) {
  const a = input[indexA]
  const b = input[indexB]

  return `${input.substring(0, indexA)}${b}${input.substring(indexA + 1, indexB)}${a}${input.substring(indexB + 1)}`
}
