
const { md5 } = require('./md5');
let input = 'reyedfim';

console.log(partOne(input));
console.log(partTwo(input));

function partOne(doorId) {
  let password = '';
  let index = 0;

  while (password.length < 8) {
    const message = `${doorId}${index}`;
    const hash = md5(message);
    if (hash.startsWith('00000')) {
      password += hash[5];
    }
    index++;
  }

  return password;
}

function partTwo(doorId) {
  let password = [];
  let index = 0;

  while (password.join('').length < 8) {
    const message = `${doorId}${index}`;
    const hash = md5(message);
    if (hash.startsWith('00000')) {
      const idx = +hash[5];
      if (!password[idx] && idx >= 0 && idx <= 7) {
        password[idx] = hash[6];
      }
    }
    index++;
  }

  return password.join('');
}
