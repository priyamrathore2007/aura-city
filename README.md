# Aura City — Smart Land & City Management Platform

> **“A Clearer View of Every City”**  
> Connecting land information, municipal assets, and citizens for smarter urban management across **Raipur & Atal Nagar (Chhattisgarh)**.  
> *Developed as a prototype for the Smart India Hackathon (SIH 2024).*

---

## 🌟 Key Innovations & Features

### 1. 🔄 360° Interactive Moveable 3D Smart City Engine
- **Free 360° Drag & Rotate:** Click and drag with your mouse or finger to inspect the 3D smart city from any horizontal azimuth (0°–360°) and vertical elevation pitch.
- **Auto-Spinning Mode:** One-click continuous 360° orbital animation with smooth inertia.
- **Compass Presets:** Instant orientation snaps to North (0°), East (90°), South (180°), and West (270°) with live bearing readout.
- **Dynamic 3D City Elements:**
  - **Mahanadi Bhawan (CG State Secretariat):** Central administration enclave in Atal Nagar Sector 19.
  - **Pandri Commercial CBD:** Commercial IT and trade towers with illuminated window patterns.
  - **Telibandha Marine Drive Eco-Apartments:** Solar rooftop residential clusters.
  - **Moving 3D Traffic & Vehicles:** Animated light trails traversing concentric boulevards.
  - **3D Anchored Telemetry Markers:** Holographic pins that project coordinates in 3D world space as the city rotates.
- **Dual-Mode Switcher:** Toggle between **360° 3D Vector Model** and **Enhanced HD Spatial Twin** with 3D mouse parallax tilt and vertical laser GIS scanner.

---

### 2. 🗺️ Raipur & Atal Nagar GIS Spatial Twin (`raipur-map.js`)
Modeled directly on Raipur's iconic geography and synchronized with **Bhuiyan (Chhattisgarh Land Records Portal)**:
- **Water Bodies:** Telibandha Lake (Marine Drive), Swami Vivekananda Sarovar (Budha Talab), and Atal Nagar Lake Sector 24.
- **Transit Corridors:** GE Road (NH-53), VIP Road (Swami Vivekananda Airport corridor), and Atal Nagar Smart Expressway.
- **Bhuiyan CG Cadastral Parcels:**
  - `CG-RPR-ATN-01`: Atal Nagar Sector 19 Commercial Plot (Khasra 104/1-A, 24,500 m²).
  - `CG-RPR-PND-02`: Pandri Commercial Market Complex (Khasra 88/2-B, 14,800 m²).
  - `CG-RPR-SEC-01`: Mahanadi Bhawan State Secretariat Enclave (94,000 m²).
  - `CG-RPR-TLB-01`: Telibandha Marine Drive Eco-Zone.
  - `CG-RPR-TTB-01`: Tatibandh Arterial Corridor *(AI Encroachment Discrepancy Flagged)*.
- **Interactive Inspector Drawer:** Click any parcel or marker to inspect titleholder records, Khasra numbers, land area, property tax compliance, and download signed B-1 extracts.

---

### 3. 📊 Raipur Municipal Corporation (RMC) Dashboard
- **Real-Time KPIs:** 96.2% civic resolution SLA rate, 142,390 geotagged municipal assets, and ₹248.6 Cr in unregistered land revenue identified.
- **Velocity Chart:** Interactive Canvas chart tracking incoming citizen reports vs. resolved tickets (7-day / 30-day toggle).
- **Ward Efficiency Leaderboard:** Real-time performance tracking across Raipur's 70 municipal wards.

---

### 4. 📱 Citizen Grievance Portal & AI Classification
- **Computer-Vision Photo Previews:**
  - **GE Road Asphalt Cavity (`#CR-RPR-104`):** Near Jaistambh Chowk (AI Confidence: 98.4%).
  - **Pandri Commercial Market Waste Overflow (`#CR-RPR-208`):** (AI Confidence: 94.7%).
  - **VIP Road Luminaire Failure (`#CR-RPR-315`):** Airport corridor dark sector.
- **5-Stage Complaint Status Stepper:**
  `Report Filed` → `AI Vision Verified` → `Zonal Dispatch` → `Work In-Progress` → `Resolution Verified`.
- **Live Grievance Simulator:** Test filing an issue, select a ward, and watch the AI vision scanner classify and dispatch work orders in real time.

---

## 🚀 Getting Started

### Option 1: Direct Browser Launch
Open `index.html` directly in any modern browser (Chrome, Edge, Firefox, Safari).

### Option 2: Run Local Server
```bash
# Using Python:
python serve.py
# Server will run at http://localhost:4173
```

---

## 🛠️ Tech Stack & Architecture

- **Frontend:** HTML5, Modern Tailwind CSS, Custom Canvas 3D Vector Math Engine, Lucide Vector Icons.
- **GIS Cadastre Engine:** SVG Vector Projection with dynamic geo-fencing, EPSG:4326 (WGS84) standard, synchronized with Chhattisgarh Bhuiyan land records data.
- **3D City Projection Engine:** 3-axis isometric & perspective projection ($x', y', z'$ transformation matrices with depth-sorting and painter's algorithm).
- **Zero Heavy External Dependencies:** Fast, lightweight, fully offline-functional.

---

## 🏆 Smart India Hackathon (SIH 2024) Alignment
- **Problem Statement:** Smart Land & Municipal Asset Management for Urban Local Bodies (ULBs).
- **Pilot Jurisdiction:** Raipur Municipal Corporation (RMC) & Raipur Smart City Limited (RSCL), Chhattisgarh.
- **Impact:** Eliminates bureaucratic silos between State Revenue (Bhuiyan) and Municipal Operations, speeding up citizen resolution from 14 days to under 4 hours.

---

© 2024 **Aura City Team**. Developed for Smart India Hackathon.
