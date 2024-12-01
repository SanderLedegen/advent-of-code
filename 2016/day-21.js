const fs = require('fs');
const input = fs.readFileSync('./inputs/day-21.txt', 'utf-8');

console.log(partOne('abcdefgh', input));
console.log(partTwo('fbgdceah', input));

function partOne(start, input) {
  const lines = input.split('\n');

  let password = start.split('');

  lines.forEach(line => {
    if (line.startsWith('swap position')) {
      let x = +line[14];
      let y = +line[30];
      const temp = password[x];
      password[x] = password[y];
      password[y] = temp;

    } else if (line.startsWith('swap letter')) {
      let x = line[12];
      let y = line[26];
      password.forEach((char, idx) => {
        if (char === x) {
          password[idx] = y;
        } else if (char === y) {
          password[idx] = x;
        }
      });

    } else if (line.startsWith('reverse')) {
      let x = +line[18];
      let y = +line[28];
      const rev = password.slice(x, y + 1).reverse();
      for (let ii = x, cnt = 0; ii <= y; ii += 1, cnt += 1) {
        password[ii] = rev[cnt];
      }

    } else if (line.startsWith('rotate based')) {
      let x = line[35];
      const idx = password.findIndex(char => char === x);
      const numRotations = 1 + idx + (idx >= 4 ? 1 : 0);
      password = [].concat(
        password.splice(password.length - numRotations, numRotations),
        password
      );

    } else if (line.startsWith('move')) {
      let x = +line[14];
      let y = +line[28];
      const removed = password.splice(x, 1);
      password.splice(y, 0, removed[0]);

    } else if (line.startsWith('rotate left')) {
      let x = +line[12];
      password = [].concat(password, password.splice(0, x));

    } else if (line.startsWith('rotate right')) {
      let x = +line[13];
      password = [].concat(password.splice(password.length - x, x), password);
    }
  });

  return password.join('');
}

function partTwo(start, input) {
  const permutations = permutator(start.split(''));
  
  while (permutations.length) {
    const perm = permutations.shift();
    const scrambled = partOne(perm.join(''), input)
    if (scrambled === start) {
      return perm.join('');
    }
  }

  return undefined;
}

function permutator(inputArr) {
  let result = [];

  const permute = (arr, m = []) => {
    if (arr.length === 0) {
      result.push(m);
    } else {
      for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice();
        let next = curr.splice(i, 1);
        permute(curr.slice(), m.concat(next));
      }
    }
  };

  permute(inputArr);

  return result;
};