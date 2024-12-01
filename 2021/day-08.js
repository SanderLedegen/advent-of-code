const fs = require('fs');
let input = fs.readFileSync('./inputs/day-08.txt', 'utf-8');

// input = `acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf`;

console.log(partOne(input));
console.log(partTwo(input));

function partOne(input) {
  const entries = parseInput(input);
  const segmentLengths = [2, 4, 3, 7]; // Segment lengths of the digits 1, 4, 7 and 8.

  let sum = 0;

  for (const entry of entries) {
    sum += entry.outputValues.reduce((sum, val) => (sum += segmentLengths.includes(val.length)), 0);
  }

  return sum;
}

function partTwo(input) {
  const entries = parseInput(input);

  const determineOutputValue = (entry) => {
    let top = 'abcdefg'.split('');
    let topLeft = 'abcdefg'.split('');
    let topRight = 'abcdefg'.split('');
    let center = 'abcdefg'.split('');
    let bottom = 'abcdefg'.split('');
    let bottomLeft = 'abcdefg'.split('');
    let bottomRight = 'abcdefg'.split('');

    for (const signal of entry.signals) {
      switch (signal.length) {
        case 2: // Represents digit '1'
          topRight = topRight.filter((v) => signal.includes(v));
          bottomRight = bottomRight.filter((v) => signal.includes(v));

          top = top.filter((v) => !signal.includes(v));
          topLeft = topLeft.filter((v) => !signal.includes(v));
          center = center.filter((v) => !signal.includes(v));
          bottomLeft = bottomLeft.filter((v) => !signal.includes(v));
          bottom = bottom.filter((v) => !signal.includes(v));
          break;

        case 3: // Represents digit '7'
          top = top.filter((v) => signal.includes(v));
          topRight = topRight.filter((v) => signal.includes(v));
          bottomRight = bottomRight.filter((v) => signal.includes(v));

          topLeft = topLeft.filter((v) => !signal.includes(v));
          center = center.filter((v) => !signal.includes(v));
          bottomLeft = bottomLeft.filter((v) => !signal.includes(v));
          bottom = bottom.filter((v) => !signal.includes(v));
          break;

        case 4: // Represents digit '4'
          topLeft = topLeft.filter((v) => signal.includes(v));
          center = center.filter((v) => signal.includes(v));
          topRight = topRight.filter((v) => signal.includes(v));
          bottomRight = bottomRight.filter((v) => signal.includes(v));

          top = top.filter((v) => !signal.includes(v));
          bottomLeft = bottomLeft.filter((v) => !signal.includes(v));
          bottom = bottom.filter((v) => !signal.includes(v));
          break;
      }
    }

    // Five-segment signals represent the digits 2, 3 and 5.
    const fiveSegmentSignals = entry.signals.filter((signal) => signal.length === 5);

    // A signal that represents the digit '3' should have segments for both
    // top-right and bottom-right, which distincts it from the digit '2' and the
    // digit '5'.
    const three = fiveSegmentSignals.find((signal) => {
      return [...topRight, ...bottomRight].every((v) => signal.includes(v));
    });

    top = top.filter((v) => three.includes(v));
    center = center.filter((v) => three.includes(v));
    bottom = bottom.filter((v) => three.includes(v));

    topLeft = topLeft.filter((v) => !three.includes(v));
    bottomLeft = bottomLeft.filter((v) => !three.includes(v));

    // The digit '5' can be found when in the bottom-left and top-right segments
    // no matches are found.
    const five = fiveSegmentSignals.find((signal) => {
      return (
        bottomLeft.some((v) => !signal.includes(v)) && topRight.some((v) => !signal.includes(v))
      );
    });

    // Further narrow down the possibilities of the last two segments, using the
    // digit '5'.
    topRight = topRight.filter((v) => !five.includes(v));
    bottomRight = bottomRight.filter((v) => five.includes(v));

    const mapSignalToDigit = (signal) => {
      switch (signal.length) {
        case 2:
          return 1;

        case 3:
          return 7;

        case 4:
          return 4;

        case 5:
          const topLeftSegmentOn = signal.includes(topLeft[0]);
          const bottomRightSegmentOn = signal.includes(bottomRight[0]);
          return topLeftSegmentOn ? 5 : bottomRightSegmentOn ? 3 : 2;

        case 6:
          const centerSegmentOn = signal.includes(center[0]);
          const topRightSegmentOn = signal.includes(topRight[0]);
          return centerSegmentOn ? (topRightSegmentOn ? 9 : 6) : 0;

        case 7:
          return 8;
      }
    };

    let decoded = '';
    for (let value of entry.outputValues) {
      decoded += `${mapSignalToDigit(value)}`;
    }

    return +decoded;
  };

  return entries.reduce((sum, entry) => (sum += determineOutputValue(entry)), 0);
}

function parseInput(input) {
  const lines = input.split('\n');
  const ret = [];

  for (const line of lines) {
    const [left, right] = line.split(' | ');
    const signals = left.split(' ');
    const outputValues = right.split(' ');

    ret.push({
      signals,
      outputValues,
    });
  }

  return ret;
}
