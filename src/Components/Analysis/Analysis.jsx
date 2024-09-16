import { useEffect, useState } from 'react';
import { Bar, Line, Scatter, Pie } from 'react-chartjs-2';
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
  ArcElement,
} from 'chart.js';
import './Analysis.css';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// Helper function to generate colors for pie chart
const generateColors = (count) => {
  const colors = [
    '#ff4d4d', '#4d94ff', '#4dff4d', '#fffd4d', '#ff4dff', 
    '#4dfffd', '#ffd84d', '#4d4dff', '#ff4d4d', '#ff4dff'
  ];
  return colors.slice(0, count);
};

const StatsAnalysis = ({ organisms, onBackToDashboard }) => {
  const [topKills, setTopKills] = useState([]);
  const [topDistance, setTopDistance] = useState([]);
  const [deathStats, setDeathStats] = useState({ redDeaths: 0, blueDeaths: 0 });
  const [redKillTimeline, setRedKillTimeline] = useState({});
  const [blueKillTimeline, setBlueKillTimeline] = useState({});
  const [rolePerformance, setRolePerformance] = useState({});
  const [killDistribution, setKillDistribution] = useState({});
  const [startTime] = useState(Date.now());

  useEffect(() => {
    const sortedByKills = [...organisms].sort((a, b) => (b.killCount || 0) - (a.killCount || 0)).slice(0, 3);
    setTopKills(sortedByKills);

    const sortedByDistance = [...organisms].sort((a, b) => (b.distanceTraveled || 0) - (a.distanceTraveled || 0)).slice(0, 3);
    setTopDistance(sortedByDistance);

    const redDeaths = organisms.filter((org) => org.type === 'red' && !org.isAlive).length;
    const blueDeaths = organisms.filter((org) => org.type === 'blue' && !org.isAlive).length;
    setDeathStats({ redDeaths, blueDeaths });

    const redTimeline = {};
    const blueTimeline = {};

    organisms.forEach((org) => {
      if (!org.isAlive && org.killTime) {
        const killInterval = Math.floor((org.killTime - startTime) / 10000);
        if (org.type === 'red') {
          redTimeline[killInterval] = (redTimeline[killInterval] || 0) + 1;
        } else if (org.type === 'blue') {
          blueTimeline[killInterval] = (blueTimeline[killInterval] || 0) + 1;
        }
      }
    });

    setRedKillTimeline(redTimeline);
    setBlueKillTimeline(blueTimeline);

    // Role-Based Performance
    const roles = [...new Set(organisms.map(org => org.role))];
    const rolePerf = roles.reduce((acc, role) => {
      const roleOrgs = organisms.filter(org => org.role === role);
      acc[role] = {
        kills: roleOrgs.reduce((sum, org) => sum + (org.killCount || 0), 0),
        deaths: roleOrgs.reduce((sum, org) => sum + (org.deathCount || 0), 0),
        survivalRate: roleOrgs.filter(org => org.isAlive).length / roleOrgs.length
      };
      return acc;
    }, {});

    setRolePerformance(rolePerf);

    // Kill Distribution by Role
    const roleKillDistribution = roles.reduce((acc, role) => {
      const roleOrgs = organisms.filter(org => org.role === role);
      acc[role] = roleOrgs.reduce((sum, org) => sum + (org.killCount || 0), 0);
      return acc;
    }, {});

    setKillDistribution(roleKillDistribution);

  }, [organisms, startTime]);

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

  const timelineLabels = Object.keys({ ...redKillTimeline, ...blueKillTimeline }).sort((a, b) => a - b);
  
  const timelineData = {
    labels: timelineLabels.map(label => `${label * 10} sec`),
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

  const killToDeathData = {
    labels: topKills.map(org => org.username),
    datasets: [
      {
        label: 'Kill-to-Death Ratio',
        data: topKills.map(org => (org.deathCount && org.deathCount > 0 ? (org.killCount || 0) / org.deathCount : 0)),
        backgroundColor: '#ff4d4d',
        borderColor: '#ff4d4d',
        borderWidth: 1,
      },
    ],
  };

  const killToDeathOptions = {
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
        // No max value to keep the scale unlimited
      },
    },
  };

  const comparisonData = {
    datasets: [
      {
        label: 'Top Killers',
        data: topKills.map(org => ({ x: org.killCount, y: org.distanceTraveled })),
        backgroundColor: '#ff4d4d',
      },
      {
        label: 'Top Travelers',
        data: topDistance.map(org => ({ x: org.killCount, y: org.distanceTraveled })),
        backgroundColor: '#4d94ff',
      },
    ],
  };

  const rolePerformanceData = {
    labels: Object.keys(rolePerformance),
    datasets: [
      {
        label: 'Kill Count by Role',
        data: Object.values(rolePerformance).map(rp => rp.kills),
        backgroundColor: '#ff4d4d',
      },
      {
        label: 'Death Count by Role',
        data: Object.values(rolePerformance).map(rp => rp.deaths),
        backgroundColor: '#4d94ff',
      },
    ],
  };

  const killDistributionData = {
    labels: Object.keys(killDistribution),
    datasets: [
      {
        label: 'Total Kills by Role',
        data: Object.values(killDistribution),
        backgroundColor: generateColors(Object.keys(killDistribution).length),
      },
    ],
  };

  const rolePerformanceOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const killDistributionOptions = {
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  return (
    <div className="stats-analysis">
      <div className="header">
        <h1>Stats Analysis</h1>
        <button onClick={onBackToDashboard} className="backButton">Back to Dashboard</button>
      </div>
      <div className="content">
        <div className="leaderboards">
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

        <div className="graphs">
          <div className="graph">
            <h2>Deaths on Both Teams</h2>
            <Bar data={deathData} options={options} />
          </div>

          <div className="graph">
            <h2>Kills Over Time</h2>
            <Line data={timelineData} options={options} />
          </div>

          <div className="graph">
            <h2>Top Killers vs. Top Travelers</h2>
            <Scatter data={comparisonData} options={options} />
          </div>

          <div className="graph">
            <h2>Role-Based Performance</h2>
            <Bar data={rolePerformanceData} options={rolePerformanceOptions} />
          </div>

          <div className="graph">
            <h2>Kill Distribution by Role</h2>
            <Pie data={killDistributionData} options={killDistributionOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsAnalysis;
