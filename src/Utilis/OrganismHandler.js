import { roles } from './roles';
import { generateUserName } from './KillFeed';

export const generateOrganisms = (unitCounts = {}, width = window.innerWidth, height = window.innerHeight - 100, lakeArray = [], nonTraversablePoints = []) => {
  const organisms = [];

  // Helper function to check if a point is within the lake or other obstacles
  const isPointOccupied = (x, y) => {
    // Check if it's inside the lake or obstacles
    return nonTraversablePoints.some(point => point.x === Math.floor(x / 5) && point.y === Math.floor(y / 5));
  };

  // Helper function to generate a random valid position for non-ship units
  const generateValidPosition = () => {
    let x, y;
    do {
      x = Math.random() * width;
      y = Math.random() * height;
    } while (isPointOccupied(x, y)); // Regenerate if the position is occupied
    return { x, y };
  };

  // Helper function to generate a random valid position for ships (within the lake)
  const generateValidPositionInLake = () => {
    const lake = lakeArray[0]; // Assuming the lake is always the first entry in the lake array
    let x, y;
    do {
      x = lake.x + Math.random() * lake.width;
      y = lake.y + Math.random() * lake.height;
    } while (isPointOccupied(x, y)); // Regenerate if the position is occupied
    return { x, y };
  };

  // Create civilians (avoiding obstacles)
  for (let i = 0; i < 30; i++) {
    organisms.push({
      id: `red-civilian-${i}`,
      username: generateUserName(),
      type: 'red',
      speed: roles.civilian.speed,
      health: roles.civilian.health,
      position: generateValidPosition(), // Generate valid position
      isAlive: true,
      role: 'civilian',
    });

    organisms.push({
      id: `blue-civilian-${i}`,
      username: generateUserName(),
      type: 'blue',
      speed: roles.civilian.speed,
      health: roles.civilian.health,
      position: generateValidPosition(), // Generate valid position
      isAlive: true,
      role: 'civilian',
    });
  }

  // Create specified units (avoiding obstacles and handling ship spawns)
  Object.keys(unitCounts).forEach((unitType) => {
    const count = unitCounts[unitType] || 0; 
    const roleData = roles[unitType];

    if (!roleData) {
      console.error(`Unknown role: ${unitType}`);
      return;
    }

    for (let i = 0; i < count; i++) {
      const isRomanShip = unitType === 'romanShip'; // Check if the unit is a ship
      organisms.push({
        id: `red-${unitType}-${i}`,
        username: generateUserName(),
        type: 'red',
        speed: roleData.speed,
        health: roleData.health,
        position: isRomanShip ? generateValidPositionInLake() : generateValidPosition(), // Ships spawn in lake, others avoid obstacles
        isAlive: true,
        role: unitType,
      });

      organisms.push({
        id: `blue-${unitType}-${i}`,
        username: generateUserName(),
        type: 'blue',
        speed: roleData.speed,
        health: roleData.health,
        position: isRomanShip ? generateValidPositionInLake() : generateValidPosition(), // Ships spawn in lake, others avoid obstacles
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