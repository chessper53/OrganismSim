import { roles } from './roles';
import { generateUserName } from './KillFeed';

export const generateOrganisms = (unitCounts = {}, width = window.innerWidth, height = window.innerHeight - 100, lakeArray = [], nonTraversablePoints = []) => {
  const organisms = [];

  const isPointOccupied = (x, y) => {
    return nonTraversablePoints.some(point => point.x === Math.floor(x / 5) && point.y === Math.floor(y / 5));
  };

  const generateValidPosition = () => {
    let x, y;
    do {
      x = Math.random() * width;
      y = Math.random() * height;
    } while (isPointOccupied(x, y)); 
    return { x, y };
  };

  const generateValidPositionInLake = () => {
    if (lakeArray.length === 0) {
      console.error('Lake array is empty or undefined');
      return generateValidPosition();
    }
    
    const lake = lakeArray[0];
    if (!lake || !lake.x || !lake.y || !lake.width || !lake.height) {
      console.error('Invalid lake data', lake);
      return generateValidPosition();
    }
  
    let x, y;
    do {
      x = lake.x + Math.random() * lake.width;
      y = lake.y + Math.random() * lake.height;
    } while (isPointOccupied(x, y));
    return { x, y };
  };
  
  for (let i = 0; i < 5; i++) {
    organisms.push({
      id: `red-civilian-${i}`,
      username: generateUserName(),
      killCount: 0, // Add killCount
      distanceTraveled: 0, // Add distanceTraveled
      type: 'red',
      speed: roles.civilian.speed,
      desc: roles.civilian.description,
      health: roles.civilian.health,
      position: generateValidPosition(), 
      isAlive: true,
      role: 'civilian',
    });

    organisms.push({
      id: `blue-civilian-${i}`,
      username: generateUserName(),
      killCount: 0, // Add killCount
      distanceTraveled: 0, // Add distanceTraveled
      type: 'blue',
      desc: roles.civilian.description,
      speed: roles.civilian.speed,
      health: roles.civilian.health,
      position: generateValidPosition(),
      isAlive: true,
      role: 'civilian',
    });
  }

  let unitArray = JSON.parse(localStorage.getItem('PlacedUnits')); 
  if (unitArray && Array.isArray(unitArray)) {
    const count = unitArray.length;

    for (let i = 0; i < count; i++) {
      const unit = unitArray[i]; 
      const unitType = unit.type; 
      const posX = unit.position.x; 
      const posY = unit.position.y;
      const roleData = roles[unitType];
      organisms.push({
        id: `blue-${unitType}-${i}`,
        killCount: 0, // Add killCount
        distanceTraveled: 0, // Add distanceTraveled
        username: generateUserName(),
        desc: roleData.description,
        type: 'blue',
        speed: roleData.speed,
        health: roleData.health,
        position: { x: posX, y: posY }, 
        isAlive: true,
        role: unitType,
      });

      organisms.push({
        id: `red-${unitType}-${i}`,
        killCount: 0, // Add killCount
        distanceTraveled: 0, // Add distanceTraveled
        username: generateUserName(),
        desc: roleData.description,
        type: 'red',
        speed: roleData.speed,
        health: roleData.health,
        position: generateValidPosition(),
        isAlive: true,
        role: unitType,
      });
    }
    return organisms;
  } else {
    Object.keys(unitCounts).forEach((unitType) => {
      const count = unitCounts[unitType] || 0; 
      const roleData = roles[unitType];

      if (!roleData) {
        console.error(`Unknown role: ${unitType}`);
        return;
      }

      for (let i = 0; i < count; i++) {
        const isRomanShip = unitType === 'romanShip';
        organisms.push({
          id: `red-${unitType}-${i}`,
          killCount: 0, // Add killCount
          distanceTraveled: 0, // Add distanceTraveled
          username: generateUserName(),
          desc: roleData.description,
          type: 'red',
          speed: roleData.speed,
          health: roleData.health,
          position: isRomanShip ? generateValidPositionInLake() : generateValidPosition(),
          isAlive: true,
          role: unitType,
        });

        organisms.push({
          id: `blue-${unitType}-${i}`,
          killCount: 0, // Add killCount
          distanceTraveled: 0, // Add distanceTraveled
          username: generateUserName(),
          desc: roleData.description,
          type: 'blue',
          speed: roleData.speed,
          health: roleData.health,
          position: isRomanShip ? generateValidPositionInLake() : generateValidPosition(),
          isAlive: true,
          role: unitType,
        });
      }
    });

    return organisms;
  }
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
