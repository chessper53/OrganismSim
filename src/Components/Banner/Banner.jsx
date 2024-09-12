import { useState, useEffect } from 'react';
import './Banner.css'; 

const Banner = ({ aliveRed, aliveBlue, onStartSimulation }) => {
  // Get the mode from localStorage or default to 'selector'
  const [mode, setMode] = useState(localStorage.getItem("PlaceMode") || 'selector');

  useEffect(() => {
    // Update localStorage whenever mode changes
    localStorage.setItem("PlaceMode", mode);
  }, [mode]);

  const [legionnaireCount, setLegionnaireCount] = useState(0);
  const [medicCount, setMedicCount] = useState(0);
  const [centurionCount, setCenturionCount] = useState(0);
  const [kingCount, setKingCount] = useState(0);
  const [shieldBearerCount, setShieldBearerCount] = useState(0);
  const [archerCount, setArcherCount] = useState(0);
  const [shiptCount, setShipCount] = useState(0);
  const [elephantCount, setElephantCount] = useState(0);
  const [ballistaCount, setBallistaCount] = useState(0);

  const handleStart = () => {
    const unitCounts = {
      legionnaire: legionnaireCount,
      medic: medicCount,
      centurion: centurionCount,
      Emperor: kingCount,
      shieldBearer: shieldBearerCount,
      archer: archerCount,
      romanShip: shiptCount,
      elephant: elephantCount,
      ballista: ballistaCount,
      banner: 1,
      barrack: 1,
      medicTent: 1,
    };
    onStartSimulation(unitCounts);
  };

  const toggleMode = () => {
    const newMode = mode === 'selector' ? 'manualPlace' : 'selector';
    setMode(newMode);
  };

  return (
    <div className='Banner'>


      {/* Conditional rendering based on the current mode */}
      {mode === 'selector' ? (
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
   <img src="src/assets/DeadState/EmperorDead.png" alt="King" />
   <label>{kingCount}</label>
   <div className="controls">
     <button onClick={() => setKingCount(Math.max(kingCount + 5, 0))}>+</button>
     <button onClick={() => setKingCount(Math.max(kingCount - 5, 0))}>-</button>
   </div>
 </div>
 <div className='UnitSelector'>
   <img src="src/assets/DeadState/archerDead.png" alt="Archer" />
   <label>{archerCount}</label>
   <div className="controls">
     <button onClick={() => setArcherCount(Math.max(archerCount + 5, 0))}>+</button>
     <button onClick={() => setArcherCount(Math.max(archerCount - 5, 0))}>-</button>
   </div>
 </div>
 <div className='UnitSelector'>
   <img src="src/assets/DeadState/BallistaDead.png" alt="Ballista" />
   <label>{ballistaCount}</label>
   <div className="controls">
     <button onClick={() => setBallistaCount(Math.max(ballistaCount + 5, 0))}>+</button>
     <button onClick={() => setBallistaCount(Math.max(ballistaCount - 5, 0))}>-</button>
   </div>
 </div>
 <div className='UnitSelector'>
   <img src="src/assets/DeadState/romanShipDead.png" alt="Ship" />
   <label>{shiptCount}</label>
   <div className="controls">
     <button onClick={() => setShipCount(Math.max(shiptCount + 1, 0))}>+</button>
     <button onClick={() => setShipCount(Math.max(shiptCount - 1, 0))}>-</button>
   </div>
 </div>
 <div className='UnitSelector'>
   <img src="src/assets/DeadState/elephantDead.png" alt="elephant" />
   <label>{elephantCount}</label>
   <div className="controls">
     <button onClick={() => setElephantCount(Math.max(elephantCount + 5, 0))}>+</button>
     <button onClick={() => setElephantCount(Math.max(elephantCount - 5, 0))}>-</button>
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
      ) : (
        <div className='DragableMode'>
          <div className='UnitSelector'>
            <img src="src/assets/DeadState/legionnaireDead.png" alt="Legionnaire" />
          </div>
          <div className='UnitSelector'>
            <img src="src/assets/DeadState/centurionDead.png" alt="Centurion" />
          </div>
          <div className='UnitSelector'>
            <img src="src/assets/DeadState/EmperorDead.png" alt="Emperor" />
          </div>
          <div className='UnitSelector'>
            <img src="src/assets/DeadState/shieldBearerDead.png" alt="Shield Bearer" />
          </div>
          <div className='UnitSelector'>
            <img src="src/assets/DeadState/archerDead.png" alt="Archer" />
          </div>
          <div className='UnitSelector'>
            <img src="src/assets/DeadState/romanShipDead.png" alt="Roman Ship" />
          </div>
          <div className='UnitSelector'>
            <img src="src/assets/DeadState/medicDead.png" alt="Medic" />
          </div>
      </div>

      )}
      <div className='StartDiv'>
        <button className="start-button" onClick={handleStart}>
          Start Simulation
        </button>
      <button onClick={toggleMode} className="toggle-mode-button">switch
      </button>
      </div>
      <div className="simulation-box">
        p
      </div>
    </div>
  );
};

export default Banner;
