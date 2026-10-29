/**
 * AuraCity — Main Application Coordinator
 * Palette: Sunlit Greenhouse (#eef2e3 / #043f2e / #c8f169)
 *
 * STRIPPED:
 *  - Auto-Rotate toggle button handler (btn-auto-rotate-360)
 *  - Enhanced HD Spatial Twin mode switcher (btn-mode-hd / btn-mode-360)
 *  - CityShowcase HD view initialisation
 *
 * ADDED:
 *  - "Open Dashboard" CTA — routes to /dashboard via window.top.location
 */

document.addEventListener('DOMContentLoaded', () => {
  // ── 1. Open Dashboard CTA ─────────────────────────────────────────────
  document.querySelectorAll('.cta-open-dashboard').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      // Works whether landing is served standalone or inside an iframe
      if (window.top && window.top !== window) {
        window.top.location.href = '/dashboard';
      } else {
        window.location.href = '/dashboard';
      }
    });
  });

  // ── 2. Initialize 360° Interactive 3D City Engine ─────────────────────
  const canvas360 = document.getElementById('city-360-canvas');
  if (canvas360) {
    window.city360 = new City360('city-360-canvas', 'city-360-container');

    // Compass Preset Buttons (N 0° / E 90° / S 180° / W 270°)
    document.querySelectorAll('.compass-preset-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const deg = parseFloat(btn.dataset.deg);
        if (window.city360) window.city360.setAzimuthDegrees(deg);
      });
    });

    // Layer toggles for 360 engine
    document.querySelectorAll('.city-360-layer-toggle').forEach(btn => {
      btn.addEventListener('click', () => {
        const layer = btn.dataset.layer;
        if (window.city360 && Object.prototype.hasOwnProperty.call(window.city360.layers, layer)) {
          window.city360.layers[layer] = !window.city360.layers[layer];
          btn.classList.toggle('active',   window.city360.layers[layer]);
          btn.classList.toggle('inactive', !window.city360.layers[layer]);
        }
      });
    });
  }

  // ── 3. Initialize Raipur GIS Map ──────────────────────────────────────
  const mapContainer = document.getElementById('raipur-map-mount');
  if (mapContainer) {
    window.raipurMap = new RaipurGISMap('raipur-map-mount');
  }

  // ── 4. Initialize Dashboard Analytics & Velocity Chart ───────────────
  const chartCanvas = document.getElementById('resolution-chart');
  if (chartCanvas) {
    window.urbanDashboard = new UrbanEyeDashboard('resolution-chart');

    const tfBtns = document.querySelectorAll('.chart-tf-btn');
    tfBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tfBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        window.urbanDashboard.setTimeframe(btn.dataset.tf);
      });
    });
  }

  // ── 5. Initialize Citizen Grievance Portal ────────────────────────────
  const citizenMount = document.getElementById('citizen-portal-mount');
  if (citizenMount) {
    window.citizenPortal = new CitizenGrievancePortal();
  }

  // ── 6. Mobile menu toggle ─────────────────────────────────────────────
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileNav     = document.getElementById('mobile-nav');
  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', () => mobileNav.classList.toggle('hidden'));
  }

  // ── 7. Architecture Modal ─────────────────────────────────────────────
  const sihBtn   = document.getElementById('arch-showcase-btn');
  const sihModal = document.getElementById('arch-modal');
  const sihClose = document.getElementById('arch-modal-close');
  if (sihBtn  && sihModal) sihBtn.addEventListener('click',  () => sihModal.classList.remove('hidden'));
  if (sihClose && sihModal) sihClose.addEventListener('click', () => sihModal.classList.add('hidden'));

  // ── 8. Encroachment Simulation ────────────────────────────────────────
  const simEncroachBtn = document.getElementById('sim-encroach-btn');
  if (simEncroachBtn) {
    simEncroachBtn.addEventListener('click', () => {
      window.triggerNotification(
        '⚠️ High Encroachment Alert Detected (Raipur)!',
        'AI Spatial Audit flagged 54m² unapproved construction at Parcel #CG-RPR-TTB-01 (Tatibandh Corridor, Ward 12).'
      );
      const mapSec = document.getElementById('gis-map-section');
      if (mapSec) {
        mapSec.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          if (window.raipurMap) {
            const parcel = window.raipurMap.parcels.find(p => p.id === 'CG-RPR-TTB-01');
            if (parcel) window.raipurMap.openInspector(parcel);
          }
        }, 600);
      }
    });
  }
});

// ── Global Toast Notification (light theme) ────────────────────────────
window.triggerNotification = function(title, message) {
  let box = document.getElementById('toast-container');
  if (!box) {
    box = document.createElement('div');
    box.id = 'toast-container';
    box.className = 'fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full px-4';
    document.body.appendChild(box);
  }

  const toast = document.createElement('div');
  toast.className = [
    'pointer-events-auto flex items-start gap-3',
    'bg-[#fcfcfc] border border-[#043f2e]/15 rounded-xl p-3.5 shadow-lg',
    'transform transition-all duration-300 translate-y-4 opacity-0'
  ].join(' ');
  toast.innerHTML = `
    <div class="w-8 h-8 rounded-lg bg-[#c8f169]/30 flex items-center justify-center text-[#043f2e] shrink-0 mt-0.5">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    </div>
    <div class="flex-1">
      <h5 class="text-xs font-bold text-[#043f2e] mb-0.5">${title}</h5>
      <p class="text-[11px] text-[#242423] leading-relaxed">${message}</p>
    </div>
    <button onclick="this.parentElement.remove()" class="text-[#242423]/40 hover:text-[#043f2e] p-1">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
      </svg>
    </button>
  `;

  box.appendChild(toast);
  requestAnimationFrame(() => toast.classList.remove('translate-y-4', 'opacity-0'));
  setTimeout(() => { toast.classList.add('opacity-0', 'translate-y-4'); setTimeout(() => toast.remove(), 300); }, 5000);
};

// ── Global Node Inspector Modal (light theme) ──────────────────────────
window.showInteractiveModal = function({ title, category, data }) {
  let modal = document.getElementById('iso-node-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'iso-node-modal';
    modal.className = 'fixed inset-0 modal-overlay z-50 flex items-center justify-center p-4';
    document.body.appendChild(modal);
  }

  modal.classList.remove('hidden');
  modal.innerHTML = `
    <div class="bg-[#fcfcfc] border border-[#043f2e]/15 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
      <button onclick="document.getElementById('iso-node-modal').classList.add('hidden')"
        class="absolute top-4 right-4 text-[#242423]/40 hover:text-[#043f2e]">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
      <div class="flex items-center gap-2 mb-2">
        <span class="w-2.5 h-2.5 rounded-full bg-[#c8f169]"></span>
        <span class="text-xs font-mono text-[#043f2e] uppercase tracking-wider">${category}</span>
      </div>
      <h3 class="text-xl font-bold text-[#043f2e] mb-2">${title}</h3>
      <p class="text-xs text-[#242423] mb-4 leading-relaxed">${data.detail}</p>

      <div class="p-3 rounded-xl bg-[#eef2e3] border border-[#043f2e]/10 flex items-center justify-between text-xs font-mono mb-4">
        <span class="text-[#242423]">${data.metricLabel || 'METRIC'}</span>
        <span class="text-[#043f2e] font-bold">${data.metricVal || 'NOMINAL'}</span>
      </div>

      <div class="flex gap-2">
        <button onclick="document.getElementById('iso-node-modal').classList.add('hidden'); window.triggerNotification('Telemetry Synced', 'Live Raipur Smart City SCADA node query completed successfully.')"
          class="flex-1 py-2 bg-[#c8f169] hover:bg-[#b5e054] text-black font-bold text-xs rounded-xl transition-all">
          Query Live Telemetry
        </button>
        <button onclick="document.getElementById('iso-node-modal').classList.add('hidden')"
          class="px-4 py-2 bg-[#eef2e3] hover:bg-[#dde6cf] text-[#043f2e] text-xs rounded-xl font-medium transition-all border border-[#043f2e]/10">
          Close
        </button>
      </div>
    </div>
  `;
};
