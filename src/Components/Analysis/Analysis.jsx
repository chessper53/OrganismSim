import { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import './Analysis.css';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

const StatsAnalysis = ({ organisms, onBackToDashboard }) => {
  const [topKills, setTopKills] = useState([]);
  const [topDistance, setTopDistance] = useState([]);
  const [deathStats, setDeathStats] = useState({ redDeaths: 0, blueDeaths: 0 });
  const [redKillTimeline, setRedKillTimeline] = useState({});
  const [blueKillTimeline, setBlueKillTimeline] = useState({});
  const [startTime] = useState(Date.now()); // Assuming simulation starts when the component is mounted

  useEffect(() => {
    const sortedByKills = [...organisms].sort((a, b) => (b.killCount || 0) - (a.killCount || 0)).slice(0, 3);
    setTopKills(sortedByKills);

    const sortedByDistance = [...organisms].sort((a, b) => (b.distanceTraveled || 0) - (a.distanceTraveled || 0)).slice(0, 3);
    setTopDistance(sortedByDistance);

    const redDeaths = organisms.filter((org) => org.type === 'red' && !org.isAlive).length;
    const blueDeaths = organisms.filter((org) => org.type === 'blue' && !org.isAlive).length;
    setDeathStats({ redDeaths, blueDeaths });

    // Calculate kills over time for red and blue teams
    const redTimeline = {};
    const blueTimeline = {};

    organisms.forEach((org) => {
      if (!org.isAlive && org.killTime) {
        const killInterval = Math.floor((org.killTime - startTime) / 10000); // Group by 10-second intervals
        if (org.type === 'red') {
          redTimeline[killInterval] = (redTimeline[killInterval] || 0) + 1;
        } else if (org.type === 'blue') {
          blueTimeline[killInterval] = (blueTimeline[killInterval] || 0) + 1;
        }
      }
    });
    
    setRedKillTimeline(redTimeline);
    setBlueKillTimeline(blueTimeline);

  }, [organisms, startTime]);

  // Deaths bar chart data
  const deathData = {
    labels: ['Red Deaths', 'Blue Deaths'],
    datasets: [
      {
        label: 'Deaths',
        data: [deathStats.redDeaths, deathStats.blueDeaths],
        backgroundColor: ['#ff4d4d', '#4d94ff'],
      },
    ],
  };

  // Line chart data (kills over time)
  const timelineLabels = Object.keys({ ...redKillTimeline, ...blueKillTimeline }).sort((a, b) => a - b);
  
  const timelineData = {
    labels: timelineLabels.map(label => `${label * 10} sec`), // Time labels in 10-second intervals
    datasets: [
      {
        label: 'Red Team Deaths',
        data: timelineLabels.map(label => redKillTimeline[label] || 0),
        borderColor: '#ff4d4d',
        fill: false,
      },
      {
        label: 'Blue Team Deaths',
        data: timelineLabels.map(label => blueKillTimeline[label] || 0),
        borderColor: '#4d94ff',
        fill: false,
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
      <div className="content">
        <div className="leaderboards">
          {/* Top Killers */}
          <div className="leaderboard">
            <h2>Top 3 Units</h2>
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
            <h2>Top 3 Travelers</h2>
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
          <Bar data={deathData} options={options} />
        </div>

        {/* Kills Timeline (Line Chart) */}
        <div className="deaths-graph">
          <h2>Kills Over Time</h2>
          <Line data={timelineData} options={options} />
        </div>

      </div>
      <button onClick={onBackToDashboard} className="backButton">Back to Dashboard</button>
    </div>
  );
};

export default StatsAnalysis;
