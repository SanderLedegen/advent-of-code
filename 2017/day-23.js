const fs = require('fs')
const path = require('path')
const input = fs.readFileSync('2017/inputs/day-23.txt', 'utf-8')

// Answers to the challenge 🤓
console.log(solvePartOne(input)) // 6241
console.log(solvePartTwo(instructions))

function solvePartOne(input) {
  const instructions = parseInput(input)
  const registers = { a: 1, b: 0, c: 0, d: 0, e: 0, f: 0, g: 0, h: 0 }
  let numOfMulInstructionsExecuted = 0
  let ip = 0

  while (ip < instructions.length) {
    const instruction = instructions[ip]

    // Shortcut for getting the instruction's value, whether the instruction contains it as a number or
    // as a reference to the register.
    let value = typeof instruction.value === 'string' ? registers[instruction.value] : instruction.value

    switch (instruction.action) {
      case 'sub':
        registers[instruction.register] -= value
        ip += 1
        break

      case 'mul':
        registers[instruction.register] *= value
        ip += 1
        numOfMulInstructionsExecuted += 1
        break

      case 'set':
        registers[instruction.register] = value
        ip += 1
        break

      case 'jnz':
        if (registers[instruction.register] !== 0) {
          ip += value
        } else {
          ip += 1
        }
        break

      default:
        throw new Error(`Unknown instruction '${instruction.action}' 🤔`)
    }
    console.log(registers)
  }

  return { numOfMulInstructionsExecuted, h: registers.h }
}

function solvePartTwo(instructions) {
  //
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
