import React from 'react';
var _ = require('lodash');

export const calcLevelStats = (level, baseStats) => 
    ({
        health: baseStats.hp + (level * baseStats.hpperlevel),
        attackDamage: baseStats.attackdamage + (level * baseStats.attackdamageperlevel),
        armor: baseStats.armor + (level * baseStats.armorperlevel),
        magicResist: baseStats.spellblock + (level * baseStats.spellblockperlevel),
        attackSpeed: baseStats.attackspeed + (level * baseStats.attackspeedperlevel),
        critChance: baseStats.crit + (level * baseStats.critperlevel),
        abilityPower: 0,
        moveSpeed: baseStats.movespeed 
    })

export const searchChamp = (value, champions) =>  _.findKey(champions, function(champ){ 
    return (champ.name.toLowerCase() === value.toLowerCase() || champ.id.toLowerCase() === value.toLowerCase())
}) 
 
    
    

//TODO: calcItemStats
    




