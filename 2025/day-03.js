import { readFileSync } from 'fs';

const input = readFileSync('2025/inputs/day-03.txt', 'utf-8');

function partOne(banks) {
  return banks.reduce((sum, bank) => {
    const firstDigit = Math.max(...bank.slice(0, -1));
    const idx = bank.join('').indexOf(firstDigit);
    const secondDigit = Math.max(...bank.slice(idx + 1));
    const max = Number(`${firstDigit}${secondDigit}`);
    return sum + max;
  }, 0);
}

function partTwo(banks) {
  return banks.reduce((sum, bank) => {
    const strBank = bank.join('');
    const digitArr = [];
    let nextDigitCandidates = [...bank.slice(0, -11)];
    
    for (let ii = 12; ii > 0; ii -= 1) {
      const nextDigit = Math.max(...nextDigitCandidates);
      digitArr.push(nextDigit);
      const idx = strBank.indexOf(nextDigit, strBank.length - ii - nextDigitCandidates.length + 1);
      const endSliceIdx = -(12 - digitArr.length - 1);
      nextDigitCandidates = [...bank.slice(idx + 1, endSliceIdx === 0 ? undefined : endSliceIdx)];
    }

    return sum + Number(digitArr.join(''));
  }, 0);
}

const banks = input.split('\n').map((bank) => bank.split('').map(Number));

console.log(partOne(banks));
console.log(partTwo(banks));