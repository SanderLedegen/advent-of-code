import { readFileSync } from 'fs';
import assert from 'node:assert/strict';

const input = readFileSync('2022/inputs/day-07.txt', 'utf-8');

// Helper methods
const isFile = (item) => !isNaN(item);

const findSize = (dir) => {
  return Object.keys(dir).reduce((totalSize, item) => {
    if (isFile(dir[item])) {
      return totalSize + dir[item];
    }

    return totalSize + findSize(dir[item]);
  }, 0);
};

const findDirsWithSizeUpTo = (dir, maxSize) => {
  return Object.keys(dir).reduce((matchingDirs, item) => {
    if (!isFile(dir[item])) {
      const size = findSize(dir[item]);

      if (size <= maxSize) {
        matchingDirs.push(dir[item]);
      }

      return [...matchingDirs, ...findDirsWithSizeUpTo(dir[item], maxSize)];
    }

    return matchingDirs;
  }, []);
};

const findDirsWithSizeOfAtLeast = (dir, minSize) => {
  return Object.keys(dir).reduce((matchingDirs, item) => {
    if (!isFile(dir[item])) {
      const size = findSize(dir[item]);

      if (size >= minSize) {
        matchingDirs.push(dir[item]);
      }

      return [...matchingDirs, ...findDirsWithSizeOfAtLeast(dir[item], minSize)];
    }

    return matchingDirs;
  }, []);
};

// Parsing the input into a file tree structure
const parseInput = (input) => {
  const lines = input.split('\n');
  const tree = {};

  let currentDir = tree;
  let parentDirs = [];

  for (let lineIdx = 1; lineIdx < lines.length; lineIdx += 1) {
    const line = lines[lineIdx];

    if (line.startsWith('$ ls')) {
      continue;
    }
    
    if (line.startsWith('$ cd')) {
      const [, , arg] = line.split(' ');

      if (arg === '..') {
        currentDir = parentDirs.pop();
      } else {
        parentDirs.push(currentDir);
        currentDir = currentDir[arg];
      }

      continue;
    }

    if (line.startsWith('dir')) {
      const [, dirName] = line.split(' ');
      currentDir[dirName] = {};
    } else {
      const [size, fileName] = line.split(' ');
      currentDir[fileName] = +size;
    }
  }

  return tree;
};

function partOne(tree) {
  const dirs = findDirsWithSizeUpTo(tree, 100_000);

  return dirs.reduce((totalSize, dir) => {
    return totalSize + findSize(dir);
  }, 0);
}

function partTwo(tree) {
  const totalDiskSpace = 70_000_000;
  const requiredDiskSpace = 30_000_000;
  const usedDiskSpace = findSize(tree);
  const freeDiskSpace = totalDiskSpace - usedDiskSpace;
  const wantedDiskSpace = requiredDiskSpace - freeDiskSpace;

  assert(wantedDiskSpace > 0, 'There is already enough disk space to install the update...');

  const dirs = findDirsWithSizeOfAtLeast(tree, wantedDiskSpace);

  return Math.min(...dirs.map((dir) => findSize(dir)));
}

const tree = parseInput(input);

console.log(partOne(tree));
console.log(partTwo(tree));
