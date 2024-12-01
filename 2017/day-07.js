const fs = require('fs')
const path = require('path')
const input = fs.readFileSync('2017/inputs/day-07.txt', 'utf-8')

// Putting this one out of function scope to not have to compile this regex each time #cpulove #savetheplanet 🌍
const programInputRegex = /([a-z]+)\s\(([0-9]+)\)(?:\s->\s([a-z, ]+))?/i
const programs = parseInput(input)

// Answers to the challenge 🤓
console.log(solvePartOne(programs)) // hmvwl
console.log(solvePartTwo(programs)) // 1853

function solvePartOne(programs) {
  const rootProgram = findParentProgram(programs[0])
  return rootProgram.name
}

function solvePartTwo(programs) {
  // Find the root program and create a tree-like structure from there
  const rootProgram = findParentProgram(programs[0])
  const tree = createTree([rootProgram.name])

  // Modifies `tree` in place by adding `sumWeight` property to each node 🙈
  calculateSumOfWeight(tree)

  // TL;DR: Yes, this can be automated but hey, I just needed a solution for the challenge.
  // You have to manually traverse the tree by going to the node which sumWeight differs compared to the rest.

  // First step, you'll see all the sumWeights of the sub programs are 101772 except for 'kzltfq'.
  // console.dir(tree.hmvwl.subPrograms, {depth: 3})

  // 'arqoys' has a summed weight of 1877 instead of 1871.
  // console.dir(tree.hmvwl.subPrograms.kzltfq.subPrograms, {depth: 3})

  // You can't go any deeper since there are no more subPrograms.
  // This means that 'arqoys' weighs a bit too much (6 too much) so arqoys' new weight is 1859 - 6, 1853.
  // console.dir(tree.hmvwl.subPrograms.kzltfq.subPrograms.arqoys.subPrograms, {depth: 3})
  return 1853
}

function findParentProgram(program) {
  let parentProgram = programs.find(p => p.subPrograms && p.subPrograms.includes(program.name))

  return parentProgram ? findParentProgram(parentProgram) : program
}

function createTree(programNames) {
  return programNames.reduce((tree, programName) => {
    const program = programs.find(p => programName === p.name)
    
    tree[programName] = {
      weight: program.weight,
      subPrograms: program.subPrograms ? createTree(program.subPrograms) : null,
    }

    return tree
  }, {})
}

/**
 * This method calculates the weight for each node in the tree recursively
 */
function calculateSumOfWeight(tree) {
  let sum = 0
  let sumWeights = []

  Object.keys(tree).forEach((programName, ii) => {
    const program = tree[programName]

    if (program.subPrograms !== null) {
      program.sumWeight = program.weight + calculateSumOfWeight(program.subPrograms)
    } else {
      program.sumWeight = program.weight
    }

    sum += program.sumWeight
  })

  return sum
}

function parseInput(input) {
  return input.split('\n').map(p => {
    const groups = p.split(programInputRegex)
  
    return {
      name: groups[1],
      weight: +groups[2],
      subPrograms: groups[3] ? groups[3].split(', ') : null
    }
  })
}
