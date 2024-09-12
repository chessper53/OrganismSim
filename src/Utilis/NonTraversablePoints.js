export const battlefieldDimensions = {
    width: Math.floor(window.innerWidth / 5), 
    height: Math.floor(window.innerHeight / 5), 
  };
  
  export const nonTraversablePoints = [

  ];


  export const generateObstacles = (numObstacles) => {
    const obstacles = [];
    const nonTraversablePoints = [];
    const lakeArray = [];
  
    const checkOverlap = (x1, y1, width1, height1, x2, y2, width2, height2) => {
      return !(x1 + width1 < x2 || x1 > x2 + width2 || y1 + height1 < y2 || y1 > y2 + height2);
    };
  
    const lakeWidth = 250;
    const lakeHeight = 150;
    const centerX = window.innerWidth / 2 - lakeWidth / 2;
    const centerY = window.innerHeight / 2 - lakeHeight / 2;
  
    obstacles.push({
      id: `Lake`,
      x: centerX,
      y: centerY,
      width: lakeWidth,
      height: lakeHeight,
      imageSrc: "/src/assets/Obstacles/ObstacleLake.png",
    });
  
    lakeArray.push({
      id: `Lake`,
      x: centerX,
      y: centerY,
      width: lakeWidth,
      height: lakeHeight,
      imageSrc: "/src/assets/Obstacles/ObstacleLake.png",
    });
  
    const lakeStartX = Math.floor((centerX - 5) / 5);
    const lakeEndX = Math.floor((centerX + lakeWidth + 5) / 5);
    const lakeStartY = Math.floor((centerY - 5) / 5);
    const lakeEndY = Math.floor((centerY + lakeHeight + 5) / 5);
  
    for (let ix = lakeStartX; ix < lakeEndX; ix++) {
      for (let iy = lakeStartY; iy < lakeEndY; iy++) {
        if (ix >= 0 && iy >= 0 && ix < window.innerWidth / 5 && iy < window.innerHeight / 5) {
          nonTraversablePoints.push({ x: ix, y: iy });
        }
      }
    }
  
    for (let i = 0; i < numObstacles; i++) {
      let x, y, width, height, obstacleType, overlap;
  
      do {
        x = Math.random() * (window.innerWidth - 50); 
        y = Math.random() * (window.innerHeight - 50);
        width = 50;
        height = 50;

        const obstacleImages = [
          "/src/assets/Obstacles/ObstacleForrest.png",
          "/src/assets/Obstacles/ObstacleMountain.png",
          "/src/assets/Obstacles/ObstacleVines.png",
          "/src/assets/Obstacles/ObstacleRubble.png",
        ];
        
        const randomIndex = Math.floor(Math.random() * obstacleImages.length);
        obstacleType = obstacleImages[randomIndex];
  
  
        overlap = obstacles.some((obstacle) =>
          checkOverlap(x, y, width, height, obstacle.x, obstacle.y, obstacle.width, obstacle.height)
        );
      } while (overlap);
  
      obstacles.push({
        id: `obstacle-${i}`,
        x,
        y,
        width,
        height,
        imageSrc: obstacleType,
      });
  
      const startX = Math.floor((x - 5) / 5);
      const endX = Math.floor((x + width + 5) / 5);
      const startY = Math.floor((y - 5) / 5);
      const endY = Math.floor((y + height + 5) / 5);
  
      for (let ix = startX; ix < endX; ix++) {
        for (let iy = startY; iy < endY; iy++) {
          if (ix >= 0 && iy >= 0 && ix < window.innerWidth / 5 && iy < window.innerHeight / 5) {
            nonTraversablePoints.push({ x: ix, y: iy });
          }
        }
      }
    }
  
    console.log("Generated Obstacles:", obstacles);
    console.log("Generated Non-Traversable Points:", nonTraversablePoints);
    console.log("Lake:", lakeArray);
  
    return { obstacles, nonTraversablePoints, lakeArray };
  };
  