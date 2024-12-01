const { md5 } = require('./md5');
const input = 'qzyelonm';

console.log(partOne(input));
console.log(partTwo(input));

function partOne(salt) {
  const keys = [];
  let index = -1;
  const threeInARowRegex = /(\w)\1{2}/;

  while (keys.length < 64) {
    index++;
    const message = `${salt}${index}`;
    const hash = md5(message);
    const threeInARow = threeInARowRegex.exec(hash);

    if (threeInARow) {
      const repeatingChar = threeInARow[1];
      const fiveInARowRegex = new RegExp(`${repeatingChar}{5}`);

      for (let subIndex = index + 1; subIndex < index + 1001; subIndex += 1) {
        const fiveInARow = fiveInARowRegex.test(md5(`${salt}${subIndex}`));
        if (fiveInARow) {
          keys.push(index);
          break;
        }
      }
    }
  }

  return index;
}

function partTwo(salt) {
  const hashesMap = {};
  const keys = [];
  let index = -1;
  const threeInARowRegex = /(\w)\1{2}/;

  while (keys.length < 64) {
    index++;
    const message = `${salt}${index}`;
    const hash = stretchedMd5(hashesMap, message);
    const threeInARow = threeInARowRegex.exec(hash);

    if (threeInARow) {
      const repeatingChar = threeInARow[1];
      const fiveInARowRegex = new RegExp(`${repeatingChar}{5}`);

      for (let subIndex = index + 1; subIndex < index + 1001; subIndex += 1) {
        const fiveInARow = fiveInARowRegex.test(
          stretchedMd5(hashesMap, `${salt}${subIndex}`)
        );
        if (fiveInARow) {
          keys.push(index);
          break;
        }
      }
    }
  }

  return index;
}

function stretchedMd5(hashesMap, message) {
  if (hashesMap[message]) {
    return hashesMap[message];
  }

  let m = message;

  for (let ii = 0; ii <= 2016; ii += 1) {
    m = md5(m);
  }

  hashesMap[message] = m;

  return m;
}
