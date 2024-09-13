import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import './Analysis.css';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StatsAnalysis = ({ organisms, onBackToDashboard }) => {
  const [topKills, setTopKills] = useState([]);
  const [topDistance, setTopDistance] = useState([]);
  const [deathStats, setDeathStats] = useState({ redDeaths: 0, blueDeaths: 0 });

  useEffect(() => {
    // Sort organisms by killCount and get the top 5
    const sortedByKills = [...organisms].sort((a, b) => (b.killCount || 0) - (a.killCount || 0)).slice(0, 3);
    setTopKills(sortedByKills);

    // Sort organisms by distanceTraveled and get the top 5
    const sortedByDistance = [...organisms].sort((a, b) => (b.distanceTraveled || 0) - (a.distanceTraveled || 0)).slice(0, 3);
    setTopDistance(sortedByDistance);

    // Count deaths for both teams
    const redDeaths = organisms.filter((org) => org.type === 'red' && !org.isAlive).length;
    const blueDeaths = organisms.filter((org) => org.type === 'blue' && !org.isAlive).length;
    setDeathStats({ redDeaths, blueDeaths });
  }, [organisms]);

  const data = {
    labels: ['Red Deaths', 'Blue Deaths'],
    datasets: [
      {
        label: 'Deaths',
        data: [deathStats.redDeaths, deathStats.blueDeaths],
        backgroundColor: ['#ff4d4d', '#4d94ff'],
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="stats-analysis">
      <h1>Stats Analysis</h1>

      <div className="content">
        <div className="leaderboards">
          {/* Top Killers */}
          <div className="leaderboard">
            <h2>Top 5 Killers</h2>
            <ul>
              {topKills.map((organism, index) => (
                <li key={organism.id}>
                  {index + 1}. {organism.username} ({organism.role}) - {organism.killCount} kills
                </li>
              ))}
            </ul>
          </div>

          {/* Top Distance Traveled */}
          <div className="leaderboard">
            <h2>Top 5 Distance Traveled</h2>
            <ul>
              {topDistance.map((organism, index) => (
                <li key={organism.id}>
                  {index + 1}. {organism.username} ({organism.role}) - {organism.distanceTraveled.toFixed(2)} units
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Deaths Graph */}
        <div className="deaths-graph">
          <h2>Deaths on Both Teams</h2>
          <Bar data={data} options={options} />
        </div>
      </div>

      <button onClick={onBackToDashboard} className='backButton'>Back to Dashboard</button>

    </div>
  );
};

export default StatsAnalysis;
