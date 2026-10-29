/**
 * Aura City — Enhanced 3D Spatial Twin Showcase Engine (Raipur & Atal Nagar)
 * Powers the hero city visualization with 3D mouse parallax tilt,
 * interactive holographic hotspots, scanner laser sweep, and live telemetry modals.
 */

class CityShowcase {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.activeLayer = 'all';
    this.scannerActive = true;

    this.hotspots = [
      {
        id: 'hs-mahanadi',
        title: 'Mahanadi Bhawan (CG State Secretariat)',
        category: 'ATAL NAGAR SMART HQ',
        tag: 'STATE SECRETARIAT',
        coords: { x: 50, y: 49 },
        type: 'gov',
        color: 'teal',
        icon: 'building-2',
        statLabel: 'LIVE TELEMETRY',
        statVal: '70 Wards Online (99.98%)',
        detail: 'Central Integrated Command & Control Center (ICCC) for Raipur Smart City & Atal Nagar Development Authority. Connects 14,200 SCADA nodes and live Bhuiyan CG cadastre.',
        specs: [
          { label: 'Active Officers', val: '128 on duty' },
          { label: 'Telemetry Nodes', val: '14,200 Active' },
          { label: 'RMC Ward SLA', val: '96.2% Optimal' }
        ]
      },
      {
        id: 'hs-cadastre-cg',
        title: 'Bhuiyan Cadastre Parcel #CG-RPR-104',
        category: 'BHUIYAN CG CADASTRE',
        tag: 'BHUIYAN KHATA',
        coords: { x: 44, y: 85 },
        type: 'cadastre',
        color: 'cyan',
        icon: 'map',
        statLabel: 'LAND REGISTRY',
        statVal: 'Bhuiyan-CG Verified',
        detail: 'High-precision cadastral boundary audited against Chhattisgarh Revenue records. Geospatial polygon hash: 0x7E41...C92. Zero encroachment detected.',
        specs: [
          { label: 'Khasra Number', val: 'Khasra 104/1-A' },
          { label: 'Total Area', val: '24,500 m²' },
          { label: 'Property Tax', val: 'Paid (₹6.80L)' }
        ]
      },
      {
        id: 'hs-pandri',
        title: 'Pandri Commercial & IT Tower',
        category: 'COMMERCIAL HUB',
        tag: 'PANDRI CBD',
        coords: { x: 26, y: 28 },
        type: 'commercial',
        color: 'blue',
        icon: 'cpu',
        statLabel: 'SMART BMS',
        statVal: 'Grade-A Energy Rating',
        detail: 'Central trade and IT commercial corridor with integrated Building Management Systems, rooftop radar array, and EV fast-charging hub.',
        specs: [
          { label: 'Daily Footfalls', val: '6,200 Persons' },
          { label: 'EV Stations', val: '14 Fast Plugs' },
          { label: 'Solar Share', val: '42% Clean Power' }
        ]
      },
      {
        id: 'hs-telibandha',
        title: 'Marine Drive (Telibandha Lakefront)',
        category: 'SMART HOUSING & ECO',
        tag: 'TELIBANDHA GREENS',
        coords: { x: 8, y: 72 },
        type: 'residential',
        color: 'emerald',
        icon: 'sun',
        statLabel: 'CLEAN ENERGY',
        statVal: '54.2 kW/h Output',
        detail: 'Lakeside solar-integrated residential cluster along Telibandha Marine Drive with smart net-metering and zero property tax arrears.',
        specs: [
          { label: 'Solar Rooftops', val: '100% Compliant' },
          { label: 'Water Quality', val: 'RMC Grade-A' },
          { label: 'Tax Status', val: 'Zero Arrears' }
        ]
      },
      {
        id: 'hs-viproad',
        title: 'VIP Road Airport Transit Corridor',
        category: 'TRANSIT INFRASTRUCTURE',
        tag: 'SMART HIGHWAY',
        coords: { x: 73, y: 34 },
        type: 'transit',
        color: 'purple',
        icon: 'navigation',
        statLabel: 'TRAFFIC FLOW',
        statVal: '48 km/h (Optimal)',
        detail: 'Intelligent arterial corridor connecting Telibandha to Swami Vivekananda Airport with automatic vehicle classification and adaptive smart lighting.',
        specs: [
          { label: 'Congestion', val: '0 Incident' },
          { label: 'Smart Poles', val: '112 Operational' },
          { label: 'Air Quality (AQI)', val: '58 (Satisfactory)' }
        ]
      },
      {
        id: 'hs-alert-ge',
        title: 'Civic Grievance #CR-RPR-104',
        category: 'REAL-TIME ALERT',
        tag: 'ROAD CAVITY DETECTED',
        coords: { x: 48, y: 65 },
        type: 'alert',
        color: 'rose',
        icon: 'alert-triangle',
        statLabel: 'RMC SLA TIMER',
        statVal: '1h 20m Remaining',
        detail: 'Asphalt cavity on GE Road near Jaistambh Chowk reported via Aura City App. Computer vision verified 98.4% severity. RMC Road Squad #02 on site.',
        specs: [
          { label: 'Depth', val: '~14 cm' },
          { label: 'Assigned Unit', val: 'RMC Central Zone' },
          { label: 'Priority', val: 'Critical / Fast-Track' }
        ]
      }
    ];

    this.init();
  }

  init() {
    this.render();
    this.setupParallaxTilt();
  }

  render() {
    const hotspotsHTML = this.hotspots.map(hs => {
      const isVisible = (this.activeLayer === 'all' || 
        (this.activeLayer === 'parcels' && hs.type === 'cadastre') ||
        (this.activeLayer === 'buildings' && (hs.type === 'gov' || hs.type === 'commercial' || hs.type === 'residential')) ||
        (this.activeLayer === 'alerts' && hs.type === 'alert') ||
        (this.activeLayer === 'telemetry' && (hs.type === 'transit' || hs.type === 'gov')));

      if (!isVisible) return '';

      const colorClasses = {
        teal: 'bg-teal-500 border-teal-300 text-teal-300 shadow-teal-500/50',
        cyan: 'bg-cyan-500 border-cyan-300 text-cyan-300 shadow-cyan-500/50',
        blue: 'bg-blue-500 border-blue-300 text-blue-300 shadow-blue-500/50',
        emerald: 'bg-emerald-500 border-emerald-300 text-emerald-300 shadow-emerald-500/50',
        purple: 'bg-indigo-500 border-indigo-300 text-indigo-300 shadow-indigo-500/50',
        rose: 'bg-rose-500 border-rose-300 text-rose-300 shadow-rose-500/50'
      }[hs.color] || 'bg-teal-500 border-teal-300 text-teal-300 shadow-teal-500/50';

      const isAlert = hs.type === 'alert';

      return `
        <div class="absolute cursor-pointer group z-20" style="left: ${hs.coords.x}%; top: ${hs.coords.y}%; transform: translate(-50%, -50%);" onclick="window.cityShowcase.inspectHotspot('${hs.id}')">
          <div class="absolute -inset-3 rounded-full ${isAlert ? 'bg-rose-500/30' : 'bg-cyan-500/25'} animate-ping pointer-events-none"></div>
          <div class="absolute -inset-1 rounded-full ${isAlert ? 'bg-rose-500/40' : 'bg-teal-500/35'} pointer-events-none"></div>

          <div class="relative flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/90 border border-teal-400/80 shadow-xl backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:border-cyan-300">
            <span class="w-2 h-2 rounded-full ${colorClasses.split(' ')[0]} ${isAlert ? 'animate-bounce' : ''}"></span>
            <span class="text-[10px] font-mono font-bold tracking-tight text-white whitespace-nowrap">
              ${hs.tag}
            </span>
          </div>

          <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 p-3 rounded-xl bg-slate-950/95 border border-teal-500/40 shadow-2xl backdrop-blur-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 translate-y-2 group-hover:translate-y-0 z-30">
            <div class="flex items-center justify-between text-[9px] font-mono text-teal-300 mb-1 border-b border-slate-800 pb-1">
              <span>${hs.category}</span>
              <span class="text-cyan-400 font-bold">CLICK TO VIEW</span>
            </div>
            <h4 class="text-xs font-bold text-white mb-1">${hs.title}</h4>
            <p class="text-[10px] text-slate-300 leading-snug mb-2">${hs.detail.substring(0, 75)}...</p>
            <div class="flex justify-between items-center text-[9px] font-mono bg-slate-900/80 p-1.5 rounded text-slate-300 border border-slate-800">
              <span>${hs.statLabel}:</span>
              <span class="text-teal-300 font-bold">${hs.statVal}</span>
            </div>
          </div>
        </div>
      `;
    }).join('');

    this.container.innerHTML = `
      <div id="city-card-inner" class="relative w-full h-[520px] rounded-2xl overflow-hidden border border-teal-500/30 shadow-2xl bg-slate-950 transition-transform duration-300 ease-out select-none">
        
        <img 
          id="city-hero-img" 
          src="city-hero.jpg" 
          alt="Aura City 3D Isometric Raipur & Atal Nagar Smart City" 
          class="w-full h-full object-cover object-center filter brightness-[0.98] contrast-[1.12] saturate-[1.15] transition-transform duration-500 scale-[1.02]"
        />

        <div class="absolute inset-0 bg-gradient-to-t from-[#050811] via-transparent to-[#050811]/60 pointer-events-none"></div>
        <div class="absolute inset-0 bg-gradient-to-r from-[#050811]/40 via-transparent to-[#050811]/40 pointer-events-none"></div>

        <div id="scanner-laser" class="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_20px_#22d3ee] pointer-events-none ${this.scannerActive ? 'block' : 'hidden'}" style="animation: scanVertical 5s ease-in-out infinite;"></div>

        <div id="hotspots-layer" class="absolute inset-0 pointer-events-auto">
          ${hotspotsHTML}
        </div>

        <!-- Top Controls Overlay -->
        <div class="absolute top-0 inset-x-0 p-4 flex flex-wrap items-center justify-between gap-2 z-20 bg-gradient-to-b from-[#060b14]/90 to-transparent">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-teal-400 animate-ping"></span>
            <span class="text-xs font-bold text-white tracking-wider">RAIPUR & ATAL NAGAR SPATIAL TWIN</span>
            <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-950/70 border border-teal-500/30 text-teal-300 hidden sm:inline">
              BHUIYAN-CG LINKED
            </span>
          </div>

          <div class="flex items-center gap-1.5 text-[11px] font-mono">
            <button class="city-layer-btn px-2.5 py-1 rounded-lg border transition-all ${this.activeLayer === 'all' ? 'bg-teal-500/25 border-teal-400 text-teal-300' : 'bg-slate-900/80 border-slate-700 text-slate-400 hover:text-white'}" data-layer="all">
              🌐 All
            </button>
            <button class="city-layer-btn px-2.5 py-1 rounded-lg border transition-all ${this.activeLayer === 'parcels' ? 'bg-cyan-500/25 border-cyan-400 text-cyan-300' : 'bg-slate-900/80 border-slate-700 text-slate-400 hover:text-white'}" data-layer="parcels">
              📐 Bhuiyan
            </button>
            <button class="city-layer-btn px-2.5 py-1 rounded-lg border transition-all ${this.activeLayer === 'buildings' ? 'bg-blue-500/25 border-blue-400 text-blue-300' : 'bg-slate-900/80 border-slate-700 text-slate-400 hover:text-white'}" data-layer="buildings">
              🏢 Buildings
            </button>
            <button class="city-layer-btn px-2.5 py-1 rounded-lg border transition-all ${this.activeLayer === 'alerts' ? 'bg-rose-500/25 border-rose-400 text-rose-300' : 'bg-slate-900/80 border-slate-700 text-slate-400 hover:text-white'}" data-layer="alerts">
              ⚠️ Alerts
            </button>
            <button id="toggle-scanner-btn" class="px-2 py-1 rounded-lg border ${this.scannerActive ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300' : 'bg-slate-900/80 border-slate-700 text-slate-400'}">
              📡 Scanner
            </button>
          </div>
        </div>

        <!-- Bottom Status Bar -->
        <div class="absolute bottom-0 inset-x-0 p-4 flex items-center justify-between z-20 bg-gradient-to-t from-[#060b14]/95 via-[#060b14]/70 to-transparent text-[11px] text-slate-400">
          <div class="flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
            <span>Interactive Node View: Click any glowing pin for telemetry details</span>
          </div>
          <div class="font-mono text-teal-400 text-[10px] hidden sm:flex items-center gap-3">
            <span>COORDS: 21.2514° N, 81.6296° E</span>
            <span>NODES: 6 ONLINE</span>
          </div>
        </div>

      </div>
    `;

    this.attachEventListeners();
  }

  setupParallaxTilt() {
    const card = document.getElementById('city-card-inner');
    if (!card) return;

    this.container.addEventListener('mousemove', (e) => {
      const rect = this.container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const deltaX = (x - centerX) / centerX;
      const deltaY = (y - centerY) / centerY;

      const rotateX = -deltaY * 6;
      const rotateY = deltaX * 6;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
    });

    this.container.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  }

  attachEventListeners() {
    const layerBtns = this.container.querySelectorAll('.city-layer-btn');
    layerBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.activeLayer = btn.dataset.layer;
        this.render();
        this.setupParallaxTilt();
      });
    });

    const scanBtn = this.container.querySelector('#toggle-scanner-btn');
    if (scanBtn) {
      scanBtn.addEventListener('click', () => {
        this.scannerActive = !this.scannerActive;
        const laser = document.getElementById('scanner-laser');
        if (laser) {
          laser.classList.toggle('hidden', !this.scannerActive);
        }
        scanBtn.classList.toggle('bg-cyan-500/20', this.scannerActive);
        scanBtn.classList.toggle('border-cyan-400', this.scannerActive);
        scanBtn.classList.toggle('text-cyan-300', this.scannerActive);
      });
    }
  }

  inspectHotspot(id) {
    const hs = this.hotspots.find(h => h.id === id);
    if (!hs) return;

    if (window.showInteractiveModal) {
      window.showInteractiveModal({
        title: hs.title,
        category: hs.category,
        data: {
          detail: hs.detail,
          metricLabel: hs.statLabel,
          metricVal: hs.statVal
        }
      });
    }
  }
}

if (!document.getElementById('city-scanner-styles')) {
  const styleEl = document.createElement('style');
  styleEl.id = 'city-scanner-styles';
  styleEl.textContent = `
    @keyframes scanVertical {
      0% { top: 4%; opacity: 0; }
      15% { opacity: 0.9; }
      85% { opacity: 0.9; }
      100% { top: 96%; opacity: 0; }
    }
  `;
  document.head.appendChild(styleEl);
}

window.CityShowcase = CityShowcase;
