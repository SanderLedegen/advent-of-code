const fs = require('fs')
const path = require('path')
const input = fs.readFileSync('2017/inputs/day-06.txt', 'utf-8')

// Answers to the challenge 🤓
console.log(`Yeah, so... be a bit patient while "heavy" number crunching is taking place 😉`)
console.log(solvePartOne(input)) // 6681
console.log(solvePartTwo(input)) // 2392

function solvePartOne(input) {
  const memoryBanks = input.split(/\s/).map(i => +i)
  let cycle = 0
  let states = []
  let alreadyKnownState = false

  while (!alreadyKnownState) {
    const indexOfMemoryBankWithMostBlocks = memoryBanks.indexOf(Math.max(...memoryBanks))
    let numOfBlocksToRedistribute = memoryBanks[indexOfMemoryBankWithMostBlocks]
    let indexOfMemoryBankToIncrease = (indexOfMemoryBankWithMostBlocks + 1) % memoryBanks.length
  
    memoryBanks[indexOfMemoryBankWithMostBlocks] = 0
  
    while (numOfBlocksToRedistribute > 0) {
      // Increase the next memory bank by one block
      memoryBanks[indexOfMemoryBankToIncrease] += 1
      
      // After inserting a block to a memory bank, we've got one block less to redistribute
      numOfBlocksToRedistribute -= 1
  
      // Update the index for the next memory bank
      indexOfMemoryBankToIncrease = (indexOfMemoryBankToIncrease + 1) % memoryBanks.length
    }

    cycle += 1
    alreadyKnownState = states.includes(memoryBanks.join())
    states = [...states, memoryBanks.join()]
  }

  return cycle
}

function solvePartTwo(input) {
  const memoryBanks = input.split(/\s/).map(i => +i)
  let cycle = 0
  let states = []
  let alreadyKnownState = false

  while (!alreadyKnownState) {
    const indexOfMemoryBankWithMostBlocks = memoryBanks.indexOf(Math.max(...memoryBanks))
    let numOfBlocksToRedistribute = memoryBanks[indexOfMemoryBankWithMostBlocks]
    let indexOfMemoryBankToIncrease = (indexOfMemoryBankWithMostBlocks + 1) % memoryBanks.length
  
    memoryBanks[indexOfMemoryBankWithMostBlocks] = 0
  
    while (numOfBlocksToRedistribute > 0) {
      // Increase the next memory bank by one block
      memoryBanks[indexOfMemoryBankToIncrease] += 1
      
      // After inserting a block to a memory bank, we've got one block less to redistribute
      numOfBlocksToRedistribute -= 1
  
      // Update the index for the next memory bank
      indexOfMemoryBankToIncrease = (indexOfMemoryBankToIncrease + 1) % memoryBanks.length
    }

    cycle += 1
    alreadyKnownState = states.includes(memoryBanks.join())
    states = [...states, memoryBanks.join()]
  }

  /**
   * At this point, the same memory bank layout (aka state) has been added twice.
   * How many iterations does it take to reach this exact same state once more?
   */
  return states.lastIndexOf(memoryBanks.join()) - states.indexOf(memoryBanks.join())
}
