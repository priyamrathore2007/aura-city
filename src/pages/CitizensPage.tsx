const complaints = [
  { id: 'CMP-501', title: 'Deep Pothole reported by Bus Dashcam #CG04E4012', category: 'Road', ward: 'Ward 24 (Shankar Nagar)', citizen: 'Dashcam Auto-Report', date: '2026-10-16 08:12', status: 'In Progress', priority: 'High', image: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=300&q=80' },
  { id: 'CMP-502', title: 'Commercial building encroachment on public gully', category: 'Commercial Bldg', ward: 'Ward 10 (Pandri)', citizen: 'Rakesh Agrawal', date: '2026-10-16 07:30', status: 'Open', priority: 'Medium', image: 'https://images.unsplash.com/photo-1584467735817-6972fb68984c?auto=format&fit=crop&w=300&q=80' },
];

export default function CitizensPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Citizen & Dashcam Portal</h1>
          <p className="text-sm text-slate-400 mt-0.5">Geo-tagged reports from citizens and automated AI dashcam anomaly flagging.</p>
        </div>
        <button className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-4 py-2 rounded-xl text-xs transition shadow-sm shadow-teal-200">
          + File Grievance
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {complaints.map(c => (
          <div key={c.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between">
            <div className="h-40 relative overflow-hidden bg-slate-100">
              <img src={c.image} alt={c.title} className="w-full h-full object-cover" />
              <div className="absolute top-2 left-2 bg-black/70 backdrop-blur px-2.5 py-1 rounded text-[10px] font-mono text-teal-400">
                {c.id}
              </div>
            </div>
            <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">{c.category}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold ${c.priority === 'High' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'}`}>{c.priority} Priority</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 mt-2">{c.title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">Ward: {c.ward} · By {c.citizen}</p>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
                <span className="text-slate-400">{c.date}</span>
                <span className={`font-semibold font-mono ${c.status === 'Resolved' ? 'text-emerald-600' : 'text-amber-600'}`}>{c.status}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
