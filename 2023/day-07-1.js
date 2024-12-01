import { readFileSync } from 'fs';

const input = readFileSync('2023/inputs/day-07.txt', 'utf-8');

const handleTie = (a, b) => {
  const strength = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];

  for (let ii = 0; ii < a.hand.length; ii += 1) {
    if (a.hand[ii] === b.hand[ii]) continue;

    if (strength.indexOf(a.hand[ii]) < strength.indexOf(b.hand[ii])) {
      return 1;
    } else {
      return -1;
    }
  }

  return 0;
};

const checkFiveOfAKind = (a, b) => {
  const aIsFiveOfAKind = /^(\w)\1{4}$/g.test(a.hand);
  const bIsFiveOfAKind = /^(\w)\1{4}$/g.test(b.hand);

  if (aIsFiveOfAKind && bIsFiveOfAKind) return handleTie(a, b);
  if (aIsFiveOfAKind) return 1;
  if (bIsFiveOfAKind) return -1;
  return 0;
};

const checkFourOfAKind = (a, b) => {
  const valuesOccurenceMapA = Object.values(a.occurrenceMap);
  const aIsFourOfAKind = valuesOccurenceMapA[0] === 4 || valuesOccurenceMapA[1] === 4;

  const valuesOccurenceMapB = Object.values(b.occurrenceMap);
  const bIsFourOfAKind = valuesOccurenceMapB[0] === 4 || valuesOccurenceMapB[1] === 4;

  if (aIsFourOfAKind && bIsFourOfAKind) return handleTie(a, b);
  if (aIsFourOfAKind) return 1;
  if (bIsFourOfAKind) return -1;
  return 0;
};

const checkFullHouse = (a, b) => {
  const valuesOccurenceMapA = Object.values(a.occurrenceMap).toSorted((valA, valB) => valB - valA);
  const aIsFullHouse = valuesOccurenceMapA[0] === 3 && valuesOccurenceMapA[1] === 2;

  const valuesOccurenceMapB = Object.values(b.occurrenceMap).toSorted((valA, valB) => valB - valA);
  const bIsFullHouse = valuesOccurenceMapB[0] === 3 && valuesOccurenceMapB[1] === 2;

  if (aIsFullHouse && bIsFullHouse) return handleTie(a, b);
  if (aIsFullHouse) return 1;
  if (bIsFullHouse) return -1;
  return 0;
};

const checkThreeOfAKind = (a, b) => {
  const valuesOccurenceMapA = Object.values(a.occurrenceMap).toSorted((valA, valB) => valB - valA);
  const aIsThreeOfAKind = valuesOccurenceMapA[0] === 3 && valuesOccurenceMapA.length === 3;

  const valuesOccurenceMapB = Object.values(b.occurrenceMap).toSorted((valA, valB) => valB - valA);
  const bIsThreeOfAKind = valuesOccurenceMapB[0] === 3 && valuesOccurenceMapB.length === 3;

  if (aIsThreeOfAKind && bIsThreeOfAKind) return handleTie(a, b);
  if (aIsThreeOfAKind) return 1;
  if (bIsThreeOfAKind) return -1;
  return 0;
};

const checkTwoPair = (a, b) => {
  const valuesOccurenceMapA = Object.values(a.occurrenceMap).toSorted((valA, valB) => valB - valA);
  const aIsTwoPair = valuesOccurenceMapA[0] === 2 && valuesOccurenceMapA[1] === 2;

  const valuesOccurenceMapB = Object.values(b.occurrenceMap).toSorted((valA, valB) => valB - valA);
  const bIsTwoPair = valuesOccurenceMapB[0] === 2 && valuesOccurenceMapB[1] === 2;

  if (aIsTwoPair && bIsTwoPair) return handleTie(a, b);
  if (aIsTwoPair) return 1;
  if (bIsTwoPair) return -1;
  return 0;
}

const checkOnePair = (a, b) => {
  const valuesOccurenceMapA = Object.values(a.occurrenceMap).toSorted((valA, valB) => valB - valA);
  const aIsOnePair = valuesOccurenceMapA[0] === 2 && valuesOccurenceMapA.length === 4;

  const valuesOccurenceMapB = Object.values(b.occurrenceMap).toSorted((valA, valB) => valB - valA);
  const bIsOnePair = valuesOccurenceMapB[0] === 2 && valuesOccurenceMapB.length === 4;

  if (aIsOnePair && bIsOnePair) return handleTie(a, b);
  if (aIsOnePair) return 1;
  if (bIsOnePair) return -1;
  return 0;
}

function partOne(cards) {
  return cards
    .toSorted((a, b) => {
      return (
        checkFiveOfAKind(a, b) ||
        checkFourOfAKind(a, b) ||
        checkFullHouse(a, b) ||
        checkThreeOfAKind(a, b) ||
        checkTwoPair(a, b) ||
        checkOnePair(a, b) ||
        handleTie(a, b)
      );
    })
    .reduce((sum, card, index) => {
      return sum + card.bid * (index + 1);
    }, 0);
}

function parseInput(input) {
  return input.split('\n').reduce((cards, line) => {
    const [hand, bidString] = line.split(' ');

    const occurrenceMap = {};
    for (let card of hand.split('')) {
      occurrenceMap[card] = occurrenceMap[card] ? occurrenceMap[card] + 1 : 1;
    }

    cards.push({ hand, bid: +bidString, occurrenceMap });
    return cards;
  }, []);
}

const cards = parseInput(input);

console.log(partOne(cards));
