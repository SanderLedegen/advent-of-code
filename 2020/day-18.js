const fs = require('fs');
let input = fs.readFileSync('./inputs/day-18.txt', 'utf-8');

console.log(partOne(input));
console.log(partTwo(input));

function partOne(input) {
  const lines = input.split('\n');

  return lines.reduce((sum, line) => {
    const lineWithoutParentheses = flatten(line, calcEqualPrecedence);
    return sum + calcEqualPrecedence(lineWithoutParentheses);
  }, 0);
}

function partTwo(input) {
  const lines = input.split('\n');

  return lines.reduce((sum, line) => {
    const lineWithoutParentheses = flatten(line, calcDifferentPrecedence);
    return sum + calcDifferentPrecedence(lineWithoutParentheses);
  }, 0);
}

function flatten(line, calcMethod) {
  while (line.includes('(')) {
    const idxFirstParenthese = line.indexOf('(');
    const idxLastParenthese = getIdxMatchingParenthese(line);

    let inner = line.substring(idxFirstParenthese + 1, idxLastParenthese);

    if (inner.includes('(')) {
      inner = flatten(inner, calcMethod);
    }

    const result = calcMethod(inner);

    line = `${line.substring(0, idxFirstParenthese)}${result}${line.substring(
      idxLastParenthese + 1
    )}`;
  }

  return line;
}

function calcEqualPrecedence(line) {
  const chars = line.split(/\s/);

  while (chars.length > 1) {
    const a = chars.shift();
    const op = chars.shift();
    const b = chars.shift();
    chars.unshift(+eval(`${a}${op}${b}`));
  }

  return +chars.join('');
}

function calcDifferentPrecedence(line) {
  const chars = line.split(/\s/);
  let idx = 0;

  while (idx < chars.length) {
    if (chars[idx + 1] === '+') {
      const a = +chars.splice(idx, 1)[0];
      chars.splice(idx, 1)[0];
      const b = +chars.splice(idx, 1)[0];
      chars.splice(idx, 0, a + b);
    } else {
      idx += 1;
    }
  }

  return +eval(chars.join(''));
}

function getIdxMatchingParenthese(line) {
  let openedParentheses = 0;

  for (let ii = line.indexOf('('); ii < line.length; ii += 1) {
    if (line[ii] === '(') {
      openedParentheses += 1;
    }

    if (line[ii] === ')') {
      openedParentheses -= 1;
    }

    if (openedParentheses === 0) {
      return ii;
    }
  }
}
