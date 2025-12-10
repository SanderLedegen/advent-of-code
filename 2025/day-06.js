import { readFileSync } from 'fs';

const input = readFileSync('2025/inputs/day-06.txt', 'utf-8');

function partOne(input) {
  const lines = input.split('\n');
  const nums = [];
  let ops = [];

  for (let lineIdx = 0; lineIdx < lines.length; lineIdx += 1) {
    const values = lines[lineIdx].trim().split(/\s+/);

    if (lineIdx === lines.length - 1) {
      ops = values;
    } else {
      nums.push(values.map(Number));
    }
  }

  let grandTotal = 0;

  for (let col = 0; col < nums[0].length; col += 1) {
    const op = ops[col];
    let total = op === '*' ? 1 : 0;
  
    for (let row = 0; row < nums.length; row += 1) {
      if (op === '+') total += nums[row][col]
      if (op === '*') total *= nums[row][col]
    }

    grandTotal += total;
  }

  return grandTotal;
}

function partTwo(input) {
  const lines = input.split('\n');
  let grandTotal = 0;
  let total = 0;
  let op;
  
  for (let colIdx = 0; colIdx < lines[0].length; colIdx += 1) {
    let digitStr = '';
    
    for (let lineIdx = 0; lineIdx < lines.length; lineIdx += 1) {
      const digit = lines[lineIdx][colIdx].trim();
      if (digit === '*') {
        grandTotal += total;
        total = 1;
        op = '*';
        continue;
      }
      if (digit === '+') {
        grandTotal += total;
        total = 0;
        op = '+';
        continue;
      }
      if (digit !== '') digitStr += digit;
    }
    
    if (op === '+' && digitStr) total += Number(digitStr);
    if (op === '*' && digitStr) total *= Number(digitStr);
  }

  grandTotal += total

  return grandTotal;
}

console.log(partOne(input));
console.log(partTwo(input));
