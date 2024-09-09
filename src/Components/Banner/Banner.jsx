import React, { useState } from 'react';
import './Banner.css'; 

const Banner = ({ aliveRed, aliveBlue, onStartSimulation }) => {
  const [legionnaireCount, setLegionnaireCount] = useState(0);
  const [medicCount, setMedicCount] = useState(0);
  const [centurionCount, setCenturionCount] = useState(0);
  const [kingCount, setKingCount] = useState(0);
  const [shieldBearerCount, setShieldBearerCount] = useState(0);

  // Calculate the total cost
  const totalCost = legionnaireCount * 1 + medicCount * 2 + centurionCount * 3 + kingCount * 10 + shieldBearerCount * 5;

  // Handle starting the simulation
  const handleStart = () => {
    const unitCounts = {
      legionnaire: legionnaireCount,
      medic: medicCount,
      centurion: centurionCount,
      Emperor: kingCount,
      shieldBearer: shieldBearerCount,
    };
    onStartSimulation(unitCounts);
  };

  return (
    <div className='Banner'>
      <div className='SelectorDiv'>
        <div className='UnitSelector'>
          <img src="src/assets/DeadState/legionnaireDead.png" alt="Legionnaire" />
          <label>{legionnaireCount}</label>
          <div className="controls">
            <button onClick={() => setLegionnaireCount(Math.max(legionnaireCount + 5, 0))}>+</button>
            <button onClick={() => setLegionnaireCount(Math.max(legionnaireCount - 5, 0))}>-</button>
          </div>
        </div>
        <div className='UnitSelector'>
          <img src="src/assets/DeadState/medicDead.png" alt="Medic" />
          <label>{medicCount}</label>
          <div className="controls">
            <button onClick={() => setMedicCount(Math.max(medicCount + 5, 0))}>+</button>
            <button onClick={() => setMedicCount(Math.max(medicCount - 5, 0))}>-</button>
          </div>
        </div>
        <div className='UnitSelector'>
          <img src="src/assets/DeadState/centurionDead.png" alt="Centurion" />
          <label>{centurionCount}</label>
          <div className="controls">
            <button onClick={() => setCenturionCount(Math.max(centurionCount + 5, 0))}>+</button>
            <button onClick={() => setCenturionCount(Math.max(centurionCount - 5, 0))}>-</button>
          </div>
        </div>
        <div className='UnitSelector'>
          <img src="src/assets/DeadState/kingDead.png" alt="King" />
          <label>{kingCount}</label>
          <div className="controls">
            <button onClick={() => setKingCount(Math.max(kingCount + 5, 0))}>+</button>
            <button onClick={() => setKingCount(Math.max(kingCount - 5, 0))}>-</button>
          </div>
        </div>
        <div className='UnitSelector'>
          <img src="src/assets/DeadState/shieldBearerDead.png" alt="Shield Bearer" />
          <label>{shieldBearerCount}</label>
          <div className="controls">
            <button onClick={() => setShieldBearerCount(Math.max(shieldBearerCount + 5, 0))}>+</button>
            <button onClick={() => setShieldBearerCount(Math.max(shieldBearerCount - 5, 0))}>-</button>
          </div>
        </div>
      </div>
      <div className='StartDiv'>
        <button className="start-button" onClick={handleStart}>
          Start Simulation
        </button>
      </div>

      <div className="CostDiv">
        <p>Total Cost: {totalCost}</p>
      </div>

      <div className="simulation-box">
      </div>

    </div>
  );
};

export default Banner;
