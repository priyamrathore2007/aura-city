const assets = [
  { id: 'AST-201', name: 'VIP Road Asphalt Corridor', category: 'Road', ward: 'Ward 24 (Shankar Nagar)', condition: 'Critical', dept: 'PWD', cost: '₹3,20,000' },
  { id: 'AST-202', name: 'Pandri Cloth Market Complex', category: 'Commercial Bldg', ward: 'Ward 10 (Pandri)', condition: 'Healthy', dept: 'Urban Zoning', cost: '₹12,50,000' },
  { id: 'AST-203', name: 'Telibandha Talab Gully', category: 'Drain/Gully', ward: 'Ward 18 (Telibandha)', condition: 'Watch', dept: 'Sanitation', cost: '₹1,80,000' },
  { id: 'AST-204', name: 'Civil Lines Residential Zone', category: 'Private Bldg', ward: 'Ward 05 (Civil Lines)', condition: 'Healthy', dept: 'Property Tax', cost: '₹8,40,000' },
  { id: 'AST-205', name: 'Tatibandh Farming Fringe', category: 'Farming Land', ward: 'Ward 30 (Tatibandh)', condition: 'Healthy', dept: 'Land Records', cost: '₹5,00,000' },
  { id: 'AST-206', name: 'Mahabal Talab Buffer Zone', category: 'Waterbody', ward: 'Ward 12 (Moudhapara)', condition: 'Watch', dept: 'Environment', cost: '₹2,10,000' },
];

export default function LandusePage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Buildings, Commercial & Land-Use Registry</h1>
        <p className="text-sm text-slate-400 mt-0.5">Comprehensive inventory of commercial buildings, private homes, roads, gullies, and farming parcels across Raipur.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-slate-50 text-[11px] font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100">
                <th className="px-5 py-3">Asset Name</th>
                <th className="px-5 py-3">Category</th>
                <th className="px-5 py-3">Ward</th>
                <th className="px-5 py-3">Condition</th>
                <th className="px-5 py-3">Department</th>
                <th className="px-5 py-3">Valuation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {assets.map(a => (
                <tr key={a.id} className="hover:bg-slate-50 transition">
                  <td className="px-5 py-3 font-medium text-slate-800 text-xs">{a.name}</td>
                  <td className="px-5 py-3 text-xs text-slate-500">{a.category}</td>
                  <td className="px-5 py-3 text-xs text-slate-500">{a.ward}</td>
                  <td className="px-5 py-3">
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${a.condition === 'Critical' ? 'bg-rose-100 text-rose-700' : a.condition === 'Watch' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>{a.condition}</span>
                  </td>
                  <td className="px-5 py-3 text-xs text-slate-500">{a.dept}</td>
                  <td className="px-5 py-3 text-xs font-mono font-semibold text-teal-700">{a.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
