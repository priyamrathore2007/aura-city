import { Activity, ShieldAlert, TrendingUp, Camera, MapPin, Building2, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SafeMap from '../components/SafeMap';

const markers = [
  { lat: 21.2514, lng: 81.6296, name: 'Raipur City Center (Ghadi Chowk)', ward: 'Central', status: 'Healthy' },
  { lat: 21.2620, lng: 81.6520, name: 'VIP Road Pothole Cluster', ward: 'Ward 24 (Shankar Nagar)', status: 'Critical' },
  { lat: 21.2700, lng: 81.6350, name: 'Pandri Market Complex', ward: 'Ward 10 (Pandri)', status: 'Healthy' },
  { lat: 21.2380, lng: 81.6450, name: 'Telibandha Talab Drain Trunk', ward: 'Ward 18 (Telibandha)', status: 'Watch' },
  { lat: 21.2450, lng: 81.6200, name: 'Civil Lines Residential Zone', ward: 'Ward 05 (Civil Lines)', status: 'Healthy' },
];

export default function Overview() {
  const navigate = useNavigate();
  return (
    <div className="p-8 space-y-8 bg-[#eef2e3] min-h-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif font-normal text-[#043f2e]">Command Center — Raipur</h1>
          <p className="text-xs font-mono text-[#242423] mt-1">SUNLIT GREENHOUSE EDITORIAL BI · 16 OCT 2026</p>
        </div>
        <div className="text-xs bg-[#c8f169] text-[#000000] px-3.5 py-1.5 rounded-[4px] font-mono font-medium flex items-center space-x-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#043f2e] animate-ping inline-block"></span>
          <span>Digital Twin Operational</span>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Dashcam Fleet Live', value: '45 Buses', sub: 'Click to view streams', icon: Camera, forest: true, path: '/dashboard/dashcam' },
          { label: 'Road Anomalies', value: '14 Flagged', sub: 'Click for AI approvals', icon: ShieldAlert, forest: false, path: '/dashboard/approvals' },
          { label: 'Buildings Mapped', value: '42,800+', sub: 'Click for land registry', icon: Building2, forest: false, path: '/dashboard/landuse' },
          { label: 'Resilience Score', value: '82.4 / 100', sub: 'Click for budget score', icon: TrendingUp, forest: true, path: '/dashboard/budget' },
        ].map((k, i) => {
          const Icon = k.icon;
          return (
            <div
              key={i}
              onClick={() => navigate(k.path)}
              className={`rounded-[16px] p-6 flex flex-col space-y-4 cursor-pointer transition hover:-translate-y-1 shadow-sm ${k.forest ? 'bg-[#043f2e] text-[#fcfcfc]' : 'bg-[#fcfcfc] text-[#000000] border border-[#000000]/10'}`}
            >
              <div className="flex items-center justify-between">
                <Icon className={`h-5 w-5 ${k.forest ? 'text-[#c8f169]' : 'text-[#043f2e]'}`} />
                <ArrowUpRight className="h-4 w-4 opacity-60" />
              </div>
              <div>
                <div className={`text-3xl font-serif ${k.forest ? 'text-[#c8f169]' : 'text-[#043f2e]'}`}>{k.value}</div>
                <div className="text-xs font-medium mt-1">{k.label}</div>
                <div className={`text-[10px] mt-0.5 underline ${k.forest ? 'text-[#eef2e3]/80' : 'text-teal-700'}`}>{k.sub}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#fcfcfc] border border-[#000000]/10 rounded-[16px] overflow-hidden">
          <div className="px-6 py-4 border-b border-[#000000]/10 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-[#043f2e]" />
              <h2 className="text-sm font-bold text-[#043f2e]">Raipur City Grid — Live Asset Map</h2>
            </div>
            <button
              onClick={() => navigate('/dashboard/map')}
              className="text-xs text-[#043f2e] hover:text-[#2a6f2b] font-medium flex items-center space-x-1 underline"
            >
              <span>Full satellite view</span>
              <ArrowUpRight className="h-3 w-3" />
            </button>
          </div>
          <SafeMap markers={markers} height="380px" showLayersControl={false} />
        </div>

        <div className="bg-[#fcfcfc] border border-[#000000]/10 rounded-[16px] flex flex-col overflow-hidden">
          <div className="px-6 py-4 border-b border-[#000000]/10 flex items-center space-x-2">
            <Activity className="h-4 w-4 text-[#043f2e]" />
            <h2 className="text-sm font-bold text-[#043f2e]">Live Activity Feed</h2>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-[#000000]/5">
            {[
              { id: 'CAM-014', event: 'Pothole detected — VIP Road near Jail Chowk', time: 'Just now', type: 'warn' },
              { id: 'APP-901', event: 'VIP Road resurfacing approved by Comm. Sharma', time: '12 min ago', type: 'ok' },
              { id: 'CMP-502', event: 'Gully encroachment reported — Pandri Ward 10', time: '34 min ago', type: 'warn' },
              { id: 'SEN-018', event: 'Telibandha water level normal — no flood risk', time: '1 hr ago', type: 'ok' },
            ].map((r, i) => (
              <div key={i} className="px-6 py-4 hover:bg-[#eef2e3]/50 transition">
                <div className="flex items-center space-x-2 mb-1">
                  <span className={`h-1.5 w-1.5 rounded-full shrink-0 ${r.type === 'ok' ? 'bg-[#78c51c]' : 'bg-amber-600'}`}></span>
                  <span className="text-[10px] font-mono text-[#242423]">{r.id}</span>
                </div>
                <p className="text-xs text-[#000000] leading-snug">{r.event}</p>
                <p className="text-[10px] text-[#242423] mt-1">{r.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
