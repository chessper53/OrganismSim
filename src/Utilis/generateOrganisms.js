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
      selectedRole = 'passive'; 
    }
    const roleData = roles[selectedRole];
    return {
      id,
      type,
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
