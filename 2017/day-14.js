const knotHash = require('./day-10').knotHash
const input = 'ljoxqyyw'

let rows = null
let checkedCells = new Set()

// Answers to the challenge 🤓
console.log(solvePartOne(input)) // 8316
console.log(solvePartTwo()) // 1074

function solvePartOne(input) {
  rows = new Array(128)

  for (let row = 0; row < rows.length; row++) {
    const hash = knotHash(`${input.trim()}-${row}`)
    rows[row] = hexToBin(hash)
  }

  return rows
    .map(row => {
      return [...row].reduce((sum, bit) => bit === '1' ? sum + 1 : sum, 0)
    })
    .reduce((totalSum, sum) => totalSum += sum, 0)
}

function solvePartTwo() {
  const grid = new Array(rows.length)

  for (let row = 0; row < grid.length; row++) {
    grid[row] = rows[row].split('').map(i => +i)
  }

  let numOfRegions = 0
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (checkedCells.has(`${[row]},${[col]}`) || grid[row][col] === 0) {
        continue
      }

      floodFill(grid, row, col)
      numOfRegions += 1
    }
  }
  
  return numOfRegions
}

function floodFill(grid, row, col) {
  if (grid[row][col] === 0) {
    return
  }
  
  if (checkedCells.has(`${[row]},${[col]}`)) {
    return
  }

  checkedCells.add(`${[row]},${[col]}`)

  // Boundary checking and continue flood filling.
  row - 1 >= 0 && floodFill(grid, row - 1, col)
  row + 1 < grid.length && floodFill(grid, row + 1, col)
  col + 1 < grid[row].length && floodFill(grid, row, col + 1)
  col - 1 >= 0 && floodFill(grid, row, col - 1)
}

function hexToBin(input) {
  /**
   * Input is considered to be hexadecimal, so parse it as such. Then, wham it into 0s and 1s
   * and make sure we got 4 bits in the end.
   */
  return [...input].reduce((binString, hexDigit) => {
    binString += parseInt(hexDigit, 16).toString(2).padStart(4, '0')
    return binString
  }, '')
}
