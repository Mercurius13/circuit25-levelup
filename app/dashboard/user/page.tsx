'use client';

import { useEffect, useState } from 'react';
import { Heart, Wind, Footprints, Moon, Droplet, AlertTriangle } from 'lucide-react';
import MetricCard from '@/components/MetricCard';
import { motion, AnimatePresence } from 'framer-motion';
import CurrentOrderBanner from '@/components/CurrentOrderBanner';
import dynamic from 'next/dynamic';
import StepsChart from '@/components/StepsBarChart';

// Dynamically import your components
const CycleGraph = dynamic(() => import('@/components/CycleGraph'), { ssr: false });
import StressStrainCalculator from '@/components/StressStrainCalculator';

// Metrics top section
const metricstop = [
  {
    id: 'heart',
    title: 'Heart Rate',
    icon: <Heart className="w-8 h-8 text-red-600" />, // red for heart rate
    defaultValue: '75 bpm',
  },
  {
    id: 'spo2',
    title: 'SpO2',
    icon: <Wind className="w-8 h-8 text-blue-600" />, // blue for oxygen
    defaultValue: '98%',
  },
  {
    id: 'steps',
    title: 'Steps',
    icon: <Footprints className="w-8 h-8 text-green-600" />, // green for movement
    defaultValue: '1,200',
  }
];

// Metrics bottom section
const metricsbottom = [
  {
    id: 'sleep',
    title: 'Sleep',
    icon: <Moon className="w-8 h-8 text-indigo-600" />, // indigo for sleep
    defaultValue: '6h 45m',
  },
  {
    id: 'cycle',
    title: 'Cycle',
    icon: <Droplet className="w-8 h-8 text-pink-600" />, // pink for cycle
    defaultValue: 'Day 14',
  },
  {
    id: 'fall',
    title: 'Fall Detection',
    icon: <AlertTriangle className="w-8 h-8 text-orange-600" />, // orange for alert
    defaultValue: 'No Falls',
  },
];

export default function UserDashboard() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [mode, setMode] = useState<'sleep' | 'workout' | 'normal'>('normal');

  const handleExpand = (id: string) => {
    setExpanded(prev => (prev === id ? null : id)); // Toggle expanded state
  };

  useEffect(() => {
    document.body.style.overflow = expanded ? 'hidden' : '';
  }, [expanded]);

  // Content map to show specific content for each metric
  const contentMap: Record<string, React.ReactNode> = {
    heart: (
      <div>
        <CycleGraph />
        <ul className="list-disc pl-4 space-y-1 text-left">
          <li>Normal resting range: 60–100 bpm</li>
          <li>Athletes may have lower resting rates</li>
          <li>Heart rate varies with stress, sleep, and activity</li>
        </ul>
      </div>
    ),
    spo2: (
      <div>
        <ul className="list-disc pl-4 space-y-1 text-left">
          <li>Normal range: 95–100%</li>
          <li>Below 90% may indicate a health issue</li>
          <li>SpO₂ can drop during sleep or exercise</li>
        </ul>
      </div>
    ),
    steps: (
      <div>
        <StepsChart />
        <ul className="list-disc pl-4 space-y-1 text-left">
          <li>Goal: ~10,000 steps/day</li>
          <li>Walking improves cardiovascular health</li>
          <li>Track progress daily</li>
        </ul>
      </div>
    ),
    sleep: (
      <ul className="list-disc pl-4 space-y-1 text-left">
        <li>Recommended: 7–9 hours</li>
        <li>Consistent sleep improves recovery</li>
        <li>Track deep vs. light sleep patterns</li>
      </ul>
    ),
    cycle: (
      <div className="space-y-4">
        <div>
          <ul className="list-disc pl-4 space-y-1 text-left text-sm">
            <li>Track ovulation and fertility windows</li>
            <li>Day 14: Typical ovulation day in a 28-day cycle</li>
            <li>Cycle tracking helps manage symptoms</li>
          </ul>
        </div>
      </div>
    ),
    fall: (
      <ul className="list-disc pl-4 space-y-1 text-left">
        <li>No falls detected</li>
        <li>Alerts are triggered on sudden motion</li>
        <li>Check emergency contacts if needed</li>
      </ul>
    ),
    'stress-strain': <StressStrainCalculator /> // Injecting the StressStrainCalculator component here
  };

  // Render MetricCard with expand functionality
  const renderMetricCard = (
    id: string,
    title: string,
    icon: React.ReactNode,
    defaultValue?: string | number,
    content?: React.ReactNode
  ) => {
    const isExpanded = expanded === id;

    return (
      <div key={id} className="relative flex flex-col justify-between h-full">
        {/* Metric card for non-expanded state */}
        {!isExpanded && (
          <MetricCard
            id={id}
            title={title}
            icon={icon}
            defaultValue={defaultValue}
            expanded={false}
            onClick={() => handleExpand(id)}
            className="h-full flex flex-col"
          />
        )}

        {/* Expanded state with animation and content */}
        <AnimatePresence>
          {isExpanded && (
            <>
              <motion.div
                className="fixed inset-0 bg-black/30 backdrop-blur-md z-30"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setExpanded(null)} // Close when clicked outside
              />
              <motion.div
                className="fixed inset-0 z-40 flex items-center justify-center p-4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <MetricCard
                  id={id}
                  title={title}
                  icon={icon}
                  defaultValue={defaultValue}
                  expanded={true}
                  onClick={() => handleExpand(id)}
                  content={content || contentMap[id]} // Inject dynamic content (StressStrainCalculator for stress-strain)
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="min-h-screen w-full bg-[var(--background)] px-4 py-6 md:px-8 lg:px-12 text-[var(--foreground)] font-[Quicksand,sans-serif]">
      {/* Dashboard Title */}
      <div className="w-full mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-center tracking-wide text-[var(--blush-dark)]">
          Statistics Dashboard
        </h1>
      </div>

      {/* Top Metrics */}
      <div className="grid grid-cols-3 gap-6 w-full mb-8">
        {metricstop.map(metric =>
          renderMetricCard(metric.id, metric.title, metric.icon, metric.defaultValue)
        )}
      </div>

      {/* Current Mode Banner */}
      <div className="w-full my-6">
        <CurrentOrderBanner mode={mode} />
      </div>

      {/* Bottom Metrics */}
      <div className="grid grid-cols-3 gap-6 w-full mb-8">
        {metricsbottom.map(metric =>
          renderMetricCard(metric.id, metric.title, metric.icon, metric.defaultValue)
        )}
      </div>

      {/* Stress & Strain Metric Card at the Bottom */}
      <div className="w-full mt-8">
        {renderMetricCard(
          'stress-strain',
          'Stress & Strain',
          <Droplet className="w-8 h-8 text-pink-600" />,
          '',
          <StressStrainCalculator />
        )}
      </div>
    </div>
  );
}
