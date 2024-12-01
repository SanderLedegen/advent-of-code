import { readFileSync } from 'fs';

let input = readFileSync('2023/inputs/day-18.txt', 'utf-8');

const getLocKey = (y, x) => `${y},${x}`;

function partOne(plan) {
  const set = new Set();
  let x = 0;
  let y = 0;

  for (let { dir, amount } of plan) {
    if (dir === 'R') {
      for (let xx = 0; xx < amount; xx += 1) {
        x += 1;
        set.add(getLocKey(y, x));
      }
    } else if (dir === 'L') {
      for (let xx = amount; xx > 0; xx -= 1) {
        x -= 1;
        set.add(getLocKey(y, x));
      }
    } else if (dir === 'U') {
      for (let yy = amount; yy > 0; yy -= 1) {
        y -= 1;
        set.add(getLocKey(y, x));
      }
    } else if (dir === 'D') {
      for (let yy = 0; yy < amount; yy += 1) {
        y += 1;
        set.add(getLocKey(y, x));
      }
    }
  }

  const toDig = [{ y: 1, x: 1 }];

  while (toDig.length > 0) {
    const digLoc = toDig.pop();
    set.add(getLocKey(digLoc.y, digLoc.x));

    if (!set.has(getLocKey(digLoc.y, digLoc.x - 1))) {
      toDig.push({ y: digLoc.y, x: digLoc.x - 1 });
    }

    if (!set.has(getLocKey(digLoc.y - 1, digLoc.x))) {
      toDig.push({ y: digLoc.y - 1, x: digLoc.x });
    }

    if (!set.has(getLocKey(digLoc.y + 1, digLoc.x))) {
      toDig.push({ y: digLoc.y + 1, x: digLoc.x });
    }

    if (!set.has(getLocKey(digLoc.y, digLoc.x + 1))) {
      toDig.push({ y: digLoc.y, x: digLoc.x + 1 });
    }
  }

  return set.size;
}

function partTwo(plan) {
  const set = new Set();
  let x = 0;
  let y = 0;
  set.add(getLocKey(y, x));

  let [minY, minX] = [Infinity, Infinity];
  let [maxY, maxX] = [-Infinity, -Infinity];
  const mapke = new Map();

  for (let { amount, dir } of plan) {
    // const amount = parseInt(color.substring(1, 6), 16);
    // const dir = ['R', 'D', 'L', 'U'][+color.at(-1)];

    if (dir === 'R') {
      for (let xx = 0; xx < amount; xx += 1) {
        x += 1;
        set.add(getLocKey(y, x));
        maxX = Math.max(maxX, x);
      }
    } else if (dir === 'L') {
      for (let xx = amount; xx > 0; xx -= 1) {
        x -= 1;
        set.add(getLocKey(y, x));
        minX = Math.min(minX, x);
      }
    } else if (dir === 'U') {
      for (let yy = amount; yy > 0; yy -= 1) {
        y -= 1;
        set.add(getLocKey(y, x));
        minY = Math.min(minY, y);
      }
    } else if (dir === 'D') {
      for (let yy = 0; yy < amount; yy += 1) {
        y += 1;
        set.add(getLocKey(y, x));
        maxY = Math.max(maxY, y);
      }
    }
  }

  [...set.values()].forEach((val) => {
    const [y1, x1] = val.split(',').map(Number);

    if (mapke.has(y1)) {
      const arr = mapke.get(y1);
      arr.push(x1);
    } else {
      mapke.set(y1, [x1]);
    }
  });

  let numInterior = 0n;

  for (let ii = 0; ii < maxY; ii += 1) {
    const arr = mapke.get(ii).sort((a, b) => a - b);
    let sumDiff = 0;
    let inside = false;

    const shiz = foo(arr);
    for (let kk = 0; kk < shiz.length; kk += 1) {
      if (kk % 2 === 0) {
        const z = BigInt(shiz[kk].length);
        numInterior += z;
      }
    }



    // for (let jj = 0; jj < arr.length - 1; jj += 1) {
    //   if (arr[jj + 1] === arr[jj] + 1) {
    //     continue;
    //   }

    //   inside = !inside;

    //   if (inside) {
    //     sumDiff += arr[jj + 1] - arr[jj];
    //   }
    // }

    // if (sumDiff > 0) numInterior += BigInt(sumDiff - 1);
  }

  console.log('edge', set.size);
  console.log('interior', numInterior);
  return BigInt(set.size) + numInterior;
}

function foo(arr) {
  const ret = [];
  let temp = [];
  let temp2 = [];

  for (let ii = 0; ii < arr.length - 1; ii += 1) {
    if (arr[ii + 1] !== arr[ii] + 1) {

      if (temp2.length > 0) {
        temp2.push(arr[ii])
        ret.push(temp2);
      }
      temp2 = [];

      for (let jj = arr[ii] + 1; jj < arr[ii + 1]; jj += 1) {
        temp.push(jj);
      }

      ret.push(temp);
      temp = [];
    } else {
      temp2.push(arr[ii]);
    }
  }

  return ret;
}

function parseInput(input) {
  const plan = [];
  const lines = input.split('\n');

  for (let line of lines) {
    const [, dir, amount, color] = line.match(/([U|R|L|D]) (\d+) \((#\w+)\)/);
    plan.push({ dir, amount: +amount, color });
  }

  return plan;
}

const plan = parseInput(input);

console.log(partOne(plan));
console.log(partTwo(plan));
