const fs = require('fs')
const input = fs.readFileSync('./inputs/day-04.txt', 'utf-8')

let currentGuard = null
let minuteAsleep = null

const schedule = input
  .split('\n')
  .map(line => {
    const groups = line.split(/\[(.+)\]\s\w+\s#?(\d+)?/)
    return {
      timestamp: new Date(Date.parse(groups[1])),
      guard: groups[2] || null,
      asleep: line.includes('asleep')
    }
  })
  .sort((a, b) => a.timestamp < b.timestamp ? -1 : 1)
  .reduce((schedule, log) => {
    // A new guard is on duty! 👮🏻‍♂️
    if (log.guard) {
      currentGuard = log.guard

      if (!schedule[currentGuard]) {
        schedule[currentGuard] = [...new Array(60).keys()].reduce((minutesObj, key) => {
          minutesObj[key] = 0
          return minutesObj
        }, {})
      }
    }

    if (log.asleep) {
      minuteAsleep = log.timestamp.getMinutes()
    } else {
      if (minuteAsleep !== null) {
        const minuteAwake = log.timestamp.getMinutes()
        for (let minute = minuteAsleep; minute < minuteAwake; minute += 1) {
          schedule[currentGuard][minute] += 1
        }
      }

      minuteAsleep = null
    }

    return schedule
  }, {})

const result = Object.entries(schedule)
  .map(([guard, minutes]) => {
    let totalMinutesAsleep = 0
    let mostTimesAsleep = -Infinity
    let mostSleepyMinute = null // I had no idea how to properly name this 🤔 😅

    Object.entries(minutes).forEach(([minute, value]) => {
      totalMinutesAsleep += value
      if (value > mostTimesAsleep) {
        mostTimesAsleep = value
        mostSleepyMinute = minute
      }
    })
    
    return {
      guard,
      mostTimesAsleep,
      totalMinutesAsleep,
      mostSleepyMinute,
    }
  })

const resPartOne = result
  .reduce((summary, guard) => !summary || guard.totalMinutesAsleep > summary.totalMinutesAsleep ? guard : summary)

console.log(`Guard #${resPartOne.guard} is in total ${resPartOne.totalMinutesAsleep} minutes asleep with minute ${resPartOne.mostSleepyMinute} being his/her most sleepy minute.`)
console.log(`Final answer to part one is: ${resPartOne.guard * resPartOne.mostSleepyMinute}`)

const resPartTwo = result
  .reduce((summary, guard) => !summary || guard.mostTimesAsleep > summary.mostTimesAsleep ? guard : summary)

console.log(`On minute ${resPartTwo.mostSleepyMinute}, guard #${resPartTwo.guard} was in total ${resPartTwo.mostTimesAsleep} times asleep.`)
console.log(`Final answer to part two is: ${resPartTwo.guard * resPartTwo.mostSleepyMinute}`)

