const fs = require('fs')
const path = require('path')
const input = fs.readFileSync('2017/inputs/day-18.txt', 'utf-8')

const instructions = parseInput(input)
const queueA = []
const queueB = []

// Answers to the challenge 🤓
console.log(solvePartOne(instructions)) // 7071
console.log(solvePartTwo(instructions))

function solvePartOne(input) {
  const registers = []
  let ip = 0
  let freqLastSound

  while (ip < instructions.length) {
    const instruction = instructions[ip]

    // Shortcut for getting the instruction's value, whether the instruction contains it as a number or
    // as a reference to the register.
    let value = typeof instruction.value === 'string' ? registers[instruction.value] : instruction.value

    // Initialize the register if it hasn't been done already
    registers[instruction.register] = registers[instruction.register] || 0

    switch (instruction.action) {
      case 'add':
        registers[instruction.register] += value
        ip += 1
        break

      case 'mul':
        registers[instruction.register] *= value
        ip += 1
        break

      case 'mod':
        registers[instruction.register] %= value
        ip += 1
        break

      case 'set':
        registers[instruction.register] = value
        ip += 1
        break

      case 'snd':
        freqLastSound = registers[instruction.register]
        ip += 1
        break

      case 'rcv':
        if (registers[instruction.register] !== 0) {
          return freqLastSound
        }
        ip += 1
        break

      case 'jgz':
        if (registers[instruction.register] > 0) {
          ip += value
        } else {
          ip += 1
        }
        break

      default:
        throw new Error(`Unknown instruction '${instruction.action}' 🤔`)
    }
  }
}

function solvePartTwo(instructions) {
  let registersA = { p: 0 }
  let registersB = { p: 1 }
  let ipA = 0
  let ipB = 0

  instructions.forEach(i => {
    ;({ registers: registersA, instructionPointer: ipA } = executeInstruction(registersA, i, ipA, 0))
    ;({ registers: registersB, instructionPointer: ipB } = executeInstruction(registersB, i, ipB, 1))
  })
}

function executeInstruction(registers, instruction, instructionPointer = 0, pid) {
  // Shortcut for getting the instruction's value, whether the instruction contains it as a number or
  // as a reference to the register.
  let value = typeof instruction.value === 'string' ? registers[instruction.value] : instruction.value

  // Initialize the register if it hasn't been done already
  if (!['snd', 'rcv'].includes(instruction.action)) {
    registers[instruction.register] = registers[instruction.register] || 0
  }

  switch (instruction.action) {
    case 'add':
      registers[instruction.register] += value
      instructionPointer += 1
      break

    case 'mul':
      registers[instruction.register] *= value
      instructionPointer += 1
      break

    case 'mod':
      registers[instruction.register] %= value
      instructionPointer += 1
      break

    case 'set':
      registers[instruction.register] = value
      instructionPointer += 1
      break

    case 'snd':
      const sndValue = isNaN(+instruction.register) ? registers[instruction.register] : +instruction.register
      ;(pid === 0 ? queueB : queueA).push(sndValue)
      instructionPointer += 1
      break

    case 'rcv':
      const queueToUse = pid === 0 ? queueA : queueB
      if (queueToUse.length === 0) {
        console.log('RING THE ALARM')
      }

      registers[instruction.register] = queueToUse.splice(0, 1)[0]
      instructionPointer += 1
      break

    case 'jgz':
      if (registers[instruction.register] > 0) {
        instructionPointer += value
      } else {
        instructionPointer += 1
      }
      break

    default:
      throw new Error(`Unknown instruction '${instruction.action}' 🤔`)
  }

  return { registers, instructionPointer }
}

function parseInput(input) {
  const regex = /^([\w]+)\s(\w)+\s?(-?[a-z0-9]+)*$/i

  return input.split('\n').map(instruction => {
    const groups = instruction.split(regex)

    return {
      action: groups[1].toLowerCase().trim(),
      register: groups[2].toLowerCase().trim(),
      value: groups[3] ? isNaN(+groups[3]) ? groups[3] : +groups[3] : null,
    }
  })
}
