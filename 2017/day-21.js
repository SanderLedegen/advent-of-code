const fs = require('fs')
const path = require('path')
const input = fs.readFileSync('2017/inputs/day-21.txt', 'utf-8')

let book = parseInput(input)
let image = [[0, 1, 0], [0, 0, 1], [1, 1, 1]]

// Answers to the challenge 🤓
console.log(solve(5)) // 147
console.log('Be patient now... 😴')
console.log(solve(18)) // 1936582

function solve(iterations) {
  let parts = []

  for (let iteration = 0; iteration < iterations; iteration += 1) {
    if (image.length === 2 || image.length === 3) {
      image = enhance(image)
    } else if (image.length % 2 === 0) {
      parts = divide(image, 2)
      parts = parts.map(part => enhance(part))
      image = assemble(parts, image.length / 2)
    } else if (image.length % 3 === 0) {
      parts = divide(image, 3)
      parts = parts.map(part => enhance(part))
      image = assemble(parts, image.length / 3)
    }
  }

  return countPixels(image)
}

function assemble(parts, size) {
  const newImage = new Array(parts[0].length * size)
  for (let ii = 0; ii < newImage.length; ii += 1) {
    newImage[ii] = new Array(parts[0].length * size)
  }

  const length = parts[0].length

  for (let quadrant = 0; quadrant < parts.length; quadrant += 1) {
    for (let row = 0; row < parts[quadrant].length; row += 1) {
      for (let col = 0; col < parts[quadrant][row].length; col += 1) {
        const val = parts[quadrant][row][col]
        const y = row + Math.floor(quadrant / size) * length
        const x = col + (quadrant % size) * length
        newImage[y][x] = val
      }
    }
  }

  return newImage
}

function divide(image, size) {
  const parts = []
  const lengthOfQuadrant = size

  for (let row = 0; row < image.length; row += 1) {
    for (let col = 0; col < image[row].length; col += 1) {
      const y = Math.floor(row / size)
      const x = Math.floor(col / size)
      const numQuadrant = y * (image.length / size) + x
      const val = image[row][col]

      parts[numQuadrant] = parts[numQuadrant] || []
      parts[numQuadrant][row % lengthOfQuadrant] = parts[numQuadrant][row % lengthOfQuadrant] || []
      parts[numQuadrant][row % lengthOfQuadrant][col % lengthOfQuadrant] = val
    }
  }

  return parts
}

function enhance(image) {
  // TODO: Speed up look-up
  const size = image.length

  let rule = null
  let numRotates = 0

  while (!rule && numRotates < 4) {
    rule = book.find(rule => isArrayEqual(rule.from, image))

    if (!rule) {
      rule = book.find(rule => isArrayEqual(rule.from, flipH(Array.from(image))))
    }

    if (!rule) {
      rule = book.find(rule => isArrayEqual(rule.from, flipV(Array.from(image))))
    }

    if (!rule) {
      image = rotate(image)
      numRotates += 1
    }
  }

  if (!rule) {
    throw new Error('No rule found for image:\n', image)
  }

  return rule.to
}

function countPixels(image) {
  let sum = 0

  for (let row = 0; row < image.length; row += 1) {
    for (let col = 0; col < image[row].length; col += 1) {
      sum += image[row][col] ? 1 : 0
    }
  }

  return sum
}

function rotate(arr) {
  const ret = []

  for (let jj = 0; jj < arr.length; jj += 1) {
    ret[jj] = []

    for (let ii = 0; ii < arr[jj].length; ii += 1) {
      ret[jj][ii] = arr[arr[jj].length - 1 - ii][jj]
    }
  }

  return ret
}

function flipH(arr) {
  for (let ii = 0; ii < arr.length / 2; ii += 1) {
    const temp = arr[ii]
    arr[ii] = arr[arr.length - ii - 1]
    arr[arr.length - ii - 1] = temp
  }

  return arr
}

function flipV(arr) {
  return arr.map(r => r.reverse())
}

function isArrayEqual(arr1, arr2) {
  return JSON.stringify(arr1) === JSON.stringify(arr2)
}

function parseInput(input) {
  return input.split('\n').map(line => {
    const [before, after] = line.split(' => ')

    return {
      from: before.split('/').map(b => b.split('').map(c => c === '#' ? 1 : 0)),
      to: after.split('/').map(b => b.split('').map(c => c === '#' ? 1 : 0)),
    }
  })
}
