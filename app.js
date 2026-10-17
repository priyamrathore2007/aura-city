/**
 * Aura City — Main Application Coordinator & Showcase Hub
 * Coordinates 360° Rotatable 3D City Engine, Enhanced HD Spatial View,
 * Raipur GIS Map, Dashboard Analytics, and Citizen Grievance Portal.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize 360° Interactive 3D City Engine
  const canvas360 = document.getElementById('city-360-canvas');
  if (canvas360) {
    window.city360 = new City360('city-360-canvas', 'city-360-container');

    // Compass Preset Buttons (North 0°, East 90°, South 180°, West 270°)
    const compassBtns = document.querySelectorAll('.compass-preset-btn');
    compassBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const deg = parseFloat(btn.dataset.deg);
        if (window.city360) {
          window.city360.setAzimuthDegrees(deg);
        }
      });
    });

    // Auto-Rotate 360 Toggle Button
    const autoRotateBtn = document.getElementById('btn-auto-rotate-360');
    if (autoRotateBtn) {
      autoRotateBtn.addEventListener('click', () => {
        if (window.city360) {
          window.city360.toggleAutoRotate();
        }
      });
    }

    // Layer toggles for 360 engine
    const layerToggles360 = document.querySelectorAll('.city-360-layer-toggle');
    layerToggles360.forEach(btn => {
      btn.addEventListener('click', () => {
        const layer = btn.dataset.layer;
        if (window.city360 && window.city360.layers.hasOwnProperty(layer)) {
          window.city360.layers[layer] = !window.city360.layers[layer];
          btn.classList.toggle('bg-teal-500/20', window.city360.layers[layer]);
          btn.classList.toggle('border-teal-400', window.city360.layers[layer]);
          btn.classList.toggle('text-teal-300', window.city360.layers[layer]);
          btn.classList.toggle('bg-slate-900/80', !window.city360.layers[layer]);
          btn.classList.toggle('border-slate-700', !window.city360.layers[layer]);
          btn.classList.toggle('text-slate-400', !window.city360.layers[layer]);
        }
      });
    });
  }

  // 2. Initialize Enhanced HD Spatial Twin in background tab
  const cityMount = document.getElementById('city-hd-container');
  if (cityMount) {
    window.cityShowcase = new CityShowcase('city-hd-container');
  }

  // 3. Mode Switcher: 360° 3D Interactive Model VS Enhanced HD Satellite View
  const btnMode360 = document.getElementById('btn-mode-360');
  const btnModeHD = document.getElementById('btn-mode-hd');
  const view360 = document.getElementById('view-mode-360');
  const viewHD = document.getElementById('view-mode-hd');

  if (btnMode360 && btnModeHD && view360 && viewHD) {
    btnMode360.addEventListener('click', () => {
      btnMode360.classList.add('bg-teal-500/20', 'border-teal-400', 'text-teal-300');
      btnMode360.classList.remove('bg-slate-900/80', 'border-slate-700', 'text-slate-400');
      btnModeHD.classList.remove('bg-teal-500/20', 'border-teal-400', 'text-teal-300');
      btnModeHD.classList.add('bg-slate-900/80', 'border-slate-700', 'text-slate-400');

      view360.classList.remove('hidden');
      viewHD.classList.add('hidden');

      if (window.city360) {
        window.city360.resize();
      }
    });

    btnModeHD.addEventListener('click', () => {
      btnModeHD.classList.add('bg-teal-500/20', 'border-teal-400', 'text-teal-300');
      btnModeHD.classList.remove('bg-slate-900/80', 'border-slate-700', 'text-slate-400');
      btnMode360.classList.remove('bg-teal-500/20', 'border-teal-400', 'text-teal-300');
      btnMode360.classList.add('bg-slate-900/80', 'border-slate-700', 'text-slate-400');

      viewHD.classList.remove('hidden');
      view360.classList.add('hidden');

      if (window.cityShowcase) {
        window.cityShowcase.render();
      }
    });
  }

  // 4. Initialize Raipur GIS Map
  const mapContainer = document.getElementById('raipur-map-mount');
  if (mapContainer) {
    window.raipurMap = new RaipurGISMap('raipur-map-mount');
  }

  // 5. Initialize Dashboard Analytics & Velocity Chart
  const chartCanvas = document.getElementById('resolution-chart');
  if (chartCanvas) {
    window.urbanDashboard = new UrbanEyeDashboard('resolution-chart');

    const tfBtns = document.querySelectorAll('.chart-tf-btn');
    tfBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tfBtns.forEach(b => {
          b.classList.remove('bg-teal-500/20', 'border-teal-400', 'text-teal-300');
          b.classList.add('bg-slate-800', 'border-slate-700', 'text-slate-400');
        });
        btn.classList.add('bg-teal-500/20', 'border-teal-400', 'text-teal-300');
        btn.classList.remove('bg-slate-800', 'border-slate-700', 'text-slate-400');
        window.urbanDashboard.setTimeframe(btn.dataset.tf);
      });
    });
  }

  // 6. Initialize Citizen Grievance Portal
  const citizenMount = document.getElementById('citizen-portal-mount');
  if (citizenMount) {
    window.citizenPortal = new CitizenGrievancePortal();
  }

  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav');
  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileNav.classList.toggle('hidden');
    });
  }

  // SIH Showcase Modal triggers
  const sihBtn = document.getElementById('sih-showcase-btn');
  const sihModal = document.getElementById('sih-modal');
  const sihClose = document.getElementById('sih-modal-close');

  if (sihBtn && sihModal) {
    sihBtn.addEventListener('click', () => {
      sihModal.classList.remove('hidden');
    });
  }

  if (sihClose && sihModal) {
    sihClose.addEventListener('click', () => {
      sihModal.classList.add('hidden');
    });
  }

  // Encroachment Simulation Button (Tatibandh, Raipur)
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

// Global Toast Notification System
window.triggerNotification = function(title, message) {
  let toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.className = 'fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full px-4';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = 'pointer-events-auto bg-slate-950/95 border border-teal-500/40 rounded-xl p-3.5 shadow-2xl backdrop-blur-md transform transition-all duration-300 translate-y-4 opacity-0 flex items-start gap-3';
  toast.innerHTML = `
    <div class="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400 shrink-0 mt-0.5">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
    </div>
    <div class="flex-1">
      <h5 class="text-xs font-bold text-white mb-0.5">${title}</h5>
      <p class="text-[11px] text-slate-300 leading-relaxed">${message}</p>
    </div>
    <button onclick="this.parentElement.remove()" class="text-slate-500 hover:text-white p-1">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
    </button>
  `;

  toastContainer.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.remove('translate-y-4', 'opacity-0');
  });

  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-4');
    setTimeout(() => toast.remove(), 300);
  }, 4800);
};

// Global Node Inspector Modal
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
    <div class="bg-slate-950 border border-teal-500/40 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
      <button onclick="document.getElementById('iso-node-modal').classList.add('hidden')" class="absolute top-4 right-4 text-slate-400 hover:text-white">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
      </button>
      <div class="flex items-center gap-2 mb-2">
        <span class="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
        <span class="text-xs font-mono text-cyan-300 uppercase tracking-wider">${category}</span>
      </div>
      <h3 class="text-xl font-bold text-white mb-2">${title}</h3>
      <p class="text-xs text-slate-300 mb-4 leading-relaxed">${data.detail}</p>

      <div class="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs font-mono mb-4">
        <span class="text-slate-400">${data.metricLabel || 'METRIC'}</span>
        <span class="text-teal-300 font-bold">${data.metricVal || 'NOMINAL'}</span>
      </div>

      <div class="flex gap-2">
        <button onclick="document.getElementById('iso-node-modal').classList.add('hidden'); window.triggerNotification('Telemetry Synced', 'Live Raipur Smart City SCADA node query completed successfully.')" class="flex-1 py-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs rounded-xl transition-all">
          Query Live Telemetry
        </button>
        <button onclick="document.getElementById('iso-node-modal').classList.add('hidden')" class="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-xl font-medium transition-all">
          Close
        </button>
      </div>
    </div>
  `;
};
