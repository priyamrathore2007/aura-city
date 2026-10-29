import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polygon, LayersControl } from 'react-leaflet';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const RAIPUR_CENTER: [number, number] = [21.2514, 81.6296];
const RAIPUR_BOUNDS: [[number, number], [number, number]] = [
  [21.17, 81.52],
  [21.35, 81.75],
];

const RAIPUR_BOUNDARY: [number, number][] = [
  [21.2850, 81.5800],
  [21.2950, 81.6500],
  [21.2750, 81.6850],
  [21.2300, 81.6800],
  [21.2000, 81.6500],
  [21.1900, 81.6000],
  [21.2150, 81.5650],
  [21.2500, 81.5600],
];

interface SafeMapProps {
  markers?: { lat: number; lng: number; name: string; ward: string; status?: string; bhulekhStatus?: string; category?: string; }[];
  height?: string;
  showLayersControl?: boolean;
}

export default function SafeMap({ markers = [], height = '380px', showLayersControl = false }: SafeMapProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div style={{ height, width: '100%', background: '#e2e8f0' }} className="animate-pulse rounded-xl flex items-center justify-center text-xs text-slate-500 font-mono">Loading Raipur GIS Map...</div>;
  }

  return (
    <div style={{ height, width: '100%', position: 'relative' }}>
      <MapContainer
        center={RAIPUR_CENTER}
        zoom={13}
        minZoom={12}
        maxZoom={18}
        maxBounds={RAIPUR_BOUNDS}
        maxBoundsViscosity={1.0}
        style={{ height: '100%', width: '100%', zIndex: 1 }}
      >
        {showLayersControl ? (
          <LayersControl position="topright">
            <LayersControl.BaseLayer name="🛰 Esri Satellite Imagery">
              <TileLayer
                attribution="Tiles &copy; Esri"
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                maxZoom={19}
              />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer checked name="🗺 OpenStreetMap (Detailed)">
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                maxZoom={19}
              />
            </LayersControl.BaseLayer>
          </LayersControl>
        ) : (
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            maxZoom={19}
          />
        )}

        <Polygon positions={RAIPUR_BOUNDARY} pathOptions={{ color: '#043f2e', fillColor: '#c8f169', fillOpacity: 0.15, weight: 2.5, dashArray: '6, 6' }} />

        {markers.map((m, i) => (
          <Marker key={i} position={[m.lat, m.lng]}>
            <Popup>
              <div className="p-1.5 space-y-1 font-sans min-w-[180px]">
                <div className="font-bold text-sm text-[#043f2e]">{m.name}</div>
                <div className="text-xs text-[#242423]">{m.ward}</div>
                {m.category && <div className="text-[10px] font-semibold text-teal-700">{m.category}</div>}
                {m.bhulekhStatus && <div className="text-[10px] font-mono bg-emerald-50 text-emerald-800 p-1 rounded border border-emerald-200">{m.bhulekhStatus}</div>}
                {m.status && <div className={`text-xs font-semibold px-2 py-0.5 rounded inline-block ${m.status === 'Critical' ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'}`}>{m.status}</div>}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
