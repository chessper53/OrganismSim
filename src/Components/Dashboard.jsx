import { useState, useEffect } from 'react';
import './Dashboard.css';
import { generateOrganisms } from '../Utilis/generateOrganisms';
import { findClosestOpponent, moveTowardOpponent, getDistance } from '../Utilis/pathFinder';
import agroBlue from '../assets/agroBlue.png';
import agroRed from '../assets/agroRed.png';
import civilianBlue from '../assets/civilianBlue.png';
import civilianRed from '../assets/civilianRed.png';
import civilianDead from '../assets/civDead.png';
import agroDead from '../assets/agrDead.png';

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const Organism = ({ organism }) => {
  const getOrganismIcon = () => {
    if (!organism.isAlive) {
      return organism.role === 'aggressive' ? agroDead : civilianDead;
    }
    if (organism.role === 'aggressive') {
      return organism.type === 'red' ? agroRed : agroBlue;
    } else {
      return organism.type === 'red' ? civilianRed : civilianBlue;
    }
  };

  return (
    <img
      src={getOrganismIcon()} 
      alt={organism.type}
      style={{
        position: 'absolute',
        left: organism.position.x,
        top: organism.position.y,
        width: '20px', 
        height: '20px',
      }}
      title={`Role: ${organism.role}`}
    />
  );
};

const Dashboard = () => {
  const [organisms, setOrganisms] = useState(generateOrganisms());

  const countAlive = () => {
    const aliveRed = organisms.filter((org) => org.isAlive && org.type === 'red').length;
    const aliveBlue = organisms.filter((org) => org.isAlive && org.type === 'blue').length;
    return { aliveRed, aliveBlue };
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setOrganisms((prevOrganisms) => {
        const shuffledOrganisms = shuffleArray([...prevOrganisms]);

        return shuffledOrganisms.map((organism) => {
          if (!organism.isAlive) return organism;

          if (organism.role === 'aggressive') {
            const opponent = findClosestOpponent(
              organism,
              shuffledOrganisms.filter((opp) => opp.isAlive && opp.type !== organism.type)
            );

            if (opponent && getDistance(organism, opponent) < 10) {
              if (Math.random() < 0.3) { 
                opponent.health -= 1;
                if (opponent.health <= 0) opponent.isAlive = false;
              }
            } else if (opponent) {
              organism = moveTowardOpponent(organism, opponent);
            }
          }

          const newPosX = organism.position.x + Math.random() * 5 - 2.5;
          const newPosY = organism.position.y + Math.random() * 5 - 2.5;

          return {
            ...organism,
            position: { x: newPosX, y: newPosY },
          };
        });
      });
    }, 50);

    return () => clearInterval(interval);
  }, [organisms]);

  const { aliveRed, aliveBlue } = countAlive();

  return (
    <div className="dashboard-container">
      <h1 className="sim-title">
        Sim - Red Alive: {aliveRed} | Blue Alive: {aliveBlue}
      </h1>
      <div className="simulation-box">
        {organisms.map((organism) => (
          <Organism key={organism.id} organism={organism} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
