import { readFileSync } from 'fs';

const input = readFileSync('2025/inputs/day-02.txt', 'utf-8');

function partOneAndTwo(ranges) {
  let sumPartOne = 0;
  let sumPartTwo = 0;

  for (const [start, end] of ranges) {
    for (let id = start; id <= end; id += 1) {
      const regexPartOne = /^(\d+)\1$/;
      const regexPartTwo = /^(\d+)\1{1,}$/;

      if (regexPartOne.test(id)) {
        sumPartOne += id;
      }

      if (regexPartTwo.test(id)) {
        sumPartTwo += id;
      }
    }
  }

  return [sumPartOne, sumPartTwo];
}

const ranges = input.split(',').map((range) => range.split('-').map(Number));

console.log(partOneAndTwo(ranges));