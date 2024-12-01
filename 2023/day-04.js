import { readFileSync } from 'fs';

const input = readFileSync('2023/inputs/day-04.txt', 'utf-8');

function partOne(cards) {
  return cards.reduce((sum, card) => {
    const points = Math.floor(2 ** (card.numMatchingNumbers - 1));
    return sum + points;
  }, 0);
}

function partTwo(cards) {
  const appendToMap = (map, cardId) => {
    if (map.has(cardId)) {
      map.set(cardId, map.get(cardId) + 1);
    } else {
      map.set(cardId, 1);
    }
  };

  const map = cards.reduce((map, card) => {
    appendToMap(map, card.id);

    for (let copy = card.id + 1; copy <= card.id + card.numMatchingNumbers; copy += 1) {
      for (let times = 1; times <= map.get(card.id); times += 1) {
        appendToMap(map, copy);
      }
    }

    return map;
  }, new Map());

  return [...map.values()].reduce((sum, value) => sum + value, 0);
}

function parseInput(input) {
  return input.split('\n').reduce((cards, line) => {
    const splitted = line.split(/Card\s+(\d+):\s+([\d\s]+)\s+|\s+([\d\s]+)/);
    const id = +splitted.at(1);
    const winningNumbers = splitted.at(2).split(/\s+/).map(Number);
    const ownNumbers = splitted.at(-2).split(/\s+/).map(Number);

    const numMatchingNumbers = ownNumbers.reduce(
      (amount, number) => (winningNumbers.includes(number) ? amount + 1 : amount),
      0
    );

    cards.push({
      id,
      winningNumbers,
      ownNumbers,
      numMatchingNumbers,
    });

    return cards;
  }, []);
}

const cards = parseInput(input);

console.log(partOne(cards));
console.log(partTwo(cards));
