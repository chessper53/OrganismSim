export const battlefieldDimensions = {
    width: Math.floor(window.innerWidth / 5), 
    height: Math.floor(window.innerHeight / 5), 
  };
  
  export const nonTraversablePoints = [

  ];


  export const generateObstacles = (numObstacles) => {
    const obstacles = [];
    const nonTraversablePoints = [];
  
    for (let i = 0; i < numObstacles; i++) {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      const width = 50;
      const height = 50;
  
      const random_boolean = Math.random() < 0.5;
      let obstacleType = random_boolean
        ? "/src/assets/Obstacles/ObstacleForrest.png"
        : "/src/assets/Obstacles/ObstacleMountain.png";
  

        obstacles.push({
          id: `Lake`,
          x,
          y,
          width: 250,
          height: 150,
          imageSrc: "/src/assets/Obstacles/ObstacleLake.png"
        });

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


  
    console.log('Generated Obstacles:', obstacles);
    console.log('Generated Non-Traversable Points:', nonTraversablePoints);
  
    return { obstacles, nonTraversablePoints };
  };
  