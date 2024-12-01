const fs = require('fs');
const input = fs.readFileSync('./inputs/day-07.txt', 'utf-8');

console.log(partOne(input));
console.log(partTwo(input));

function partOne(list) {
  const validIpAddresses = list.split('\n').filter((ipAddress) => {
    // Everything outside brackets.
    const supernetSequences = ipAddress.split(/\[\w+\]/g);
    const validSupernetSequences = supernetSequences.some((p) =>
      supportsTls(p)
    );

    if (!validSupernetSequences) {
      return false;
    }

    // Everything inside brackets.
    const hypernetSequences = ipAddress
      .match(/\[\w+\]/g)
      .map((m) => m.replace(/\[(\w+)\]/g, '$1'));
    const validHypernetSequences = hypernetSequences.every(
      (p) => !supportsTls(p)
    );

    return validHypernetSequences;
  });

  return validIpAddresses.length;
}

function partTwo(list) {
  const validIpAddresses = list.split('\n').filter((ipAddress) => {
    // Everything outside brackets.
    const supernetSequences = ipAddress.split(/\[\w+\]/g);
    // Everything inside brackets.
    const hypernetSequences = ipAddress
      .match(/\[\w+\]/g)
      .map((m) => m.replace(/\[(\w+)\]/g, '$1'));

    return supportsSsl(supernetSequences, hypernetSequences);
  });

  return validIpAddresses.length;
}

function hasAbba(val) {
  return val[0] !== val[1] && val[0] === val[3] && val[1] === val[2];
}

function hasAba(val) {
  return val[0] !== val[1] && val[0] === val[2];
}

function getBabFromAba(val) {
  return `${val[1]}${val[0]}${val[1]}`;
}

function supportsTls(val) {
  if (val.length < 4) {
    return false;
  }

  if (val.length === 4 && hasAbba(val)) {
    return true;
  }

  for (let idx = 0; idx < val.length - 3; idx++) {
    let part = val.substring(idx, idx + 4);

    if (hasAbba(part)) {
      return true;
    }
  }

  return false;
}

function supportsSsl(supernetSequences, hypernetSequences) {
  const babs = [];

  hypernetSequences.forEach(hypernetSeq => {
    for (let idx = 0; idx < hypernetSeq.length - 2; idx += 1) {
      const part = hypernetSeq.substring(idx, idx + 3);
      babs.push(part);
    }
  });

  for (let supernetSeq of supernetSequences) {
    for (let idx = 0; idx < supernetSeq.length - 2; idx += 1) {
      const part = supernetSeq.substring(idx, idx + 3);
      
      if (!hasAba(part)) {
        continue;
      }
      
      const bab = getBabFromAba(part);
      
      if (babs.includes(bab)) {
        return true;
      }
    }
  };

  return false;
}
