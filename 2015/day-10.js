let input = '1321131112';

const process = (input) => {
  const sequence = input.split('');
  let ret = '';
  let idx = 0;

  while (idx < sequence.length) {
    let sameChar = false;
    let count = 1;

    do {
      sameChar = sequence[idx + count - 1] === sequence[idx + count];
      if (sameChar) {
        count += 1;
      }
    } while (sameChar);

    ret += `${count}${sequence[idx]}`;

    idx += count;
  }

  return ret;
};

console.log(partOne(input));
console.log(partTwo(input));

function partOne(input) {
  let ret = input;
  for (let ii = 0; ii < 40; ii += 1) {
    ret = process(ret);
  }

  return ret.length;
}

function partTwo(input) {
  let ret = input;
  for (let ii = 0; ii < 50; ii += 1) {
    ret = process(ret);
  }

  return ret.length;
}
