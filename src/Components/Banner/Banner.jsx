import { useState, useEffect } from 'react';
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core';
import './Banner.css';

const Banner = ({ aliveRed, aliveBlue, onStartSimulation }) => {
  const [mode, setMode] = useState(localStorage.getItem('PlaceMode') || 'selector');
  const [unitPositions, setUnitPositions] = useState([]);

  useEffect(() => {
    localStorage.setItem('PlaceMode', mode);
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

  // Draggable component
  const Draggable = ({ id, type, image }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({ id, data: { type } });
    const style = {
      transform: `translate3d(${transform?.x}px, ${transform?.y}px, 0)`,
      zIndex: 1000, // Ensure it's above other elements
      width: '50px', // Reduce the image size
      height: '50px',
      position: 'relative',
    };

    return (
      <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
        <img src={image} alt={type} style={{ width: '100%', height: '100%' }} />
      </div>
    );
  };

  // Droppable component
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

  // Handle the onDragEnd event
  const handleDragEnd = (event) => {
    const { over, active } = event;

    if (over) {
      const dropAreaRect = over.rect; // The rectangle of the drop area
      const dragItemType = active.data.current.type; // Type of the dragged item
      const dropX = event.delta.x; // Using the delta to calculate position change
      const dropY = event.delta.y;

      // Ensure the dropped position stays within bounds of the droppable area
      const clampedX = Math.max(0, Math.min(dropX, dropAreaRect.width - 50)); // Subtract 50 to account for the element width
      const clampedY = Math.max(0, Math.min(dropY, dropAreaRect.height - 50)); // Subtract 50 to account for the element height

      // Add the unit's type and drop position to the unitPositions array
      setUnitPositions((prevPositions) => [
        ...prevPositions,
        { type: dragItemType, position: { x: clampedX, y: clampedY } },
      ]);
      console.log('Placed:', dragItemType, 'at X:', clampedX, 'Y:', clampedY);
    }
  };

  return (
    <div className='Banner'>
      {mode === 'selector' ? (
        <div className='SelectorDiv'>
          {/* Render the static images for selection */}
          <div className="static-images">
            <img src='src/assets/DeadState/legionnaireDead.png' alt="Legionnaire" />
            <img src='src/assets/DeadState/centurionDead.png' alt="Centurion" />
            <img src='src/assets/DeadState/EmperorDead.png' alt="Emperor" />
            <img src='src/assets/DeadState/shieldBearerDead.png' alt="Shield Bearer" />
            <img src='src/assets/DeadState/archerDead.png' alt="Archer" />
            <img src='src/assets/DeadState/romanShipDead.png' alt="Roman Ship" />
            <img src='src/assets/DeadState/medicDead.png' alt="Medic" />
          </div>
        </div>
      ) : (
        <DndContext onDragEnd={handleDragEnd}>
          <div className='DragableMode'>
            {/* Make these draggable */}
            <Draggable id='legionnaire' type='legionnaire' image='src/assets/DeadState/legionnaireDead.png' />
            <Draggable id='centurion' type='centurion' image='src/assets/DeadState/centurionDead.png' />
            <Draggable id='emperor' type='emperor' image='src/assets/DeadState/EmperorDead.png' />
            <Draggable id='shieldBearer' type='shieldBearer' image='src/assets/DeadState/shieldBearerDead.png' />
            <Draggable id='archer' type='archer' image='src/assets/DeadState/archerDead.png' />
            <Draggable id='romanShip' type='romanShip' image='src/assets/DeadState/romanShipDead.png' />
            <Draggable id='medic' type='medic' image='src/assets/DeadState/medicDead.png' />
          </div>

          <Droppable id='simulationBox'>
            <div className='simulation-box'>
              {/* Render dropped elements */}
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
      <div className='StartDiv'>
        <button className='start-button' onClick={handleStart}>
          Start Simulation
        </button>
        <button onClick={toggleMode} className='toggle-mode-button'>
          Switch Mode
        </button>
      </div>
    </div>
  );
};

export default Banner;
