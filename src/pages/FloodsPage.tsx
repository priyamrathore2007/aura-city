export default function FloodsPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Drainage & Floods Prediction</h1>
        <p className="text-sm text-slate-400 mt-0.5">Ward-level monsoon risk heatmaps, stormwater gully inspection logs, and Telibandha basin telemetry.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-sm">
          <h2 className="text-sm font-bold text-slate-800 font-mono uppercase tracking-wider">Monsoon Risk Heatmap</h2>
          <div className="space-y-3">
            {[
              { ward: 'Ward 18 (Telibandha)', risk: 'Critical', rainfall: '50mm/h', color: 'rose' },
              { ward: 'Ward 24 (Shankar Nagar)', risk: 'Moderate', rainfall: '30mm/h', color: 'amber' },
              { ward: 'Ward 05 (Civil Lines)', risk: 'Low', rainfall: '12mm/h', color: 'emerald' },
              { ward: 'Ward 10 (Pandri)', risk: 'Moderate', rainfall: '25mm/h', color: 'amber' },
            ].map((f, i) => (
              <div key={i} className="bg-slate-50 border border-slate-100 p-3.5 rounded-xl flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-slate-800">{f.ward}</div>
                  <div className="text-[10px] text-slate-400 font-mono mt-0.5">Rain rate: {f.rainfall}</div>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full font-mono font-bold ${f.color === 'rose' ? 'bg-rose-100 text-rose-700' : f.color === 'amber' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                  {f.risk} Risk
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-800 font-mono uppercase tracking-wider mb-2">Drainage & Gully Network Diagnostics</h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Dashcam computer vision combined with elevation mapping highlights 12.5 km of choked gullies around Telibandha Talab fringe and Pandri market area requiring immediate desilting.
            </p>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">Total Drains & Gullies Mapped</span>
              <span className="font-mono text-slate-800 font-bold">185 km</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">Choked Gully Segments (Dashcam Verified)</span>
              <span className="font-mono text-rose-600 font-bold">12.5 km</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
