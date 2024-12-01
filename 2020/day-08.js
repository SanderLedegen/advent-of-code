const fs = require('fs');
let input = fs.readFileSync('./inputs/day-08.txt', 'utf-8');

console.log(partOne(input));
console.log(partTwo(input));

function partOne(input) {
  const instructions = parseInput(input);
  let ip = 0;
  let accumulator = 0;
  const visitedIndices = [];
  
  while (ip < instructions.length) {
    if (visitedIndices.includes(ip)) {
      return accumulator;
    }
    visitedIndices.push(ip);

    const instruction = instructions[ip];

    switch (instruction.op) {
      case 'acc':
        accumulator += instruction.arg;
        ip += 1;
        break;

      case 'nop':
        ip += 1;
        break;

      case 'jmp':
        ip += instruction.arg;
        break;
    
      default:
        throw new Error(`Unknown op "${instruction.op}"`);
    }
  }
}

function partTwo(input) {
  let instructions = parseInput(input);

  const jmpIndices = instructions.reduce((indices, instr, idx) => {
    if (instr.op === 'jmp') {
      indices.push(idx);
    }
    return indices;
  }, []);

  const nopIndices = instructions.reduce((indices, instr, idx) => {
    if (instr.op === 'nop') {
      indices.push(idx);
    }
    return indices;
  }, []);

  
  while (true) {
    instructions = parseInput(input);

    if (jmpIndices.length) {
      const idx = jmpIndices.shift();
      instructions[idx].op = 'nop';
    } else if (nopIndices.length) {
      const idx = nopIndices.shift();
      instructions[idx].op = 'jmp';
    } else {
      throw new Error(`Replaced all jmp and nop instructions without solution.`);
    }

    let ip = 0;
    let accumulator = 0;
    const visitedIndices = [];
    let encounteredSameInstruction = false;

    while (ip < instructions.length) {
      if (visitedIndices.includes(ip)) {
        encounteredSameInstruction = true;
        break;
      }

      visitedIndices.push(ip);
  
      const instruction = instructions[ip];
  
      switch (instruction.op) {
        case 'acc':
          accumulator += instruction.arg;
          ip += 1;
          break;
  
        case 'nop':
          ip += 1;
          break;
  
        case 'jmp':
          ip += instruction.arg;
          break;
  
        default:
          throw new Error(`Unknown op "${instruction.op}"`);
      }
    }

    if (!encounteredSameInstruction) {
      return accumulator;
    }
  }
}

function parseInput(input) {
  return input.split('\n').reduce((instructions, line) => {
    const match = line.match(/(\w+)\s([+-]\d+)/);

    instructions.push({
      op: match[1],
      arg: +match[2],
    })

    return instructions;
  }, []);
}
