const input = 36_000_000;

console.log(partOne(input));
console.log(partTwo(input));

function partOne(input) {
  let houseNumber = 1;

  while (true) {
    const divisors = getDivisors(houseNumber);
    const numPresents = divisors.reduce((sum, div) => sum + div * 10, 0);

    if (numPresents >= input) break;
    houseNumber += 1;
  }

  return houseNumber;
}

function partTwo(input) {
  let houseNumber = 1;

  while (true) {
    const divisors = getDivisors(houseNumber, true);
    const numPresents = divisors.reduce((sum, div) => sum + div * 11, 0);

    if (numPresents >= input) break;
    houseNumber += 1;
  }

  return houseNumber;
}

function getDivisors(num, partTwo = false) {
  const divisors = new Set();

  divisors.add(1);
  divisors.add(num);

  for (let ii = 2; ii <= Math.sqrt(num); ii += 1) {
    if (num % ii === 0) {
      divisors.add(ii);
      divisors.add(num / ii);
    }
  }

  if (partTwo) {
    return [...divisors].filter((d) => d * 50 >= num);
  } else {
    return [...divisors];
  }
}
