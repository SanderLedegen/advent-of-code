const input = 702831

const createRecipes = (limit) => {
  const recipes = [3, 7]
  let firstElfIndex = 0
  let secondElfIndex = 1

  for (let ii = 0; ii < limit; ii += 1) {
    const sum = recipes[firstElfIndex] + recipes[secondElfIndex]
  
    // In case the sum consists of two digits
    if (sum >= 10) {
      recipes.push(1)
      recipes.push(sum - 10)
    } else {
      recipes.push(sum)
    }
    
    firstElfIndex = (firstElfIndex + 1 + recipes[firstElfIndex]) % recipes.length
    secondElfIndex = (secondElfIndex + 1 + recipes[secondElfIndex]) % recipes.length
  }

  return recipes
}

const answerPartOne = createRecipes(input + 10).slice(input, input + 10).join('')
console.log(`Answer part one: ${answerPartOne}`)

// Just "bruteforcing" our way in. As long as the index is not found (-1), increase the number of
// iterations and, if necessary, increase memory limit. Disclaimer: node's command line argument
// `--max-old-space-size` is your friend 😋 I used 2048 to calculate part two.
const answerPartTwo = createRecipes(2*1e7).join('').indexOf(input)
console.log(`Answer part two: ${answerPartTwo}`)
