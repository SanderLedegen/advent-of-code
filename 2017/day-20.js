const fs = require('fs')
const path = require('path')
const input = fs.readFileSync('2017/inputs/day-20.txt', 'utf-8')

// Which particle will be the closest to <0,0,0> in "the long term"? I assume "long term" to be 1000 iterations.
const numOfIterations = 1000
const center = { position: { x: 0, y: 0, z: 0 } }

// Answers to the challenge 🤓
console.log(solvePartOne(parseInput(input))) // 125
console.log(solvePartTwo(parseInput(input))) // 461

function solvePartOne(particles) {
  for (let ii = 0; ii < numOfIterations; ii++) {
    particles.forEach(p => updateParticle(p))
  }

  const result = particles.reduce((obj, particle, index) => {
    const distance = manhattenDistance(particle, center)

    if (distance < obj.distance) {
      obj.closestParticle = particle
      obj.distance = distance
      obj.index = index
    }

    return obj
  }, { closestParticle: particles[0], distance: manhattenDistance(particles[0], center), index: 0 })

  return result.index
}

function solvePartTwo(particles) {
  const nonDuplicateParticles = new Map()
  const particleIndicesToRemove = new Set()

  for (let ii = 0; ii < 200; ii++) {
    particles.forEach((p, index) => {
      updateParticle(p)

      const coordinateRepresentation = `${p.position.x},${p.position.y},${p.position.z}`

      if (nonDuplicateParticles.has(coordinateRepresentation)) {
        particleIndicesToRemove.add(index)
        particleIndicesToRemove.add(nonDuplicateParticles.get(coordinateRepresentation))
      } else {
        nonDuplicateParticles.set(coordinateRepresentation, index)
      }
    })
  }

  return particles.length - particleIndicesToRemove.size
}

function updateParticle(particle) {
  particle.velocity.x += particle.acceleration.x
  particle.velocity.y += particle.acceleration.y
  particle.velocity.z += particle.acceleration.z

  particle.position.x += particle.velocity.x
  particle.position.y += particle.velocity.y
  particle.position.z += particle.velocity.z
}

function manhattenDistance(a, b) {
  return Math.abs(a.position.x - b.position.x) + Math.abs(a.position.y - b.position.y) + Math.abs(a.position.z - b.position.z)
}

function parseInput(input) {
  const justCuzICanRegex = /(?:\w=<?(-?\d+),(-?\d+),(-?\d+)>(?:[,\s])?)+/i

  return input.split('\n').map(line => {
    const parts = line.split(justCuzICanRegex)

    return {
      position: { x: parseInt(parts[1]), y: parseInt(parts[2]), z: parseInt(parts[3]) },
      velocity: { x: parseInt(parts[5]), y: parseInt(parts[6]), z: parseInt(parts[7]) },
      acceleration: { x: parseInt(parts[9]), y: parseInt(parts[10]), z: parseInt(parts[11]) },
    }
  })
}
