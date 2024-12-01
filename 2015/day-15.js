const fs = require('fs');
let input = fs.readFileSync('./inputs/day-15.txt', 'utf-8');

console.log(partOneAndTwo(input));

function partOneAndTwo(input) {
  const ingredients = parseInput(input);
  let maxScorePartOne = -Infinity;
  let maxScorePartTwo = -Infinity;

  for (let amtFirstIngredient = 0; amtFirstIngredient <= 100; amtFirstIngredient += 1) {
    for (
      let amtSecondIngredient = 0;
      amtSecondIngredient <= 100 - amtFirstIngredient;
      amtSecondIngredient += 1
    ) {
      for (
        let amtThirdIngredient = 0;
        amtThirdIngredient <= 100 - amtFirstIngredient - amtSecondIngredient;
        amtThirdIngredient += 1
      ) {
        const amtFourthIngredient =
          100 - amtFirstIngredient - amtSecondIngredient - amtThirdIngredient;
        const totalAmount =
          amtFirstIngredient + amtSecondIngredient + amtThirdIngredient + amtFourthIngredient;
        if (totalAmount !== 100) {
          continue;
        }

        const capacity =
          ingredients[0].capacity * amtFirstIngredient +
          ingredients[1].capacity * amtSecondIngredient +
          ingredients[2].capacity * amtThirdIngredient +
          ingredients[3].capacity * amtFourthIngredient;

        const durability =
          ingredients[0].durability * amtFirstIngredient +
          ingredients[1].durability * amtSecondIngredient +
          ingredients[2].durability * amtThirdIngredient +
          ingredients[3].durability * amtFourthIngredient;

        const flavor =
          ingredients[0].flavor * amtFirstIngredient +
          ingredients[1].flavor * amtSecondIngredient +
          ingredients[2].flavor * amtThirdIngredient +
          ingredients[3].flavor * amtFourthIngredient;

        const texture =
          ingredients[0].texture * amtFirstIngredient +
          ingredients[1].texture * amtSecondIngredient +
          ingredients[2].texture * amtThirdIngredient +
          ingredients[3].texture * amtFourthIngredient;

        const calories =
          ingredients[0].calories * amtFirstIngredient +
          ingredients[1].calories * amtSecondIngredient +
          ingredients[2].calories * amtThirdIngredient +
          ingredients[3].calories * amtFourthIngredient;

        const score =
          Math.max(0, capacity) *
          Math.max(0, durability) *
          Math.max(0, flavor) *
          Math.max(0, texture);

        maxScorePartOne = Math.max(maxScorePartOne, score);

        if (calories === 500) {
          maxScorePartTwo = Math.max(maxScorePartTwo, score);
        }
      }
    }
  }

  return [maxScorePartOne, maxScorePartTwo];
}

function parseInput(input) {
  return input.split('\n').reduce((list, line) => {
    const [ingredient, , capacity, , durability, , flavor, , texture, , calories] = line
      .match(/([-\w]+)/g)
      .map((part) => (isNaN(+part) ? part : +part));

    list.push({
      ingredient,
      capacity,
      durability,
      flavor,
      texture,
      calories,
    });

    return list;
  }, []);
}
