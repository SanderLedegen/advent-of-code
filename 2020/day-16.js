const fs = require('fs');
let input = fs.readFileSync('./inputs/day-16.txt', 'utf-8');

console.log(partOne(input));
console.log(partTwo(input));

function partOne(input) {
  const notes = parseInput(input);

  const isValid = (notes, val) => {
    for (let ii = 0; ii < notes.fields.length; ii++) {
      const field = notes.fields[ii];
      const rangeACheck = field.rangeA[0] <= val && val <= field.rangeA[1];
      const rangeBCheck = field.rangeB[0] <= val && val <= field.rangeB[1];
      if (rangeACheck || rangeBCheck) {
        return true;
      }
    }

    return false;
  };

  return notes.nearbyTickets.reduce((sum, ticket) => {
    return ticket
      .filter((value) => !isValid(notes, value))
      .reduce((ssum, n) => ssum + n, sum);
  }, 0);
}

function partTwo(input) {
  const notes = parseInput(input);

  const validTickets = notes.nearbyTickets.filter((ticket) => {
    return ticket.every((t) => isValid(notes, t));
  });

  const map = notes.fields.reduce(
    (map, field) => ({ ...map, [field.name]: [] }),
    {}
  );

  for (let fieldIdx = 0; fieldIdx < notes.fields.length; fieldIdx += 1) {
    const field = notes.fields[fieldIdx];
    let pos = 0;

    while (pos < validTickets[0].length) {
      const validForAllFields = validTickets.every((ticket) => {
        const value = ticket[pos];

        const rangeACheck =
          field.rangeA[0] <= value && value <= field.rangeA[1];
        const rangeBCheck =
          field.rangeB[0] <= value && value <= field.rangeB[1];

        return rangeACheck || rangeBCheck;
      });

      // Add all possibilities per field
      if (validForAllFields) {
        map[field.name].push(pos);
      }

      pos += 1;
    }
  }

  let length = 1;
  const resolvedPositions = [];

  const mapKeys = Object.keys(map);

  while (length <= mapKeys.length) {
    const fieldName = mapKeys.find((key) => map[key].length === length);

    if (length === 1) {
      resolvedPositions.push(map[fieldName][0]);
      map[fieldName] = map[fieldName][0];
    } else {
      map[fieldName] = map[fieldName].filter(
        (val) => !resolvedPositions.includes(val)
      );
      if (map[fieldName].length === 1) {
        resolvedPositions.push(map[fieldName][0]);
        map[fieldName] = map[fieldName][0];
      }
    }

    length += 1;
  }

  return Object.entries(map).reduce((sum, [name, pos]) => {
    if (!name.startsWith('departure')) {
      return sum;
    }

    return sum * notes.ownTicket[pos];
  }, 1);
}

function parseInput(input) {
  const lines = input.split('\n');

  const ret = {
    fields: [],
    ownTicket: [],
    nearbyTickets: [],
  };

  for (let ii = 0; ii < lines.length; ii++) {
    const line = lines[ii];

    const fieldMatches = line.match(
      /^([a-z\s]+):\s(\d+)\-(\d+)\sor\s(\d+)\-(\d+)/
    );
    if (fieldMatches) {
      ret.fields.push({
        name: fieldMatches[1],
        rangeA: [+fieldMatches[2], +fieldMatches[3]],
        rangeB: [+fieldMatches[4], +fieldMatches[5]],
      });
    }

    if (line.startsWith('your ticket')) {
      ii += 1;
      ret.ownTicket = lines[ii].split(',').map(Number);
    }

    if (line.startsWith('nearby tickets')) {
      ii += 1;
      while (ii < lines.length) {
        ret.nearbyTickets.push(lines[ii].split(',').map(Number));
        ii += 1;
      }
    }
  }

  return ret;
}
