const fs = require('fs')
const input = fs.readFileSync('./inputs/day-09.txt', 'utf-8')

try {
  execute(1) // Part one
  execute(2) // Part two
} catch (e) {
  console.error(`ERROR: ${e.message}`)
}

function getMemory(program, pointer) {
  if (pointer < 0) {
    throw new Error(`Illegal pointer with value ${pointer} encountered.`)
  }

  return program[pointer] || 0
}

function getParameter(program, pointer, parameterMode, relativeBase, write = false) {
  let value

  switch (parameterMode) {
    case 0:
      value = getMemory(program, pointer)
      break

    case 1:
      value = pointer
      break

    case 2:
      value = getMemory(program, pointer) + relativeBase
      break

    default:
      throw new Error(`Illegal parameter mode: ${parameterMode}`)
  }

  if (!write) {
    value = getMemory(program, value)
  }

  if (!value && value !== 0) {
    throw new Error('Parameter encountered with undefined value.')
  }

  return value
}

function execute(programInput) {
  const program = input.split(',').map(Number)

  let pointer = 0
  let relativeBase = 0
  let running = true

  while (running) {
    const encodedInstruction = program[pointer]
    const opcode = +(`${encodedInstruction}`.slice(-2))
    let parameterModes = `${encodedInstruction}`.slice(0, -2).padStart(3, '0').split('').reverse().map(Number)
    const a = getParameter(program, pointer + 1, parameterModes[0], relativeBase)
    const b = getParameter(program, pointer + 2, parameterModes[1], relativeBase)
    const c = getParameter(program, pointer + 3, parameterModes[2], relativeBase, true)

    switch (opcode) {
      case 1:
        program[c] = a + b
        pointer += 4
        break

      case 2:
        program[c] = a * b
        pointer += 4
        break

      case 3:
        console.log(`INPUT: ${programInput}`)
        const i = getParameter(program, pointer + 1, parameterModes[0], relativeBase, true)
        program[i] = programInput
        pointer += 2
        break

      case 4:
        console.log(`OUTPUT: ${a}`)
        pointer += 2
        break

      case 5:
        pointer = a !== 0 ? b : pointer + 3
        break

      case 6:
        pointer = a === 0 ? b : pointer + 3
        break

      case 7:
        program[c] = a < b ? 1 : 0
        pointer += 4
        break

      case 8:
        program[c] = a === b ? 1 : 0
        pointer += 4
        break

      case 9:
        relativeBase += a
        pointer += 2
        break

      case 99:
        running = false
        pointer += 1
        break

      default:
        running = false
        throw new Error(`Illegal opcode: ${opcode}`)
    }
  }
}
