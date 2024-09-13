import { useState, useEffect } from 'react';
import './Dashboard.css';
import Feed from '../Feed/Feed';
import StatsAnalysis from '../Analysis/Analysis';
import { generateOrganisms, shuffleArray, countAlive } from '../../Utilis/OrganismHandler';
import Organism from '../Organism/Organism';
import { roles } from '../../Utilis/roles';
import { findClosestOpponent, findClosestTeammate, initializeGrid } from '../../Utilis/abilities';
import VictoryScreen from '../Victory/VictoryScreen';
import Banner from '../Banner/Banner';
import { generateObstacles } from '../../Utilis/NonTraversablePoints';

const Dashboard = () => {
  const [winner, setWinner] = useState();
  const [organisms, setOrganisms] = useState(generateOrganisms());
  const [obstacles, setObstacles] = useState([]);
  const [nonTraversablePoints, setNonTraversablePoints] = useState([]);  
  const [lakeArray, setLakeArray] = useState([]); 
  const [simulationStarted, setSimulationStarted] = useState(false);
  const [editMode, setEditMode] = useState(true); 
  const [showStats, setShowStats] = useState(false);  // New state to toggle between Dashboard and StatsAnalysis

  const { aliveRed, aliveBlue } = countAlive(organisms);

  useEffect(() => {
    // Check if the game has a winner
    if (aliveRed === 0) {
      localStorage.setItem("TickSpeed", 1000000000);
      setWinner('Blue');
    } else if (aliveBlue === 0) {
      localStorage.setItem("TickSpeed", 1000000000);
      setWinner('Red');
    }
  }, [aliveRed, aliveBlue]);

  useEffect(() => {
    const { obstacles: generatedObstacles, nonTraversablePoints: generatedNonTraversablePoints, lake } = generateObstacles(10);
    setObstacles(generatedObstacles);
    setNonTraversablePoints(generatedNonTraversablePoints);
    setLakeArray([lake]);
    initializeGrid(generatedObstacles);
  }, []);

  const handleStartSimulation = (unitCounts) => {
    localStorage.setItem("TickSpeed", 50);
    setOrganisms(generateOrganisms(unitCounts, window.innerWidth, window.innerHeight, lakeArray, nonTraversablePoints));  
    setSimulationStarted(true);
    setEditMode(false);
  };

  const handleEditSimulation = () => {
    setEditMode(true);  
    setSimulationStarted(false);  
  };

  const handleSpeedChange = (x) => {
    let tickspeed = parseInt(localStorage.getItem("TickSpeed"), 10);
    if (isNaN(tickspeed)) {
      tickspeed = 50;
    }
    if (x === "forward") {
      tickspeed -= 50;
    } else {
      tickspeed = Math.max(0, tickspeed + 50); 
    }
    localStorage.setItem("TickSpeed", tickspeed);
  };

  // Interval for updating organism movements based on tick speed
  useEffect(() => {
    const getTickSpeed = () => {
      return parseInt(localStorage.getItem("TickSpeed"), 10) || 50;
    };
  
    const interval = setInterval(() => {
      const currentTime = Date.now(); 
  
      setOrganisms((prevOrganisms) => {
        const shuffledOrganisms = shuffleArray([...prevOrganisms]);
        const newOrganisms = []; 
  
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
    }, getTickSpeed());
    return () => clearInterval(interval);
  }, [organisms, obstacles]);

  // Function to toggle to StatsAnalysis
  const handleShowStats = () => {
    setShowStats(true);
  };

  // Render Dashboard or StatsAnalysis based on showStats state
  return (
    <div className="dashboard-container">
      {showStats ? (
        <StatsAnalysis organisms={organisms} onBackToDashboard={() => setShowStats(false)} />
      ) : (
        <>
          {editMode ? (
            <Banner aliveRed={aliveRed} aliveBlue={aliveBlue} onStartSimulation={handleStartSimulation} />
          ) : (
            <div className="simulation-header">
              <Feed />
            </div>
          )}
          {simulationStarted && !editMode && (
            <div className="simulation-box">
              {/* Render Counter */}
              <div className="counter-Div">
                <div className="faction-info">
                  <img src="src/assets/DesignIcons/castleBlue.png" alt="Faction 1" />
                  <p>{aliveBlue}</p>
                </div>
                <img src="src/assets/DesignIcons/back.png" className="speed-button" onClick={() => handleSpeedChange("backward")} />
                <img src="src/assets/DesignIcons/exit.png" className="edit-button" onClick={handleEditSimulation} />
                <img src="src/assets/DesignIcons/forward.png" className="speed-button" onClick={() => handleSpeedChange("forward")} />
                <div className="faction-info">
                  <img src="src/assets/DesignIcons/castleRed.png" alt="Faction 2" />
                  <p>{aliveRed}</p>
                </div>
              </div>
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
          {winner && <VictoryScreen winner={winner} />}
          {/* Add a button to switch to StatsAnalysis */}
          <button onClick={handleShowStats}>Analyze Stats</button>
        </>
      )}
    </div>
  );
};

export default Dashboard;
