import { useState, useEffect } from 'react';
import './Dashboard.css';
import { generateOrganisms } from '../Utilis/generateOrganisms';
import { findClosestOpponent, moveTowardOpponent, healTeammate, getDistance } from '../Utilis/abilities';
import { roles } from '../Utilis/roles';
import agroBlue from '../assets/BlueTeam/agroBlue.png';
import agroRed from '../assets/RedTeam/agroRed.png';
import civilianBlue from '../assets/BlueTeam/civilianBlue.png';
import civilianRed from '../assets/RedTeam/civilianRed.png';
import medicBlue from '../assets/BlueTeam/medicBlue.png';
import medicRed from '../assets/RedTeam/medicRed.png';
import civilianDead from '../assets/DeadState/civiDead.png'; 
import agroDead from '../assets/DeadState/agroDead.png';
import medicDead from '../assets/DeadState/medicDead.png'; 
import kingBlue from "../assets/BlueTeam/KingBlue.png"
import kingRed from '../assets/RedTeam/KingRed.png';
import kingDead from '../assets/DeadState/KingDead.png';


const roleIcons = {
  aggressive: {
    alive: {
      blue: agroBlue,
      red: agroRed,
    },
    dead: agroDead,
  },
  passive: {
    alive: {
      blue: civilianBlue,
      red: civilianRed,
    },
    dead: civilianDead,
  },
  medic: {
    alive: {
      blue: medicBlue,
      red: medicRed,
    },
    dead: medicDead,
  },
  king: {
    alive: {
      blue: kingBlue,
      red: kingRed,
    },
    dead: kingDead,
  }
};

const Organism = ({ organism }) => {
  const getOrganismIcon = () => {
    const role = roleIcons[organism.role] || {};
    if (!organism.isAlive) {
      return role.dead;
    }
    const type = role.alive || {};
    return organism.type === 'red' ? type.red : type.blue;
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


const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
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

          const role = roles[organism.role];
          let updatedOrganism = organism;

          const opponent = organism.role === 'aggressive'
            ? findClosestOpponent(organism, shuffledOrganisms)
            : null;

          updatedOrganism = role.behavior(
            organism,
            shuffledOrganisms,
            opponent,
            moveTowardOpponent,
            getDistance,
            healTeammate
          );

          return updatedOrganism;
        });
      });
    }, 50);

    return () => clearInterval(interval);
  }, [organisms]);

  const { aliveRed, aliveBlue } = countAlive();

  return (
    <div className="dashboard-container">
      <h1 className="sim-title">
        Red Alive: {aliveRed} | Blue Alive: {aliveBlue}
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
