const fs = require('fs')
const input = fs.readFileSync('./inputs/day-06.txt', 'utf-8')

// Generate the map of orbits by mapping the "parent" of each object.
const map = {}
const orbits = input.split('\n')
orbits.forEach(orbit => {
  const [a, b] = orbit.split(')')
  map[b] = a
})

// Part one
let partOne = 0

Object.keys(map).forEach(key => {
  let x = key
  while (map[x]) {
    x = map[x]
    partOne += 1
  }
})

console.log(partOne)

// Part two
const routeYOU = []
let x = 'YOU'
while (map[x]) {
  x = map[x]
  routeYOU.push(x)
}

const routeSAN = []
let y = 'SAN'
while (map[y]) {
  y = map[y]
  routeSAN.push(y)
}

let endOfRoutesAreEqual = true
while (endOfRoutesAreEqual) {
  if (routeYOU[routeYOU.length - 1] === routeSAN[routeSAN.length - 1]) {
    routeYOU.pop()
    routeSAN.pop()
  } else {
    endOfRoutesAreEqual = false
  }
}

console.log(routeYOU.length + routeSAN.length)
