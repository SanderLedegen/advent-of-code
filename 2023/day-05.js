import { readFileSync } from 'fs';
import { Worker } from 'worker_threads';

let input = readFileSync('2023/inputs/day-05.txt', 'utf-8');

function partOne(input) {
  return input.seeds.reduce((min, seed) => {
    let currentMap = 'seed';

    while (currentMap !== 'location') {
      const { to, nums } = input[currentMap];

      for (let num of nums) {
        const [dest, src, range] = num;

        if (seed >= src && seed < src + range) {
          seed = seed - src + dest;
          break;
        }
      }

      currentMap = to;
    }

    return Math.min(min, seed);
  }, Infinity);
}

async function partTwo(input) {
  const createWorker = (data) => {
    return new Promise((resolve, reject) => {
      const worker = new Worker('./2023/day-05-worker.js', { workerData: data });
      worker.on('message', ({type, value}) => {
        if (type === 'result') {
          console.log('Some worker is done!');
          resolve(value);
        };
        if (type === 'progress') console.log(value);
      });
      worker.on('error', reject);
    });
  };

  const workers = [];

  for (let ii = 0; ii < input.seeds.length; ii += 2) {
    const start = input.seeds[ii];
    const length = input.seeds[ii + 1];

    workers.push(createWorker({ input, start, length }));


    // for (let origSeed = start; origSeed < start + length; origSeed += 1) {
    //   let currentMap = 'seed';
    //   let seed = origSeed;

    //   while (currentMap !== 'location') {
    //     const { to, nums } = input[currentMap];

    //     for (let num of nums) {
    //       const [dest, src, range] = num;

    //       if (seed >= src && seed < src + range) {
    //         seed = seed - src + dest;
    //         break;
    //       }
    //     }

    //     currentMap = to;
    //   }

    //   min = Math.min(min, seed);
    // }
  }

  const result = await Promise.all(workers);

  return Math.min(...result);
}

function parseInput(input) {
  const lines = input.split('\n');
  const retObj = {};
  const mapRegex = /(\w+)-to-(\w+) map:/;
  let currentMap;

  for (let line of lines) {
    if (line === '') {
      continue;
    }

    if (line.startsWith('seeds:')) {
      retObj.seeds = line.match(/\d+/g).map(Number);
      continue;
    }

    if (mapRegex.test(line)) {
      const [, from, to] = line.match(mapRegex);
      retObj[from] = {
        to,
        nums: [],
      };
      currentMap = from;
      continue;
    }

    retObj[currentMap].nums.push(line.match(/\d+/g).map(Number));
  }

  return retObj;
}

const parsedInput = parseInput(input);

console.log(partOne(parsedInput));
console.log(await partTwo(parsedInput));
