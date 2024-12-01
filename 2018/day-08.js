const fs = require('fs');
let input = fs.readFileSync('./inputs/day-08.txt', 'utf-8');

const numbers = input.split(' ').map(Number);
const rootNode = createTree(numbers);

console.log(partOne(rootNode));
console.log(partTwo(rootNode));

function partOne(rootNode) {
  const sumNodes = (node) => {
    let sum = node.metadataEntries.reduce((sum, val) => sum + val, 0);

    for (let childNode of node.children) {
      sum += sumNodes(childNode);
    }

    return sum;
  };

  return sumNodes(rootNode);
}

function partTwo(rootNode) {
  const sumNodes = (node) => {
    let sum = 0;

    if (!node.children.length) {
      sum = node.metadataEntries.reduce((sum, val) => sum + val, 0);
    } else {
      for (let md of node.metadataEntries) {
        if (node.children[md - 1]) {
          sum += sumNodes(node.children[md - 1]);
        }
      }
    }

    return sum;
  };

  return sumNodes(rootNode.children[0]);
}

function createTree(numbers) {
  class Node {
    constructor(parent = null, numChildren = 0, numMetadataEntries = 0) {
      this.parent = parent;
      this.children = new Array(numChildren);
      this.children.fill(undefined);
      this.metadataEntries = new Array(numMetadataEntries);
      this.metadataEntries.fill(undefined);
    }
  }

  const rootNode = new Node(null, 1);
  let currentParent = rootNode;
  let currentNode;

  for (let ii = 0; ii < numbers.length; ii += 1) {
    const allChildNodesParsed = currentParent.children.every((c) => !!c);

    if (allChildNodesParsed) {
      const len = currentParent.metadataEntries.length;
      for (let jj = 0; jj < len; jj += 1) {
        currentParent.metadataEntries[jj] = numbers[ii + jj];
      }

      ii += currentParent.metadataEntries.length - 1;
      currentParent = currentParent.parent;

      continue;
    }

    const numChildren = numbers[ii];
    const numMetadataEntries = numbers[ii + 1];

    currentNode = new Node(currentParent, numChildren, numMetadataEntries);

    const firstEmptyIndex = currentParent.children.findIndex((v) => !v);
    if (firstEmptyIndex === -1) {
      throw Error('Wrong child node allocation!');
    }
    currentParent.children[firstEmptyIndex] = currentNode;

    if (numChildren === 0) {
      for (let jj = 0; jj < numMetadataEntries; jj += 1) {
        currentNode.metadataEntries[jj] = numbers[ii + 2 + jj];
      }

      ii += numMetadataEntries + 1;
    } else {
      currentParent = currentNode;
      ii += 1;
    }
  }

  return rootNode;
}
