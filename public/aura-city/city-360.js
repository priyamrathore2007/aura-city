/**
 * Aura City — 360° Interactive 3D Smart City Engine (Raipur & Atal Nagar)
 * Allows free 360-degree rotation (mouse/touch drag, auto-spin, compass slider),
 * animated vehicular traffic, glowing streetlights, cadastral land parcels,
 * and 3D anchored telemetry markers.
 */

class City360 {
  constructor(canvasId, containerId) {
    this.canvas = document.getElementById(canvasId);
    this.container = document.getElementById(containerId);
    if (!this.canvas || !this.container) return;

    this.ctx = this.canvas.getContext('2d');

    // 3D Rotation angles (in radians)
    this.angleY = 0.55; // Horizontal azimuth (0 to 2*PI = 360 degrees)
    this.angleX = 0.62; // Elevation tilt angle (0.3 to 1.1)
    this.zoom = 1.0;

    // Interaction state
    this.isDragging = false;
    this.lastMouseX = 0;
    this.lastMouseY = 0;
    this.autoRotateSpeed = 0.004;
    this.autoRotate = true; // Auto-spin on by default

    // City Layers
    this.layers = {
      buildings: true,
      parcels: true,
      streetlights: true,
      alerts: true,
      traffic: true
    };

    this.hoveredMarker = null;
    this.trafficParticles = [];

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());

    this.initTraffic();
    this.setupMouseEvents();

    this.render = this.render.bind(this);
    this.animationFrameId = requestAnimationFrame(this.render);
  }

  resize() {
    const rect = this.container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    this.width = rect.width;
    this.height = rect.height || 520;

    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;

    this.ctx.resetTransform();
    this.ctx.scale(dpr, dpr);

    this.centerX = this.width / 2;
    this.centerY = this.height * 0.52;
  }

  // 3D World coordinates (x, y, z) to Screen coordinates (sx, sy, depth)
  project(x, y, z) {
    // 1. Rotate around Y axis (Azimuth angleY)
    const cosY = Math.cos(this.angleY);
    const sinY = Math.sin(this.angleY);
    const x1 = x * cosY - y * sinY;
    const y1 = x * sinY + y * cosY;
    const z1 = z;

    // 2. Rotate around X axis (Pitch angleX)
    const cosX = Math.cos(this.angleX);
    const sinX = Math.sin(this.angleX);
    const y2 = y1 * cosX - z1 * sinX;
    const z2 = y1 * sinX + z1 * cosX;
    const x2 = x1;

    // 3. Perspective & Orthographic combination projection
    const scale = 28 * this.zoom;
    const screenX = this.centerX + x2 * scale;
    const screenY = this.centerY + y2 * scale;

    return {
      x: screenX,
      y: screenY,
      depth: z2 // For depth sorting
    };
  }

  initTraffic() {
    this.trafficParticles = [];
    const roadTracks = [
      // Atal Nagar Express Ring
      { radius: 6.2, speed: 0.018, color: '#2dd4bf', size: 3.5, height: 0.1 },
      { radius: 6.5, speed: -0.016, color: '#38bdf8', size: 3.5, height: 0.1 },
      // Inner Boulevard Ring
      { radius: 3.8, speed: 0.024, color: '#22d3ee', size: 3.0, height: 0.1 },
      { radius: 4.1, speed: -0.022, color: '#f59e0b', size: 3.0, height: 0.1 },
      // Flyover Arc
      { radius: 8.0, speed: 0.028, color: '#a855f7', size: 4.0, height: 1.2 }
    ];

    roadTracks.forEach(track => {
      for (let i = 0; i < 4; i++) {
        this.trafficParticles.push({
          ...track,
          angle: (Math.PI * 2 / 4) * i + Math.random() * 0.5
        });
      }
    });
  }

  setupMouseEvents() {
    // Mouse down / Touch start
    const startDrag = (clientX, clientY) => {
      this.isDragging = true;
      this.lastMouseX = clientX;
      this.lastMouseY = clientY;
      this.autoRotate = false; // Pause auto-rotate when user drags
    };

    const moveDrag = (clientX, clientY) => {
      if (!this.isDragging) {
        this.checkMarkerHover(clientX, clientY);
        return;
      }

      const deltaX = clientX - this.lastMouseX;
      const deltaY = clientY - this.lastMouseY;

      // Rotate azimuth (horizontal 360 degrees)
      this.angleY += deltaX * 0.008;

      // Tilt elevation (clamped to realistic perspective)
      this.angleX += deltaY * 0.005;
      this.angleX = Math.max(0.25, Math.min(1.15, this.angleX));

      this.lastMouseX = clientX;
      this.lastMouseY = clientY;

      this.updateCompassDisplay();
    };

    const endDrag = () => {
      this.isDragging = false;
    };

    // Canvas listeners
    this.canvas.addEventListener('mousedown', (e) => startDrag(e.clientX, e.clientY));
    window.addEventListener('mousemove', (e) => moveDrag(e.clientX, e.clientY));
    window.addEventListener('mouseup', endDrag);

    // Touch support for tablets/mobile
    this.canvas.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        startDrag(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (e.touches.length === 1) {
        moveDrag(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    window.addEventListener('touchend', endDrag);

    // Zoom on wheel
    this.canvas.addEventListener('wheel', (e) => {
      e.preventDefault();
      this.zoom += e.deltaY * -0.001;
      this.zoom = Math.max(0.65, Math.min(1.5, this.zoom));
    }, { passive: false });

    // Marker click
    this.canvas.addEventListener('click', (e) => {
      if (this.hoveredMarker) {
        if (window.showInteractiveModal) {
          window.showInteractiveModal({
            title: this.hoveredMarker.title,
            category: this.hoveredMarker.category,
            data: {
              detail: this.hoveredMarker.detail,
              metricLabel: this.hoveredMarker.statLabel,
              metricVal: this.hoveredMarker.statVal
            }
          });
        }
      }
    });
  }

  checkMarkerHover(screenX, screenY) {
    const rect = this.canvas.getBoundingClientRect();
    const mx = screenX - rect.left;
    const my = screenY - rect.top;

    let found = null;
    if (this.markers) {
      for (const m of this.markers) {
        if (m.screenPos) {
          const dist = Math.hypot(mx - m.screenPos.x, my - m.screenPos.y);
          if (dist < 22) {
            found = m;
            break;
          }
        }
      }
    }

    this.hoveredMarker = found;
    this.canvas.style.cursor = found ? 'pointer' : (this.isDragging ? 'grabbing' : 'grab');

    const tooltip = document.getElementById('city-360-tooltip');
    if (tooltip) {
      if (found) {
        tooltip.style.display = 'block';
        tooltip.style.left = `${screenX + 16}px`;
        tooltip.style.top = `${screenY - 24}px`;
        tooltip.innerHTML = `
          <div class="flex items-center gap-2 mb-1">
            <span class="w-2 h-2 rounded-full ${found.color === 'rose' ? 'bg-rose-400 animate-ping' : 'bg-teal-400'}"></span>
            <span class="font-bold text-white text-xs">${found.title}</span>
            <span class="px-1.5 py-0.2 rounded text-[9px] uppercase font-mono bg-teal-500/20 text-teal-300 border border-teal-500/30">${found.category}</span>
          </div>
          <div class="text-[11px] text-slate-300 mb-1.5">${found.detail}</div>
          <div class="flex items-center justify-between pt-1 border-t border-slate-800 text-[10px] font-mono text-slate-400">
            <span>${found.statLabel}: <strong class="text-teal-300">${found.statVal}</strong></span>
            <span class="text-cyan-400">Click to Inspect</span>
          </div>
        `;
      } else {
        tooltip.style.display = 'none';
      }
    }
  }

  setAzimuthDegrees(deg) {
    this.angleY = (deg * Math.PI) / 180;
    this.updateCompassDisplay();
  }

  updateCompassDisplay() {
    let deg = Math.round((this.angleY * 180 / Math.PI) % 360);
    if (deg < 0) deg += 360;
    const compassEl = document.getElementById('compass-deg-val');
    if (compassEl) {
      compassEl.innerText = `${deg}°`;
    }
    const dial = document.getElementById('compass-dial-icon');
    if (dial) {
      dial.style.transform = `rotate(${-deg}deg)`;
    }
  }

  // Draw a 3D box (Building) with proper lighting based on sun angle
  draw3DBox(x, y, z, width, length, height, colors) {
    // 8 vertices of the box
    const v = [
      this.project(x - width/2, y - length/2, z),          // 0: Bottom-Back-Left
      this.project(x + width/2, y - length/2, z),          // 1: Bottom-Back-Right
      this.project(x + width/2, y + length/2, z),          // 2: Bottom-Front-Right
      this.project(x - width/2, y + length/2, z),          // 3: Bottom-Front-Left
      this.project(x - width/2, y - length/2, z + height), // 4: Top-Back-Left
      this.project(x + width/2, y - length/2, z + height), // 5: Top-Back-Right
      this.project(x + width/2, y + length/2, z + height), // 6: Top-Front-Right
      this.project(x - width/2, y + length/2, z + height)  // 7: Top-Front-Left
    ];

    // Compute average depth for depth sorting
    const centerProj = this.project(x, y, z + height / 2);

    return {
      depth: centerProj.depth,
      render: (ctx) => {
        // Faces: Top, Front, Right, Back, Left
        // 1. Top face (always visible from above)
        ctx.beginPath();
        ctx.moveTo(v[4].x, v[4].y);
        ctx.lineTo(v[5].x, v[5].y);
        ctx.lineTo(v[6].x, v[6].y);
        ctx.lineTo(v[7].x, v[7].y);
        ctx.closePath();
        ctx.fillStyle = colors.top || '#132847';
        ctx.fill();
        ctx.strokeStyle = colors.edge || 'rgba(45, 212, 191, 0.4)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // 2. Draw side walls depending on orientation
        const drawQuad = (p0, p1, p2, p3, fill, stroke) => {
          // Normal 2D cross product for back-face culling
          const cp = (p1.x - p0.x) * (p2.y - p0.y) - (p1.y - p0.y) * (p2.x - p0.x);
          if (cp > 0) { // Facing viewer
            ctx.beginPath();
            ctx.moveTo(p0.x, p0.y);
            ctx.lineTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.lineTo(p3.x, p3.y);
            ctx.closePath();
            ctx.fillStyle = fill;
            ctx.fill();
            if (stroke) {
              ctx.strokeStyle = stroke;
              ctx.lineWidth = 0.8;
              ctx.stroke();
            }
          }
        };

        // 4 side faces
        drawQuad(v[0], v[1], v[5], v[4], colors.sideA || '#0b192e', colors.edge);
        drawQuad(v[1], v[2], v[6], v[5], colors.sideB || '#0e223f', colors.edge);
        drawQuad(v[2], v[3], v[7], v[6], colors.sideC || '#11294d', colors.edge);
        drawQuad(v[3], v[0], v[4], v[7], colors.sideD || '#091526', colors.edge);

        // Windows illuminated pattern if tall building
        if (colors.windows && height > 1.8) {
          ctx.save();
          ctx.strokeStyle = colors.windowGlow || 'rgba(34, 211, 238, 0.6)';
          ctx.lineWidth = 1.2;
          const floors = Math.floor(height * 2.2);
          for (let f = 1; f < floors; f++) {
            const frac = f / floors;
            const leftX = v[3].x + (v[7].x - v[3].x) * frac;
            const leftY = v[3].y + (v[7].y - v[3].y) * frac;
            const rightX = v[2].x + (v[6].x - v[2].x) * frac;
            const rightY = v[2].y + (v[6].y - v[2].y) * frac;

            ctx.beginPath();
            ctx.moveTo(leftX + 2, leftY);
            ctx.lineTo(rightX - 2, rightY);
            ctx.stroke();
          }
          ctx.restore();
        }
      }
    };
  }

  // Draw Cadastral Land Parcel polygon on the ground (z = 0)
  drawParcel3D(points, color, label) {
    const projectedPts = points.map(p => this.project(p.x, p.y, 0));
    const centerProj = this.project(
      points.reduce((sum, p) => sum + p.x, 0) / points.length,
      points.reduce((sum, p) => sum + p.y, 0) / points.length,
      0
    );

    return {
      depth: centerProj.depth - 100, // Ground is always under buildings
      render: (ctx) => {
        ctx.beginPath();
        ctx.moveTo(projectedPts[0].x, projectedPts[0].y);
        for (let i = 1; i < projectedPts.length; i++) {
          ctx.lineTo(projectedPts[i].x, projectedPts[i].y);
        }
        ctx.closePath();
        ctx.fillStyle = color.fill;
        ctx.fill();
        ctx.strokeStyle = color.stroke;
        ctx.lineWidth = 1.4;
        ctx.stroke();

        if (label) {
          ctx.font = 'bold 8px "JetBrains Mono", monospace';
          ctx.fillStyle = color.textColor || '#94a3b8';
          ctx.textAlign = 'center';
          ctx.fillText(label, centerProj.x, centerProj.y);
        }
      }
    };
  }

  render() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);

    // Auto-spin if enabled
    if (this.autoRotate) {
      this.angleY += this.autoRotateSpeed;
      if (this.angleY > Math.PI * 2) this.angleY -= Math.PI * 2;
      this.updateCompassDisplay();
    }

    // 1. Draw Ambient Ground Grid & Circular Roads
    this.drawGroundPlane();

    // 2. Prepare all 3D render objects for depth sorting
    const renderQueue = [];

    // Cadastral Land Parcels (Bhuiyan CG Grid)
    if (this.layers.parcels) {
      // Commercial Sector (Pandri Hub)
      renderQueue.push(this.drawParcel3D([
        { x: 1.5, y: 1.5 }, { x: 4.8, y: 1.5 }, { x: 4.8, y: 4.5 }, { x: 1.5, y: 4.5 }
      ], {
        fill: 'rgba(6, 182, 212, 0.12)',
        stroke: 'rgba(6, 182, 212, 0.7)',
        textColor: '#38bdf8'
      }, 'PANDRI-C12'));

      // Residential Sector (Telibandha Greens)
      renderQueue.push(this.drawParcel3D([
        { x: -4.8, y: 1.5 }, { x: -1.5, y: 1.5 }, { x: -1.5, y: 4.8 }, { x: -4.8, y: 4.8 }
      ], {
        fill: 'rgba(99, 102, 241, 0.12)',
        stroke: 'rgba(129, 140, 248, 0.65)',
        textColor: '#a5b4fc'
      }, 'TELIBANDHA-R08'));

      // Atal Nagar Administrative Enclave (Mahanadi Bhawan)
      renderQueue.push(this.drawParcel3D([
        { x: -4.5, y: -4.5 }, { x: 4.5, y: -4.5 }, { x: 4.5, y: -1.5 }, { x: -4.5, y: -1.5 }
      ], {
        fill: 'rgba(20, 184, 166, 0.14)',
        stroke: '#2dd4bf',
        textColor: '#5eead4'
      }, 'ATAL NAGAR GOVT SECTOR 19'));
    }

    // 3. Buildings (Raipur / Atal Nagar Smart Architecture)
    if (this.layers.buildings) {
      // CENTER: Mahanadi Bhawan (Government Secretariat of Chhattisgarh)
      renderQueue.push(this.draw3DBox(0, -2.8, 0, 3.8, 1.8, 2.8, {
        top: '#14b8a6',
        sideA: '#0d9488',
        sideB: '#0f766e',
        sideC: '#115e59',
        sideD: '#0d9488',
        edge: '#5eead4',
        windows: true,
        windowGlow: '#cffafe'
      }));

      // Secretariat Central Dome & Atrium
      renderQueue.push(this.draw3DBox(0, -2.8, 2.8, 1.4, 1.2, 0.9, {
        top: '#38bdf8',
        sideA: '#0284c7',
        sideB: '#0369a1',
        sideC: '#075985',
        sideD: '#0284c7',
        edge: '#7dd3fc'
      }));

      // Commercial Towers (Pandri CBD & IT Park)
      renderQueue.push(this.draw3DBox(3.0, 3.0, 0, 1.8, 1.6, 6.2, {
        top: '#0284c7',
        sideA: '#0369a1',
        sideB: '#075985',
        sideC: '#0c4a6e',
        sideD: '#0369a1',
        edge: '#38bdf8',
        windows: true,
        windowGlow: 'rgba(34, 211, 238, 0.85)'
      }));

      // Commercial Twin Tower
      renderQueue.push(this.draw3DBox(4.2, 1.8, 0, 1.4, 1.4, 4.4, {
        top: '#0891b2',
        sideA: '#0e7490',
        sideB: '#155e75',
        sideC: '#164e63',
        sideD: '#0e7490',
        edge: '#22d3ee',
        windows: true
      }));

      // Residential Towers (Telibandha Eco-Residency with Solar Roofs)
      renderQueue.push(this.draw3DBox(-3.2, 3.2, 0, 1.9, 1.7, 4.2, {
        top: '#6366f1',
        sideA: '#4f46e5',
        sideB: '#4338ca',
        sideC: '#3730a3',
        sideD: '#4f46e5',
        edge: '#818cf8',
        windows: true,
        windowGlow: '#c7d2fe'
      }));

      // Solar Canopy Rooftop on Residential Block
      renderQueue.push(this.draw3DBox(-3.2, 3.2, 4.2, 1.5, 1.3, 0.3, {
        top: '#0284c7',
        sideA: '#0369a1',
        sideB: '#0369a1',
        sideC: '#0369a1',
        sideD: '#0369a1',
        edge: '#38bdf8'
      }));

      // Residential Wing 2
      renderQueue.push(this.draw3DBox(-1.8, 4.0, 0, 1.3, 1.5, 3.2, {
        top: '#4338ca',
        sideA: '#3730a3',
        sideB: '#312e81',
        sideC: '#312e81',
        sideD: '#3730a3',
        edge: '#a5b4fc',
        windows: true
      }));

      // Raipur Municipal Corporation Smart Control Annex
      renderQueue.push(this.draw3DBox(0, 3.8, 0, 1.6, 1.6, 2.2, {
        top: '#0f766e',
        sideA: '#115e59',
        sideB: '#134e4a',
        sideC: '#134e4a',
        sideD: '#115e59',
        edge: '#2dd4bf'
      }));
    }

    // 4. Sort all 3D elements by depth (Painter's Algorithm)
    renderQueue.sort((a, b) => a.depth - b.depth);

    // 5. Render sorted 3D elements
    renderQueue.forEach(item => item.render(ctx));

    // 6. Draw 3D Traffic moving along roads
    if (this.layers.traffic) {
      this.drawTraffic3D();
    }

    // 7. Draw Holographic Marker Pins (projected in 3D world space)
    this.drawMarkers3D();

    this.animationFrameId = requestAnimationFrame(this.render);
  }

  drawGroundPlane() {
    const ctx = this.ctx;

    // Outer circular arterial boulevard
    const rings = [3.8, 6.2, 8.0];
    rings.forEach((r, idx) => {
      ctx.beginPath();
      const segments = 36;
      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        const p = this.project(Math.cos(theta) * r, Math.sin(theta) * r, 0);
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.closePath();
      ctx.strokeStyle = idx === 1 ? 'rgba(45, 212, 191, 0.4)' : 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = idx === 1 ? 2.5 : 1.2;
      ctx.stroke();
    });

    // Radial Boulevards
    for (let i = 0; i < 4; i++) {
      const angle = (i * Math.PI / 2);
      const p1 = this.project(Math.cos(angle) * 1.5, Math.sin(angle) * 1.5, 0);
      const p2 = this.project(Math.cos(angle) * 8.2, Math.sin(angle) * 8.2, 0);
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.25)';
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }

  drawTraffic3D() {
    const ctx = this.ctx;
    this.trafficParticles.forEach(p => {
      p.angle += p.speed;
      const x = Math.cos(p.angle) * p.radius;
      const y = Math.sin(p.angle) * p.radius;
      const pos = this.project(x, y, p.height);

      ctx.save();
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, p.size * this.zoom, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.restore();
    });
  }

  drawMarkers3D() {
    this.markers = [
      {
        id: 'm-mahanadi',
        title: 'Mahanadi Bhawan (CG Secretariat)',
        category: 'ATAL NAGAR SMART HQ',
        worldPos: { x: 0, y: -2.8, z: 4.2 },
        color: 'teal',
        statLabel: 'LIVE STATUS',
        statVal: '70 Wards Online (99.98%)',
        detail: 'Central Command & Control Center (ICCC) for Raipur Smart City & Atal Nagar Development Authority.'
      },
      {
        id: 'm-pandri',
        title: 'Pandri Commercial & IT Tower',
        category: 'COMMERCIAL HUB',
        worldPos: { x: 3.0, y: 3.0, z: 6.8 },
        color: 'cyan',
        statLabel: 'SMART BMS',
        statVal: '92% Occupancy',
        detail: 'High-density commercial precinct with automated property tax assessment and EV fast-charging network.'
      },
      {
        id: 'm-telibandha',
        title: 'Marine Drive (Telibandha Lake)',
        category: 'ECO WATERFRONT',
        worldPos: { x: -3.2, y: 3.2, z: 4.8 },
        color: 'emerald',
        statLabel: 'SOLAR HARVEST',
        statVal: '54.2 kW/h Output',
        detail: 'Lakeside solar-integrated residential cluster with automated smart streetlights and zero tax arrears.'
      },
      {
        id: 'm-alert-ge',
        title: 'GE Road Pothole Alert #CR-204',
        category: 'CIVIC GRIEVANCE',
        worldPos: { x: 2.8, y: 0.2, z: 0.2 },
        color: 'rose',
        statLabel: 'SLA TIMER',
        statVal: '1h 20m Remaining',
        detail: 'Asphalt cavity detected via citizen photo near Jaistambh Chowk. AI classified 98.2%. RMC Road Squad on site.'
      }
    ];

    const ctx = this.ctx;
    const bounce = Math.sin(Date.now() / 250) * 4;

    this.markers.forEach(m => {
      const p = this.project(m.worldPos.x, m.worldPos.y, m.worldPos.z);
      m.screenPos = { x: p.x, y: p.y - 12 + bounce };

      const isHovered = this.hoveredMarker && this.hoveredMarker.id === m.id;
      const isAlert = m.color === 'rose';

      // Stem line
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(m.screenPos.x, m.screenPos.y + 6);
      ctx.strokeStyle = isAlert ? '#f43f5e' : '#2dd4bf';
      ctx.lineWidth = 1.4;
      ctx.stroke();

      // Pulsing Base Ring
      ctx.beginPath();
      ctx.arc(p.x, p.y, isHovered ? 8 : 5, 0, Math.PI * 2);
      ctx.fillStyle = isAlert ? 'rgba(244, 63, 94, 0.4)' : 'rgba(45, 212, 191, 0.4)';
      ctx.fill();

      // Marker Head
      ctx.save();
      ctx.beginPath();
      ctx.arc(m.screenPos.x, m.screenPos.y, isHovered ? 7 : 5.5, 0, Math.PI * 2);
      ctx.fillStyle = isAlert ? '#f43f5e' : (isHovered ? '#ffffff' : '#06b6d4');
      ctx.shadowColor = isAlert ? '#f43f5e' : '#22d3ee';
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.strokeStyle = '#081220';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();
    });
  }

  destroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }
}

window.City360 = City360;
