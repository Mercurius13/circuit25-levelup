// app/api/gps/route.ts

function getRandomNearbyLocations(centerLat: number, centerLng: number, count: number = 5) {
  const radiusInMeters = 1000;

  const locations = Array.from({ length: count }, () => {
    const r = radiusInMeters / 111300; // ~1 deg latitude ~= 111.3 km
    const u = Math.random();
    const v = Math.random();
    const w = r * Math.sqrt(u);
    const t = 2 * Math.PI * v;
    const deltaLat = w * Math.cos(t);
    const deltaLng = w * Math.sin(t) / Math.cos(centerLat * (Math.PI / 180));

    return {
      lat: centerLat + deltaLat,
      lng: centerLng + deltaLng,
    };
  });

  return locations;
}

export async function GET() {
  // ✅ Vile Parle (or Andheri/Sion area) as base
  const centerLat = 19.0968;
  const centerLng = 72.8500;

  const randomLocation = getRandomNearbyLocations(centerLat, centerLng, 1)[0]; // return just one

  return Response.json(randomLocation);
}
