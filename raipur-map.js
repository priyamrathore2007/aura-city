/**
 * Aura City — Interactive Raipur & Atal Nagar GIS Digital Twin Map Engine
 * Generates an SVG-based spatial map modeled on Raipur's iconic geography:
 * Telibandha Lake (Marine Drive), Swami Vivekananda Sarovar (Budha Talab),
 * Atal Nagar Smart Grid (Mahanadi Bhawan), GE Road, VIP Road, and Pandri.
 * Fully synchronized with Bhuiyan CG (Chhattisgarh Land Records).
 */

class RaipurGISMap {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.currentLayer = 'all';
    this.currentWard = 'all';
    this.selectedEntity = null;

    this.parcels = [
      // Atal Nagar Smart City Commercial Hub
      {
        id: 'CG-RPR-ATN-01',
        khasra: 'Khasra 104/1-A, Halka 19',
        zone: 'Atal Nagar (Sector 19 Smart CBD)',
        ward: '34',
        category: 'commercial',
        owner: 'Atal Nagar Development Authority (ANIDA)',
        area: '24,500 m²',
        taxStatus: 'Cleared (₹6,80,000)',
        encroachmentRisk: 'Zero (0.2%)',
        points: '540,240 620,225 640,285 555,300',
        center: { x: 588, y: 262 },
        color: '#06b6d4',
        name: 'Mahanadi Bhawan Smart IT & Commercial Complex'
      },
      // Pandri Commercial Market
      {
        id: 'CG-RPR-PND-02',
        khasra: 'Khasra 88/2-B, Halka 12',
        zone: 'Pandri Commercial & Textile Trade Guild',
        ward: '28',
        category: 'commercial',
        owner: 'Raipur Wholesale Traders Association',
        area: '14,800 m²',
        taxStatus: 'Cleared (₹3,20,000)',
        encroachmentRisk: 'Low (4.2%)',
        points: '630,220 710,210 725,265 645,280',
        center: { x: 677, y: 243 },
        color: '#0891b2',
        name: 'Pandri Commercial Plaza Block #08'
      },
      // Mahanadi Bhawan / Indrawati Bhawan State Secretariat
      {
        id: 'CG-RPR-SEC-01',
        khasra: 'Khasra 01/Govt, Halka 19',
        zone: 'Atal Nagar Mantralaya (Mahanadi Bhawan)',
        ward: '34',
        category: 'institutional',
        owner: 'Govt of Chhattisgarh (General Administration Dept)',
        area: '94,000 m²',
        taxStatus: 'Govt Exempt',
        encroachmentRisk: 'Zero (0.0%)',
        points: '450,180 520,165 540,220 465,235',
        center: { x: 493, y: 200 },
        color: '#818cf8',
        name: 'Mahanadi Bhawan Apex Secretariat Enclave'
      },
      // Shankar Nagar & Civil Lines Residential Greens
      {
        id: 'CG-RPR-SHK-01',
        khasra: 'Khasra 212/8, Halka 14',
        zone: 'Shankar Nagar Officers & Eco Cluster',
        ward: '28',
        category: 'residential',
        owner: 'Shankar Nagar Residents Cooperative',
        area: '32,400 m²',
        taxStatus: 'Cleared (₹1,95,000)',
        encroachmentRisk: 'Low (3.1%)',
        points: '460,330 550,320 565,390 475,400',
        center: { x: 512, y: 360 },
        color: '#38bdf8',
        name: 'Shankar Nagar Smart Eco-Cluster'
      },
      // Tatibandh Transport Nagar Link (Encroachment Flagged)
      {
        id: 'CG-RPR-TTB-01',
        khasra: 'Khasra 310/4, Halka 08',
        zone: 'Tatibandh Industrial Transport Corridor (NH-53)',
        ward: '12',
        category: 'residential',
        owner: 'Central Logistic Holdings (Pvt)',
        area: '21,000 m²',
        taxStatus: 'Under Dispute / Arrears',
        encroachmentRisk: 'High (68.4%)',
        points: '480,410 560,405 570,470 490,475',
        center: { x: 525, y: 440 },
        color: '#f43f5e', // Encroachment Flagged
        name: 'Tatibandh Arterial Parcel (Encroachment Flagged)'
      },
      // Telibandha Marine Drive Eco Wetland Buffer
      {
        id: 'CG-RPR-TLB-01',
        khasra: 'Khasra 42/E, Halka 22',
        zone: 'Telibandha Lake (Marine Drive Raipur)',
        ward: '42',
        category: 'green',
        owner: 'Raipur Smart City Limited (RSCL)',
        area: '86,000 m²',
        taxStatus: 'Public Wetland Protected',
        encroachmentRisk: 'Low (0.8%)',
        points: '220,160 360,140 375,190 235,210',
        center: { x: 297, y: 175 },
        color: '#10b981',
        name: 'Telibandha Marine Drive Eco-Promenade'
      },
      // VIP Road Airport Corridor
      {
        id: 'CG-RPR-VIP-01',
        khasra: 'Khasra 512/3, Halka 26',
        zone: 'VIP Road Corridor (Swami Vivekananda Airport Way)',
        ward: '51',
        category: 'commercial',
        owner: 'Chhattisgarh State Tourism & Hospitality Corp',
        area: '42,000 m²',
        taxStatus: 'Cleared (₹4,10,000)',
        encroachmentRisk: 'Low (2.0%)',
        points: '495,490 610,480 625,545 510,555',
        center: { x: 560, y: 517 },
        color: '#0ea5e9',
        name: 'VIP Road Airport Gateway Hub'
      }
    ];

    this.civicAlerts = [
      {
        id: 'CR-RPR-104',
        type: 'pothole',
        category: 'ROAD & HIGHWAYS',
        title: 'GE Road Cavity (near Jaistambh Chowk)',
        ward: '28',
        coords: { x: 565, y: 275 },
        severity: 'CRITICAL',
        status: 'In Progress (RMC Road Squad Dispatched)',
        reportedAt: '15 mins ago',
        aiScore: '98.4%',
        color: '#f43f5e'
      },
      {
        id: 'CR-RPR-208',
        type: 'garbage',
        category: 'SWACHHATA / SOLID WASTE',
        title: 'Pandri Market Secondary Dump Overflow',
        ward: '28',
        coords: { x: 670, y: 250 },
        severity: 'HIGH',
        status: 'Assigned to RMC Compactor Hopper #09',
        reportedAt: '28 mins ago',
        aiScore: '94.7%',
        color: '#f59e0b'
      },
      {
        id: 'CR-RPR-315',
        type: 'streetlight',
        category: 'SMART LIGHTING',
        title: 'VIP Road Dark Sector (Pole #SL-402)',
        ward: '51',
        coords: { x: 580, y: 460 },
        severity: 'MEDIUM',
        status: 'Telemetry Alert (Automatic Replacement Scheduled)',
        reportedAt: '50 mins ago',
        aiScore: '99.1%',
        color: '#06b6d4'
      },
      {
        id: 'CR-RPR-420',
        type: 'water',
        category: 'WATER SCADA',
        title: 'Telibandha Distribution Pressure Drop',
        ward: '42',
        coords: { x: 340, y: 170 },
        severity: 'HIGH',
        status: 'RMC Water Works Unit Investigating',
        reportedAt: '35 mins ago',
        aiScore: '96.2%',
        color: '#38bdf8'
      }
    ];

    this.municipalAssets = [
      { id: 'AST-RMC-01', name: 'Telibandha Water SCADA Station', type: 'water', coords: { x: 300, y: 185 }, status: 'Operational (4.2 BAR)' },
      { id: 'AST-RMC-04', name: 'Atal Nagar 33kV Smart Grid Feeder', type: 'power', coords: { x: 610, y: 235 }, status: 'Normal Load (62%)' },
      { id: 'AST-RMC-12', name: 'Jaistambh Smart Pole 5G Node', type: 'lighting', coords: { x: 505, y: 215 }, status: 'Active (Lux 100%)' },
      { id: 'AST-RMC-08', name: 'Pandri Solid Waste Transfer Hub', type: 'waste', coords: { x: 640, y: 430 }, status: 'Capacity 58%' }
    ];

    this.init();
  }

  init() {
    this.render();
    this.attachEventListeners();
  }

  render() {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="relative w-full h-[580px] bg-slate-950 rounded-2xl overflow-hidden border border-teal-500/20 shadow-2xl flex flex-col">
        <!-- Map Header Controls -->
        <div class="p-4 bg-slate-900/90 backdrop-blur-md border-b border-teal-500/15 flex flex-wrap items-center justify-between gap-3 z-20">
          <div class="flex items-center gap-3">
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-teal-400 animate-pulse"></span>
              <span class="font-bold text-white tracking-wide text-sm">RAIPUR & ATAL NAGAR GIS TWIN</span>
            </div>
            <span class="text-xs px-2.5 py-0.5 rounded-full bg-teal-950/80 border border-teal-500/30 text-teal-300 font-mono">
              BHUIYAN-CG SYNC v2.4
            </span>
          </div>

          <!-- Layer Switches -->
          <div class="flex items-center flex-wrap gap-1.5 text-xs">
            <button class="gis-layer-btn px-3 py-1 rounded-lg border font-medium transition-all ${this.currentLayer === 'all' ? 'bg-teal-500/20 border-teal-400 text-teal-300' : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-white'}" data-layer="all">
              All Layers
            </button>
            <button class="gis-layer-btn px-3 py-1 rounded-lg border font-medium transition-all ${this.currentLayer === 'parcels' ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300' : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-white'}" data-layer="parcels">
              Bhuiyan Cadastre
            </button>
            <button class="gis-layer-btn px-3 py-1 rounded-lg border font-medium transition-all ${this.currentLayer === 'assets' ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300' : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-white'}" data-layer="assets">
              RMC Assets
            </button>
            <button class="gis-layer-btn px-3 py-1 rounded-lg border font-medium transition-all ${this.currentLayer === 'alerts' ? 'bg-rose-500/20 border-rose-400 text-rose-300' : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-white'}" data-layer="alerts">
              Civic Alerts (Live)
            </button>
            <button class="gis-layer-btn px-3 py-1 rounded-lg border font-medium transition-all ${this.currentLayer === 'heatmap' ? 'bg-amber-500/20 border-amber-400 text-amber-300' : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-white'}" data-layer="heatmap">
              Encroachment Heatmap
            </button>
          </div>

          <!-- Ward Selector Dropdown -->
          <div class="flex items-center gap-2">
            <span class="text-xs text-slate-400 hidden sm:inline">Ward Filter:</span>
            <select id="gis-ward-filter" class="bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-lg px-2.5 py-1 focus:outline-none focus:border-teal-400">
              <option value="all">All Raipur Wards (70 Wards)</option>
              <option value="34">Ward 34 — Atal Nagar (Sector 19)</option>
              <option value="42">Ward 42 — Telibandha Marine Drive</option>
              <option value="28">Ward 28 — Pandri / Jaistambh</option>
              <option value="51">Ward 51 — VIP Road / Airport</option>
              <option value="12">Ward 12 — Budha Talab / Tatibandh</option>
            </select>
          </div>
        </div>

        <!-- SVG Map Viewport -->
        <div class="relative flex-1 w-full overflow-hidden bg-[#050b16]">
          <svg id="raipur-svg-map" class="w-full h-full cursor-crosshair select-none" viewBox="0 0 900 600" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="lakeWaterCG" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#082f49" stop-opacity="0.9" />
                <stop offset="50%" stop-color="#0c4a6e" stop-opacity="0.85" />
                <stop offset="100%" stop-color="#075985" stop-opacity="0.7" />
              </linearGradient>

              <filter id="glowCG" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            <!-- Background Grid -->
            <pattern id="gisGridCG" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(45, 212, 191, 0.05)" stroke-width="0.8"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#gisGridCG)" />

            <!-- WATER BODIES OF RAIPUR -->
            <g id="water-bodies-raipur">
              <!-- Telibandha Lake (Marine Drive Raipur) -->
              <path d="M 40,60 C 90,80 130,120 180,140 C 230,160 290,120 330,160 C 370,200 350,260 300,280 C 240,300 180,260 120,290 C 70,320 30,380 10,420 L 0,600 L 0,0 L 50,0 Z" 
                    fill="url(#lakeWaterCG)" stroke="#0284c7" stroke-width="1.5" />
              <text x="140" y="210" fill="#38bdf8" font-size="13" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" letter-spacing="2" opacity="0.85">
                TELIBANDHA LAKE (MARINE DRIVE)
              </text>
              <text x="140" y="228" fill="#7dd3fc" font-size="9" font-family="'JetBrains Mono', monospace" opacity="0.6">
                RSCL SMART WATERFRONT PROMENADE
              </text>

              <!-- Swami Vivekananda Sarovar (Budha Talab) -->
              <path d="M 330,285 C 360,280 390,305 400,335 C 410,365 375,390 345,395 C 315,400 300,370 295,340 C 290,310 310,290 330,285 Z" 
                    fill="url(#lakeWaterCG)" stroke="#0284c7" stroke-width="1.2" />
              <text x="345" y="345" fill="#38bdf8" font-size="9" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" opacity="0.75" text-anchor="middle">
                BUDHA TALAB (VIVEKANANDA SAROVAR)
              </text>

              <!-- Atal Nagar Lake Sector 24 -->
              <path d="M 640,360 C 680,355 710,380 720,410 C 730,440 690,470 660,475 C 630,480 610,450 615,415 C 620,380 635,365 640,360 Z" 
                    fill="url(#lakeWaterCG)" stroke="#0284c7" stroke-width="1.2" />
              <text x="665" y="420" fill="#38bdf8" font-size="9" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" opacity="0.75" text-anchor="middle">
                ATAL NAGAR LAKE SECTOR 24
              </text>
            </g>

            <!-- ROADS NETWORK -->
            <g id="roads-raipur">
              <!-- VIP Road (Connecting Marine Drive to Airport) -->
              <path d="M 200,100 C 250,135 310,145 365,190 C 400,220 430,240 460,250" 
                    fill="none" stroke="#2dd4bf" stroke-width="3" stroke-linecap="round" opacity="0.8" />
              <text x="270" y="130" fill="#5eead4" font-size="8" font-family="'JetBrains Mono', monospace" transform="rotate(18, 270, 130)">
                VIP ROAD (AIRPORT CORRIDOR)
              </text>

              <!-- GE Road (Great Eastern Road / NH-53) -->
              <path d="M 440,240 L 780,240" fill="none" stroke="#64748b" stroke-width="3.5" stroke-linecap="round" />
              <text x="590" y="235" fill="#94a3b8" font-size="8" font-family="'JetBrains Mono', monospace">
                GE ROAD / GREAT EASTERN HIGHWAY (NH-53)
              </text>

              <!-- Atal Nagar Expressway (Vertical Axis) -->
              <path d="M 570,160 L 570,580" fill="none" stroke="#38bdf8" stroke-width="4" stroke-linecap="round" opacity="0.8" />
              <text x="575" y="550" fill="#7dd3fc" font-size="8" font-family="'JetBrains Mono', monospace" transform="rotate(90, 575, 550)">
                ATAL NAGAR SMART EXPRESSWAY
              </text>

              <!-- Shankar Nagar / Civil Lines Boulevard -->
              <path d="M 450,310 L 760,310" fill="none" stroke="#475569" stroke-width="2.5" />
              <text x="490" y="305" fill="#64748b" font-size="8" font-family="'JetBrains Mono', monospace">
                SHANKAR NAGAR BOULEVARD
              </text>
            </g>

            <!-- Cadastral Parcels Layer -->
            <g id="parcels-layer">
              ${this.renderParcelsSVG()}
            </g>

            <!-- Municipal Assets Layer -->
            <g id="assets-layer">
              ${this.renderAssetsSVG()}
            </g>

            <!-- Civic Alerts Layer -->
            <g id="alerts-layer">
              ${this.renderAlertsSVG()}
            </g>
          </svg>

          <!-- Floating Map Compass & Legend -->
          <div class="absolute bottom-4 left-4 p-3 bg-slate-900/90 backdrop-blur-md rounded-xl border border-teal-500/20 text-xs text-slate-300 shadow-xl pointer-events-auto">
            <div class="font-bold text-white mb-1.5 flex items-center justify-between text-[11px]">
              <span>BHUIYAN CG GIS CADASTRE</span>
              <span class="text-teal-400 font-mono">NIC-CHHATTISGARH</span>
            </div>
            <div class="grid grid-cols-2 gap-x-4 gap-y-1 text-[10px]">
              <div class="flex items-center gap-1.5">
                <span class="w-3 h-2 rounded bg-cyan-500/60 border border-cyan-400"></span>
                <span>Atal Nagar Commercial</span>
              </div>
              <div class="flex items-center gap-1.5">
                <span class="w-3 h-2 rounded bg-indigo-500/60 border border-indigo-400"></span>
                <span>Residential Sector</span>
              </div>
              <div class="flex items-center gap-1.5">
                <span class="w-3 h-2 rounded bg-emerald-500/60 border border-emerald-400"></span>
                <span>Telibandha Wetland</span>
              </div>
              <div class="flex items-center gap-1.5">
                <span class="w-3 h-2 rounded bg-rose-500/60 border border-rose-400"></span>
                <span>Encroachment Alert</span>
              </div>
            </div>
          </div>

          <!-- Quick Stat Pill -->
          <div class="absolute top-4 right-4 hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-900/90 backdrop-blur-md rounded-lg border border-teal-500/20 text-xs text-slate-300 font-mono shadow-xl">
            <span class="text-teal-400 font-bold">100% BHUIYAN CADASTRE LINKED</span>
            <span class="text-slate-500">•</span>
            <span class="text-slate-400">EPSG:4326 (WGS84)</span>
          </div>

          <!-- Floating Cadastral Inspector Panel -->
          <div id="gis-inspector-drawer" class="absolute top-4 right-4 w-80 max-w-[90%] bg-slate-950/95 backdrop-blur-xl rounded-2xl border border-teal-500/40 p-4 shadow-2xl transition-all duration-300 translate-x-[120%] z-30">
            <div id="gis-inspector-content">
              <!-- Dynamically populated -->
            </div>
          </div>
        </div>

        <!-- Map Footer Ticker -->
        <div class="px-4 py-2 bg-slate-950 border-t border-teal-500/15 flex items-center justify-between text-xs text-slate-400">
          <div class="flex items-center gap-2">
            <span class="text-teal-400 font-mono font-bold">RAIPUR SMART CITY NODE:</span>
            <span class="truncate">Live Sync with Bhuiyan Land Records (NIC Chhattisgarh) • 70 Wards Monitored</span>
          </div>
          <div class="hidden sm:flex items-center gap-3 font-mono text-[11px]">
            <span class="text-slate-500">LAT: 21.2514° N</span>
            <span class="text-slate-500">LON: 81.6296° E</span>
          </div>
        </div>
      </div>
    `;
  }

  renderParcelsSVG() {
    return this.parcels.map(p => {
      const isVisible = (this.currentLayer === 'all' || this.currentLayer === 'parcels' || (this.currentLayer === 'heatmap' && p.encroachmentRisk.includes('High')));
      const matchesWard = (this.currentWard === 'all' || p.ward === this.currentWard);

      if (!isVisible || !matchesWard) return '';

      const strokeColor = p.encroachmentRisk.includes('High') ? '#f43f5e' : (p.color || '#06b6d4');
      const fillColor = p.encroachmentRisk.includes('High') ? 'rgba(244, 63, 94, 0.25)' : `${p.color}25`;

      return `
        <polygon 
          class="map-parcel transition-all duration-200 cursor-pointer" 
          data-parcel-id="${p.id}"
          points="${p.points}" 
          fill="${fillColor}" 
          stroke="${strokeColor}" 
          stroke-width="1.6"
          stroke-dasharray="${p.encroachmentRisk.includes('High') ? '4 2' : 'none'}"
        >
          <title>${p.name} - Click to Inspect</title>
        </polygon>
        <text 
          x="${p.center.x}" 
          y="${p.center.y}" 
          fill="#e2e8f0" 
          font-size="8" 
          font-family="'JetBrains Mono', monospace" 
          text-anchor="middle" 
          pointer-events="none"
          font-weight="600"
          opacity="0.85"
        >${p.id}</text>
      `;
    }).join('');
  }

  renderAssetsSVG() {
    if (this.currentLayer !== 'all' && this.currentLayer !== 'assets') return '';

    return this.municipalAssets.map(a => {
      return `
        <g class="cursor-pointer group" data-asset-id="${a.id}" transform="translate(${a.coords.x}, ${a.coords.y})">
          <circle r="10" fill="#0f172a" stroke="#10b981" stroke-width="1.8" />
          <circle r="4" fill="#34d399" />
          <text x="0" y="-14" fill="#6ee7b7" font-size="8" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" text-anchor="middle">
            ${a.type.toUpperCase()}
          </text>
        </g>
      `;
    }).join('');
  }

  renderAlertsSVG() {
    if (this.currentLayer !== 'all' && this.currentLayer !== 'alerts') return '';

    return this.civicAlerts.map(alert => {
      const matchesWard = (this.currentWard === 'all' || alert.ward === this.currentWard);
      if (!matchesWard) return '';

      return `
        <g class="cursor-pointer group" data-alert-id="${alert.id}" transform="translate(${alert.coords.x}, ${alert.coords.y})">
          <circle r="14" fill="none" stroke="${alert.color}" stroke-width="1.2" opacity="0.6">
            <animate attributeName="r" values="8;22" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.8;0" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle r="7" fill="${alert.color}" filter="url(#glowCG)" />
          <text x="0" y="3" fill="#ffffff" font-size="7" font-weight="bold" text-anchor="middle">!</text>
          
          <rect x="-35" y="-24" width="70" height="14" rx="4" fill="#0f172a" stroke="${alert.color}" stroke-width="1" />
          <text x="0" y="-14" fill="#ffffff" font-size="7" font-family="'JetBrains Mono', monospace" font-weight="600" text-anchor="middle">
            ${alert.id}
          </text>
        </g>
      `;
    }).join('');
  }

  attachEventListeners() {
    const layerButtons = this.container.querySelectorAll('.gis-layer-btn');
    layerButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        this.currentLayer = btn.dataset.layer;
        this.render();
        this.attachEventListeners();
      });
    });

    const wardFilter = this.container.querySelector('#gis-ward-filter');
    if (wardFilter) {
      wardFilter.value = this.currentWard;
      wardFilter.addEventListener('change', (e) => {
        this.currentWard = e.target.value;
        this.render();
        this.attachEventListeners();
      });
    }

    const parcelPolygons = this.container.querySelectorAll('.map-parcel');
    parcelPolygons.forEach(poly => {
      poly.addEventListener('click', () => {
        const pId = poly.dataset.parcelId;
        const parcel = this.parcels.find(p => p.id === pId);
        if (parcel) {
          this.openInspector(parcel);
        }
      });
    });

    const alertGroups = this.container.querySelectorAll('[data-alert-id]');
    alertGroups.forEach(grp => {
      grp.addEventListener('click', () => {
        const aId = grp.dataset.alertId;
        const alert = this.civicAlerts.find(a => a.id === aId);
        if (alert) {
          this.openAlertInspector(alert);
        }
      });
    });
  }

  openInspector(parcel) {
    const drawer = document.getElementById('gis-inspector-drawer');
    const content = document.getElementById('gis-inspector-content');
    if (!drawer || !content) return;

    drawer.classList.remove('translate-x-[120%]');
    const isHighRisk = parcel.encroachmentRisk.includes('High');

    content.innerHTML = `
      <div class="flex items-center justify-between pb-3 border-b border-teal-500/20">
        <div>
          <span class="text-[10px] font-mono px-2 py-0.5 rounded ${isHighRisk ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'bg-teal-500/20 text-teal-300 border border-teal-500/30'}">
            ${parcel.category.toUpperCase()}
          </span>
          <h3 class="text-white font-bold text-base mt-1">${parcel.id}</h3>
        </div>
        <button id="close-gis-inspector" class="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>

      <div class="py-3 space-y-2.5 text-xs text-slate-300 font-sans">
        <div>
          <span class="text-slate-400 text-[11px] block">Location / Zone (Raipur)</span>
          <span class="text-white font-medium">${parcel.name}</span>
          <span class="text-slate-400 text-[11px] block mt-0.5">Ward ${parcel.ward} • ${parcel.zone}</span>
        </div>

        <div class="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
          <div>
            <span class="text-slate-400 text-[10px] block">Bhuiyan Khasra Record</span>
            <span class="text-teal-300 font-mono font-medium">${parcel.khasra}</span>
          </div>
          <div>
            <span class="text-slate-400 text-[10px] block">Total Land Area</span>
            <span class="text-teal-300 font-mono font-medium">${parcel.area}</span>
          </div>
        </div>

        <div class="pt-2 border-t border-slate-800">
          <span class="text-slate-400 text-[10px] block">Registered Titleholder</span>
          <span class="text-white font-medium text-[11px]">${parcel.owner}</span>
        </div>

        <div class="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
          <div>
            <span class="text-slate-400 text-[10px] block">Property Tax Status</span>
            <span class="text-xs font-semibold ${parcel.taxStatus.includes('Cleared') ? 'text-emerald-400' : 'text-amber-400'}">${parcel.taxStatus}</span>
          </div>
          <div>
            <span class="text-slate-400 text-[10px] block">Encroachment Risk</span>
            <span class="text-xs font-bold ${isHighRisk ? 'text-rose-400' : 'text-emerald-400'}">${parcel.encroachmentRisk}</span>
          </div>
        </div>

        ${isHighRisk ? `
          <div class="p-2.5 rounded-lg bg-rose-950/60 border border-rose-500/40 text-[11px] text-rose-200">
            <strong>⚠️ AI Cadastral Discrepancy:</strong> 54m² unapproved structural deviation flagged against 2021 Raipur Masterplan. Immediate RMC surveyor audit recommended.
          </div>
        ` : ''}
      </div>

      <div class="pt-3 border-t border-slate-800 flex flex-col gap-2">
        <button onclick="window.triggerNotification('Cadastral Audit Started for ${parcel.id}', 'Dispatched via Bhuiyan Chhattisgarh land records portal.')" class="w-full py-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-lg shadow-teal-500/20">
          Verify via Bhuiyan CG Portal
        </button>
        <button onclick="window.triggerNotification('Exporting B-1 Khasra Extract', 'Generated cryptographically signed B-1 extract from Bhuiyan.')" class="w-full py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-xl font-medium transition-all">
          Download Bhuiyan B-1 Extract
        </button>
      </div>
    `;

    document.getElementById('close-gis-inspector')?.addEventListener('click', () => {
      drawer.classList.add('translate-x-[120%]');
    });
  }

  openAlertInspector(alert) {
    const drawer = document.getElementById('gis-inspector-drawer');
    const content = document.getElementById('gis-inspector-content');
    if (!drawer || !content) return;

    drawer.classList.remove('translate-x-[120%]');

    content.innerHTML = `
      <div class="flex items-center justify-between pb-3 border-b border-rose-500/20">
        <div>
          <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
            ${alert.category}
          </span>
          <h3 class="text-white font-bold text-base mt-1">${alert.id}</h3>
        </div>
        <button id="close-gis-inspector" class="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>

      <div class="py-3 space-y-2.5 text-xs text-slate-300 font-sans">
        <div>
          <span class="text-slate-400 text-[11px] block">Grievance Title</span>
          <span class="text-white font-medium text-sm">${alert.title}</span>
        </div>

        <div class="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
          <div>
            <span class="text-slate-400 text-[10px] block">Raipur Ward</span>
            <span class="text-teal-300 font-medium">Ward ${alert.ward} (Raipur RMC)</span>
          </div>
          <div>
            <span class="text-slate-400 text-[10px] block">AI Confidence</span>
            <span class="text-emerald-400 font-mono font-bold">${alert.aiScore}</span>
          </div>
        </div>

        <div class="pt-2 border-t border-slate-800">
          <span class="text-slate-400 text-[10px] block">Current Municipal Status</span>
          <span class="text-amber-300 font-medium">${alert.status}</span>
        </div>

        <div class="p-2.5 rounded-lg bg-slate-900 border border-teal-500/20 text-[11px] text-slate-300">
          Reported ${alert.reportedAt} by citizen via Aura City Mobile App. Automated RMC SLA timer: <strong>2h 15m remaining</strong>.
        </div>
      </div>

      <div class="pt-3 border-t border-slate-800 flex flex-col gap-2">
        <button onclick="window.triggerNotification('Ticket Fast-Tracked', 'Priority escalated to Raipur Municipal Corporation Engineer.')" class="w-full py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-lg shadow-cyan-500/20">
          Fast-Track Resolution
        </button>
      </div>
    `;

    document.getElementById('close-gis-inspector')?.addEventListener('click', () => {
      drawer.classList.add('translate-x-[120%]');
    });
  }
}

window.RaipurGISMap = RaipurGISMap;
