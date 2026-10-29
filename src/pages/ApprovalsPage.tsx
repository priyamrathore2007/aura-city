import { useState } from 'react';
import { Cpu, Check, X, CheckCircle2 } from 'lucide-react';

export default function ApprovalsPage() {
  const [list, setList] = useState([
    {
      id: 'APP-901',
      title: 'VIP Road Asphalt Resurfacing & Dashcam AI Anomaly Fix',
      ward: 'Ward 24 (Shankar Nagar)',
      category: 'Road Infrastructure',
      estimatedCost: '₹3,20,000',
      aiRecommendation: 'Approve based on Dashcam Fleet telemetry verifying 14 vehicle jolts per hour. Recommended vendor: Raipur Express Infra.',
      confidence: 97.8,
      vendors: [
        { name: 'Raipur Express Infra', quote: '₹3,20,000', rating: 4.9, selected: true },
        { name: 'Chhattisgarh Roadways Corp', quote: '₹3,55,000', rating: 4.6 }
      ],
      status: 'Pending',
      riskScore: 'High (Heavy Traffic)'
    },
    {
      id: 'APP-902',
      title: 'Telibandha Stormwater Gully Desilting',
      ward: 'Ward 18 (Telibandha)',
      category: 'Drainage & Flooding',
      estimatedCost: '₹1,80,000',
      aiRecommendation: 'Approve clean-up. Prevents waterlogging during sudden pre-monsoon cloudbursts.',
      confidence: 94.5,
      vendors: [
        { name: 'CleanCity Sanitation Raipur', quote: '₹1,80,000', rating: 4.8, selected: true }
      ],
      status: 'Pending',
      riskScore: 'Medium'
    }
  ]);

  const handleApprove = (id: string) => {
    setList(prev => prev.map(item => item.id === id ? { ...item, status: 'Approved' } : item));
  };
  const handleReject = (id: string) => {
    setList(prev => prev.map(item => item.id === id ? { ...item, status: 'Rejected' } : item));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">AI Approval Engine</h1>
          <p className="text-sm text-slate-400 mt-0.5">AI analyzes dashcam road telemetry and municipal repair requests, compares vendor bids, and checks policy compliance.</p>
        </div>
        <div className="bg-amber-50 border border-amber-200 text-amber-700 text-xs px-3 py-1.5 rounded-lg font-mono">
          {list.filter(a => a.status === 'Pending').length} Pending Authorisation
        </div>
      </div>

      <div className="space-y-4">
        {list.map((item) => (
          <div key={item.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
              <div>
                <div className="flex items-center space-x-3">
                  <span className="font-mono text-xs text-teal-600 font-bold">{item.id}</span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">{item.category}</span>
                  <span className="text-xs text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full font-mono font-medium">{item.riskScore}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mt-2">{item.title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">Location: <span className="text-slate-700 font-medium">{item.ward}</span> · Estimated Outlay: <span className="text-teal-600 font-mono font-bold">{item.estimatedCost}</span></p>
              </div>

              <div className="flex items-center space-x-3">
                {item.status === 'Pending' ? (
                  <>
                    <button
                      onClick={() => handleReject(item.id)}
                      className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-xs font-semibold transition flex items-center space-x-1"
                    >
                      <X className="h-3.5 w-3.5" />
                      <span>Reject</span>
                    </button>
                    <button
                      onClick={() => handleApprove(item.id)}
                      className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition flex items-center space-x-1 shadow-sm shadow-teal-200"
                    >
                      <Check className="h-3.5 w-3.5" />
                      <span>Approve & Authorise</span>
                    </button>
                  </>
                ) : (
                  <span className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center space-x-1.5 ${item.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-500/10 text-rose-600 border border-rose-500/30'}`}>
                    <CheckCircle2 className="h-4 w-4" />
                    <span>{item.status}</span>
                  </span>
                )}
              </div>
            </div>

            {/* AI Box */}
            <div className="bg-slate-50 border border-teal-200 rounded-xl p-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-teal-100 text-teal-800 text-[10px] font-mono px-3 py-1 rounded-bl-xl font-medium">
                AI Confidence: {item.confidence}%
              </div>
              <div className="flex items-start space-x-3">
                <div className="h-7 w-7 rounded-lg bg-teal-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Cpu className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-teal-800 uppercase font-mono tracking-wider">AI Recommendation (Dashcam Telemetry Backed)</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{item.aiRecommendation}</p>
                </div>
              </div>
            </div>

            {/* Vendors */}
            <div>
              <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">Comparative Vendor Bids</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {item.vendors.map((v, idx) => (
                  <div key={idx} className={`p-4 rounded-xl border ${v.selected ? 'bg-teal-50/60 border-teal-200' : 'bg-white border-slate-200'}`}>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800">{v.name}</span>
                      {v.selected && <span className="text-[10px] bg-teal-600 text-white font-bold px-2 py-0.5 rounded-full font-mono">AI PICK</span>}
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm font-mono font-bold text-teal-700">{v.quote}</span>
                      <span className="text-xs text-amber-600 font-mono font-semibold">★ {v.rating} / 5.0</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
