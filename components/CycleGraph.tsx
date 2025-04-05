import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

interface CycleGraphProps {
  setValue?: (val: number) => void;
  label?: string;
}

const CycleGraph: React.FC<CycleGraphProps> = ({ setValue, label }) => {
  const [dataPoints, setDataPoints] = useState<number[]>([75]);
  const [timeStamps, setTimeStamps] = useState<number[]>([0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDataPoints(prev => {
        const last = prev[prev.length - 1];
        const change = Math.round((Math.random() - 0.5) * 5);
        const next = last + change;
        setValue?.(next); // Update parent
        return [...prev, next];
      });

      setTimeStamps(prev => [...prev, prev.length]);
    }, 5000);

    return () => clearInterval(interval);
  }, [setValue]);

  return (
    <Plot
      data={[
        {
          x: timeStamps,
          y: dataPoints,
          type: 'scatter',
          mode: 'lines+markers',
          marker: { color: 'red' },
          line: { shape: 'spline' },
        },
      ]}
      layout={{
        width: 320,
        height: 240,
        title: `${label || 'Cycle'} Data Over Time`,
        xaxis: { title: 'Time (s)' },
        yaxis: { title: 'Value' },
      }}
    />
  );
};

export default CycleGraph;
