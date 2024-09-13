import PF from 'pathfinding';
import {battlefieldDimensions, nonTraversablePoints } from './NonTraversablePoints';

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
let grid;

export const initializeGrid = (obstacles) => {
  grid = new PF.Grid(battlefieldDimensions.width, battlefieldDimensions.height);

  obstacles.forEach((obstacle) => {
    const startX = Math.floor(obstacle.x / 5);
    const endX = Math.floor((obstacle.x + obstacle.width) / 5);
    const startY = Math.floor(obstacle.y / 5);
    const endY = Math.floor((obstacle.y + obstacle.height) / 5);

    for (let x = startX; x <= endX; x++) {
      for (let y = startY; y <= endY; y++) {
        if (x >= 0 && x < battlefieldDimensions.width && y >= 0 && y < battlefieldDimensions.height) {
          grid.setWalkableAt(x, y, false); 
        }
      }
    }
  });

  console.log('Grid initialized with obstacles');
};

export const getGridClone = () => {
  if (!grid) {
    throw new Error('Grid not initialized. Call initializeGrid first.');
  }
  return grid.clone();  
};

export const moveTowardOpponent = (organism, opponent) => {
  if (!moveTowardOpponent.finder) {
    moveTowardOpponent.finder = new PF.JumpPointFinder();
  }
  const finder = moveTowardOpponent.finder;

  const speed = organism.speed || 3;
  const stoppingDistance = 10;
  const maxTimeWithoutMovement = 10; 
  const wanderingCycles = 5; 
  if (typeof organism.targetCounter !== 'number') {
    organism.targetCounter = 0;
  }
  if (typeof organism.wanderingCounter !== 'number') {
    organism.wanderingCounter = 0; 
  }
  if (!organism.isWandering) {
    organism.isWandering = false; 
  }

  if (!grid || !opponent) {
    return organism;
  }

  const positionChanged = (pos1, pos2) => {
    const threshold = 1; 
    return (
      Math.abs(pos1.x - pos2.x) > threshold || Math.abs(pos1.y - pos2.y) > threshold
    );
  };

  if (organism.isWandering) {
    organism.wanderingCounter++;

    const randomDirection = Math.random() * 2 * Math.PI; 
    const dx = Math.cos(randomDirection) * speed;
    const dy = Math.sin(randomDirection) * speed;

    organism.position.x += dx;
    organism.position.y += dy;

    if (organism.wanderingCounter >= wanderingCycles) {
      organism.isWandering = false;
      organism.wanderingCounter = 0;
      organism.targetCounter = 0; 
    }
    return organism;
  }

  const organismPosChanged =
    !organism.previousPosition ||
    positionChanged(organism.position, organism.previousPosition);
  const opponentPosChanged =
    !organism.previousOpponentPosition ||
    positionChanged(opponent.position, organism.previousOpponentPosition);

  if (
    !organism.path ||
    organismPosChanged ||
    opponentPosChanged ||
    organism.pathIndex >= organism.path.length - 1
  ) {
    const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

    const startX = clamp(Math.floor(organism.position.x / 5), 0, grid.width - 1);
    const startY = clamp(Math.floor(organism.position.y / 5), 0, grid.height - 1);
    const endX = clamp(Math.floor(opponent.position.x / 5), 0, grid.width - 1);
    const endY = clamp(Math.floor(opponent.position.y / 5), 0, grid.height - 1);

    const gridClone = getGridClone(); 
    const newPath = finder.findPath(startX, startY, endX, endY, gridClone);

    if (newPath && newPath.length > 1) {
      organism.path = newPath;
      organism.pathIndex = 0;
    } else {
      organism.path = null;
      organism.pathIndex = null;
      organism.targetCounter++;
      return organism;
    }

    organism.previousPosition = { x: organism.position.x, y: organism.position.y };
    organism.previousOpponentPosition = { x: opponent.position.x, y: opponent.position.y };
  }

  if (organism.path && organism.pathIndex < organism.path.length - 1) {
    const [nextX, nextY] = organism.path[organism.pathIndex + 1];
    const targetX = nextX * 5;
    const targetY = nextY * 5;

    let dx = targetX - organism.position.x;
    let dy = targetY - organism.position.y;
    let distanceToNextPoint = Math.hypot(dx, dy);

    if (distanceToNextPoint <= speed) {
      organism.position.x = targetX;
      organism.position.y = targetY;
      organism.pathIndex++;
    } else {
      organism.position.x += (dx / distanceToNextPoint) * speed;
      organism.position.y += (dy / distanceToNextPoint) * speed;
    }

    const distanceToOpponent = Math.hypot(
      opponent.position.x - organism.position.x,
      opponent.position.y - organism.position.y
    );

    if (distanceToOpponent > stoppingDistance) {
      organism.targetCounter = 0;
    } else {
      organism.targetCounter++;
    }
  } else {
    organism.targetCounter++;
  }

  if (organism.targetCounter > maxTimeWithoutMovement) {
    console.log("Switching to wandering mode due to inactivity.");
    organism.isWandering = true; 
    organism.targetCounter = 0;
    organism.target = null;
    organism.path = null;
    organism.pathIndex = null;
    organism.previousPosition = null;
    organism.previousOpponentPosition = null;
  }

  return organism;
};
