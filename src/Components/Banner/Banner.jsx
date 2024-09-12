import { useState, useEffect } from 'react';
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core';
import './Banner.css';

const Banner = ({ aliveRed, aliveBlue, onStartSimulation }) => {
  const [mode, setMode] = useState(localStorage.getItem('PlaceMode') || 'selector');
  const [unitPositions, setUnitPositions] = useState([]);

  useEffect(() => {
    localStorage.setItem('PlaceMode', mode);
    localStorage.removeItem("PlacedUnits");
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
  const [WolfCount, setWolfCount] = useState(0);

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
      wolf: WolfCount,
      
      //Static Buildings
      banner: 1,
      barrack: 1,
      medicTent: 1,
      barn: 2,
      cave: 1,
    };
    onStartSimulation(unitCounts);
  };

  const toggleMode = () => {
    const newMode = mode === 'selector' ? 'manualPlace' : 'selector';
    setMode(newMode);
  };

  const Draggable = ({ id, type, image }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({ id, data: { type } });
    const style = {
      transform: `translate3d(${transform?.x}px, ${transform?.y}px, 0)`,
      zIndex: 1000, 
      width: '40px', 
      height: '40px',
      position: 'relative',
    };

    return (
      <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
        <img src={image} alt={type} style={{ width: '100%', height: '100%' }} />
      </div>
    );
  };

  const Droppable = ({ id, children }) => {
    const { isOver, setNodeRef } = useDroppable({ id });
    const style = {
      border: isOver ? '2px solid green' : '2px dashed gray',
      width: '100%',
      height: '100%',
      position: 'relative',
    };

    return (
      <div ref={setNodeRef} style={style}>
        {children}
      </div>
    );
  };

  const handleDragEnd = (event) => {
    const { over, active } = event;

    if (over) {
      const dropAreaRect = over.rect; 
      const dragItemType = active.data.current.type; 
      const dropX = event.delta.x; 
      const dropY = event.delta.y;

      const clampedX = Math.max(0, Math.min(dropX, dropAreaRect.width - 50)); 
      const clampedY = Math.max(0, Math.min(dropY, dropAreaRect.height - 50)); 

      setUnitPositions((prevPositions) => [
        ...prevPositions,
        { type: dragItemType, position: { x: clampedX, y: clampedY } },
      ]);
      localStorage.setItem('PlacedUnits', JSON.stringify(unitPositions));
    }
  };

  return (
    <div className='Banner'>
      {mode === 'selector' ? (
        <>
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
          <img src="src/assets/DeadState/WolfDead.png" alt="Wolf" />
          <label>{WolfCount}</label>
          <div className="controls">
            <button onClick={() => setWolfCount(Math.max(WolfCount + 5, 0))}>+</button>
            <button onClick={() => setWolfCount(Math.max(WolfCount - 5, 0))}>-</button>
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
            <button className='start-button' onClick={handleStart}>
              Run Simulation
            </button>
            <img src="src/assets/DesignIcons/switchModeIcon.png" onClick={toggleMode} className='toggle-mode-button'/>
          </div>
          <div className='simulation-box'></div>
        </>
        
       
       
      ) : (
        <DndContext onDragEnd={handleDragEnd}>
          <div className='DragableMode'>
            <Draggable id='legionnaire' type='legionnaire' image='src/assets/DeadState/legionnaireDead.png' />
            <Draggable id='medic' type='medic' image='src/assets/DeadState/medicDead.png' />
            <Draggable id='centurion' type='centurion' image='src/assets/DeadState/centurionDead.png' />
            <Draggable id='Emperor' type='Emperor' image='src/assets/DeadState/EmperorDead.png' />
            <Draggable id='archer' type='archer' image='src/assets/DeadState/archerDead.png' />
            <Draggable id='ballista' type='ballista' image='src/assets/DeadState/ballistaDead.png' />
            <Draggable id='romanShip' type='romanShip' image='src/assets/DeadState/romanShipDead.png' />
            <Draggable id='elephant' type='elephant' image='src/assets/DeadState/elephantDead.png' />
            <Draggable id='wolf' type='wolf' image='src/assets/DeadState/WolfDead.png' />
            <Draggable id='shieldBearer' type='shieldBearer' image='src/assets/DeadState/shieldBearerDead.png' />

          </div>
          <div className='StartDiv'>
        <button className='start-button' onClick={handleStart}>
          Run Simulation
        </button>
        <img src="src/assets/DesignIcons/switchModeIcon.png" onClick={toggleMode} className='toggle-mode-button'/>
      </div>
          <Droppable id='simulationBox'>
            <div className='simulation-box'>
              {unitPositions.map((unit, index) => (
                <div
                  key={index}
                  style={{
                    position: 'absolute',
                    left: `${unit.position.x}px`,
                    top: `${unit.position.y}px`,
                    width: '50px',
                    height: '50px',
                  }}
                >
                  <img
                    src={`src/assets/DeadState/${unit.type}Dead.png`}
                    alt={unit.type}
                    style={{ width: '100%', height: '100%' }}
                  />
                </div>
              ))}
            </div>
          </Droppable>
        </DndContext>
      )}

    </div>
  );
};

export default Banner;
