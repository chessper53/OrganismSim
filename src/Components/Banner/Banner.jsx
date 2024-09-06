import React, { useState } from 'react';
import './Banner.css'; 

const Banner = ({ aliveRed, aliveBlue }) => {
  // Initialize state for each unit's count
  const [legionnaireCount, setLegionnaireCount] = useState(0);
  const [medicCount, setMedicCount] = useState(0);
  const [centurionCount, setCenturionCount] = useState(0);
  const [kingCount, setKingCount] = useState(0);
  const [shieldBearerCount, setShieldBearerCount] = useState(0);
  const [simulationStarted, setSimulationStarted] = useState(false);

  // Define functions to handle click events for increase/decrease
  const handleLegionnaireClick = (delta) => setLegionnaireCount(Math.max(legionnaireCount + delta, 0));
  const handleMedicClick = (delta) => setMedicCount(Math.max(medicCount + delta, 0));
  const handleCenturionClick = (delta) => setCenturionCount(Math.max(centurionCount + delta, 0));
  const handleKingClick = (delta) => setKingCount(Math.max(kingCount + delta, 0));
  const handleShieldBearerClick = (delta) => setShieldBearerCount(Math.max(shieldBearerCount + delta, 0));

  // Handle start button
  const handleStart = () => setSimulationStarted(true);

  return (
    <div className='Banner'>
      <div className='SelectorDiv'>
        <div className='UnitSelector'>
          <img src="src/assets/DeadState/legionnaireDead.png" alt="Legionnaire" />
          <label>{legionnaireCount}</label>
          <div className="controls">
            <button onClick={() => handleLegionnaireClick(1)}>+</button>
            <button onClick={() => handleLegionnaireClick(-1)}>-</button>
          </div>
        </div>
        <div className='UnitSelector'>
          <img src="src/assets/DeadState/medicDead.png" alt="Medic" />
          <label>{medicCount}</label>
          <div className="controls">
            <button onClick={() => handleMedicClick(1)}>+</button>
            <button onClick={() => handleMedicClick(-1)}>-</button>
          </div>
        </div>
        <div className='UnitSelector'>
          <img src="src/assets/DeadState/centurionDead.png" alt="Centurion" />
          <label>{centurionCount}</label>
          <div className="controls">
            <button onClick={() => handleCenturionClick(1)}>+</button>
            <button onClick={() => handleCenturionClick(-1)}>-</button>
          </div>
        </div>
        <div className='UnitSelector'>
          <img src="src/assets/DeadState/kingDead.png" alt="King" />
          <label>{kingCount}</label>
          <div className="controls">
            <button onClick={() => handleKingClick(1)}>+</button>
            <button onClick={() => handleKingClick(-1)}>-</button>
          </div>
        </div>
        <div className='UnitSelector'>
          <img src="src/assets/DeadState/shieldBearerDead.png" alt="Shield Bearer" />
          <label>{shieldBearerCount}</label>
          <div className="controls">
            <button onClick={() => handleShieldBearerClick(1)}>+</button>
            <button onClick={() => handleShieldBearerClick(-1)}>-</button>
          </div>
        </div>
      </div>

      <div className='AliveDiv'>
        <p className='AliveCounter'>Blue: {aliveBlue}</p>
        <p className='AliveCounter'>&nbsp; | &nbsp;</p>
        <p className='AliveCounter'>Red: {aliveRed}</p>
      </div>

      <div className='StartDiv'>
        <button className="start-button" onClick={handleStart}>
          {simulationStarted ? "Restart Simulation" : "Start Simulation"}
        </button>
      </div>
    </div>
  );
};

export default Banner;
