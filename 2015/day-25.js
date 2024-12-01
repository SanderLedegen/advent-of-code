console.log(partOne());

function partOne() {
  const row = 2981;
  const col = 3075;

  let index = getIndexByRowAndCol(row, col);

  let code = 20151125;
  for (let ii = 1; ii < index; ii += 1) {
    code = (code * 252533) % 33554393;
  }

  return code;
}

function getIndexByRowAndCol(row, col) {
  let index = 1;

  for (let ii = 1; ii <= row; ii += 1) {
    index += ii - 1;
  }

  for (let jj = 1; jj < col; jj += 1) {
    index += row + jj;
  }

  return index;
}
