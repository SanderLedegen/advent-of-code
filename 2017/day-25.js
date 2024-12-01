const fs = require('fs')
const path = require('path')
const input = fs.readFileSync('2017/inputs/day-25.txt', 'utf-8')

const blueprint = parseInput(input)

// Answers to the challenge 🤓
console.log(solvePartOne(blueprint)) // 4387

function solvePartOne(blueprint) {
  const tape = []
  let cursor = 0
  let state = blueprint.state

  for (let step = 1; step <= blueprint.steps; step += 1) {
    const currentValue = tape[cursor] === 1 ? 1 : 0
    const actions = blueprint.states[state][currentValue]
  
    tape[cursor] = actions.write
    cursor += actions.move === 'right' ? 1 : -1
    state = actions.continue
  }

  return Object.values(tape).reduce((sum, slot) => sum + slot, 0)
}

function parseInput(input) {
  let currentState = null
  let currentValue = null
  const blueprint = {
    state: '',
    steps: 0,
    states: {},
  }

  input.split('\n').forEach((line, index) => {
    line = line.trim()

    if (index === 0) {
      blueprint.state = line.match(/^Begin in state (\w).$/)[1]
      return
    }

    if (index === 1) {
      blueprint.steps = +line.match(/^Perform a diagnostic checksum after (\d+) steps.$/)[1]
      return
    }

    if (!line) {
      return
    }

    if (line.startsWith('In state')) {
      currentState = line.match(/^In state (\w):$/)[1]
      blueprint.states[currentState] = blueprint.states[currentState] || {}
    }

    if (line.startsWith('If the current value is')) {
      currentValue = line.match(/^If the current value is (\d):$/)[1]
      blueprint.states[currentState][currentValue] = blueprint.states[currentState][currentValue] || {}
    }

    if (line.startsWith('- Write the value')) {
      const value = +line.match(/^- Write the value (\d+).$/)[1]
      blueprint.states[currentState][currentValue] = {
        ...blueprint.states[currentState][currentValue],
        write: value,
      }
    }

    if (line.startsWith('- Move one slot to the')) {
      const value = line.match(/^- Move one slot to the (left|right).$/)[1]
      blueprint.states[currentState][currentValue] = {
        ...blueprint.states[currentState][currentValue],
        move: value,
      }
    }

    if (line.startsWith('- Continue with state')) {
      const value = line.match(/^- Continue with state (\w+).$/)[1]
      blueprint.states[currentState][currentValue] = {
        ...blueprint.states[currentState][currentValue],
        continue: value,
      }
    }
  })

  return blueprint
}