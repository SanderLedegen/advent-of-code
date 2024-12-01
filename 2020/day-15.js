let input = '2,0,1,7,4,14,18';

console.log(partOne(input));
console.log(partTwo(input));

function partOne(input) {
  return play(input, 2020);
}

function partTwo(input) {
  return play(input, 30_000_000);
}

function play(input, numTurns) {
  const numbers = input.split(',').map(Number);

  const map = new Map();
  numbers.forEach((num, idx) => {
    map.set(num, [idx + 1]);
  });
  let turn = numbers.length + 1;
  let lastSpoken = numbers.slice(-1)[0];

  while (turn <= numTurns) {
    // Completely new number
    if (!map.has(lastSpoken)) {
      map.set(lastSpoken, [turn - 1]);
      lastSpoken = 0;

      // Said only once before
    } else if (map.get(lastSpoken).length === 1) {
      lastSpoken = 0;

      // Said multiple times before
    } else {
      const diff = map.get(lastSpoken)[1] - map.get(lastSpoken)[0];
      lastSpoken = diff;
    }

    const arr = map.get(lastSpoken);

    if (arr) {
      arr[0] = arr[1] || arr[0];
      arr[1] = turn;
      map.set(lastSpoken, arr)
    } else {
      map.set(lastSpoken, [turn])
    }

    turn += 1;
  }

  return lastSpoken;
}
