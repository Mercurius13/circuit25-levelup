'use client';

import { useEffect, useState } from 'react';
import { Heart, Wind, Footprints, Moon, Droplet, AlertTriangle } from 'lucide-react';
import MetricCard from '@/components/MetricCard';
import { motion, AnimatePresence } from 'framer-motion';
import CurrentOrderBanner from '@/components/CurrentOrderBanner';

const metricstop = [
  { id: 'heart', title: 'Heart Rate', icon: <Heart className="w-8 h-8 text-red-500" />, defaultValue: '75 bpm' },
  { id: 'spo2', title: 'SpO2', icon: <Wind className="w-8 h-8 text-blue-500" />, defaultValue: '98%' },
  { id: 'steps', title: 'Steps', icon: <Footprints className="w-8 h-8 text-green-500" />, defaultValue: '1,200' },
];

const metricsbottom = [
  { id: 'sleep', title: 'Sleep', icon: <Moon className="w-8 h-8 text-purple-500" />, defaultValue: '6h 45m' },
  { id: 'cycle', title: 'Cycle', icon: <Droplet className="w-8 h-8 text-pink-500" />, defaultValue: 'Day 14' },
  { id: 'fall', title: 'Fall Detection', icon: <AlertTriangle className="w-8 h-8 text-yellow-500" />, defaultValue: 'No Falls' },
];

export default function UserDashboard() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [mode, setMode] = useState<'sleep' | 'workout' | 'normal'>('normal');

  const handleExpand = (id: string) => {
    setExpanded(prev => (prev === id ? null : id));
  };

  useEffect(() => {
    document.body.style.overflow = expanded ? 'hidden' : '';
  }, [expanded]);

  const renderMetricCard = (
    id: string,
    title: string,
    icon: React.ReactNode,
    defaultValue?: string | number
  ) => {
    const isExpanded = expanded === id;

    return (
      <div key={id} className="relative">
        {!isExpanded && (
          <MetricCard
            id={id}
            title={title}
            icon={icon}
            defaultValue={defaultValue}
            expanded={false}
            onClick={() => handleExpand(id)}
          />
        )}

        <AnimatePresence>
          {isExpanded && (
            <>
              <motion.div
                className="fixed inset-0 bg-black/30 backdrop-blur-md z-30"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setExpanded(null)}
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
                  expanded={true}
                  onClick={() => handleExpand(id)}
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="relative min-h-screen bg-gray-100 p-4 md:p-6">
      {/* Dashboard Title */}
      <div className="w-full max-w-6xl mx-auto mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Statistics Dashboard</h1>
      </div>

      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-6xl mx-auto">
        {metricstop.map(metric => renderMetricCard(metric.id, metric.title, metric.icon, metric.defaultValue))}
      </div>

      {/* Current Mode Banner */}
      <div className="w-full max-w-6xl mx-auto mt-4">
        <CurrentOrderBanner mode={mode} />
      </div>

      {/* Bottom Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-6xl mx-auto mt-4">
        {metricsbottom.map(metric => renderMetricCard(metric.id, metric.title, metric.icon, metric.defaultValue))}
      </div>
    </div>
  );
}
