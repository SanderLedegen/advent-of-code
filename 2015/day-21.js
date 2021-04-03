const input = {
  hp: 109,
  att: 8,
  def: 2,
};

const store = {
  weapons: [
    { cost: 8, att: 4, def: 0 },
    { cost: 10, att: 5, def: 0 },
    { cost: 25, att: 6, def: 0 },
    { cost: 40, att: 7, def: 0 },
    { cost: 74, att: 8, def: 0 },
  ],
  armor: [
    { cost: 0, att: 0, def: 0 },
    { cost: 13, att: 0, def: 1 },
    { cost: 31, att: 0, def: 2 },
    { cost: 53, att: 0, def: 3 },
    { cost: 75, att: 0, def: 4 },
    { cost: 102, att: 0, def: 5 },
  ],
  rings: [
    { cost: 25, att: 1, def: 0 },
    { cost: 50, att: 2, def: 0 },
    { cost: 100, att: 3, def: 0 },
    { cost: 20, att: 0, def: 1 },
    { cost: 40, att: 0, def: 2 },
    { cost: 80, att: 0, def: 3 },
  ],
};

console.log(partOne(input, store));
console.log(partTwo(input, store));

function partOne(input, store) {
  const fight = (player, boss) => {
    while (true) {
      boss.hp -= Math.max(1, player.att - boss.def);
      if (boss.hp <= 0) return true;

      player.hp -= Math.max(1, boss.att - player.def);
      if (player.hp <= 0) return false;
    }
  };

  const itemCombinations = [];
  const ringCombinations = [];

  ringCombinations.push([]);

  for (let ii = 0; ii < store.rings.length; ii += 1) {
    ringCombinations.push([store.rings[ii]]);

    for (let jj = ii + 1; jj < store.rings.length; jj += 1) {
      ringCombinations.push([store.rings[ii], store.rings[jj]]);
    }
  }

  store.weapons.forEach((weapon) => {
    store.armor.forEach((armor) => {
      ringCombinations.forEach((rings) => {
        itemCombinations.push({ weapon, armor, rings });
      });
    });
  });

  return itemCombinations.reduce((minCost, equipment) => {
    const { weapon, armor, rings } = equipment;
    const att = weapon.att + rings.reduce((rAtt, r) => rAtt + r.att, 0);
    const def = armor.def + rings.reduce((rDef, r) => rDef + r.def, 0);
    const cost = weapon.cost + armor.cost + rings.reduce((rCost, r) => rCost + r.cost, 0);

    const player = { hp: 100, att, def };
    const boss = { ...input };

    const victory = fight(player, boss);

    if (victory) {
      return Math.min(minCost, cost);
    }

    return minCost;
  }, Infinity);
}

function partTwo() {
  const fight = (player, boss) => {
    while (true) {
      boss.hp -= Math.max(1, player.att - boss.def);
      if (boss.hp <= 0) return true;

      player.hp -= Math.max(1, boss.att - player.def);
      if (player.hp <= 0) return false;
    }
  };

  const itemCombinations = [];
  const ringCombinations = [];

  ringCombinations.push([]);

  for (let ii = 0; ii < store.rings.length; ii += 1) {
    ringCombinations.push([store.rings[ii]]);

    for (let jj = ii + 1; jj < store.rings.length; jj += 1) {
      ringCombinations.push([store.rings[ii], store.rings[jj]]);
    }
  }

  store.weapons.forEach((weapon) => {
    store.armor.forEach((armor) => {
      ringCombinations.forEach((rings) => {
        itemCombinations.push({ weapon, armor, rings });
      });
    });
  });

  return itemCombinations.reduce((maxCost, equipment) => {
    const { weapon, armor, rings } = equipment;
    const att = weapon.att + rings.reduce((rAtt, r) => rAtt + r.att, 0);
    const def = armor.def + rings.reduce((rDef, r) => rDef + r.def, 0);
    const cost = weapon.cost + armor.cost + rings.reduce((rCost, r) => rCost + r.cost, 0);

    const player = { hp: 100, att, def };
    const boss = { ...input };

    const victory = fight(player, boss);

    if (!victory) {
      return Math.max(maxCost, cost);
    }

    return maxCost;
  }, -Infinity);
}
