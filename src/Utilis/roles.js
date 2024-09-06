import { moveTowardOpponent, getDistance } from "./abilities";

export const roles = {
  passive: {
    speed: 2,
    health: 3,
    spawnChance: 0.67,
    behaviorType: 'wanderer', 
    behavior: (organism) => {
      const newPosX = organism.position.x + Math.random() * 5 - 2.5;
      const newPosY = organism.position.y + Math.random() * 5 - 2.5;
      return {
        ...organism,
        position: { x: newPosX, y: newPosY },
      };
    },
  },
  aggressive: {
    speed: 1.75,
    health: 5,
    spawnChance: 0.3,
    behaviorType: 'seeker',  
    behavior: (organism, organisms, opponent, moveTowardOpponent, getDistance) => {
      if (opponent && getDistance(organism, opponent) < 10) {
        if (Math.random() < 0.3) { 
          opponent.health -= 1;
          if (opponent.health <= 0) opponent.isAlive = false;
        }
      } else if (opponent) {
        organism = moveTowardOpponent(organism, opponent);
      }
      return organism;
    },
  },
  king: {
    speed: 1,
    health: 30,
    spawnChance: 0.03,
    behaviorType: 'seeker',  
    behavior: (organism, organisms, opponent, moveTowardOpponent, getDistance) => {
      if (opponent && getDistance(organism, opponent) < 15) {
        if (Math.random() < 0.5) { 
          opponent.health -= 3;
          if (opponent.health <= 0) opponent.isAlive = false;
        }
      } else if (opponent) {
        organism = moveTowardOpponent(organism, opponent);
      }
      return organism;
    },
  },
  medic: {
    speed: 3,
    health: 3,
    spawnChance: 0.01,
    behaviorType: 'protector', 
    behavior: (organism, organisms, _, __, ___, healTeammate) => {
      const teammate = healTeammate(organism, organisms);
      if (teammate && teammate.health < 3) {
        organism = moveTowardOpponent(organism, teammate);
        if (Math.random() < 0.5 && getDistance(organism, teammate) < 10) {
          teammate.health += 1;
        }
      } else {
        const newPosX = organism.position.x + Math.random() * 5 - 2.5;
        const newPosY = organism.position.y + Math.random() * 5 - 2.5;
        return {
          ...organism,
          position: { x: newPosX, y: newPosY },
        };
      }
      return organism;
    },
  },
};
