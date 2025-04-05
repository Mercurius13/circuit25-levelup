'use client';

import React from 'react';

interface CurrentOrderBannerProps {
  mode: 'sleep' | 'workout' | 'normal';
}

// Updated to use green background and black text for all modes
const modeStyles = {
  sleep: 'bg-green-500 text-black',
  workout: 'bg-green-500 text-black',
  normal: 'bg-green-500 text-black',
};

const modeLabels = {
  sleep: 'Sleep Mode',
  workout: 'Workout Mode',
  normal: 'Normal Mode',
};

export default function CurrentOrderBanner({ mode }: CurrentOrderBannerProps) {
  return (
    <div
      className={`w-full py-4 px-6 text-center text-lg md:text-xl font-bold shadow-md rounded-2xl ${modeStyles[mode]}`}
    >
      Current Mode: {modeLabels[mode]}
    </div>
  );
}
