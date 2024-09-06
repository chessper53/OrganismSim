import { roles } from './roles';

export const generateOrganisms = (countRed = 250, countBlue = 250, width = window.innerWidth, height = window.innerHeight - 100) => {
  const organisms = [];

  const generateOrganism = (id, type) => {
    const roleKeys = Object.keys(roles);
    let selectedRole = null;

    for (const roleKey of roleKeys) {
      if (Math.random() < roles[roleKey].spawnChance) {
        selectedRole = roleKey;
        break;
      }
    }
    if (!selectedRole) {
      selectedRole = 'civilian'; 
    }
    const roleData = roles[selectedRole];
    return {
      id,
      type,
      speed: roleData.speed,
      health: roleData.health, 
      position: { x: Math.random() * width, y: Math.random() * height },
      isAlive: true,
      role: selectedRole,  
    };
  };

  for (let i = 0; i < countRed; i++) {
    organisms.push(generateOrganism(`red-${i}`, 'red'));
  }

  for (let i = 0; i < countBlue; i++) {
    organisms.push(generateOrganism(`blue-${i}`, 'blue'));
  }

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