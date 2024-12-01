const fs = require('fs')
const input = fs.readFileSync('./inputs/day-02.txt', 'utf-8')

// Part one
console.log(execute(12, 2))

// Part two
for (let nounIndex = 0; nounIndex <= 99; nounIndex += 1) {
  for (let verbIndex = 0; verbIndex <= 99; verbIndex += 1) {
    const result = execute(nounIndex, verbIndex)

    if (result === 19690720) {
      console.log(nounIndex * 100 + verbIndex)
      return
    }
  }
}

function execute(noun, verb) {
  const program = input.split(',').map(i => +i)

  program[1] = noun
  program[2] = verb

  let pointer = 0
  let running = true

  while (running) {
    const opcode = program[pointer]
    const a = program[program[pointer + 1]]
    const b = program[program[pointer + 2]]

    switch (opcode) {
      case 1:
        program[program[pointer + 3]] = a + b
        pointer += 4
        break

      case 2:
        program[program[pointer + 3]] = a * b
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

  return program[0]
}
