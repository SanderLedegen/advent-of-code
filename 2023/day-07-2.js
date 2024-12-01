import { readFileSync } from 'fs';

const input = readFileSync('2023/inputs/day-07.txt', 'utf-8');

const handleTie = (a, b) => {
  const strength = ['A', 'K', 'Q', 'T', '9', '8', '7', '6', '5', '4', '3', '2', 'J'];

  for (let ii = 0; ii < a.hand.length; ii += 1) {
    if (a.hand[ii] === b.hand[ii]) continue;

    if (strength.indexOf(a.hand[ii]) < strength.indexOf(b.hand[ii])) {
      return 1;
    } else {
      return -1;
    }
  }

  throw "Hand's still a tie...";
};

const checkFiveOfAKind = (a, b) => {
  const keysOccurenceMapA = Object.keys(a.occurrenceMap);
  const valuesOccurenceMapA = Object.values(a.occurrenceMap);
  const aIsFiveOfAKind =
    /^(\w)\1{4}$/g.test(a.hand) ||
    (valuesOccurenceMapA.length === 2 && keysOccurenceMapA.includes('J'));

  const keysOccurenceMapB = Object.keys(b.occurrenceMap);
  const valuesOccurenceMapB = Object.values(b.occurrenceMap);
  const bIsFiveOfAKind =
    /^(\w)\1{4}$/g.test(b.hand) ||
    (valuesOccurenceMapB.length === 2 && keysOccurenceMapB.includes('J'));

  if (aIsFiveOfAKind && bIsFiveOfAKind) return handleTie(a, b);
  if (aIsFiveOfAKind) return 1;
  if (bIsFiveOfAKind) return -1;
  return 0;
};

const checkFourOfAKind = (a, b) => {
  const valuesOccurenceMapA = Object.values(a.occurrenceMap).toSorted((valA, valB) => valB - valA);
  const aIsFourOfAKind =
    valuesOccurenceMapA[0] === 4 ||
    (valuesOccurenceMapA.length === 3 && [2, 3].includes(a.occurrenceMap['J'])) ||
    (valuesOccurenceMapA.length === 3 &&
      a.occurrenceMap['J'] === 1 &&
      valuesOccurenceMapA[0] === 3);

  const valuesOccurenceMapB = Object.values(b.occurrenceMap).toSorted((valA, valB) => valB - valA);
  const bIsFourOfAKind =
    valuesOccurenceMapB[0] === 4 ||
    (valuesOccurenceMapB.length === 3 && [2, 3].includes(b.occurrenceMap['J'])) ||
    (valuesOccurenceMapB.length === 3 &&
      b.occurrenceMap['J'] === 1 &&
      valuesOccurenceMapB[0] === 3);

  if (aIsFourOfAKind && bIsFourOfAKind) return handleTie(a, b);
  if (aIsFourOfAKind) return 1;
  if (bIsFourOfAKind) return -1;
  return 0;
};

const checkFullHouse = (a, b) => {
  const valuesOccurenceMapA = Object.values(a.occurrenceMap).toSorted((valA, valB) => valB - valA);
  const aIsFullHouse =
    (valuesOccurenceMapA[0] === 3 && valuesOccurenceMapA[1] === 2) ||
    ([1, 2].includes(a.occurrenceMap['J']) && valuesOccurenceMapA.length === 3);

  const valuesOccurenceMapB = Object.values(b.occurrenceMap).toSorted((valA, valB) => valB - valA);
  const bIsFullHouse =
    (valuesOccurenceMapB[0] === 3 && valuesOccurenceMapB[1] === 2) ||
    ([1, 2].includes(b.occurrenceMap['J']) && valuesOccurenceMapB.length === 3);

  if (aIsFullHouse && bIsFullHouse) return handleTie(a, b);
  if (aIsFullHouse) return 1;
  if (bIsFullHouse) return -1;
  return 0;
};

const checkThreeOfAKind = (a, b) => {
  const valuesOccurenceMapA = Object.values(a.occurrenceMap).toSorted((valA, valB) => valB - valA);
  const aIsThreeOfAKind =
    (valuesOccurenceMapA[0] === 3 && valuesOccurenceMapA.length === 3) ||
    (a.occurrenceMap['J'] === 2 && valuesOccurenceMapA.length === 4) ||
    (a.occurrenceMap['J'] === 1 &&
      valuesOccurenceMapA[0] === 2 &&
      valuesOccurenceMapA.length === 4);

  const valuesOccurenceMapB = Object.values(b.occurrenceMap).toSorted((valA, valB) => valB - valA);
  const bIsThreeOfAKind =
    (valuesOccurenceMapB[0] === 3 && valuesOccurenceMapB.length === 3) ||
    (b.occurrenceMap['J'] === 2 && valuesOccurenceMapB.length === 4) ||
    (b.occurrenceMap['J'] === 1 &&
      valuesOccurenceMapB[0] === 2 &&
      valuesOccurenceMapB.length === 4);

  if (aIsThreeOfAKind && bIsThreeOfAKind) return handleTie(a, b);
  if (aIsThreeOfAKind) return 1;
  if (bIsThreeOfAKind) return -1;
  return 0;
};

const checkTwoPair = (a, b) => {
  const valuesOccurenceMapA = Object.values(a.occurrenceMap).toSorted((valA, valB) => valB - valA);
  const aIsTwoPair =
    (valuesOccurenceMapA[0] === 2 && valuesOccurenceMapA[1] === 2) ||
    (valuesOccurenceMapA[0] === 2 &&
      a.occurrenceMap['J'] === 1 &&
      valuesOccurenceMapA.length === 4) ||
    (valuesOccurenceMapA.length === 4 && a.occurrenceMap['J'] === 2);

  const valuesOccurenceMapB = Object.values(b.occurrenceMap).toSorted((valA, valB) => valB - valA);
  const bIsTwoPair =
    (valuesOccurenceMapB[0] === 2 && valuesOccurenceMapB[1] === 2) ||
    (valuesOccurenceMapB[0] === 2 &&
      b.occurrenceMap['J'] === 1 &&
      valuesOccurenceMapB.length === 4) ||
    (valuesOccurenceMapB.length === 4 && b.occurrenceMap['J'] === 2);

  if (aIsTwoPair && bIsTwoPair) return handleTie(a, b);
  if (aIsTwoPair) return 1;
  if (bIsTwoPair) return -1;
  return 0;
};

const checkOnePair = (a, b) => {
  const valuesOccurenceMapA = Object.values(a.occurrenceMap).toSorted((valA, valB) => valB - valA);
  const aIsOnePair =
    (valuesOccurenceMapA[0] === 2 && valuesOccurenceMapA.length === 4) ||
    (valuesOccurenceMapA.length === 5 && a.occurrenceMap['J'] === 1);

  const valuesOccurenceMapB = Object.values(b.occurrenceMap).toSorted((valA, valB) => valB - valA);
  const bIsOnePair =
    (valuesOccurenceMapB[0] === 2 && valuesOccurenceMapB.length === 4) ||
    (valuesOccurenceMapB.length === 5 && b.occurrenceMap['J'] === 1);

  if (aIsOnePair && bIsOnePair) return handleTie(a, b);
  if (aIsOnePair) return 1;
  if (bIsOnePair) return -1;
  return 0;
};

function partTwo(cards) {
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

console.log(partTwo(cards));
