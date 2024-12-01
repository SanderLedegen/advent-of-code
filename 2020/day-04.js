const fs = require('fs');
let input = fs.readFileSync('./inputs/day-04.txt', 'utf-8');

console.log(partOne(input));
console.log(partTwo(input));

function partOne(input) {
  const passports = parseInput(input);

  return passports.filter(passport => {
    const keys = Object.keys(passport);
    return keys.length === 8 || (keys.length === 7 && !keys.includes('cid'));
  }).length;
}

function partTwo(input) {
  const passports = parseInput(input);

  return passports.filter((passport) => {
    const keys = Object.keys(passport);
    const validKeys = keys.length === 8 || (keys.length === 7 && !keys.includes('cid'));

    if (!validKeys) {
      return false;
    }

    if (!(+passport['byr'] >= 1920 && +passport['byr'] <= 2002)) {
      return false;
    }

    if (!(+passport['iyr'] >= 2010 && +passport['iyr'] <= 2020)) {
      return false;
    }

    if (!(+passport['eyr'] >= 2020 && +passport['eyr'] <= 2030)) {
      return false;
    }

    const heightParts = passport['hgt'].split(/(\d+)(cm|in)/g);
    const cmCheck =
      heightParts[2] === 'cm' &&
      +heightParts[1] >= 150 &&
      +heightParts[1] <= 193;
    const inCheck =
      heightParts[2] === 'in' && +heightParts[1] >= 59 && +heightParts[1] <= 76;

    if (!cmCheck && !inCheck) {
      return false;
    }

    if (!/^#[a-f0-9]{6}$/i.test(passport['hcl'])) {
      return false;
    }

    if (
      !['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(
        passport['ecl']
      )
    ) {
      return false;
    }

    if (!/^\d{9}$/.test(passport['pid'])) {
      return false;
    }

    return true;
  }).length;
}

function parseInput(input) {
  const lines = input.split('\n');
  const passports = [];
  let parts = '';

  lines.forEach((line, idx) => {
    if (line.length) {
      parts += line + ' ';
    }

    if (!line.length || idx === lines.length - 1) {
      const fields = parts.match(/([a-z]{3}):([\w#]+)/g);

      const passport = {};

      fields.forEach(field => {
        const [key, val] = field.split(':');
        passport[key] = val;
      })

      passports.push(passport);

      parts = '';
    }
  });

  return passports;
}
