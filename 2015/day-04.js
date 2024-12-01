const { md5 } = require('./md5');
const input = 'iwrupvqb';

console.log(partOne(input));
console.log(partTwo(input));

function partOne(input) {
  let ii = 0;
  let hash = '';
  
  while (!hash.startsWith('00000')) {
    ii += 1;
    hash = md5(`${input}${ii}`);
  }

  return ii;
}

function partTwo(input) {
  let ii = 0;
  let hash = '';

  while (!hash.startsWith('000000')) {
    ii += 1;
    hash = md5(`${input}${ii}`);
  }

  return ii;
}
