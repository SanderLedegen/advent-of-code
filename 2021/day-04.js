const fs = require('fs');
const input = fs.readFileSync('./inputs/day-04.txt', 'utf-8');

const checkBoard = (board) => {
  let completedBoard = false;

  // Horizontal check
  for (let ii = 0; ii <= board.length - 5 && !completedBoard; ii += 5) {
    completedBoard = board.slice(ii, ii + 5).every((n) => n >= 100);
  }

  // Vertical check
  for (let ii = 0; ii < 5 && !completedBoard; ii += 1) {
    const arr = [board[0 + ii], board[5 + ii], board[10 + ii], board[15 + ii], board[20 + ii]];
    completedBoard = arr.every((n) => n >= 100);
  }

  return completedBoard;
};

console.log(partOneAndTwo(input));

function partOneAndTwo(input) {
  const { numbers, boards } = parseInput(input);
  const completedBoards = [];
  const numOfBoards = boards.length;

  while (completedBoards.length < numOfBoards) {
    const drawnNumber = numbers.shift();

    for (let boardIdx = boards.length - 1; boardIdx >= 0; boardIdx -= 1) {
      const board = boards[boardIdx];
      const idx = board.findIndex((number) => number === drawnNumber);
      if (idx > -1) board[idx] += 100;

      const boardComplete = checkBoard(board);
      if (boardComplete) {
        const sum = board.reduce((sum, num) => (sum += num < 100 ? num : 0), 0);
        completedBoards.push(sum * drawnNumber);
        boards.splice(boardIdx, 1);
      }
    }
  }

  return [completedBoards[0], completedBoards[completedBoards.length - 1]];
}

function parseInput(input) {
  const lines = input.split('\n');
  let numbers;
  const boards = [];
  let currentBoard = [];

  for (let ii = 0; ii < lines.length; ii += 1) {
    if (lines[ii] === '') continue;

    if (ii === 0) {
      numbers = lines[ii].split(',').map(Number);
      continue;
    }

    if (currentBoard.length >= 25) {
      boards.push(currentBoard);
      currentBoard = [];
    }

    currentBoard = [...currentBoard, ...lines[ii].split(' ').filter(Boolean).map(Number)];
  }

  boards.push(currentBoard);

  return {
    numbers,
    boards,
  };
}
