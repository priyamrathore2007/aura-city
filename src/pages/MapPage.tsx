import { Layers, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import SafeMap from '../components/SafeMap';

const assets = [
  { id: 'AST-201', name: 'VIP Road Asphalt Corridor', category: 'Road', ward: 'Ward 24 (Shankar Nagar)', lat: 21.2620, lng: 81.6520, condition: 'Critical', bhulekhStatus: 'Legal (PWD ROW #CG-RP-88)' },
  { id: 'AST-202', name: 'Pandri Cloth Market Complex', category: 'Commercial Bldg', ward: 'Ward 10 (Pandri)', lat: 21.2700, lng: 81.6350, condition: 'Healthy', bhulekhStatus: 'Legal (Bhulekh ID: CG-RAI-2026-912)' },
  { id: 'AST-203', name: 'Telibandha Talab Drain Gully', category: 'Drain/Gully', ward: 'Ward 18 (Telibandha)', lat: 21.2380, lng: 81.6450, condition: 'Watch', bhulekhStatus: 'Public Utility Land' },
  { id: 'AST-204', name: 'Civil Lines Residential Zone', category: 'Private Bldg', ward: 'Ward 05 (Civil Lines)', lat: 21.2450, lng: 81.6200, condition: 'Healthy', bhulekhStatus: 'Legal (Bhulekh Khasra #412/2)' },
  { id: 'AST-205', name: 'Tatibandh Agricultural Fringe', category: 'Farming Land', ward: 'Ward 30 (Tatibandh)', lat: 21.2550, lng: 81.5700, condition: 'Healthy', bhulekhStatus: 'Agricultural Protected (Bhulekh #88)' },
  { id: 'AST-206', name: 'Mahabal Talab Buffer Zone', category: 'Waterbody', ward: 'Ward 12 (Moudhapara)', lat: 21.2520, lng: 81.6300, condition: 'Watch', bhulekhStatus: 'Illegal Encroachment Notice Issued' },
  { id: 'AST-207', name: 'Raipur Railway Station Road', category: 'Road', ward: 'Ward 03 (Station Road)', lat: 21.2780, lng: 81.6100, condition: 'Watch', bhulekhStatus: 'Legal (PWD ROW #CG-RP-12)' },
  { id: 'AST-208', name: 'Nava Raipur Sector 24 Commercial', category: 'Commercial Bldg', ward: 'Ward 70 (Nava Raipur)', lat: 21.2310, lng: 81.6400, condition: 'Healthy', bhulekhStatus: 'Legal (NRDA Allotment #2024-NR-891)' },
  { id: 'AST-209', name: 'Mowa Bridge Stormwater Channel', category: 'Drain/Gully', ward: 'Ward 22 (Mowa)', lat: 21.2180, lng: 81.6550, condition: 'Critical', bhulekhStatus: 'Public Utility Land' },
  { id: 'AST-210', name: 'Avanti Vihar Residential Block', category: 'Private Bldg', ward: 'Ward 28 (Avanti Vihar)', lat: 21.2650, lng: 81.6680, condition: 'Healthy', bhulekhStatus: 'Legal (Bhulekh Khasra #892/4)' },
  { id: 'AST-211', name: 'Khamhardih Farming Zone', category: 'Farming Land', ward: 'Ward 35 (Khamhardih)', lat: 21.2200, lng: 81.5900, condition: 'Healthy', bhulekhStatus: 'Agricultural Protected (Bhulekh #201)' },
  { id: 'AST-212', name: 'Budhapara Talab Waterbody', category: 'Waterbody', ward: 'Ward 08 (Budhapara)', lat: 21.2580, lng: 81.6180, condition: 'Healthy', bhulekhStatus: 'Legal (Protected Water Reserve)' },
];

const filterButtons = [
  { label: 'All Layers', val: 'All' },
  { label: '🛣️ Roads', val: 'Road' },
  { label: '🌿 Drains / Gullies', val: 'Drain/Gully' },
  { label: '🏢 Commercial Bldg', val: 'Commercial Bldg' },
  { label: '🏠 Private Bldg', val: 'Private Bldg' },
  { label: '🌾 Farming Land', val: 'Farming Land' },
  { label: '💧 Waterbody', val: 'Waterbody' },
];

const categoryColor: Record<string, string> = {
  'Road':           'bg-rose-100 text-rose-700 border-rose-200',
  'Drain/Gully':    'bg-emerald-100 text-emerald-700 border-emerald-200',
  'Commercial Bldg':'bg-blue-100 text-blue-700 border-blue-200',
  'Private Bldg':   'bg-purple-100 text-purple-700 border-purple-200',
  'Farming Land':   'bg-amber-100 text-amber-700 border-amber-200',
  'Waterbody':      'bg-cyan-100 text-cyan-700 border-cyan-200',
};

export default function MapPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedWard, setSelectedWard] = useState('All');

  const filtered = assets.filter(a => {
    if (selectedCategory !== 'All' && a.category !== selectedCategory) return false;
    if (selectedWard !== 'All' && !a.ward.includes(selectedWard)) return false;
    return true;
  });

  return (
    <div className="p-6 space-y-5 bg-[#eef2e3] min-h-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-normal text-[#043f2e]">Satellite & GIS Map — Raipur</h1>
          <p className="text-xs font-mono text-[#242423] mt-0.5">Map is locked to Raipur city boundaries. Verified against Bhulekh CG land records.</p>
        </div>
        <select
          value={selectedWard}
          onChange={e => setSelectedWard(e.target.value)}
          className="bg-[#fcfcfc] border border-[#000000]/10 rounded-[4px] px-3 py-2 text-xs text-[#000000] focus:outline-none focus:border-[#043f2e]"
        >
          <option value="All">All Raipur Wards</option>
          <option value="Shankar Nagar">Ward 24 (Shankar Nagar)</option>
          <option value="Pandri">Ward 10 (Pandri)</option>
          <option value="Telibandha">Ward 18 (Telibandha)</option>
          <option value="Civil Lines">Ward 05 (Civil Lines)</option>
          <option value="Tatibandh">Ward 30 (Tatibandh)</option>
          <option value="Nava Raipur">Ward 70 (Nava Raipur)</option>
          <option value="Mowa">Ward 22 (Mowa)</option>
          <option value="Avanti Vihar">Ward 28 (Avanti Vihar)</option>
        </select>
      </div>

      <div className="bg-[#fcfcfc] border border-[#000000]/10 rounded-[4px] p-3 flex flex-wrap gap-2 items-center">
        <div className="flex items-center space-x-1.5 mr-2 text-xs font-mono text-[#242423]">
          <Layers className="h-3.5 w-3.5 text-[#043f2e]" />
          <span>Filter Layer:</span>
        </div>
        {filterButtons.map(btn => (
          <button
            key={btn.val}
            onClick={() => setSelectedCategory(btn.val)}
            className={`text-xs font-medium px-3 py-1.5 rounded-[4px] transition border ${
              selectedCategory === btn.val
                ? 'bg-[#043f2e] text-[#c8f169] border-[#043f2e]'
                : 'bg-[#eef2e3] text-[#242423] border-[#000000]/10 hover:bg-[#043f2e]/10'
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      <div className="bg-[#fcfcfc] border border-[#000000]/10 rounded-[16px] overflow-hidden shadow-sm">
        <SafeMap markers={filtered} height="520px" showLayersControl={true} />
      </div>

      <div className="bg-[#fcfcfc] border border-[#000000]/10 rounded-[16px] overflow-hidden shadow-sm">
        <div className="px-5 py-4 border-b border-[#000000]/10 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="h-4 w-4 text-[#043f2e]" />
            <h2 className="text-sm font-bold text-[#043f2e]">Bhulekh CG Raipur — Legal Verification Registry</h2>
          </div>
          <span className="text-xs text-[#242423] font-mono">{filtered.length} records shown</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-[#eef2e3] text-[11px] font-mono text-[#242423] uppercase tracking-wider border-b border-[#000000]/10">
                <th className="px-5 py-3">Asset / Property</th>
                <th className="px-5 py-3">Category</th>
                <th className="px-5 py-3">Ward</th>
                <th className="px-5 py-3">Condition</th>
                <th className="px-5 py-3">Bhulekh CG Legal Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#000000]/5">
              {filtered.map(a => (
                <tr key={a.id} className="hover:bg-[#eef2e3]/50 transition">
                  <td className="px-5 py-3">
                    <div className="font-medium text-[#043f2e] text-xs">{a.name}</div>
                    <div className="text-[10px] text-[#242423] font-mono">{a.id}</div>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${categoryColor[a.category] ?? ''}`}>
                      {a.category}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-xs text-[#242423]">{a.ward}</td>
                  <td className="px-5 py-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      a.condition === 'Critical' ? 'bg-rose-100 text-rose-700' :
                      a.condition === 'Watch' ? 'bg-amber-100 text-amber-700' :
                      'bg-emerald-100 text-emerald-700'
                    }`}>{a.condition}</span>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex items-center space-x-1 text-[11px] font-medium px-2.5 py-1 rounded border ${
                      a.bhulekhStatus.includes('Illegal') || a.bhulekhStatus.includes('Encroachment')
                        ? 'bg-rose-50 text-rose-700 border-rose-200'
                        : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    }`}>
                      {a.bhulekhStatus.includes('Illegal') || a.bhulekhStatus.includes('Encroachment')
                        ? <AlertTriangle className="h-3 w-3" />
                        : <CheckCircle2 className="h-3 w-3" />}
                      <span>{a.bhulekhStatus}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
