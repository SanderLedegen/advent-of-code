import { readFileSync } from 'fs';

const input = readFileSync('2024/inputs/day-01.txt', 'utf-8');
const lists = input
  .split('\n')
  .reduce(
    ([left, right], line) => {
      const [leftNum, rightNum] = line.match(/\d+/g).map(Number);
      return [
        [...left, leftNum],
        [...right, rightNum],
      ];
    },
    [[], []]
  )
  .map((list) => list.sort((a, b) => a - b));

function partOne([leftList, rightList]) {
  return leftList.reduce((sum, leftNum, idx) => {
    const rightNum = rightList[idx];
    const diff = Math.abs(leftNum - rightNum);
    return sum + diff;
  }, 0);
}

function partTwo([leftList, rightList]) {
  const freqMap = rightList.reduce((map, number) => {
    map.set(number, (map.get(number) || 0) + 1);
    return map;
  }, new Map());

  return leftList.reduce((sum, number) => {
    const score = (freqMap.get(number) || 0) * number;
    return sum + score;
  }, 0);
}

console.log(partOne(lists));
console.log(partTwo(lists));
