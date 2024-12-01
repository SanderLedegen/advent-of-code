const fs = require('fs')
const input = fs.readFileSync('./inputs/day-12.txt', 'utf-8')

// Part one
let moons = parseInput(input)

for (let steps = 0; steps < 1000; steps += 1) {
  step(moons)
}

const partOne = Object.values(moons)
  .map(moon => calculatePotentialEnergy(moon) * calculateKineticEnergy(moon))
  .reduce((sum, curr) => sum + curr, 0)

console.log(partOne)

// Part two
const stepsX = partTwo('x')
const stepsY = partTwo('y')
const stepsZ = partTwo('z')

console.log(lcm(stepsX, lcm(stepsY, stepsZ)))

function partTwo(component) {
  moons = input
    .split('\n')
    .map(line => {
      const { groups: { x, y, z } } = /<x=(?<x>-?\d+), y=(?<y>-?\d+), z=(?<z>-?\d+)>/gi.exec(line)
      return { pos: { x: +x, y: +y, z: +z }, vel: { x: 0, y: 0, z: 0 } }
    })
    .map(m => ([m.pos[component], m.vel[component]]))

  let steps = 0
  let run = true
  const previousStates = new Set()
  previousStates.add(JSON.stringify(moons))

  while (run) {
    stepSingleComponent(moons)
    steps += 1
    const previousLength = previousStates.size
    previousStates.add(JSON.stringify(moons))
    if (previousLength === previousStates.size) {
      run = false
    }
  }

  return steps
}

// Functions
function step(moons) {
  // Update velocity
  const combinations = generateCombinations(Object.keys(moons))

  combinations.forEach(([key1, key2]) => {
    applyGravity(key1, key2, 'x')
    applyGravity(key1, key2, 'y')
    applyGravity(key1, key2, 'z')
  })

  // Update position
  Object.keys(moons).forEach(key => {
    moons[key].pos.x += moons[key].vel.x
    moons[key].pos.y += moons[key].vel.y
    moons[key].pos.z += moons[key].vel.z
  })
}

function stepSingleComponent(moons) {
  // Update velocity
  const combinations = generateCombinations([0, 1, 2, 3])

  combinations.forEach(([index1, index2]) => {
    const a = moons[index1]
    const b = moons[index2]

    if (a[0] > b[0]) {
      a[1] -= 1
      b[1] += 1
    } else if (a[0] < b[0]) {
      a[1] += 1
      b[1] -= 1
    }
  })

  // Update position
  moons.forEach(moon => {
    moon[0] += moon[1]
  })
}

function parseInput(input) {
  return input
    .split('\n')
    .map(line => {
      const { groups: { x, y, z } } = /<x=(?<x>-?\d+), y=(?<y>-?\d+), z=(?<z>-?\d+)>/gi.exec(line)
      return { pos: { x: +x, y: +y, z: +z }, vel: { x: 0, y: 0, z: 0 } }
    })
    .reduce((map, curr, ii) => {
      const key = String.fromCharCode(ii + 65)
      map[key] = curr
      return map
    }, {})
}

function calculatePotentialEnergy(moon) {
  return Math.abs(moon.pos.x) + Math.abs(moon.pos.y) + Math.abs(moon.pos.z)
}

function calculateKineticEnergy(moon) {
  return Math.abs(moon.vel.x) + Math.abs(moon.vel.y) + Math.abs(moon.vel.z)
}

function applyGravity(key1, key2, component) {
  if (moons[key1].pos[component] > moons[key2].pos[component]) {
    moons[key1].vel[component] -= 1
    moons[key2].vel[component] += 1
  } else if (moons[key1].pos[component] < moons[key2].pos[component]) {
    moons[key1].vel[component] += 1
    moons[key2].vel[component] -= 1
  }
}

function generateCombinations(arr) {
  const combinations = []

  for (let ii = 0; ii < arr.length; ii += 1) {
    for (let jj = ii + 1; jj < arr.length; jj += 1) {
      combinations.push([arr[ii], arr[jj]])
    }
  }

  return combinations
}

function gcd(a, b) {
  if (!b) {
    return a;
  }

  return gcd(b, a % b);
}

function lcm(a, b) {
  return Math.abs((a * b) / gcd(a, b))
}