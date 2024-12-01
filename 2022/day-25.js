import { readFileSync } from 'fs';

const input = readFileSync('2022/inputs/day-25.txt', 'utf-8');

const fromSNAFU = (snafu) => {
  let sum = 0;
  let index = 0;

  const splitted = snafu.split('').reverse();

  for (let digit of splitted) {
    if (['1', '2'].includes(digit)) {
      sum += +digit * 5 ** index;
    } else if (digit === '-') {
      sum += -1 * 5 ** index;
    } else if (digit === '=') {
      sum += -2 * 5 ** index;
    }

    index += 1;
  }

  return sum;
};

const toSNAFU = (decimal) => {
  let res = '';
  const base5 = decimal.toString(5).split('').map(Number).reverse();
  let carry = false;

  for (let char of base5) {
    let val = char;

    if (carry) {
      val += 1;
      carry = false;
    }

    if (val === 5) {
      val = 0;
      carry = true;
    }

    if ([0, 1, 2].includes(val)) {
      res = `${val}${res}`;
    } else if (val === 3) {
      res = `=${res}`;
      carry = true;
    } else if (val === 4) {
      res = `-${res}`;
      carry = true;
    }
  }

  if (carry) {
    res = `1${res}`;
  }

  return res;
};

function partOne(input) {
  return input
    .split('\n')
    .map(fromSNAFU)
    .reduce((sum, num) => [sum[0] + num], [0])
    .map(toSNAFU)
    .at(0);
}

console.log(partOne(input));
