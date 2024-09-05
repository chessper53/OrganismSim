export const generateOrganisms = (countRed = 250, countBlue = 250, width = window.innerWidth, height = window.innerHeight - 100) => {
    const organisms = [];
    const medicRatio = 0.01; 
    const medicCountRed = Math.floor(countRed * medicRatio);
    const medicCountBlue = Math.floor(countBlue * medicRatio);
  
    for (let i = 0; i < countRed; i++) {
      const role = i < medicCountRed ? 'medic' : Math.random() < 0.67 ? 'passive' : 'aggressive';
      organisms.push({
        id: `red-${i}`,
        type: 'red',
        health: 3,
        position: { x: Math.random() * width, y: Math.random() * height },
        isAlive: true,
        role: role,
      });
    }
  
    for (let i = 0; i < countBlue; i++) {
      const role = i < medicCountBlue ? 'medic' : Math.random() < 0.67 ? 'passive' : 'aggressive';
      organisms.push({
        id: `blue-${i}`,
        type: 'blue',
        health: 3,
        position: { x: Math.random() * width, y: Math.random() * height },
        isAlive: true,
        role: role,
      });
    }
  
    return organisms;
  };
  