const fs = require('fs')
const input = fs.readFileSync('./inputs/day-10.txt', 'utf-8')

const points = input.split('\n').map((line) => {
  const groups = line.split(/(-?\d+)/)

  return {
    x: +groups[1],
    y: +groups[3],
    vx: +groups[5],
    vy: +groups[7],
  }
})

let smallestDiff = Infinity
let second

for (let sec = 0; sec < 20000; sec += 1) {
  let minX = Infinity
  let maxX = -Infinity
  let minY = Infinity
  let maxY = -Infinity

  points.forEach((p) => {
    const px = p.x + p.vx * sec
    const py = p.y + p.vy * sec

    minX = px < minX ? px : minX
    maxX = px > maxX ? px : maxX
    minY = py < minY ? py : minY
    maxY = py > maxY ? py : maxY
  })

  const diff = maxX - minX + maxY - minY
  if (diff < smallestDiff) {
    smallestDiff = diff
    second = sec
  }
}

const ARRAY_SIZE = 140
const grid = new Array(ARRAY_SIZE).fill(0).map(() => new Array(ARRAY_SIZE).fill(0))

points.forEach((p) => {
  // Translate the characters on the grid
  const newX = p.x + p.vx * second - ARRAY_SIZE / 2
  const newY = p.y + p.vy * second - ARRAY_SIZE / 2

  grid[newY][newX] = 1
})

let data = ''
for (let yy = 0; yy < ARRAY_SIZE; yy += 1) {
  for (let xx = 0; xx < ARRAY_SIZE; xx += 1) {
    data += grid[yy][xx] ? '#' : ' '
  }
  data += '\n'
}

fs.writeFileSync('./outputs/day-10.txt', data, 'utf-8')

console.log(`After ${second} seconds, the message would appear.`)
