export default function BudgetPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Budget & Prioritisation Engine</h1>
        <p className="text-sm text-slate-400 mt-0.5">Prioritises capital expenditure based on dashcam vehicle vibration counts and road wear metrics in Raipur.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
        <h2 className="text-sm font-bold text-slate-800 font-mono uppercase tracking-wider">Ward Priority Scorecard (Raipur)</h2>
        <div className="space-y-3">
          {[
            { rank: 1, ward: 'Ward 24 (Shankar Nagar)', score: 96.2, focus: 'VIP Road Resurfacing (Dashcam Verified)', allocation: '₹55 Lakhs' },
            { rank: 2, ward: 'Ward 18 (Telibandha)', score: 91.4, focus: 'Drainage Desilting & Talab Buffer', allocation: '₹42 Lakhs' },
            { rank: 3, ward: 'Ward 10 (Pandri)', score: 85.0, focus: 'Commercial Zone Traffic & Gully', allocation: '₹35 Lakhs' },
            { rank: 4, ward: 'Ward 05 (Civil Lines)', score: 78.5, focus: 'Residential Infrastructure Upgrade', allocation: '₹28 Lakhs' },
          ].map((w) => (
            <div key={w.rank} className="bg-slate-50 border border-slate-100 p-4 rounded-xl flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="h-8 w-8 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center font-mono font-bold text-teal-700 text-sm">
                  #{w.rank}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800">{w.ward}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Primary Focus: <span className="text-slate-700 font-medium">{w.focus}</span></p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-mono font-bold text-teal-700">{w.allocation}</div>
                <div className="text-[10px] text-slate-400 font-mono mt-0.5">Score: {w.score} / 100</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
