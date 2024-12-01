import { readFileSync } from 'fs';

const input = readFileSync('2022/inputs/day-20.txt', 'utf-8');

function mix(input, factor, mixRounds) {
  const numbers = input.split('\n').map((num) => ({ value: Number(num) * factor }));
  const origOrder = [...numbers];
  
  for (let round = 1; round <= mixRounds; round += 1) {
    let ptr = 0;

    while (ptr < origOrder.length) {
      const idx = numbers.findIndex((num) => num === origOrder[ptr]);
      const { value } = origOrder[ptr];

      let newIdx = (idx + value) % (numbers.length - 1);
      if (value < 0) {
        newIdx = numbers.length + newIdx - 1;
      }

      newIdx %= numbers.length;

      numbers.splice(idx, 1);
      numbers.splice(newIdx, 0, origOrder[ptr]);

      ptr += 1;
    }
  }

  let idxOfZero = numbers.findIndex((num) => num.value === 0);

  const a = numbers[(1000 + idxOfZero) % numbers.length].value;
  const b = numbers[(2000 + idxOfZero) % numbers.length].value;
  const c = numbers[(3000 + idxOfZero) % numbers.length].value;

  return a + b + c;
}

console.log(mix(input, 1, 1));
console.log(mix(input, 811589153, 10));
