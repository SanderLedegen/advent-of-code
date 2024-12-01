const fs = require('fs')
const input = fs.readFileSync('./inputs/day-05.txt', 'utf-8')

execute(1)
execute(5)

function execute(programInput) {
  const program = input.split(',').map(Number)

  let pointer = 0
  let running = true

  while (running) {
    const encodedInstruction = program[pointer]
    const opcode = +(`${encodedInstruction}`.slice(-2))
    let parameterModes = `${encodedInstruction}`.slice(0, -2).padStart(3, '0').split('').reverse().map(Number)
    const a = parameterModes[0] === 0 ? program[program[pointer + 1]] : program[pointer + 1]
    const b = parameterModes[1] === 0 ? program[program[pointer + 2]] : program[pointer + 2]
    const c = program[pointer + 3]

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
        program[program[pointer + 1]] = programInput
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
        program[program[pointer + 3]] = a < b ? 1 : 0
        pointer += 4
        break

      case 8:
        program[program[pointer + 3]] = a === b ? 1 : 0
        pointer += 4
        break

      case 99:
        running = false
        pointer += 1
        break

      default:
        console.error(`Illegal opcode: ${opcode}`)
        running = false
        break
    }
  }
}
