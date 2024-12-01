const fs = require('fs')
const input = fs.readFileSync('./inputs/day-03.txt', 'utf-8')

const claims = input.split('\n').map(c => {
  const groups = c.split(/#(\d+)\s@\s(\d+),(\d+):\s(\d+)x(\d+)/)

  return {
    id: +groups[1],
    left: +groups[2],
    top: +groups[3],
    width: +groups[4],
    height: +groups[5],
    isBeingOverlapped: false,
  }
})

const overlapCoords = new Set()

for (let ii = 0; ii < claims.length - 1; ii += 1) {
  for (let jj = ii + 1; jj < claims.length; jj += 1) {
    const claimA = claims[ii]
    const claimB = claims[jj]

    // Ignore claims that don't even intersect.
    if (claimA.left + claimA.width <= claimB.left || claimB.left + claimB.width <= claimA.left) {
      continue
    }

    if (claimA.top + claimA.height <= claimB.top || claimB.top + claimB.height <= claimA.top) {
      continue
    }

    // Find the boundary of the intersection rectangle.
    const left = Math.max(claimA.left, claimB.left)
    const right = Math.min(claimA.left + claimA.width, claimB.left + claimB.width)
    const top = Math.max(claimA.top, claimB.top)
    const bottom = Math.min(claimA.top + claimA.height, claimB.top + claimB.height)

    // Store each of the intersection coords.
    for (let kk = left; kk < right; kk += 1) {
      for (let ll = top; ll < bottom; ll += 1) {
        overlapCoords.add(`${kk},${ll}`)
      }
    }

    // An intersection means that claims/fabric were being overlapped.
    claimA.isBeingOverlapped = true
    claimB.isBeingOverlapped = true
  }
}

const areaOfOverlappedFabric = overlapCoords.size
const notOverlappedClaimId = claims.find(c => !c.isBeingOverlapped).id

console.log('Answer part one:', areaOfOverlappedFabric)
console.log('Answer part two:', notOverlappedClaimId)
