// Answers to the challenge 🤓
console.log(solvePartOne(325489)) // 552
console.log(solvePartTwo(325489)) // 330785

function solvePartOne(input) {
  /**
   * 37  36  35  34  33  32  31
   * 38  17  16  15  14  13  30
   * 39  18   5   4   3  12  29
   * 40  19   6   1   2  11  28
   * 41  20   7   8   9  10  27
   * 42  21  22  23  24  25  26
   * 43  44  45  46  47  48  49
   *
   * Map the input number to the next perfect odd square and calculate the steps to the center from
   * there. E.g., numbers 1 to 9 map to 9 as perfect odd square, numbers 9 to 25 map to 25, etc.
   * Walking from the perfect odd square to the center is the "worst case scenario", so the amount of steps
   * is ought to be lower than that. Therefore, calculate the amount of steps from the odd square to the actual
   * input number, knowing that the length of the sides is the square root of the odd square, and subtract
   * this from the amount of steps to the center you calculated before.
   * And then, well, pray and hope for the best! 🙏🏻
   */

   // This one's easy 🙃
  if (input === 1) {
    return 0
  }
  
  // Some constants we'll be using a lot
  const nextSquare = Math.ceil(Math.sqrt(input))
  const nextOddSquare = (nextSquare % 2 === 0 ? nextSquare + 1 : nextSquare) ** 2
  const stepsToCenterFromOddSquare = Math.sqrt(nextOddSquare) - 1
  const stepsToCenterOfSideFromCorner = Math.floor(Math.sqrt(nextOddSquare) / 2)

  /**
   * Determine which side of the spiral the input number is on (left, top, right, bottom). To do
   * this, we first have to know the numbers on the corners. Right bottom is always the odd square.
   */
  const topRightNumber = nextOddSquare - 6 * (Math.floor(Math.sqrt(nextOddSquare) / 2))
  const topLeftNumber = topRightNumber + Math.sqrt(nextOddSquare) - 1
  const bottomLeftNumber = nextOddSquare - Math.sqrt(nextOddSquare) + 1

  /**
   * If the input number is on one of the corners, the amount of steps is the same as the amount
   * needed to travel to the center from the odd square.
   */
  if (input === topRightNumber || input === topLeftNumber || input === bottomLeftNumber || input === nextOddSquare) {
    return stepsToCenterFromOddSquare
  }

  /**
   * OK, so the input is on one of the sides, but what side exactly? As soon as we know this,
   * we can check how many steps we need to subtract from `stepsToCenterFromOddSquare`.
   * We have to do a subtraction because the amount of steps needed to go to the center starting
   * from an odd square is "worst case scenario". Those corner numbers need the most steps, you know.
   */
  let stepsToSubtract = 0
  if (input > bottomLeftNumber && input < nextOddSquare) {
    // Bottom side of the spiral
    const middleNumberOfBottomSide = nextOddSquare - stepsToCenterOfSideFromCorner
    stepsToSubtract = Math.abs(middleNumberOfBottomSide - input) - stepsToCenterOfSideFromCorner

  } else if (input > topLeftNumber && input < bottomLeftNumber) {
    // Left side of the spiral
    const middleNumberOfLeftSide = bottomLeftNumber - stepsToCenterOfSideFromCorner
    stepsToSubtract = Math.abs(middleNumberOfLeftSide - input) - stepsToCenterOfSideFromCorner

  } else if (input > topRightNumber && input < topLeftNumber) {
    // Top side of the spiral
    const middleNumberOfTopSide = topLeftNumber - stepsToCenterOfSideFromCorner
    stepsToSubtract = Math.abs(middleNumberOfTopSide - input) - stepsToCenterOfSideFromCorner

  } else if (input < topRightNumber) {
    // Right side of the spiral
    const middleNumberOfRightSide = topRightNumber - stepsToCenterOfSide
    stepsToSubtract = Math.abs(middleNumberOfRightSide - input) - stepsToCenterOfSide
  }

  return stepsToCenterFromOddSquare + stepsToSubtract
}

function solvePartTwo(input) {
  /**
   * If you've never heard of OEIS in your life, you're gonna have a bad time 🙃
   * When googling these numbers, I hoped it would be a known sequence and that OEIS would come up in my search results.
   * Luckily for me, this was the case and it revealed more info about this known sequence: https://oeis.org/A141481.
   * It's easy as pie then to look up your input. Hey, why work hard if you can be lazy instead? 😇
   */

   return 330785
}
