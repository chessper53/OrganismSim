import { useState, useEffect } from 'react';
import './Dashboard.css';
import Feed from '../Feed/Feed';
import { generateOrganisms, shuffleArray, countAlive } from '../../Utilis/OrganismHandler';
import Organism from '../Organism/Organism';
import { roles } from '../../Utilis/roles';
import { findClosestOpponent, findClosestTeammate, initializeGrid } from '../../Utilis/abilities';
import Banner from '../Banner/Banner';
import { generateObstacles } from '../../Utilis/NonTraversablePoints';

const Dashboard = () => {
  const [organisms, setOrganisms] = useState(generateOrganisms());
  const [obstacles, setObstacles] = useState([]);
  const [nonTraversablePoints, setNonTraversablePoints] = useState([]);  
  const [lakeArray, setLakeArray] = useState([]); // For the lake
  const [simulationStarted, setSimulationStarted] = useState(false);
  const [editMode, setEditMode] = useState(true); 


  useEffect(() => {
    const { obstacles: generatedObstacles, nonTraversablePoints: generatedNonTraversablePoints, lake } = generateObstacles(20);
    setObstacles(generatedObstacles);
    setNonTraversablePoints(generatedNonTraversablePoints);
    setLakeArray([lake]);
    initializeGrid(generatedObstacles);
  }, []);

  const handleStartSimulation = (unitCounts) => {
    // Pass the lakeArray and nonTraversablePoints to the generateOrganisms function
    setOrganisms(generateOrganisms(unitCounts, window.innerWidth, window.innerHeight, lakeArray, nonTraversablePoints));  
    setSimulationStarted(true);
    setEditMode(false);
  };

  const handleEditSimulation = () => {
    setEditMode(true);  
    setSimulationStarted(false);  
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = Date.now(); // Capture the current time for spawning logic
  
      setOrganisms((prevOrganisms) => {
        const shuffledOrganisms = shuffleArray([...prevOrganisms]);
        const newOrganisms = []; // Collect new units to add
  
        const updatedOrganisms = shuffledOrganisms.map((organism) => {
          if (!organism.isAlive) return organism;
  
          const role = roles[organism.role];
          let updatedOrganism = organism;
  
          if (role.behaviorType === 'spawner') {
            const { updatedOrganism: newUpdatedOrganism, newUnits } = role.behavior(organism, shuffledOrganisms, currentTime);
            updatedOrganism = newUpdatedOrganism;
            newOrganisms.push(...newUnits); 
          } else {
            let opponent = null;
  
            if (role.behaviorType === 'seeker') {
              opponent = findClosestOpponent(organism, shuffledOrganisms.filter(o => o.type !== organism.type && o.isAlive));
            } else if (role.behaviorType === 'protector') {
              opponent = findClosestTeammate(organism, shuffledOrganisms.filter(o => o.type === organism.type && o.isAlive && o.health < 3));
            }
  
            updatedOrganism = role.behavior(organism, shuffledOrganisms, opponent, obstacles);
          }
  
          return updatedOrganism;
        });
  
        return [...updatedOrganisms, ...newOrganisms];
      });
    }, 50);
  
    return () => clearInterval(interval);
  }, [organisms, obstacles]);

  const { aliveRed, aliveBlue } = countAlive(organisms);

  return (
    <div className="dashboard-container">
      {editMode ? (
        <Banner aliveRed={aliveRed} aliveBlue={aliveBlue} onStartSimulation={handleStartSimulation} />
      ) : (
<div className="simulation-header">
  <div className="faction-info">
    <img src="src/assets/LogoBlue.png" alt="Faction 1" />
    <p>{aliveBlue}</p>
  </div>

  <button className="edit-button" onClick={handleEditSimulation}>Exit</button>

  <div className="faction-info">
    <p>{aliveRed}</p>
    <img src="src/assets/LogoRed.png" alt="Faction 2" />
  </div>
</div>

      )}
      {simulationStarted && !editMode && (
        <div className="simulation-box">
          {/* Render organisms */}
          {organisms.map((organism) => (
            <Organism key={organism.id} organism={organism} />
          ))}

          {/* Render obstacles */}
          {obstacles.map((obstacle) => (
            <img
              key={obstacle.id}
              src={obstacle.imageSrc}
              alt="obstacle"
              style={{
                position: 'absolute',
                left: obstacle.x,
                top: obstacle.y,
                width: `${obstacle.width}px`,
                height: `${obstacle.height}px`,
              }}
            />
          ))}
        </div>
      )}
    <Feed></Feed>
    </div>
  );
};

export default Dashboard;
