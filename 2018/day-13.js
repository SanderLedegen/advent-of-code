const fs = require('fs')
const input = fs.readFileSync('./inputs/day-13.txt', 'utf-8')

const ARRAY_SIZE = 150
const map = new Array(ARRAY_SIZE).fill(' ').map(() => new Array(ARRAY_SIZE).fill(' '))
const carts = []

// Parse input, create grid and detect carts.
input.split('\n').map((line, index) => {
  const chars = line.split('')
  for (let xx = 0; xx < line.length; xx += 1) {
    if ('<>v^'.includes(chars[xx])) {
      carts.push({
        x: xx,
        y: index,
        dir: chars[xx],
        turn: 0,
        crashed: false,
        id: `${xx},${index}`,
      })
      map[index][xx] = '<>'.includes(chars[xx]) ? '-' : '|'
    } else {
      map[index][xx] = chars[xx]
    }
  }
})

const cartPredicate = (c1, c2) => {
  return c1.x === c2.x && c1.y === c2.y && c1.id !== c2.id && !c1.crashed
}

const move = (cart) => {
  switch (cart.dir) {
    case '^':
      {
        cart.y -= 1

        const c = carts.find(c => cartPredicate(c, cart))
        if (c) {
          return c
        }
        
        const trackAbove = map[cart.y][cart.x]

        if (trackAbove === '+') {
          cart.dir = cart.turn === 0 ? '<' : cart.turn === 1 ? '^' : '>'
          cart.turn = (cart.turn + 1) % 3
        } else if (trackAbove === '/') {
          cart.dir = '>'
        } else if (trackAbove === '\\') {
          cart.dir = '<'
        }

        break;
      }

    case '<':
      {
        cart.x -= 1
        
        const c = carts.find(c => cartPredicate(c, cart))
        if (c) {
          return c
        }
        
        const trackToTheLeft = map[cart.y][cart.x]

        if (trackToTheLeft === '+') {
          cart.dir = cart.turn === 0 ? 'v' : cart.turn === 1 ? '<' : '^'
          cart.turn = (cart.turn + 1) % 3
        } else if (trackToTheLeft === '/') {
          cart.dir = 'v'
        } else if (trackToTheLeft === '\\') {
          cart.dir = '^'
        }

        break;
      }

    case '>':
      {
        cart.x += 1
        
        const c = carts.find(c => cartPredicate(c, cart))
        if (c) {
          return c
        }

        const trackToTheRight = map[cart.y][cart.x]

        if (trackToTheRight === '+') {
          cart.dir = cart.turn === 0 ? '^' : cart.turn === 1 ? '>' : 'v'
          cart.turn = (cart.turn + 1) % 3
        } else if (trackToTheRight === '/') {
          cart.dir = '^'
        } else if (trackToTheRight === '\\') {
          cart.dir = 'v'
        }

        break;
      }

    case 'v':
      {
        cart.y += 1
        
        const c = carts.find(c => cartPredicate(c, cart))
        if (c) {
          return c
        }

        const trackBelow = map[cart.y][cart.x]

        if (trackBelow === '+') {
          cart.dir = cart.turn === 0 ? '>' : cart.turn === 1 ? 'v' : '<'
          cart.turn = (cart.turn + 1) % 3
        } else if (trackBelow === '/') {
          cart.dir = '<'
        } else if (trackBelow === '\\') {
          cart.dir = '>'
        }

        break;
      }

    default:
      break;
  }

  return false
}

let oneCartRemaining = false
let firstCartCrashHappened = false
while (!oneCartRemaining) {
  carts
    .sort((a, b) => a.y < b.y ? -1 : a.y > b.y ? 1 : a.x < b.x ? -1 : 1)
    .forEach((cart) => {
      if (cart.crashed) {
        return
      }

      const collisionCart = move(cart)

      if (collisionCart) {
        if (!firstCartCrashHappened) {
          firstCartCrashHappened = true
          console.log(`Answer part one: ${cart.x},${cart.y}`)
        }

        // Mark the crashed carts
        collisionCart.crashed = true
        cart.crashed = true
      }

      const nonCrashedCarts = carts.filter((c) => !c.crashed)
      oneCartRemaining = nonCrashedCarts.length <= 1
    })
}

const survivingCart = carts.find((c) => !c.crashed)
console.log(`Answer part two: ${survivingCart.x},${survivingCart.y}`)
