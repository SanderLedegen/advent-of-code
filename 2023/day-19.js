import { readFileSync } from 'fs';

let input = readFileSync('2023/inputs/day-19.txt', 'utf-8');

function partOne(workflows, ratings) {
  const acceptedParts = [];

  for (let ii = 0; ii < ratings.length; ii += 1) {
    const rating = ratings[ii];
    
    let nextKey = 'in';
    while (!['A', 'R'].includes(nextKey)) {
      const conditions = workflows.get(nextKey);
      let stop = false;
      
      for (let jj = 0; jj < conditions.length && !stop; jj += 1) {
        const {cat, op, num, next} = conditions[jj];
        if (!cat) {
          nextKey = next;
          stop = true;
          continue;
        }

        if (op === '<') {
          if (rating[cat] < num) {
            nextKey = next;
            stop = true;
            continue;
          }
        } else if (op === '>') {
          if (rating[cat] > num) {
            nextKey = next;
            stop = true;
            continue;
          }
        }
      }
    }

    if (nextKey === 'A') {
      acceptedParts.push(rating);
    }
  }

  return acceptedParts.reduce((sum, {x, m, a, s}) => {
    return sum + x + m + a + s;
  }, 0);
}

function partTwo(workflows) {
  const minMaxX = [1, 4000];
  const minMaxM = [1, 4000];
  const minMaxA = [1, 4000];
  const minMaxS = [1, 4000];

  for (let value of workflows.values()) {
    for (let {cat, op, num, next} of value) {
      if (!cat) continue;

      if (next !== 'R') continue;

      if (op === '<') {
        switch (cat) {
          case 'x':
            minMaxX[1] = Math.min(num - 1, minMaxX[1]);
            break;
            case 'm':
            minMaxM[1] = Math.min(num - 1, minMaxX[1]);
            break;
            case 'a':
            minMaxA[1] = Math.min(num - 1, minMaxX[1]);
            break;
            case 's':
            minMaxS[1] = Math.min(num - 1, minMaxX[1]);
            break;
        }
      } else if (op === '>') {
        switch (cat) {
          case 'x':
            minMaxX[0] = Math.max(num + 1, minMaxX[0]);
            break;
            case 'm':
            minMaxM[0] = Math.max(num + 1, minMaxM[0]);
            break;
            case 'a':
            minMaxA[0] = Math.max(num + 1, minMaxA[0]);
            break;
            case 's':
            minMaxS[0] = Math.max(num + 1, minMaxS[0]);
            break;
        }
      }
    }
  }

  console.log(minMaxX);
  console.log(minMaxM);
  console.log(minMaxA);
  console.log(minMaxS);

  return [minMaxX, minMaxM, minMaxA, minMaxS].reduce((product, [min, max]) => {
    return product * (max - min + 1);
  }, 1)
}

function parseInput(input) {
  const lines = input.split('\n');
  let secondPart = false;
  const workflows = new Map();
  const ratings = [];

  for (let line of lines) {
    if (line === '') {
      secondPart = true;
      continue;
    }

    if (!secondPart) {
      const accoladeIndexStart = line.indexOf('{');
      const accoladeIndexEnd = line.indexOf('}');
      const key = line.substring(0, accoladeIndexStart);
      const conditionsShiz = line.substring(accoladeIndexStart + 1, accoladeIndexEnd).split(',');
      const conditions = [];

      for (let condition of conditionsShiz) {
        const parts = condition.match(/(\w+)(<|>)(\d+):(\w+)/);
        if (!parts) {
          conditions.push({next: condition});
          continue;
        }

        conditions.push({
          cat: parts[1],
          op: parts[2],
          num: +parts[3],
          next: parts[4],
        });
      }

      workflows.set(key, conditions);
    } else {
      const shiz = line.match(/x=(\d+),m=(\d+),a=(\d+),s=(\d+)/);
      ratings.push({
        x: +shiz[1],
        m: +shiz[2],
        a: +shiz[3],
        s: +shiz[4],
      })
    }
  }

  return {workflows, ratings};
}

const {workflows, ratings} = parseInput(input);

console.log(partOne(workflows, ratings));
console.log(partTwo(workflows));