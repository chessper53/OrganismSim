import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';

const VictoryScreen = ({ winner }) => {
  const [confettiCount, setConfettiCount] = useState(0);
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      if (confettiCount < 10) {
        setConfettiCount(confettiCount + 1);
      } else {
        setShowConfetti(false); // Stop confetti after 3 rounds
        clearInterval(interval);
      }
    }, 1000); // Control the time between confetti bursts (adjust as needed)

    return () => clearInterval(interval);
  }, [confettiCount]);

  return (
    <div className="victory-screen">
      {showConfetti && <Confetti />}
      <div className="victory-message">
      </div>
    </div>
  );
};

export default VictoryScreen;
