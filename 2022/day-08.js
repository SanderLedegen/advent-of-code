import { readFileSync } from 'fs';

const input = readFileSync('2022/inputs/day-08.txt', 'utf-8');

function partOne(grid) {
  const isVisible = (grid, row, col) => {
    if (row === 0 || row === grid.length - 1) {
      return true;
    }
  
    if (col === 0 || col === grid.length - 1) {
      return true;
    }
  
    const treeValue = grid[row][col];
    let visible = true;
  
    // Looking from the left
    for (let ii = 0; ii < col && visible; ii += 1) {
      if (grid[row][ii] >= treeValue) {
        visible = false;
      }
    }
  
    if (visible) {
      return true;
    }
  
    visible = true;
  
    // Looking from the right
    for (let ii = grid.length - 1; ii >= col + 1 && visible; ii -= 1) {
      if (grid[row][ii] >= treeValue) {
        visible = false;
      }
    }
  
    if (visible) {
      return true;
    }
  
    visible = true;
  
    // Looking from the top
    for (let ii = 0; ii < row && visible; ii += 1) {
      if (grid[ii][col] >= treeValue) {
        visible = false;
      }
    }
  
    if (visible) {
      return true;
    }
  
    visible = true;
  
    // Looking from the bottom
    for (let ii = grid.length - 1; ii >= row + 1 && visible; ii -= 1) {
      if (grid[ii][col] >= treeValue) {
        visible = false;
      }
    }
  
    return visible;
  };

  let numVisible = 0;

  for (let row = 0; row < grid.length; row += 1) {
    for (let col = 0; col < grid.length; col += 1) {
      numVisible += isVisible(grid, row, col) ? 1 : 0;
    }
  }

  return numVisible;
}

function partTwo(grid) {

  const calculateScenicScore = (grid, row, col) => {
    if (row === 0 || row === grid.length - 1) {
      return 0;
    }

    if (col === 0 || col === grid.length - 1) {
      return 0;
    }

    let numLeftVisible = 0;
    let numRightVisible = 0;
    let numTopVisible = 0;
    let numBottomVisible = 0;

    // Left view
    for (let ii = col - 1; ii >= 0; ii -= 1) {
      if (grid[row][ii] < grid[row][col]) {
        numLeftVisible += 1;
      } else {
        numLeftVisible += 1;
        break;
      }
    }

    // Right view
    for (let ii = col + 1; ii < grid.length; ii += 1) {
      if (grid[row][ii] < grid[row][col]) {
        numRightVisible += 1;
      } else {
        numRightVisible += 1;
        break;
      }
    }

    // Top view
    for (let ii = row - 1; ii >= 0; ii -= 1) {
      if (grid[ii][col] < grid[row][col]) {
        numTopVisible += 1;
      } else {
        numTopVisible += 1;
        break;
      }
    }

    // Bottom view
    for (let ii = row + 1; ii < grid.length; ii += 1) {
      if (grid[ii][col] < grid[row][col]) {
        numBottomVisible += 1;
      } else {
        numBottomVisible += 1;
        break;
      }
    }

    return numLeftVisible * numRightVisible * numTopVisible * numBottomVisible;
  };

  let highestScenicScore = -Infinity;

  for (let row = 0; row < grid.length; row += 1) {
    for (let col = 0; col < grid.length; col += 1) {
      const scenicScore = calculateScenicScore(grid, row, col);

      if (scenicScore > highestScenicScore) {
        highestScenicScore = scenicScore;
      }
    }
  }

  return highestScenicScore;
}

const grid = input.split('\n').map((line) => line.split('').map(Number));

console.log(partOne(grid));
console.log(partTwo(grid));
