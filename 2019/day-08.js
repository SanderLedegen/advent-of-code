const fs = require('fs')
const input = fs.readFileSync('./inputs/day-08.txt', 'utf-8')

const IMAGE_WIDTH = 25
const IMAGE_HEIGHT = 6

const numLayers = input.length / IMAGE_WIDTH / IMAGE_HEIGHT
const layers = new Array(numLayers)

input.split('').map(Number).forEach((pixel, idx) => {
  const layerIndex = Math.floor(idx / IMAGE_WIDTH / IMAGE_HEIGHT)
  layers[layerIndex] = layers[layerIndex] || []
  layers[layerIndex].push(pixel)
})

// Part one
let layerIdx = null
let zeroCount = Infinity
layers.forEach((layer, li) => {
  let sum = 0
  layer.forEach(ll => sum += ll === 0 ? 1 : 0)
  if (sum < zeroCount) {
    zeroCount = sum
    layerIdx = li
  }
})

let oneCount = 0
let twoCount = 0
layers[layerIdx].forEach(pixel => {
  if (pixel === 1) {
    oneCount += 1
  }

  if (pixel === 2) {
    twoCount += 1
  }
})

console.log(oneCount * twoCount)

// Part two
const image = Array(IMAGE_HEIGHT).fill(0).map(() => Array(IMAGE_WIDTH))
for (let height = 0; height < image.length; height += 1) {
  for (let width = 0; width < image[height].length; width += 1) {
    image[height][width] = getPixelColor(height, width)
  }
}

let line = ''
for (let height = 0; height < image.length; height += 1) {
  for (let width = 0; width < image[height].length; width += 1) {
    line += image[height][width] === 1 ? '█' : ' '
  }
  line += '\n'
}

console.log(line)

function getPixelColor(y, x) {
  let layerIndex = 0
  const pixelIndex = y * IMAGE_WIDTH + x
  let pixel = null

  do {
    pixel = layers[layerIndex][pixelIndex]
    layerIndex += 1
  } while (pixel === 2)

  return pixel
}
