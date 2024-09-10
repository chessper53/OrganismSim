import { getDistance, findClosestTeammate, moveTowardOpponent, healTeammate } from "./abilities";

export const roles = {
  civilian: {
    speed: 1,
    health: 1,
    cost: 0,
    behaviorType: 'wanderer',
    description: "Non-combatant civilian that roams the battlefield aimlessly.",
    behavior: (organism) => {
      const newPosX = organism.position.x + Math.random() * 5 - 2.5;
      const newPosY = organism.position.y + Math.random() * 5 - 2.5;
      return {
        ...organism,
        position: { x: newPosX, y: newPosY },
      };
    },
  },
  legionnaire: {
    speed: 1.75,
    health: 1,
    cost: 100,
    behaviorType: 'seeker',
    description: "Basic infantry unit that seeks out and attacks enemies in close combat.",
    behavior: (organism, organisms, opponent, obstacles) => {
      if (opponent && getDistance(organism, opponent) < 10) {
        if (Math.random() < 0.3) {
          opponent.health -= 0.5;
          if (opponent.health <= 0) opponent.isAlive = false;
        }
      } else if (opponent) {
        organism = moveTowardOpponent(organism, opponent, obstacles);
      }
      return organism;
    },
  },
  centurion: {
    speed: 4,
    health: 4,
    cost: 300,
    behaviorType: 'seeker',
    description: "Elite warrior with enhanced health and speed, engages enemies in close range.",
    behavior: (organism, organisms, opponent, obstacles) => {
      if (opponent && getDistance(organism, opponent) < 10) {
        if (Math.random() < 0.3) {
          opponent.health -= 1;
          if (opponent.health <= 0) opponent.isAlive = false;
        }
      } else if (opponent) {
        organism = moveTowardOpponent(organism, opponent, obstacles);
      }
      return organism;
    },
  },
  Emperor: {
    speed: 1,
    health: 10,
    cost: 1000,
    behaviorType: 'seeker',
    description: "Powerful and heavily armored leader unit that deals high damage at close range.",
    behavior: (organism, organisms, opponent, obstacles) => {
      if (opponent && getDistance(organism, opponent) < 15) {
        if (Math.random() < 0.5) {
          opponent.health -= 3;
          if (opponent.health <= 0) opponent.isAlive = false;
        }
      } else if (opponent) {
        organism = moveTowardOpponent(organism, opponent, obstacles);
      }
      return organism;
    },
  },
  elephant: {
    speed: 0.5,
    health: 10,
    cost: 3000,
    behaviorType: 'seeker',
    description: "Heavy unit with enormous health that slowly crushes enemies in close combat.",
    behavior: (organism, organisms, opponent, obstacles) => {
      if (opponent && getDistance(organism, opponent) < 15) {
        if (Math.random() < 0.5) {
          opponent.health -= 10;
          if (opponent.health <= 0) opponent.isAlive = false;
        }
      } else if (opponent) {
        organism = moveTowardOpponent(organism, opponent, obstacles);
      }
      return organism;
    },
  },
  medic: {
    speed: 3,
    health: 3,
    cost: 200,
    behaviorType: 'protector',
    description: "Heals nearby teammates, keeping them in the fight.",
    behavior: (organism, organisms, opponent, obstacles) => {
      const teammate = healTeammate(organism, organisms);
      if (teammate && teammate.health < 3) {
        organism = moveTowardOpponent(organism, teammate, obstacles);
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
  shieldBearer: {
    speed: 3,
    health: 60,
    cost: 500,
    behaviorType: 'protector',
    description: "Tank unit that shields nearby teammates, protecting them from harm.",
    behavior: (organism, organisms, opponent, obstacles) => {
      const teammate = findClosestTeammate(organism, organisms);
      if (teammate) {
        organism = moveTowardOpponent(organism, teammate, obstacles);
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
  banner: {
    speed: 4,
    health: 5,
    cost: 500,
    behaviorType: 'protector',
    description: "Unit that increases morale and heals teammates in close proximity.",
    behavior: (organism, organisms, opponent, obstacles) => {
      const teammate = healTeammate(organism, organisms);
      if (teammate) {
        organism = moveTowardOpponent(organism, teammate, obstacles);
        if (Math.random() < 0.5 && getDistance(organism, teammate) < 10) {
          teammate.health += 5;
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
  archer: {
    speed: 2,
    health: 1,
    cost: 500,
    behaviorType: 'seeker',
    rangeDistance: 50,
    description: "Ranged unit that attacks enemies from a distance.",
    behavior: (organism, organisms, opponent, obstacles) => {
      if (opponent) {
        const distanceToOpponent = getDistance(organism, opponent);
        if (distanceToOpponent <= roles.archer.rangeDistance) {
          if (Math.random() < 0.3) {
            opponent.health -= 0.5;
            if (opponent.health <= 0) opponent.isAlive = false;
          }
        } else {
          const adjustedOpponent = {
            ...opponent,
            position: {
              x: organism.position.x + (opponent.position.x - organism.position.x) * (roles.archer.rangeDistance / distanceToOpponent),
              y: organism.position.y + (opponent.position.y - organism.position.y) * (roles.archer.rangeDistance / distanceToOpponent),
            },
          };
          organism = moveTowardOpponent(organism, adjustedOpponent, obstacles);
        }
      }
      return organism;
    },
  },
  romanShip: {
    speed: 1,
    health: 60,
    cost: 1500,
    behaviorType: 'seeker',
    rangeDistance: 150,
    description: "Water-based unit with high health and long-range attacks.",
    behavior: (organism, organisms, opponent, obstacles) => {
      if (opponent) {
        const distanceToOpponent = getDistance(organism, opponent);
        if (distanceToOpponent <= roles.romanShip.rangeDistance) {
          if (Math.random() < 0.5) {
            opponent.health -= 1;
            if (opponent.health <= 0) opponent.isAlive = false;
          }
        } else {
          const adjustedOpponent = {
            ...opponent,
            position: {
              x: organism.position.x + (opponent.position.x - organism.position.x) * (roles.romanShip.rangeDistance / distanceToOpponent),
              y: organism.position.y + (opponent.position.y - organism.position.y) * (roles.romanShip.rangeDistance / distanceToOpponent),
            },
          };
          organism = moveTowardOpponent(organism, adjustedOpponent, obstacles);
        }
      }
      return organism;
    },
  },
  barrack: {
    speed: 0,
    health: 10,
    cost: 0,
    behaviorType: 'spawner',
    description: "Static building that spawns legionnaires over time.",
    behavior: (organism, organisms) => {
      const newUnits = [];
      if (Math.random() < 0.01) {
        const newLegionnaire = {
          id: `legionnaire-${Date.now()}`,
          type: organism.type,
          role: 'legionnaire',
          position: {
            x: organism.position.x + Math.random() * 20 - 10,
            y: organism.position.y + Math.random() * 20 - 10,
          },
          isAlive: true,
          health: roles.legionnaire.health,
          speed: roles.legionnaire.speed,
        };
        newUnits.push(newLegionnaire);
      }
      return { updatedOrganism: organism, newUnits };
    },
  },
};
