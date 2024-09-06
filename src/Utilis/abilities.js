export const getDistance = (org1, org2) => {
    const dx = org1.position.x - org2.position.x;
    const dy = org1.position.y - org2.position.y;
    return Math.sqrt(dx * dx + dy * dy);
  };
  
  export const findClosestOpponent = (organism, organisms) => {
    let closestOpponent = null;
    let closestDistance = Infinity;
  
    organisms.forEach((opponent) => {
      if (opponent.isAlive && opponent.id !== organism.id && opponent.type !== organism.type) {
        const distance = getDistance(organism, opponent);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestOpponent = opponent;
        }
      }
    });
    return closestOpponent;
  };

  export const findClosestTeammate = (organism, organisms) => {
    let closestTeammate = null;
    let closestDistance = Infinity;
  
    organisms.forEach((teammate) => {
      if (teammate.id !== organism.id && teammate.isAlive) {
        const distance = getDistance(organism, teammate);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestTeammate = teammate;
        }
      }
    });
    return closestTeammate;
  };
  
  export const healTeammate = (organism, organisms) => {
    return organisms.find((teammate) => teammate.isAlive && teammate.type === organism.type && teammate.health < 3);
  };

  export const moveTowardOpponent = (organism, opponent) => {
    console.log(organism.speed);
    const speed = organism.speed || 3; 
  
    if (opponent) {
      const dx = opponent.position.x - organism.position.x;
      const dy = opponent.position.y - organism.position.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
  
      if (distance > 0) {
        organism.position.x += (dx / distance) * speed;
        organism.position.y += (dy / distance) * speed;
      }
    }
  
    return organism;
  };