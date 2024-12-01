const fs = require('fs');
const input = fs.readFileSync('./inputs/day-06.txt', 'utf-8');

const messages = input.split('\n');
console.log(partOne(messages));
console.log(partTwo(messages));

function partOne(messages) {
  let ecMessage = '';
  
  for (let ii = 0; ii < messages[0].length; ii += 1) {
    let col = [];
    messages.forEach((m) => col.push(m[ii]));
    let map = count(col);
    let s = sort(map);
    ecMessage += s[0].char;
  }
  
  return ecMessage;
}

function partTwo(messages) {
  let ecMessage = '';

  for (let ii = 0; ii < messages[0].length; ii += 1) {
    let col = [];
    messages.forEach((m) => col.push(m[ii]));
    let map = count(col);
    let s = sort(map).reverse();
    ecMessage += s[0].char;
  }

  return ecMessage;
}

function count(arr) {
  let map = {};
  arr.forEach((char) => {
    map[char] = map[char] ? map[char] + 1 : 1;
  });
  return map;
}

function sort(map) {
  let arr = [];
  Object.keys(map).forEach((key) => {
    arr.push({ char: key, val: map[key] });
  });

  arr.sort((a, b) => {
    return b.val - a.val !== 0 ? b.val - a.val : 0;
  });

  return arr;
}
