'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const LiveMap = dynamic(() => import('@/components/LiveMap'), { ssr: false });

const CAMERA_STREAM_URL = 'http://192.168.1.100:81/stream'; // Replace with your ESP32-CAM stream URL
const GPS_API_URL = '/api/gps'; // Replace with your GPS endpoint

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
    fetchGPS(); // initial load
    const interval = setInterval(fetchGPS, 90000); // update every 90 sec
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-4">
      {/* Camera Feed */}
      <div className="w-full max-w-2xl rounded-2xl overflow-hidden shadow-md border">
        <img
          src={CAMERA_STREAM_URL}
          alt="Live Camera Feed"
          className="w-full h-auto"
        />
      </div>

      {/* Live Map */}
      <div className="w-full max-w-2xl h-96 overflow-hidden shadow-md border rounded-2xl">
        <LiveMap position={position} />
      </div>
    </div>
  );
}
