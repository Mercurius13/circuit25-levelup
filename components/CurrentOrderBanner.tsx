'use client';

import React from 'react';

interface CurrentOrderBannerProps {
  mode: 'sleep' | 'workout' | 'normal';
}

const modeStyles = {
  sleep: 'bg-purple-100 text-purple-800',
  workout: 'bg-red-100 text-red-800',
  normal: 'bg-green-100 text-green-800',
};

const modeLabels = {
  sleep: 'Sleep Mode',
  workout: 'Workout Mode',
  normal: 'Normal Mode',
};

export default function CurrentOrderBanner({ mode }: CurrentOrderBannerProps) {
  return (
    <div className={`w-full py-2 px-4 text-center font-semibold shadow-sm ${modeStyles[mode]} rounded-xl`}>
      Current Mode: {modeLabels[mode]}
    </div>
  );
}
