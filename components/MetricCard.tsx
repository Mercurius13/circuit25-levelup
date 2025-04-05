'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface MetricCardProps {
  id: string;
  title: string;
  icon: React.ReactNode;
  expanded: boolean;
  onClick: () => void;
  value?: string | number;
  defaultValue?: string | number;
}

export default function MetricCard({
  id,
  title,
  icon,
  expanded,
  onClick,
  value,
  defaultValue,
}: MetricCardProps) {
  return (
    <>
      {!expanded && (
        <motion.div
          layout
          onClick={onClick}
          className="bg-white rounded-2xl shadow-lg p-6 cursor-pointer transition-all duration-300"
        >
          <motion.div layout="position" className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {icon}
              <h2 className="text-xl font-semibold">{title}</h2>
            </div>
            {defaultValue && (
              <div className="text-lg font-bold text-gray-800">{defaultValue}</div>
            )}
          </motion.div>
        </motion.div>
      )}

      <AnimatePresence>
        {expanded && (
          <motion.div
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40"
          >
            <motion.div
              layout
              className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-3xl h-[600px] overflow-hidden relative"
            >
              <button
                onClick={onClick}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex items-center space-x-4 mb-4">
                {icon}
                <h2 className="text-2xl font-semibold">{title}</h2>
              </div>

              <div className="overflow-y-auto h-[calc(100%-60px)] pr-2 space-y-4 text-sm text-gray-700">
                <p>📊 Detailed {title} Data...</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <p>Praesent commodo cursus magna, vel scelerisque nisl.</p>
                <p>Donec sed odio dui. Aenean lacinia bibendum nulla.</p>
                <p>Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
                <p>Sed posuere consectetur est at lobortis.</p>
                <p>Even more info...</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
