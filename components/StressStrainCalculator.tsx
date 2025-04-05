import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const StressStrainCalculator = () => {
  const [formData, setFormData] = useState({
    age: '',
    weight: '',
    height: '',
    cycleLengthDays: '',
    flowIntensity: 'medium',
    cycleRegular: true,
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  // Calculate Stress & Strain function
  const calculateStressStrain = ({
    age,
    weight,
    height,
    cycleLengthDays,
    flowIntensity,
    cycleRegular,
  }) => {
    age = parseFloat(age);
    weight = parseFloat(weight);
    height = parseFloat(height);
    cycleLengthDays = parseFloat(cycleLengthDays);

    const heightM = height / 100;
    const bmi = weight / (heightM ** 2);

    let stressScore = 0;
    if (age < 18 || age > 45) stressScore += 10;
    if (!cycleRegular) stressScore += 20;

    if (flowIntensity === 'heavy') stressScore += 15;
    else if (flowIntensity === 'medium') stressScore += 10;
    else if (flowIntensity === 'light') stressScore += 5;

    if (bmi < 18.5 || bmi > 25) stressScore += 10;
    if (cycleLengthDays < 24 || cycleLengthDays > 35) stressScore += 10;

    const stressPercentage = Math.min((stressScore / 100) * 100, 100);
    const ageFactor = 0.01 * (age - 25);
    const strainPercentage = Math.min(stressPercentage * (1 + ageFactor), 100);

    return {
      stress: stressPercentage.toFixed(2),
      strain: strainPercentage.toFixed(2),
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = calculateStressStrain(formData);
    setResult(result);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Randomly generate values for the form fields (except age, weight, height)
  const generateRandomValues = () => {
    const randomCycleLength = Math.floor(Math.random() * (35 - 24 + 1)) + 24;
    const randomFlowIntensity = ['light', 'medium', 'heavy'][Math.floor(Math.random() * 3)];
    const randomCycleRegular = Math.random() < 0.7; // 70% chance of regular cycle

    setFormData((prev) => ({
      ...prev,
      cycleLengthDays: randomCycleLength.toString(),
      flowIntensity: randomFlowIntensity,
      cycleRegular: randomCycleRegular,
    }));
  };

  // Fetch age, weight, and height from Flask API
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/user'); // Replace with your Flask API endpoint
        const data = await response.json();
        setFormData((prev) => ({
          ...prev,
          age: data.age.toString(),
          weight: data.weight.toString(),
          height: data.height.toString(),
        }));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <div>Loading...</div>;

  // Chart.js data configuration for gauge-like chart
  const createGaugeData = (value) => {
    const percent = value / 100;

    return {
      datasets: [
        {
          data: [percent * 100, 100 - percent * 100],
          backgroundColor: ['#00FF00', '#e0e0e0'], // Green for positive values, gray for the rest
          borderWidth: 0,
        },
      ],
    };
  };

  const gaugeOptions = {
    responsive: true,
    plugins: {
      tooltip: {
        enabled: false,
      },
      legend: {
        display: false,
      },
    },
    elements: {
      arc: {
        borderWidth: 0,
      },
    },
    circumference: Math.PI,
    rotation: Math.PI,
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '2rem' }}>
      <h2>Stress & Strain Calculator</h2>
      <form onSubmit={handleSubmit}>
        <label>Age:
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
            disabled
          />
        </label><br />

        <label>Weight (kg):
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            required
            disabled
          />
        </label><br />

        <label>Height (cm):
          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleChange}
            required
            disabled
          />
        </label><br />

        <label>Cycle Length (days):
          <input
            type="number"
            name="cycleLengthDays"
            value={formData.cycleLengthDays}
            onChange={handleChange}
            required
          />
        </label><br />

        <label>Flow Intensity:
          <select name="flowIntensity" value={formData.flowIntensity} onChange={handleChange}>
            <option value="light">Light</option>
            <option value="medium">Medium</option>
            <option value="heavy">Heavy</option>
          </select>
        </label><br />

        <label>
          Regular Cycle:
          <input
            type="checkbox"
            name="cycleRegular"
            checked={formData.cycleRegular}
            onChange={handleChange}
          />
        </label><br />

        <button type="submit">Calculate</button>
        <button type="button" onClick={generateRandomValues} style={{ marginLeft: '10px' }}>
          Generate Random Values
        </button>
      </form>

      {result && (
        <div style={{ marginTop: '1rem' }}>
          <h3>Results:</h3>
          <p>Stress: <strong>{result.stress}%</strong></p>
          <p>Strain: <strong>{result.strain}%</strong></p>

          <div style={{ marginTop: '20px' }}>
            <h4>Stress Gauge</h4>
            <Line data={createGaugeData(result.stress)} options={gaugeOptions} />
          </div>

          <div style={{ marginTop: '20px' }}>
            <h4>Strain Gauge</h4>
            <Line data={createGaugeData(result.strain)} options={gaugeOptions} />
          </div>
        </div>
      )}
    </div>
  );
};

export default StressStrainCalculator;
