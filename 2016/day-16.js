const input = '11110010111001001';

console.log(start(input, 272));
console.log(start(input, 35651584));

function start(input, desiredLength) {
  let randomData = input;

  while (randomData.length < desiredLength) {
    randomData = generate(randomData);
  }

  return calculateChecksum(randomData, desiredLength);
}

function generate(a) {
  const b = a
    .split('')
    .reverse()
    .map((v) => (v === '0' ? '1' : '0'))
    .join('');
  return `${a}0${b}`;
}

function calculateChecksum(data, length) {
  let checksum = data;

  do {
    const value = checksum.substring(0, length);
    checksum = '';

    for (let idx = 0; idx < value.length; idx += 1) {
      const pair = `${value[idx]}${value[idx + 1]}`;
      checksum += pair === '00' || pair === '11' ? '1' : '0';
      idx++;
    }
  } while (checksum.length % 2 === 0);

  return checksum;
}
