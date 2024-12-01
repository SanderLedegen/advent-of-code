const fs = require('fs')
const input = fs.readFileSync('./inputs/day-11.txt', 'utf-8')

const GRID_SIZE = 300

try {
  // Part one
  const { uniquePaintedPanels } = execute()
  console.log(uniquePaintedPanels)

  // Part two
  const { panels } = execute(1)

  let line = ''
  for (let yy = 0; yy < panels.length; yy += 1) {
    const row = panels[yy].map(d => d === 1 ? '█' : ' ').join('').trim()
    if (row.length === 0) continue
    line += row + '\n'
  }

  console.log(line)
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

function execute(startColor = 0) {
  const panels = new Array(GRID_SIZE).fill(0).map(() => new Array(GRID_SIZE).fill(0))
  let dir = 'up'
  let outputPixelColor = true
  let x = GRID_SIZE / 2
  let y = GRID_SIZE / 2
  const uniquePaintedPanels = new Set()
  panels[y][x] = startColor

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
        if (panels[y][x] !== 0 && panels[y][x] !== 1) {
          throw new Error(`Invalid output color received: ${panels[y][x]}.`)
        }

        const i = getParameter(program, pointer + 1, parameterModes[0], relativeBase, true)
        program[i] = panels[y][x]
        pointer += 2
        outputPixelColor = true
        break

      case 4:
        if (outputPixelColor) {
          if (a !== 0 && a !== 1) {
            throw new Error(`Invalid output color received: ${a}.`)
          }

          panels[y][x] = a
          uniquePaintedPanels.add(`${x},${y}`)
          outputPixelColor = false
        } else {
          if (a !== 0 && a !== 1) {
            throw new Error(`Invalid output direction received: ${a}.`)
          }

          if (dir === 'up') {
            dir = a === 0 ? 'left' : 'right'
          } else if (dir === 'left') {
            dir = a === 0 ? 'down' : 'up'
          } else if (dir === 'down') {
            dir = a === 0 ? 'right' : 'left'
          } else if (dir === 'right') {
            dir = a === 0 ? 'up' : 'down'
          }
          
          if (dir === 'up') y -= 1
          if (dir === 'left') x -= 1
          if (dir === 'down') y += 1
          if (dir === 'right') x += 1
        }

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

  return {
    uniquePaintedPanels: uniquePaintedPanels.size,
    panels,
  }
}
