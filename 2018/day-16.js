const fs = require('fs')
const inputPartOne = fs.readFileSync('./inputs/day-16-part-1.txt', 'utf-8')

const samples = []

let sample = {}

const regex = /(\d+)/g
inputPartOne.split('\n').forEach((line, index) => {
  const groups = line.split(regex)

  if (index % 4 === 0) {
    sample.before = [+groups[1], +groups[3], +groups[5], +groups[7]]

  } else if (index % 4 === 1) {
    sample.instruction = [+groups[1], +groups[3], +groups[5], +groups[7]]

  } else if (index % 4 === 2) {
    sample.after = [+groups[1], +groups[3], +groups[5], +groups[7]]
    samples.push(sample)
    sample = {}
  }
})

let registers = [0, 0, 0, 0]
const opcodes = [
  {
    name: 'addr',
    number: 9,
    execute: (regA, regB, regC) => { registers[regC] = registers[regA] + registers[regB] }
  },
  {
    name: 'addi',
    number: 10,
    execute: (regA, val, regC) => { registers[regC] = registers[regA] + val }
  },
  {
    name: 'mulr',
    number: 1,
    execute: (regA, regB, regC) => { registers[regC] = registers[regA] * registers[regB] }
  },
  {
    name: 'muli',
    number: 15,
    execute: (regA, val, regC) => { registers[regC] = registers[regA] * val }
  },
  {
    name: 'banr',
    number: 6,
    execute: (regA, regB, regC) => { registers[regC] = registers[regA] & registers[regB] }
  },
  {
    name: 'bani',
    number: 8,
    execute: (regA, val, regC) => { registers[regC] = registers[regA] & val }
  },
  {
    name: 'borr',
    number: 5,
    execute: (regA, regB, regC) => { registers[regC] = registers[regA] | registers[regB] }
  },
  {
    name: 'bori',
    number: 4,
    execute: (regA, val, regC) => { registers[regC] = registers[regA] | val }
  },
  {
    name: 'setr',
    number: 14,
    execute: (regA, b, regC) => { registers[regC] = registers[regA] }
  },
  {
    name: 'seti',
    number: 2,
    execute: (val, b, regC) => { registers[regC] = val }
  },
  {
    name: 'gtir',
    number: 0,
    execute: (val, regB, regC) => { registers[regC] = val > registers[regB] ? 1 : 0 }
  },
  {
    name: 'gtri',
    number: 12,
    execute: (regA, val, regC) => { registers[regC] = registers[regA] > val ? 1 : 0 }
  },
  {
    name: 'gtrr',
    number: 3,
    execute: (regA, regB, regC) => { registers[regC] = registers[regA] > registers[regB] ? 1 : 0 }
  },
  {
    name: 'eqir',
    number: 13,
    execute: (val, regB, regC) => { registers[regC] = val === registers[regB] ? 1 : 0 }
  },
  {
    name: 'eqri',
    number: 7,
    execute: (regA, val, regC) => { registers[regC] = registers[regA] === val ? 1 : 0 }
  },
  {
    name: 'eqrr',
    number: 11,
    execute: (regA, regB, regC) => { registers[regC] = registers[regA] === registers[regB] ? 1 : 0 }
  },
]

let numSamplesBehavingLikeAtLeastThreeOpcodes = 0

samples.forEach((sample) => {
  let matchingOpcodes = []

  opcodes.forEach((opcode) => {
    registers = [...sample.before]
    opcode.execute(sample.instruction[1], sample.instruction[2], sample.instruction[3])
    const matchingOpcode = registers.every((reg, index) => reg === sample.after[index])
    if (matchingOpcode) {
      matchingOpcodes.push(opcode.name)
    }
  })

  numSamplesBehavingLikeAtLeastThreeOpcodes += matchingOpcodes.length >= 3 ? 1 : 0
  matchingOpcodes = []
})

console.log(`Answer part one: ${numSamplesBehavingLikeAtLeastThreeOpcodes}`)

// Working out the number of each opcode, starting from searching only for one matching opcode. The
// instruction's number belongs to that opcode. Then, search for two matching opcodes and ruling out
// the ones that already have a number and so on...
/*
samples.forEach((sample) => {
  let matchingOpcodes = []

  opcodes.forEach((opcode) => {
    registers = [...sample.before]
    opcode.execute(sample.instruction[1], sample.instruction[2], sample.instruction[3])
    const matchingOpcode = registers.every((reg, index) => reg === sample.after[index])
    if (matchingOpcode) {
      matchingOpcodes.push(opcode.name)
    }
  })

  // Replace "xx" with a number from 0 to 15, cycling multiple times. Whenever an opcode's number
  // has been found, add it to the array.
  if (matchingOpcodes.length === xx) {
    if (![0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].includes(sample.instruction[0])) {
      console.log(matchingOpcodes, sample.instruction[0])
    }
  }

  matchingOpcodes = []
})
*/

// Part two
const inputPartTwo = fs.readFileSync('./inputs/day-16-part-2.txt', 'utf-8')
const instructions = inputPartTwo.split('\n').map((line) => {
  const split = line.split(' ').map(n => +n)
  return [...split]
})

registers = [0, 0, 0, 0]

instructions.forEach((instruction) => {
  const opcode = opcodes.find((opcode) => opcode.number === instruction[0])
  opcode.execute(instruction[1], instruction[2], instruction[3])
})

console.log(`Answer part two: ${registers[0]}`)
