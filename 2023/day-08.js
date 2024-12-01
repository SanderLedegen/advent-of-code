import assert from 'assert';
import { readFileSync } from 'fs';

let input = readFileSync('2023/inputs/day-08.txt', 'utf-8');

function partOne(input) {
  const { instructions, nodes } = input;

  let steps = 0;
  let instrIdx = 0;
  let currLoc = 'AAA';

  while (currLoc !== 'ZZZ') {
    const instr = instructions[instrIdx % instructions.length];
    currLoc = nodes.get(currLoc)?.[instr];
    assert(currLoc, `Current location is not defined`);
    instrIdx += 1;
    steps += 1;
  }

  return steps;
}

function partTwo(input) {
  const { instructions, nodes } = input;

  const startNodes = [...nodes.keys()].filter(node => node.endsWith('A'));

  let allSteps = Array.from({length: startNodes.length}).fill(0);

  for (let ii = 0; ii < startNodes.length; ii += 1) {
    let node = startNodes[ii];
    let steps = 0;
    let instrIdx = 0;
  
    while (!node.endsWith('Z')) {
      const instr = instructions[instrIdx % instructions.length];
      node = nodes.get(node)[instr];
      assert(node, `Current node is not defined`);
      steps += 1;
      instrIdx += 1;
    }
  
    allSteps[ii] = steps;
  }

  return allSteps;
}

// function partTwo(input) {
//   const { nodes } = input;
//   const revNodes = new Map();

//   for (let [key, {L, R}] of nodes.entries()) {
//     if (revNodes.has(L)) {
//       revNodes.get(L).add(key);
//     } else {
//       revNodes.set(L, new Set([key]));
//     }
    
//     if (revNodes.has(R)) {
//       revNodes.get(R).add(key);
//     } else {
//       revNodes.set(R, new Set([key]));
//     }
//   }

//   for (let [key, value] of revNodes) {
//     revNodes.set(key, [...value.values()]);
//   }

//   console.log(`Rev nodes:`);
//   console.log(revNodes);

//   const zEndingNodes = [...revNodes.keys()].filter(node => node.endsWith('Z'));
//   console.log(`zEndingNodes: ${zEndingNodes}`);

//   let allSteps = [];
//   for (let node of zEndingNodes) {
//     const steps = findPath(revNodes, node);
//     console.log(`It took ${steps} from ${node} to xxA`);
//     allSteps.push(steps);
//   }

//   return allSteps;
// }

// function findPath(map, node) {
//   let steps = 0;

//   while (!node.endsWith('A')) {
//     const newNodes = map.get(node);

//     node = newNodes[0];

//     // for (let newNode of newNodes) {
//     //   steps += findPath(map, newNode);
//     // }

//     steps += 1;
//   }

//   return steps;
// }

function parseInput(input) {
  const lines = input.split('\n');

  const retObj = {
    instructions: [],
    nodes: new Map(),
  };

  for (let ii = 0; ii < lines.length; ii += 1) {
    if (ii === 0) {
      retObj.instructions = lines[ii].split('');
      continue;
    }

    if (ii === 1) continue;

    const [node, left, right] = lines[ii].match(/(\w{3})/g);
    retObj.nodes.set(node, { L: left, R: right });
  }

  return retObj;
}

const parsedInput = parseInput(input);

console.log(partOne(parsedInput));
console.log(partTwo(parsedInput));
