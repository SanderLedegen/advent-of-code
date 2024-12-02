import { readFileSync } from 'fs';

const input = readFileSync('2024/inputs/day-02.txt', 'utf-8');

const reports = input.split('\n').map((report) => report.split(' ').map(Number));

const checkReport = (arr) => {
  const result = { numDiffPassed: true, allAscOrDesc: true };
  const isAsc = Math.sign(arr[1] - arr[0]);

  for (let ii = 1; ii < arr.length; ii += 1) {
    const diff = Math.abs(arr[ii] - arr[ii - 1]);
    const sign = arr[ii] - arr[ii - 1];

    if (!(diff >= 1 && diff <= 3)) {
      result.numDiffPassed = false;
    }

    if (isAsc !== Math.sign(sign)) {
      result.allAscOrDesc = false;
    }
  }

  return result;
};

function partOne(reports) {
  return reports.reduce((numPassed, report) => {
    const { numDiffPassed, allAscOrDesc } = checkReport(report);

    if (numDiffPassed && allAscOrDesc) {
      return numPassed + 1;
    }

    return numPassed;
  }, 0);
}

function partTwo(reports) {
  return reports.reduce((numPassed, report) => {
    const { numDiffPassed, allAscOrDesc } = checkReport(report);

    if (numDiffPassed && allAscOrDesc) {
      return numPassed + 1;
    }

    for (let ii = 0; ii < report.length; ii += 1) {
      const changedReport = report.filter((_, index) => index !== ii);

      const { numDiffPassed, allAscOrDesc } = checkReport(changedReport);

      if (numDiffPassed && allAscOrDesc) {
        return numPassed + 1;
      }
    }

    return numPassed;
  }, 0);
}

console.log(partOne(reports));
console.log(partTwo(reports));
