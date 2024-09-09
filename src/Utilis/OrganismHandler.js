import { roles } from './roles';

export const generateOrganisms = (unitCounts = {}, width = window.innerWidth, height = window.innerHeight - 100) => {
  const organisms = [];

  for (let i = 0; i < 40; i++) {
    organisms.push({
      id: `red-civilian-${i}`,
      type: 'red',
      speed: roles.civilian.speed,
      health: roles.civilian.health,
      position: { x: Math.random() * width, y: Math.random() * height },
      isAlive: true,
      role: 'civilian',
    });

    organisms.push({
      id: `blue-civilian-${i}`,
      type: 'blue',
      speed: roles.civilian.speed,
      health: roles.civilian.health,
      position: { x: Math.random() * width, y: Math.random() * height },
      isAlive: true,
      role: 'civilian',
    });
  }

  Object.keys(unitCounts).forEach((unitType) => {
    const count = unitCounts[unitType] || 0; 
    const roleData = roles[unitType];

    if (!roleData) {
      console.error(`Unknown role: ${unitType}`);
      return;
    }

    for (let i = 0; i < count; i++) {
      organisms.push({
        id: `red-${unitType}-${i}`,
        type: 'red',
        speed: roleData.speed,
        health: roleData.health,
        position: { x: Math.random() * width, y: Math.random() * height },
        isAlive: true,
        role: unitType,
      });
    }

    for (let i = 0; i < count; i++) {
      organisms.push({
        id: `blue-${unitType}-${i}`,
        type: 'blue',
        speed: roleData.speed,
        health: roleData.health,
        position: { x: Math.random() * width, y: Math.random() * height },
        isAlive: true,
        role: unitType,
      });
    }
  });

  return organisms;
};


export const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const countAlive = (organisms) => {
  const aliveRed = organisms.filter((org) => org.isAlive && org.type === 'red').length;
  const aliveBlue = organisms.filter((org) => org.isAlive && org.type === 'blue').length;
  return { aliveRed, aliveBlue };
};