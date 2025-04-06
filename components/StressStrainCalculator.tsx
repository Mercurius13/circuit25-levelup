import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css'; // Required for styling

const StressStrainCalculator: React.FC = () => {
  // Default hardcoded values
  const stress = 45; // Arbitrary stress value
  const strain = 60; // Arbitrary strain value

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
      <h2>Stress & Strain Calculator</h2>

      {/* Display Results */}
      <div style={{ marginTop: '1rem' }}>
        <h3>Results:</h3>
        <p>Stress: <strong>{stress}%</strong></p>
        <p>Strain: <strong>{strain}%</strong></p>

        {/* Display Stress and Strain on a Combined Gauge Chart Side-by-Side */}
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          {/* Stress Circular Progress */}
          <div style={{ width: '45%' }}>
            <CircularProgressbar
              value={stress}
              text={`${stress}%`}
              strokeWidth={10}
              styles={{
                path: { stroke: 'red' },
                trail: { stroke: '#d6d6d6' },
                text: { fill: 'red', fontSize: '16px' },
              }}
            />
          </div>

          {/* Strain Circular Progress */}
          <div style={{ width: '45%' }}>
            <CircularProgressbar
              value={strain}
              text={`${strain}%`}
              strokeWidth={10}
              styles={{
                path: { stroke: 'blue' },
                trail: { stroke: '#d6d6d6' },
                text: { fill: 'blue', fontSize: '16px' },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StressStrainCalculator;
