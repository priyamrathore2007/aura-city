import { useState } from 'react';
import { Play, Download, ShieldCheck, X, Camera } from 'lucide-react';

const feeds = [
  { id: 'DC-01', busNumber: 'CG-04-E-4012 (Route 14)', route: 'Shankar Nagar ⇄ Railway Station', driver: 'Rajesh Kumar', status: 'Recording Live', lastEvent: 'Surface smoothly scanned. AI Pothole Index: 1.2/10', thumbnail: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=500&q=80', coordinates: '21.2610° N, 81.6510° E', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
  { id: 'DC-02', busNumber: 'CG-04-E-8821 (Route 08)', route: 'Pandri Bus Stand ⇄ Telibandha', driver: 'Sanjay Verma', status: 'AI Anomaly Flagged', lastEvent: 'Pothole cluster detected at VIP Road Junction. Auto-tagged to PWD.', thumbnail: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=500&q=80', coordinates: '21.2580° N, 81.6430° E', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4' },
  { id: 'DC-03', busNumber: 'CG-04-F-1092 (Route 22)', route: 'Civil Lines ⇄ Tatibandh Chowk', driver: 'Manoj Sahu', status: 'Incident Saved', lastEvent: 'Near-miss event recorded at ring road intersection. Video evidence archived.', thumbnail: 'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&w=500&q=80', coordinates: '21.2480° N, 81.5820° E', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4' },
];

export default function DashcamPage() {
  const [activeVideo, setActiveVideo] = useState<typeof feeds[0] | null>(null);

  return (
    <div className="p-8 space-y-6 bg-[#eef2e3] min-h-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif font-normal text-[#043f2e]">Dashcam Road Intelligence (Simulated Demo)</h1>
          <p className="text-xs font-mono text-[#242423] mt-1">Note: Live public fleet integration uses simulated AI telemetry & video stream replays for demonstration.</p>
        </div>
        <div className="bg-[#fcfcfc] border border-[#000000]/10 text-[#043f2e] text-xs px-3.5 py-1.5 rounded-[4px] font-mono flex items-center space-x-1.5">
          <ShieldCheck className="h-4 w-4 text-[#2a6f2b]" />
          <span>Tamper-Proof Video Archive</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {feeds.map((f) => (
          <div key={f.id} className="bg-[#fcfcfc] border border-[#000000]/10 rounded-[16px] overflow-hidden shadow-sm flex flex-col justify-between">
            <div className="h-48 relative overflow-hidden bg-slate-900 group cursor-pointer" onClick={() => setActiveVideo(f)}>
              <img src={f.thumbnail} alt={f.busNumber} className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition duration-500" />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                <div className="h-12 w-12 rounded-full bg-[#c8f169] text-[#000000] flex items-center justify-center shadow-lg">
                  <Play className="h-6 w-6 ml-0.5 fill-current" />
                </div>
              </div>
              <div className="absolute top-3 left-3 bg-black/70 backdrop-blur px-2.5 py-1 rounded-[4px] text-[10px] font-mono text-white flex items-center space-x-1.5">
                <span className="h-2 w-2 rounded-full bg-red-500 animate-ping"></span>
                <span>SIMULATED STREAM</span>
              </div>
              <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur px-2 py-0.5 rounded-[4px] text-[10px] font-mono text-white">
                {f.coordinates}
              </div>
            </div>
            <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-mono text-[#043f2e]">{f.busNumber}</span>
                  <span className="text-[10px] px-2.5 py-0.5 rounded-[9999px] font-mono font-medium bg-[#c8f169]/30 text-[#043f2e] border border-[#c8f169]">{f.status}</span>
                </div>
                <h3 className="font-serif text-base text-[#043f2e] mt-2">{f.route}</h3>
                <p className="text-xs text-[#242423] mt-0.5">Driver: {f.driver}</p>
                <div className="mt-3 text-xs bg-[#eef2e3] p-3 rounded-[8px] border border-[#000000]/10 text-[#242423]">
                  <span className="font-semibold text-[#043f2e]">AI Telemetry Event:</span> {f.lastEvent}
                </div>
              </div>
              <div className="pt-3 border-t border-[#000000]/10 flex items-center justify-between">
                <button
                  onClick={() => setActiveVideo(f)}
                  className="text-xs bg-[#043f2e] hover:bg-[#2a6f2b] text-[#fcfcfc] px-4 py-2 rounded-[4px] flex items-center space-x-1.5 font-medium transition"
                >
                  <Play className="h-3.5 w-3.5 fill-current" />
                  <span>Play Demo Replay</span>
                </button>
                <button className="text-xs text-[#242423] hover:text-[#000000] flex items-center space-x-1">
                  <Download className="h-3.5 w-3.5" />
                  <span>Export Log</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Video Demo Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#fcfcfc] border border-[#000000]/20 rounded-[16px] max-w-3xl w-full overflow-hidden shadow-2xl animate-fade-in-up">
            <div className="px-6 py-4 bg-[#043f2e] text-white flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Camera className="h-5 w-5 text-[#c8f169]" />
                <span className="font-serif text-base">Dashcam Feed Replay — {activeVideo.busNumber}</span>
              </div>
              <button
                onClick={() => setActiveVideo(null)}
                className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="relative aspect-video bg-black rounded-[8px] overflow-hidden shadow-inner">
                <video
                  src={activeVideo.videoUrl}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
                <div className="absolute top-3 left-3 bg-black/70 px-3 py-1 rounded text-xs font-mono text-[#c8f169] border border-[#c8f169]/30">
                  GPS: {activeVideo.coordinates} · AI Pothole Monitor Active
                </div>
              </div>
              <div className="bg-[#eef2e3] p-4 rounded-[8px] border border-[#000000]/10 text-xs text-[#242423] space-y-1">
                <div className="font-bold text-[#043f2e]">Simulated Demonstration Note:</div>
                <p>This video player demonstrates how public transport bus dashcams record and flag road degradation or incidents in real-time for Raipur Municipal Corporation.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
