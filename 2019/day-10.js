const fs = require('fs')
const input = fs.readFileSync('./inputs/day-10.txt', 'utf-8')

let grid = []
input.split('\n').forEach((line, ii) => {
  grid[ii] = line.split('')
})

const visibilityGrid = new Array(grid.length).fill(0).map(i => new Array(grid.length).fill(0))

for (let yy = 0; yy < grid.length; yy += 1) {
  for (let xx = 0; xx < grid[yy].length; xx += 1) {
    if (grid[yy][xx] !== '#') {
      continue
    }

    for (let zz = 0; zz < grid.length; zz += 1) {
      for (let ww = 0; ww < grid[zz].length; ww += 1) {
        if (zz === yy && ww === xx) {
          continue
        }

        if (grid[zz][ww] !== '#') {
          continue
        }

        const { visible } = checkVisibility({ x: xx, y: yy }, { x: ww, y: zz })
        visibilityGrid[yy][xx] += visible ? 1 : 0
      }
    }
  }
}

// Part one
const bestMonitoringStation = { x: null, y: null, asteroidsVisible: 0 }
for (let yy = 0; yy < visibilityGrid.length; yy += 1) {
  for (let xx = 0; xx < visibilityGrid[yy].length; xx += 1) {
    if (visibilityGrid[yy][xx] > bestMonitoringStation.asteroidsVisible) {
      bestMonitoringStation.x = xx
      bestMonitoringStation.y = yy
      bestMonitoringStation.asteroidsVisible = visibilityGrid[yy][xx]
    }
  }
}

console.log(bestMonitoringStation.asteroidsVisible)

// Part two
const removalList = []
while (containsAsteroids(grid, bestMonitoringStation)) {
  const reachableAsteroids = []
  const { x, y } = bestMonitoringStation

  for (let yy = 0; yy < grid.length; yy += 1) {
    for (let xx = 0; xx < grid[yy].length; xx += 1) {
      if (grid[yy][xx] !== '#') {
        continue
      }

      if (yy === y && xx === x) {
        continue
      }

      const res = checkVisibility({ x, y }, { x: xx, y: yy })
      if (!res.visible) {
        continue
      }

      reachableAsteroids.push(res)
    }
  }

  reachableAsteroids.forEach(a => grid[a.target.y][a.target.x] = '.')

  reachableAsteroids.sort((a, b) => {
    const upwards = { x: 0, y: -1 }
    let angleA = getAngle(upwards, a.dir)
    let angleB = getAngle(upwards, b.dir)

    if (a.dir.x < 0) {
      angleA = 2 * Math.PI - angleA
    }

    if (b.dir.x < 0) {
      angleB = 2 * Math.PI - angleB
    }

    return angleA - angleB
  })

  removalList.push(...reachableAsteroids)
}

const partTwo = removalList[199].target.x * 100 + removalList[199].target.y
console.log(partTwo)

function getAngle(a, b) {
  const dot = a.x * b.x + a.y * b.y
  const aDirNorm = Math.sqrt(a.x ** 2 + a.y ** 2)
  const bDirNorm = Math.sqrt(b.x ** 2 + b.y ** 2)

  return Math.acos(dot / (aDirNorm * bDirNorm))
}

function containsAsteroids(grid, ignoreCoord) {
  let found = false;

  for (let yy = 0; yy < grid.length && !found; yy += 1) {
    for (let xx = 0; xx < grid[yy].length && !found; xx += 1) {
      if (yy === ignoreCoord.y && xx === ignoreCoord.x) {
        continue
      }

      found = grid[yy][xx] === '#'
    }
  }

  return found
}

function checkVisibility(origin, target) {
  let dir = { x: target.x - origin.x, y: target.y - origin.y }
  const gcdValue = Math.abs(gcd(dir.x, dir.y))
  dir = { x: dir.x / gcdValue, y: dir.y / gcdValue }

  /**
   * Any point on the direction vector can be represented as the following equation:
   *  target = origin + t * dir
   *  t = (target - origin) / dir
   */

  const t = dir.x === 0 ? (target.y - origin.y) / dir.y : (target.x - origin.x) / dir.x

  /**
   * Check if there are any other asteroids with a lower t value between the two given points.
   * If this is the case, this means there's an obstruction.
   */

  let visible = true
  for (let ii = t - 1; ii > 0 && visible; ii -= 1) {
    // testPoint = origin + t * dir
    const testPoint = { x: origin.x + ii * dir.x, y: origin.y + ii * dir.y }

    if (grid[testPoint.y][testPoint.x] === '#') {
      visible = false
    }
  }

  return {
    target,
    dir,
    visible,
  }
}

function gcd(a, b) {
  if (!b) {
    return a;
  }

  return gcd(b, a % b);
}