const fs = require('fs');
let input = fs.readFileSync('./inputs/day-14.txt', 'utf-8');

console.log(partOne(input));
console.log(partTwo(input));

function partOne(input) {
  const lines = input.split('\n');
  const mem = [];
  let bitmask = undefined;

  const applyBitmask = (value, bitmask) => {
    const binary = value.toString(2).padStart(bitmask.length, '0');

    let ret = '';

    for (let ii = 0; ii < bitmask.length; ii += 1) {
      if (bitmask[ii] === 'X') {
        ret += binary[ii];
      } else if (bitmask[ii] === '0') {
        ret += 0;
      } else if (bitmask[ii] === '1') {
        ret += 1;
      }
    }

    return parseInt(ret, 2);
  };

  lines.forEach((line) => {
    if (line.startsWith('mask')) {
      bitmask = line.split('mask = ')[1];
      return;
    }

    const matches = line.match(/mem\[(\d+)\] = (\d+)/);
    const addr = +matches[1];
    const value = +matches[2];

    mem[addr] = applyBitmask(value, bitmask);
  });

  return mem.reduce((sum, val) => {
    if (!val) return sum;
    return sum + val;
  }, 0);
}

function partTwo(input) {
  const lines = input.split('\n');
  const mem = [];
  let bitmask = undefined;
  let sum = 0;

  const applyBitmask = (address, bitmask) => {
    const binary = address.toString(2).padStart(bitmask.length, '0');

    const addresses = [];
    let addr = '';
    let numFloating = 0;

    for (let ii = 0; ii < bitmask.length; ii += 1) {
      if (bitmask[ii] === 'X') {
        addr += 'X';
        numFloating += 1;
      } else if (bitmask[ii] === '0') {
        addr += binary[ii];
      } else if (bitmask[ii] === '1') {
        addr += 1;
      }
    }

    for (let ii = 0; ii < 2 ** numFloating; ii += 1) {
      const bin = ii.toString(2).padStart(numFloating, '0').split('');
      let newAddr = addr;

      for (let jj = 0; jj < numFloating; jj += 1) {
        newAddr = newAddr.replace('X', bin.shift());
      }

      addresses.push(parseInt(newAddr, 2));
    }

    return addresses;
  };

  lines.forEach((line) => {
    if (line.startsWith('mask')) {
      bitmask = line.split('mask = ')[1];
      return;
    }

    const matches = line.match(/mem\[(\d+)\] = (\d+)/);
    const addr = +matches[1];
    const value = +matches[2];

    const addresses = applyBitmask(addr, bitmask);
    addresses.forEach((a) => {
      if (mem[a]) {
        sum += value - mem[a];
      } else {
        sum += value;
      }

      mem[a] = value;
    });
  });

  return sum;
}
