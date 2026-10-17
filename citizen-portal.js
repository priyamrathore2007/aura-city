/**
 * Aura City — Citizen Grievance Portal & AI Issue Reporting Engine (Raipur & Atal Nagar)
 * Interactive photo thumbnails with AI computer-vision bounding boxes,
 * polished complaint-status tracker timeline, and live report simulator.
 */

class CitizenGrievancePortal {
  constructor() {
    this.activeTicketId = 'CR-RPR-104';
    this.tickets = {
      'CR-RPR-104': {
        id: 'CR-RPR-104',
        category: 'ROADWAY INFRASTRUCTURE',
        title: 'Severe Asphalt Cavity (GE Road near Jaistambh)',
        ward: 'Ward 28 (Pandri / Jaistambh)',
        reportedAt: 'Today, 14:10 IST',
        slaHours: '3.5 Hours',
        slaRemaining: '1h 20m left',
        aiDetection: {
          label: 'Asphalt Pothole / Road Cavity',
          confidence: '98.4%',
          severity: 'CRITICAL',
          specs: 'Depth: ~14cm • Surface Area: 0.92m²'
        },
        currentStep: 3, // In-progress
        assignedTo: 'Raipur Municipal Corp PWD Rapid Squad #02 (Eng. D. Sahu)',
        steps: [
          { name: 'Report Filed', time: '14:10', desc: 'Citizen geo-tagged photo uploaded via Aura City PWA.', done: true },
          { name: 'AI Vision Verified', time: '14:11', desc: 'Computer vision confirmed 98.4% asphalt cavity severity.', done: true },
          { name: 'Zonal Dispatch', time: '14:25', desc: 'Auto-routed to RMC Central Zone PWD Asphalt repair unit.', done: true },
          { name: 'Work In-Progress', time: '15:15', desc: 'Maintenance crew on-site; cold bituminous patching underway.', done: true, current: true },
          { name: 'Resolution Verified', time: 'Pending', desc: 'Post-repair photo audit & citizen confirmation closure.', done: false }
        ],
        svgType: 'pothole'
      },
      'CR-RPR-208': {
        id: 'CR-RPR-208',
        category: 'SOLID WASTE / SWACHHATA',
        title: 'Overflowing Secondary Waste Dump',
        ward: 'Ward 28 (Pandri Cloth Market)',
        reportedAt: 'Today, 11:20 IST',
        slaHours: '2.0 Hours',
        slaRemaining: 'Resolved (Ahead of SLA)',
        aiDetection: {
          label: 'Municipal Solid Waste Overflow',
          confidence: '94.7%',
          severity: 'HIGH',
          specs: 'Estimated Volume: 1.6m³ • Segregation: Mixed'
        },
        currentStep: 5, // Fully resolved
        assignedTo: 'RMC Swachhata Rapid Response Hopper #09',
        steps: [
          { name: 'Report Filed', time: '11:20', desc: 'Citizen report received via WhatsApp civic chatbot.', done: true },
          { name: 'AI Vision Verified', time: '11:21', desc: 'Dump volume identified exceeding container capacity.', done: true },
          { name: 'Zonal Dispatch', time: '11:32', desc: 'Compactor vehicle #09 rerouted via dynamic route engine.', done: true },
          { name: 'Work In-Progress', time: '12:05', desc: 'Bin evacuated, surrounding pavement sanitized.', done: true },
          { name: 'Resolution Verified', time: '12:45', desc: 'Clean photo verified; citizen rated 5/5 stars.', done: true }
        ],
        svgType: 'garbage'
      },
      'CR-RPR-315': {
        id: 'CR-RPR-315',
        category: 'SMART LIGHTING',
        title: 'Luminaire Failure / Dark Sector',
        ward: 'Ward 51 (VIP Road / Airport Way)',
        reportedAt: 'Yesterday, 19:40 IST',
        slaHours: '4.0 Hours',
        slaRemaining: 'Scheduled tonight',
        aiDetection: {
          label: 'LED Luminaire Circuit Inactive',
          confidence: '99.1%',
          severity: 'MEDIUM',
          specs: 'Pole ID: #SL-402 • Phase: R • Lux: 0'
        },
        currentStep: 2, // Assigned
        assignedTo: 'Raipur Smart City Lighting Division (Contractor Smart-Grid)',
        steps: [
          { name: 'Report Filed', time: '19:40', desc: 'Automated SCADA telemetry matched citizen notification.', done: true },
          { name: 'AI Vision Verified', time: '19:42', desc: 'Nighttime dark spot verified via Lux sensor feed.', done: true },
          { name: 'Zonal Dispatch', time: '20:10', desc: 'Work order #WO-RMC-481 generated for driver replacement.', done: true, current: true },
          { name: 'Work In-Progress', time: 'Pending', desc: 'Hydraulic lift truck dispatched on night shift.', done: false },
          { name: 'Resolution Verified', time: 'Pending', desc: 'Telemetry lux verification upon circuit closure.', done: false }
        ],
        svgType: 'streetlight'
      }
    };

    this.init();
  }

  init() {
    this.render();
  }

  selectTicket(id) {
    if (this.tickets[id]) {
      this.activeTicketId = id;
      this.render();
    }
  }

  getRealisticIssueThumbnail(type, aiDetection) {
    if (type === 'pothole') {
      return `
        <div class="relative w-full h-48 bg-slate-900 rounded-xl overflow-hidden border border-slate-700/60 flex items-center justify-center">
          <svg class="w-full h-full" viewBox="0 0 320 200" preserveAspectRatio="none">
            <defs>
              <pattern id="asphaltCG" width="10" height="10" patternUnits="userSpaceOnUse">
                <rect width="10" height="10" fill="#18202f"/>
                <circle cx="2" cy="2" r="0.8" fill="#2d3748" opacity="0.4"/>
                <circle cx="7" cy="6" r="0.6" fill="#334155" opacity="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#asphaltCG)"/>
            <path d="M 0,25 L 320,25" stroke="#eab308" stroke-width="4" stroke-dasharray="16 12" opacity="0.6"/>
            <path d="M 110,90 Q 130,70 170,80 Q 210,85 220,115 Q 215,145 180,150 Q 140,155 120,135 Q 105,115 110,90 Z" 
                  fill="#0b0f17" stroke="#334155" stroke-width="2"/>
            <path d="M 125,100 Q 150,88 185,95 Q 200,110 195,130 Q 165,142 140,135 Z" 
                  fill="#05070b"/>
            <path d="M 110,90 L 80,75 M 220,115 L 250,120 M 180,150 L 195,180 M 120,135 L 95,160" 
                  stroke="#475569" stroke-width="1.2" stroke-linecap="round"/>
          </svg>

          <div class="absolute inset-x-12 inset-y-10 border-2 border-dashed border-teal-400 bg-teal-500/10 rounded-lg pointer-events-none flex flex-col justify-between p-2">
            <div class="flex items-center justify-between">
              <span class="px-2 py-0.5 rounded bg-slate-950/90 border border-teal-400 text-teal-300 font-mono text-[10px]">
                AI: ROAD_CAVITY [${aiDetection.confidence}]
              </span>
              <span class="px-1.5 py-0.5 rounded bg-rose-500/80 text-white font-mono text-[9px] font-bold">
                ${aiDetection.severity}
              </span>
            </div>
            <div class="text-[9px] font-mono text-cyan-200 bg-slate-950/80 px-2 py-1 rounded w-fit border border-teal-500/30">
              ${aiDetection.specs}
            </div>
          </div>
        </div>
      `;
    } else if (type === 'garbage') {
      return `
        <div class="relative w-full h-48 bg-slate-900 rounded-xl overflow-hidden border border-slate-700/60 flex items-center justify-center">
          <svg class="w-full h-full" viewBox="0 0 320 200" preserveAspectRatio="none">
            <rect width="100%" height="100%" fill="#1a2333"/>
            <rect x="70" y="80" width="130" height="90" rx="6" fill="#065f46" stroke="#047857" stroke-width="2"/>
            <rect x="65" y="70" width="140" height="14" rx="3" fill="#047857"/>
            <text x="135" y="130" fill="#a7f3d0" font-size="11" font-weight="bold" font-family="'Plus Jakarta Sans', sans-serif" text-anchor="middle">
              RMC SWACHHATA
            </text>
            <path d="M 85,70 Q 110,40 145,55 Q 170,45 190,68 Z" fill="#64748b"/>
            <path d="M 120,50 L 155,42 L 165,65 Z" fill="#b45309"/>
            <circle cx="175" cy="58" r="10" fill="#94a3b8"/>
            <circle cx="100" cy="55" r="12" fill="#475569"/>
            <ellipse cx="220" cy="155" rx="35" ry="15" fill="#334155"/>
          </svg>

          <div class="absolute inset-x-10 inset-y-8 border-2 border-dashed border-amber-400 bg-amber-500/10 rounded-lg pointer-events-none flex flex-col justify-between p-2">
            <div class="flex items-center justify-between">
              <span class="px-2 py-0.5 rounded bg-slate-950/90 border border-amber-400 text-amber-300 font-mono text-[10px]">
                AI: SOLID_WASTE_OVERFLOW [${aiDetection.confidence}]
              </span>
              <span class="px-1.5 py-0.5 rounded bg-amber-500/80 text-white font-mono text-[9px] font-bold">
                ${aiDetection.severity}
              </span>
            </div>
            <div class="text-[9px] font-mono text-amber-200 bg-slate-950/80 px-2 py-1 rounded w-fit border border-amber-500/30">
              ${aiDetection.specs}
            </div>
          </div>
        </div>
      `;
    } else {
      return `
        <div class="relative w-full h-48 bg-slate-900 rounded-xl overflow-hidden border border-slate-700/60 flex items-center justify-center">
          <svg class="w-full h-full" viewBox="0 0 320 200" preserveAspectRatio="none">
            <rect width="100%" height="100%" fill="#0a0f1d"/>
            <rect x="0" y="140" width="320" height="60" fill="#0f172a"/>
            <path d="M 160,160 L 160,40 Q 160,25 180,25 L 200,25" fill="none" stroke="#64748b" stroke-width="4"/>
            <polygon points="195,25 215,25 220,35 190,35" fill="#334155" stroke="#94a3b8" stroke-width="1.5"/>
            <circle cx="205" cy="48" r="10" fill="#f43f5e" opacity="0.3"/>
            <path d="M 199,42 L 211,54 M 211,42 L 199,54" stroke="#f43f5e" stroke-width="2"/>
          </svg>

          <div class="absolute inset-x-14 inset-y-4 border-2 border-dashed border-cyan-400 bg-cyan-500/10 rounded-lg pointer-events-none flex flex-col justify-between p-2">
            <div class="flex items-center justify-between">
              <span class="px-2 py-0.5 rounded bg-slate-950/90 border border-cyan-400 text-cyan-300 font-mono text-[10px]">
                AI: LUMINAIRE_FAULT [${aiDetection.confidence}]
              </span>
              <span class="px-1.5 py-0.5 rounded bg-cyan-500/80 text-white font-mono text-[9px] font-bold">
                ${aiDetection.severity}
              </span>
            </div>
            <div class="text-[9px] font-mono text-cyan-200 bg-slate-950/80 px-2 py-1 rounded w-fit border border-cyan-500/30">
              ${aiDetection.specs}
            </div>
          </div>
        </div>
      `;
    }
  }

  render() {
    const container = document.getElementById('citizen-portal-mount');
    if (!container) return;

    const curr = this.tickets[this.activeTicketId];

    container.innerHTML = `
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <!-- Left: Issue Selector & Photo Preview with AI Vision HUD -->
        <div class="lg:col-span-5 flex flex-col gap-4">
          <div class="flex items-center gap-2 overflow-x-auto pb-1">
            <button onclick="window.citizenPortal.selectTicket('CR-RPR-104')" class="px-3 py-1.5 rounded-xl border text-xs font-mono transition-all ${this.activeTicketId === 'CR-RPR-104' ? 'bg-teal-500/20 border-teal-400 text-teal-300 shadow-lg shadow-teal-500/10' : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'}">
              #CR-104 GE Road
            </button>
            <button onclick="window.citizenPortal.selectTicket('CR-RPR-208')" class="px-3 py-1.5 rounded-xl border text-xs font-mono transition-all ${this.activeTicketId === 'CR-RPR-208' ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-lg shadow-amber-500/10' : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'}">
              #CR-208 Pandri
            </button>
            <button onclick="window.citizenPortal.selectTicket('CR-RPR-315')" class="px-3 py-1.5 rounded-xl border text-xs font-mono transition-all ${this.activeTicketId === 'CR-RPR-315' ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-lg shadow-cyan-500/10' : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'}">
              #CR-315 VIP Road
            </button>
          </div>

          <!-- Photo Thumbnail with AI Overlay -->
          <div class="glass-panel p-4 relative overflow-hidden">
            <div class="flex items-center justify-between mb-3">
              <span class="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
                CITIZEN GEOTAGGED CAPTURE
              </span>
              <span class="text-[11px] font-mono text-teal-400 bg-teal-950/60 px-2 py-0.5 rounded border border-teal-500/30">
                ${curr.reportedAt}
              </span>
            </div>

            ${this.getRealisticIssueThumbnail(curr.svgType, curr.aiDetection)}

            <div class="mt-3 p-3 rounded-xl bg-slate-900/80 border border-teal-500/15 flex items-center justify-between text-xs font-mono">
              <div>
                <span class="text-slate-400 text-[10px] block">LOCATION (RAIPUR)</span>
                <span class="text-white font-medium">${curr.ward}</span>
              </div>
              <div class="text-right">
                <span class="text-slate-400 text-[10px] block">RMC SLA GUARANTEE</span>
                <span class="text-cyan-300 font-bold">${curr.slaRemaining}</span>
              </div>
            </div>
          </div>

          <button onclick="window.citizenPortal.openReportModal()" class="w-full py-3.5 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 font-extrabold text-sm rounded-xl transition-all shadow-xl shadow-teal-500/20 flex items-center justify-center gap-2 group">
            <svg class="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            <span>Simulate Filing New Citizen Grievance</span>
          </button>
        </div>

        <!-- Right: Complaint Status Interface -->
        <div class="lg:col-span-7">
          <div class="glass-panel p-6 h-full flex flex-col justify-between">
            <div>
              <div class="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-teal-500/15">
                <div>
                  <div class="flex items-center gap-2">
                    <span class="text-xs font-mono px-2 py-0.5 rounded bg-teal-500/15 text-teal-300 border border-teal-500/30 font-bold">
                      ${curr.id}
                    </span>
                    <span class="text-xs text-slate-400 font-mono">${curr.category}</span>
                  </div>
                  <h3 class="text-xl font-bold text-white mt-1.5">${curr.title}</h3>
                </div>
                <div class="text-right">
                  <span class="text-[10px] uppercase font-mono text-slate-400 block">SLA Commitment</span>
                  <span class="text-sm font-bold text-teal-300 font-mono">${curr.slaHours}</span>
                </div>
              </div>

              <!-- Assigned Field Unit -->
              <div class="my-4 p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs">
                <div class="flex items-center gap-2.5">
                  <div class="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                  </div>
                  <div>
                    <span class="text-slate-400 text-[10px] block">ASSIGNED MUNICIPAL RESPONDER</span>
                    <span class="text-white font-medium">${curr.assignedTo}</span>
                  </div>
                </div>
                <span class="px-2 py-1 rounded bg-teal-500/15 text-teal-300 font-mono text-[10px] border border-teal-500/30 hidden sm:inline">
                  TELEMETRY LINKED
                </span>
              </div>

              <!-- Multi-step Timeline Stepper -->
              <div class="space-y-4 my-6">
                ${curr.steps.map((st, idx) => {
                  const isDone = st.done;
                  const isCurrent = st.current;
                  return `
                    <div class="flex items-start gap-4 group">
                      <div class="flex flex-col items-center">
                        <div class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-mono transition-all ${
                          isDone 
                            ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/30' 
                            : (isCurrent ? 'bg-cyan-500/20 border-2 border-cyan-400 text-cyan-300' : 'bg-slate-800 text-slate-500 border border-slate-700')
                        }">
                          ${isDone ? '✓' : idx + 1}
                        </div>
                        ${idx < curr.steps.length - 1 ? `
                          <div class="w-0.5 h-8 my-1 ${isDone ? 'bg-teal-500/40' : 'bg-slate-800'}"></div>
                        ` : ''}
                      </div>

                      <div class="flex-1 pb-1">
                        <div class="flex items-center justify-between">
                          <h4 class="text-sm font-semibold ${isDone ? 'text-white' : 'text-slate-400'}">
                            ${st.name}
                          </h4>
                          <span class="text-[11px] font-mono text-slate-400">${st.time}</span>
                        </div>
                        <p class="text-xs text-slate-400 mt-0.5 leading-relaxed">${st.desc}</p>
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>

            <div class="pt-4 border-t border-teal-500/15 flex flex-wrap items-center justify-between gap-3 text-xs">
              <span class="text-slate-400 font-mono">
                SMS / WhatsApp Updates: <strong class="text-teal-300">+91 771 ••••••</strong>
              </span>
              <div class="flex items-center gap-2">
                <button onclick="window.triggerNotification('Feedback Submitted', 'Thank you! You rated Raipur Municipal Corporation 5 stars.')" class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all">
                  Rate Resolution
                </button>
                <button onclick="window.triggerNotification('RMC Crew GPS Tracker', 'Field Unit Van #02 is 240m from GE Road.')" class="px-3 py-1.5 rounded-lg bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 border border-teal-500/40 font-medium transition-all">
                  Track Crew GPS
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Grievance Simulation Modal -->
      <div id="grievance-modal" class="fixed inset-0 modal-overlay z-50 hidden flex items-center justify-center p-4">
        <div class="bg-slate-950 border border-teal-500/30 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
          <button onclick="window.citizenPortal.closeReportModal()" class="absolute top-4 right-4 text-slate-400 hover:text-white">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>

          <div class="flex items-center gap-2 mb-2">
            <span class="w-2.5 h-2.5 rounded-full bg-teal-400"></span>
            <span class="text-xs font-mono text-teal-400 tracking-wider font-bold">AURA CITY • RAIPUR CITIZEN PORTAL</span>
          </div>
          <h3 class="text-xl font-extrabold text-white mb-2">File a Smart Civic Grievance</h3>
          <p class="text-xs text-slate-400 mb-5">Simulate how Raipur citizens report urban issues with edge computer vision, automated GPS geo-fencing, and instant Raipur Municipal Corporation (RMC) work order creation.</p>

          <form id="grievance-form" onsubmit="window.citizenPortal.handleSimulateSubmit(event)" class="space-y-4">
            <div>
              <label class="block text-xs font-medium text-slate-300 mb-1">Issue Category</label>
              <select id="modal-category" class="w-full bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-xl p-3 focus:outline-none focus:border-teal-400">
                <option value="pothole">Road Pothole / Asphalt Cavity (GE Road / Jaistambh)</option>
                <option value="garbage">Garbage Overflow / Sanitation Hazard (Pandri Market)</option>
                <option value="streetlight">Non-Functional Smart Streetlight (VIP Road)</option>
                <option value="water">Water Pipeline Rupture / Leak (Telibandha Lakefront)</option>
                <option value="encroachment">Illegal Land Encroachment Alert (Tatibandh Bypass)</option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-medium text-slate-300 mb-1">Municipal Ward (Raipur)</label>
              <select id="modal-ward" class="w-full bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-xl p-3 focus:outline-none focus:border-teal-400">
                <option value="Ward 28">Ward 28 — Pandri / Jaistambh Chowk</option>
                <option value="Ward 34">Ward 34 — Atal Nagar (Sector 19 Mantralaya)</option>
                <option value="Ward 42">Ward 42 — Telibandha Marine Drive</option>
                <option value="Ward 51">Ward 51 — VIP Road / Airport Way</option>
                <option value="Ward 12">Ward 12 — Budha Talab / Tatibandh</option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-medium text-slate-300 mb-1">Attach Geo-Tagged Photo</label>
              <div class="border-2 border-dashed border-teal-500/30 rounded-xl p-4 text-center bg-slate-900/60">
                <svg class="w-8 h-8 mx-auto text-teal-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                <p class="text-xs text-slate-300 font-medium">Raipur-Civic-Sample-Capture.jpg</p>
                <p class="text-[10px] text-teal-400 font-mono mt-0.5">EXIF: 21.2514° N, 81.6296° E (Bhuiyan Verified)</p>
              </div>
            </div>

            <div id="ai-progress-box" class="hidden p-3 rounded-xl bg-slate-900 border border-teal-500/40">
              <div class="flex items-center justify-between text-xs font-mono text-teal-300 mb-1.5">
                <span id="ai-status-text">AI Computer Vision Scanning...</span>
                <span id="ai-percent-text">64%</span>
              </div>
              <div class="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div id="ai-bar-fill" class="h-full bg-gradient-to-r from-teal-400 to-cyan-400 w-2/3 transition-all duration-300"></div>
              </div>
            </div>

            <div class="pt-2">
              <button type="submit" id="submit-grievance-btn" class="w-full py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 font-extrabold text-sm rounded-xl shadow-lg shadow-teal-500/20 hover:from-teal-400 hover:to-cyan-400 transition-all">
                Run AI Classification & Dispatch Ticket
              </button>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  openReportModal() {
    const modal = document.getElementById('grievance-modal');
    if (modal) modal.classList.remove('hidden');
  }

  closeReportModal() {
    const modal = document.getElementById('grievance-modal');
    if (modal) modal.classList.add('hidden');
  }

  handleSimulateSubmit(e) {
    e.preventDefault();
    const btn = document.getElementById('submit-grievance-btn');
    const pBox = document.getElementById('ai-progress-box');
    const statusText = document.getElementById('ai-status-text');
    const percentText = document.getElementById('ai-percent-text');
    const barFill = document.getElementById('ai-bar-fill');
    const cat = document.getElementById('modal-category').value;
    const ward = document.getElementById('modal-ward').value;

    btn.disabled = true;
    pBox.classList.remove('hidden');

    setTimeout(() => {
      statusText.innerText = 'Extracting Edge Boundary & Depth...';
      percentText.innerText = '45%';
      barFill.style.width = '45%';
    }, 400);

    setTimeout(() => {
      statusText.innerText = 'Cross-referencing Bhuiyan CG Cadastral Ward Map...';
      percentText.innerText = '82%';
      barFill.style.width = '82%';
    }, 900);

    setTimeout(() => {
      statusText.innerText = 'Assigned to Raipur Municipal Corporation Rapid Squad!';
      percentText.innerText = '100%';
      barFill.style.width = '100%';

      setTimeout(() => {
        this.closeReportModal();
        btn.disabled = false;
        pBox.classList.add('hidden');

        const newId = `CR-RPR-${Math.floor(100 + Math.random() * 900)}`;
        window.triggerNotification(
          `New Grievance Created: ${newId}`,
          `AI Confirmed (${cat.toUpperCase()}) in ${ward}. Auto-routed to RMC with 3.5h SLA.`
        );
      }, 700);
    }, 1500);
  }
}

window.CitizenGrievancePortal = CitizenGrievancePortal;
