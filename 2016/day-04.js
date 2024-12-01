const fs = require('fs');
const input = fs.readFileSync('./inputs/day-04.txt', 'utf-8');

console.log(partOne(input));
console.log(partTwo(input));

function partOne(input) {
  return getValidRooms(input).reduce((sum, room) => (sum += room.sector), 0);
}

function partTwo(input) {
  const rooms = getValidRooms(input).map((room) => {
    const decryptedName = room.name
      .split('')
      .map((char) => {
        let charCode = char.charCodeAt(0) + room.sector % 26;
        if (charCode > 122) charCode -= 26;
        return String.fromCharCode(charCode);
      })
      .join('');

    return {
      ...room,
      decryptedName,
    };
  });

  const match = rooms.find(room => room.decryptedName.includes('northpole'));

  return match || 'No matching room found';
}

function getValidRooms(input) {
  const rooms = input.split('\n').map((line) => {
    const groups = line.split(/(?:([a-z\-]+)\-)+(\d+)\[(\w+)\]/gm);
    const name = groups[1].split('-').join('');
    const sector = +groups[2];
    const checksum = groups[3];

    return {
      name,
      sector,
      checksum,
    };
  });

  return rooms.filter((room) => {
    const map = createCharOccurenceMap(room.name);

    return room.checksum.split('').every((char, idx) => char === map[idx].char);
  });
}

function createCharOccurenceMap(name) {
  const map = {};

  name.split('').forEach((char) => {
    map[char] = map[char] ? map[char] + 1 : 1;
  });

  const arr = Object.keys(map).map(key => {
    return { char: key, amount: map[key] };
  }).sort((a, b) => {
    return b.amount - a.amount !== 0 ? b.amount - a.amount : (a.char < b.char ? -1 : 1);
  });

  return arr;
}
