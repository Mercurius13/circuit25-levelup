'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const LiveMap = dynamic(() => import('@/components/LiveMap'), { ssr: false });

const GPS_API_URL = '/api/gps';

export default function GuardianDashboard() {
  const [position, setPosition] = useState<[number, number]>([0, 0]);

  async function fetchGPS() {
    try {
      const res = await fetch(GPS_API_URL);
      const data = await res.json();
      if (data.lat && data.lng) {
        setPosition([data.lat, data.lng]);
      }
    } catch (err) {
      console.error('Failed to fetch GPS coordinates:', err);
    }
  }

  useEffect(() => {
    fetchGPS();
    const interval = setInterval(fetchGPS, 90000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen w-full flex flex-col bg-gradient-to-b from-slate-50 to-slate-200">
      {/* Header */}
      <div className="py-4 text-center text-3xl font-bold text-slate-800 shadow">
        Guardian Dashboard
      </div>

      {/* Main Content */}
      <div className="flex-1 grid grid-rows-1 md:grid-cols-1 md:grid-rows-1">
        {/* Live Map */}
        <div className="w-full h-full border border-slate-300 bg-white overflow-hidden">
          <LiveMap position={position} />
        </div>
      </div>

      {/* Button to external link */}
      <div className="py-4 text-center">
        <a
          href="http://172.20.10.8/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow hover:bg-blue-700 transition"
        >
          Open Live Feed
        </a>
      </div>
    </div>
  );
}
