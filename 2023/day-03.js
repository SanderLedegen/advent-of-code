import { readFileSync } from 'fs';

const input = readFileSync('2023/inputs/day-03.txt', 'utf-8');

function partOne(lines, symbolLocations) {
  const isAdjacentToSymbol = (symbolLocations, lineIdx, indicesRange) => {
    return symbolLocations.some(([y, x]) => {
      const dy = Math.abs(y - lineIdx);
      let dx = Infinity;
      
      for (let ii = indicesRange[0]; ii < indicesRange[1]; ii += 1) {
        dx = Math.min(Math.abs(x - ii), dx);
      }

      return dy <= 1 && dx <= 1;
    });
  };

  const numberRegex = /\d+/dg;
  let sum = 0;

  for (let lineIdx = 0; lineIdx < lines.length; lineIdx += 1) {
    const line = lines[lineIdx];
    let regexInfo;

    while (regexInfo = numberRegex.exec(line)) {
      const value = +regexInfo[0];
      const indicesRange = regexInfo.indices[0];
      sum += isAdjacentToSymbol(symbolLocations, lineIdx, indicesRange) ? value : 0;
    }
  }

  return sum;
}

function partTwo(lines, gearLocations) {
  return gearLocations.reduce((sum, [y, x]) => {
    const linesToConsider = [];
    if (y > 0) linesToConsider.push(lines[y - 1]);
    linesToConsider.push(lines[y]);
    if (y < lines.length) linesToConsider.push(lines[y + 1]);
    
    const numberRegex = /\d+/dg;
    const partNumbers = [];

    for (let line of linesToConsider) {
      let regexInfo;

      while (regexInfo = numberRegex.exec(line)) {
        const value = +regexInfo[0];
        const indicesRange = regexInfo.indices[0];

        let dx = Infinity;
        
        for (let ii = indicesRange[0]; ii < indicesRange[1]; ii += 1) {
          dx = Math.min(Math.abs(x - ii), dx);
        }

        const isAdjacent = dx <= 1;
        if (isAdjacent) {
          partNumbers.push(value);
        }
      }
    }

    if (partNumbers.length === 2) {
      sum += partNumbers[0] * partNumbers[1];
    }

    return sum;
  }, 0);
}

function findSymbolLocations(lines, regex) {
  const symbolLocations = [];

  for (let lineIdx = 0; lineIdx < lines.length; lineIdx += 1) {
    const line = lines[lineIdx];
    let regexInfo;

    while (regexInfo = regex.exec(line)) {
      symbolLocations.push([lineIdx, regexInfo.index]);
    }
  }

  return symbolLocations;
}

const lines = input.split('\n');
const symbolLocations = findSymbolLocations(lines, /[^0-9\.\s]/g);
const gearLocations = findSymbolLocations(lines, /\*/g);

console.log(partOne(lines, symbolLocations));
console.log(partTwo(lines, gearLocations));
