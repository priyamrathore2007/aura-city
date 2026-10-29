import { Database, Server, Cpu, CloudRain, ShieldCheck, Camera, Globe } from 'lucide-react';

const apis = [
  {
    name: 'Bhulekh CG Land Records API',
    type: 'REST / PostGIS Endpoint',
    endpoint: '/api/v1/raipur/parcels/verify',
    source: 'Chhattisgarh Bhulekh MySQL / PostGIS DB',
    desc: 'Verifies legal Khasra ID, ownership deed, and flags illegal commercial/residential encroachments.',
    icon: ShieldCheck,
    color: 'teal'
  },
  {
    name: 'OpenStreetMap & Esri GIS Tile API',
    type: 'Vector / Raster Tile Server',
    endpoint: 'https://server.arcgisonline.com/...',
    source: 'OpenStreetMap & Esri World Imagery',
    desc: 'Renders high-resolution satellite aerial views and street-level spatial infrastructure layers.',
    icon: Globe,
    color: 'blue'
  },
  {
    name: 'Bus Dashcam Telemetry & AI Stream',
    type: 'MQTT / WebSocket Stream',
    endpoint: 'wss://stream.auracity.gov.in/v1/bus-telemetry',
    source: 'Municipal Bus Fleet Edge Devices (NVIDIA Jetson / Pi)',
    desc: 'Streams real-time GPS coordinates, vehicle vibration counts, and automated pothole snapshots.',
    icon: Camera,
    color: 'amber'
  },
  {
    name: 'Weather & Flood Prediction API',
    type: 'OpenWeatherMap REST API',
    endpoint: '/api/v1/raipur/weather/precipitation',
    source: 'IMD & OpenWeatherMap Meteorological Archives',
    desc: 'Fetches live rainfall intensity (mm/h) in Telibandha and Shankar Nagar basins to trigger flood alerts.',
    icon: CloudRain,
    color: 'cyan'
  },
  {
    name: 'Citizen Grievance & Photo Intake',
    type: 'Multipart REST / Webhook',
    endpoint: '/api/v1/raipur/grievances/submit',
    source: 'WhatsApp Business API & Citizen Portal DB',
    desc: 'Accepts geo-tagged photo/video uploads with automatic timestamp, day, and GPS extraction.',
    icon: Database,
    color: 'purple'
  },
  {
    name: 'AI Vendor & Budget Scoring Agent',
    type: 'Internal LLM / ML Inference Core',
    endpoint: '/api/v1/raipur/ai/evaluate-bid',
    source: 'Municipal Contractor Registry & Historical SLA DB',
    desc: 'Evaluates comparative vendor bids and calculates confidence scores for one-click repair authorisations.',
    icon: Cpu,
    color: 'emerald'
  },
];

export default function ApiRegistryPage() {
  return (
    <div className="p-8 space-y-8 bg-[#eef2e3] min-h-full">
      <div>
        <h1 className="text-2xl font-serif font-normal text-[#043f2e]">API & Dataset Registry</h1>
        <p className="text-xs font-mono text-[#242423] mt-1">Technical reference documentation of all data sources, endpoints, and ML inference models powering AuraCity Raipur.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {apis.map((api, idx) => {
          const Icon = api.icon;
          return (
            <div key={idx} className="bg-[#fcfcfc] border border-[#000000]/10 rounded-[16px] p-6 shadow-sm space-y-4 hover:-translate-y-1 transition">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-[4px] bg-[#043f2e] text-[#c8f169] flex items-center justify-center">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-base text-[#043f2e]">{api.name}</h3>
                    <span className="text-[10px] font-mono bg-[#c8f169] text-[#000000] px-2 py-0.5 rounded font-medium">{api.type}</span>
                  </div>
                </div>
                <Server className="h-4 w-4 text-[#242423] opacity-40" />
              </div>

              <p className="text-xs text-[#242423] leading-relaxed">{api.desc}</p>

              <div className="bg-[#eef2e3] p-3 rounded-[8px] border border-[#000000]/10 space-y-1 font-mono text-[11px]">
                <div className="text-[#242423]"><span className="font-bold text-[#043f2e]">Endpoint:</span> {api.endpoint}</div>
                <div className="text-[#242423]"><span className="font-bold text-[#043f2e]">Data Source:</span> {api.source}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
