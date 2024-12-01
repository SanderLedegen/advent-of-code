import { workerData, parentPort } from 'worker_threads';

let min = Infinity;
const input = workerData.input;
const start = workerData.start;
const length = workerData.length;

for (let origSeed = start; origSeed < start + length; origSeed += 1) {
  let currentMap = 'seed';
  let seed = origSeed;

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

  min = Math.min(min, seed);
}

parentPort.postMessage({
  type: 'result',
  value: min,
});
