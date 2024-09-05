const getRandomPosition = (maxWidth, maxHeight) => {
    const x = Math.floor(Math.random() * (maxWidth - 10)); 
    const y = Math.floor(Math.random() * (maxHeight - 10));
    return { x, y };
  };
  
  const getRandomRole = () => (Math.random() < 0.80 ? 'passive' : 'aggressive');
  
  export const generateOrganisms = (countRed = 250, countBlue = 250, width = window.innerWidth, height = window.innerHeight - 100) => {
    const organisms = [];
  

    for (let i = 0; i < countRed; i++) {
      organisms.push({
        id: `blue-${i}`,
        type: 'blue',
        health: 30, 
        position: getRandomPosition(width, height),
        isAlive: true,  
        role: getRandomRole(), 
      });
    }
  

    for (let i = 0; i < countBlue; i++) {
      organisms.push({
        id: `red-${i}`,
        type: 'red',
        health: 30,  
        position: getRandomPosition(width, height),
        isAlive: true,
        role: getRandomRole(),
      });
    }
  
    return organisms;
  };
  