import PF from 'pathfinding';
import { nonTraversablePoints, battlefieldDimensions } from './NonTraversablePoints';

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


export const moveTowardOpponent3 = (organism, opponent) => {
  const speed = organism.speed || 3;

  const gridWidth = battlefieldDimensions.width;
  const gridHeight = battlefieldDimensions.height;

  // Threshold to determine if we need to recalculate path
  const attackRange = 10;  // The range within which the organism can attack
  const pathRecalculationThreshold = 10;  // Minimum distance before recalculating path

  // Ensure the opponent is alive before moving towards them
  if (opponent && opponent.isAlive) {
    const distanceToOpponent = getDistance(organism, opponent);

    // Only move if the opponent is outside the attack range
    if (distanceToOpponent > attackRange) {
      const finder = new PF.AStarFinder();
      const grid = new PF.Grid(gridWidth, gridHeight);

      // Mark non-traversable points in the 5-pixel grid
      nonTraversablePoints.forEach((point) => {
        if (point.x >= 0 && point.x < gridWidth && point.y >= 0 && point.y < gridHeight) {
          grid.setWalkableAt(point.x, point.y, false); // Set non-traversable points
        }
      });

      // Scale down organism and opponent positions to fit the 5-pixel grid
      const clampToGrid = (value, max) => Math.max(0, Math.min(value, max - 1));

      const startX = clampToGrid(Math.floor(organism.position.x / 5), gridWidth);
      const startY = clampToGrid(Math.floor(organism.position.y / 5), gridHeight);
      const endX = clampToGrid(Math.floor(opponent.position.x / 5), gridWidth);
      const endY = clampToGrid(Math.floor(opponent.position.y / 5), gridHeight);

      // Find the path from the organism to the opponent only if the distance is above a threshold
      if (distanceToOpponent > pathRecalculationThreshold) {
        const path = finder.findPath(startX, startY, endX, endY, grid);

        if (path.length > 1) {
          const nextStep = path[1]; // Get the next step in the path
          const dx = (nextStep[0] * 5) - organism.position.x; // Scale back to pixel space
          const dy = (nextStep[1] * 5) - organism.position.y; // Scale back to pixel space
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance > 0) {
            organism.position.x += (dx / distance) * speed;
            organism.position.y += (dy / distance) * speed;
          }
        }
      }
    }
  }

  return organism;
};

export const moveTowardOpponent2 = (organism, opponent) => {
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

export const moveTowardOpponent = (organism, opponent) => {
  const speed = organism.speed || 3;
  const stoppingDistance = 15;  // Distance to stop before reaching the opponent
  const avoidanceRadius = 50;   // Radius to start avoiding obstacles

  if (opponent) {
    // Calculate vector toward opponent
    let dx = opponent.position.x - organism.position.x;
    let dy = opponent.position.y - organism.position.y;
    let distanceToOpponent = Math.sqrt(dx * dx + dy * dy);

    // Normalize the direction to the opponent
    if (distanceToOpponent > 0) {
      dx /= distanceToOpponent;
      dy /= distanceToOpponent;
    }

    // Check for nearby obstacles and adjust direction
    nonTraversablePoints.forEach(obstacle => {
      const ox = obstacle.x - organism.position.x;
      const oy = obstacle.y - organism.position.y;
      const distanceToObstacle = Math.sqrt(ox * ox + oy * oy);

      // If the organism is too close to the obstacle, adjust direction
      if (distanceToObstacle < avoidanceRadius) {
        const avoidanceStrength = (avoidanceRadius - distanceToObstacle) / avoidanceRadius;
        dx -= (ox / distanceToObstacle) * avoidanceStrength;  // Move away from obstacle
        dy -= (oy / distanceToObstacle) * avoidanceStrength;
      }
    });

    // Recalculate distance to the opponent after adjustments
    distanceToOpponent = Math.sqrt(dx * dx + dy * dy);

    // Move the organism towards the opponent while avoiding obstacles
    if (distanceToOpponent > stoppingDistance) {
      organism.position.x += (dx / distanceToOpponent) * speed;
      organism.position.y += (dy / distanceToOpponent) * speed;
    }
  }

  return organism;
};
