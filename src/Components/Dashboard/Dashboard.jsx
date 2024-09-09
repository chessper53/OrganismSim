import { useState, useEffect } from 'react';
import './Dashboard.css';
import { generateOrganisms, shuffleArray, countAlive } from '../../Utilis/OrganismHandler';
import Organism from '../Organism/Organism';
import { roles } from '../../Utilis/roles';
import { findClosestOpponent, findClosestTeammate} from '../../Utilis/abilities';
import Banner from '../Banner/Banner';

const Dashboard = () => {
  const [organisms, setOrganisms] = useState(generateOrganisms());
  const [simulationStarted, setSimulationStarted] = useState(false);
  const [editMode, setEditMode] = useState(true); 

   const handleStartSimulation = (unitCounts) => {
    setOrganisms(generateOrganisms(unitCounts));  
    setSimulationStarted(true);
    setEditMode(false);
  };

  const handleEditSimulation = () => {
    setEditMode(true);  
    setSimulationStarted(false);  
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setOrganisms((prevOrganisms) => {
        const shuffledOrganisms = shuffleArray([...prevOrganisms]);
      
        return shuffledOrganisms.map((organism) => {
          if (!organism.isAlive) return organism;
      
          const role = roles[organism.role];
          let updatedOrganism = organism;
          let opponent = null;
      
          if (role.behaviorType === 'seeker') {
            opponent = findClosestOpponent(organism, shuffledOrganisms.filter(o => o.type !== organism.type && o.isAlive));
          } else if (role.behaviorType === 'protector') {
            opponent = findClosestTeammate(organism, shuffledOrganisms.filter(o => o.type === organism.type && o.isAlive && o.health < 3));
          }
      
          updatedOrganism = role.behavior(
            organism,
            shuffledOrganisms,
            opponent,
          );
          return updatedOrganism;
        });
      });
    }, 50);

    return () => clearInterval(interval);
  }, [organisms]);

  const { aliveRed, aliveBlue } = countAlive(organisms);

  return (
    <div className="dashboard-container">
      {editMode ? (
        <Banner aliveRed={aliveRed} aliveBlue={aliveBlue} onStartSimulation={handleStartSimulation} />
      ) : (
        <div className="simulation-header">
          <p>Blue: {aliveBlue} | Red: {aliveRed}</p>
          <button onClick={handleEditSimulation}>Edit Simulation</button>
        </div>
      )}

      {simulationStarted && !editMode && (
        <div className="simulation-box">
          {organisms.map((organism) => (
            <Organism key={organism.id} organism={organism} />
          ))}
        </div>
      )}
    </div>
  );
};
export default Dashboard;
