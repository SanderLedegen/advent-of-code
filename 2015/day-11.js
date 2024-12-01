const input = 'cqjxjnds';

console.log(partOne(input));
console.log(partTwo(input));

function increaseLetter(word, alphabet, pos) {
  const idx = alphabet.indexOf(word[pos]);
  const newChar = alphabet[(idx + 1) % 26];

  let shiz = word;

  if (newChar === 'a') {
    shiz = increaseLetter(word, alphabet, pos - 1);
  }

  return `${shiz.substring(0, pos)}${newChar}${shiz.substring(pos + 1)}`;
}

function check(password) {
  if (/[iol]/g.test(password)) {
    return false;
  }

  let regexString = '';

  for (let ii = 97; ii <= 120; ii += 1) {
    // a to x
    regexString += String.fromCharCode(ii);
    regexString += String.fromCharCode(ii + 1);
    regexString += String.fromCharCode(ii + 2);

    if (ii !== 120) {
      regexString += '|';
    }
  }

  const straightRegex = new RegExp(regexString);

  if (!straightRegex.test(password)) {
    return false;
  }

  const pairMatch = password.match(/(\w)\1.*?(\w)\2/g);
  if (!pairMatch) {
    return false;
  }

  const matchChars = pairMatch[0].split('');
  if (matchChars[0] === matchChars[matchChars.length - 1]) {
    return false;
  }

  return true;
};

function partOne(input) {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  let valid = false;

  while (!valid) {
    input = increaseLetter(input, alphabet, input.length - 1)
    valid = check(input);
  }

  return input;
}

function partTwo(input) {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  let valid = false;

  while (!valid) {
    input = increaseLetter(input, alphabet, input.length - 1);
    valid = check(input);
  }

  valid = false;

  while (!valid) {
    input = increaseLetter(input, alphabet, input.length - 1);
    valid = check(input);
  }

  return input;
}
