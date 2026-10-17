/**
 * UrbanEye — Municipal Dashboard & Visual Analytics Engine
 * Renders modern KPI statistic cards, interactive canvas charts for civic resolution,
 * ward efficiency leaderboard, and live municipal dispatch stream.
 */

class UrbanEyeDashboard {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.timeframe = '7d';
    this.chartData = {
      '7d': {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        reported: [142, 168, 155, 189, 210, 175, 130],
        resolved: [138, 162, 151, 184, 204, 170, 128]
      },
      '30d': {
        labels: ['W1', 'W2', 'W3', 'W4'],
        reported: [1120, 1250, 1310, 1180],
        resolved: [1080, 1210, 1270, 1150]
      }
    };

    if (this.canvas) {
      this.ctx = this.canvas.getContext('2d');
      this.initChart();
    }
  }

  initChart() {
    this.resizeChart();
    window.addEventListener('resize', () => this.resizeChart());
    this.renderChart();
  }

  resizeChart() {
    if (!this.canvas) return;
    const parent = this.canvas.parentElement;
    const dpr = window.devicePixelRatio || 1;
    const rect = parent.getBoundingClientRect();
    
    this.width = rect.width;
    this.height = 240;

    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;

    this.ctx.resetTransform();
    this.ctx.scale(dpr, dpr);
    this.renderChart();
  }

  setTimeframe(tf) {
    this.timeframe = tf;
    this.renderChart();
  }

  renderChart() {
    if (!this.ctx) return;
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;
    const padX = 45;
    const padY = 30;

    ctx.clearRect(0, 0, w, h);

    const data = this.chartData[this.timeframe];
    const maxVal = Math.max(...data.reported) * 1.18;

    // Draw grid horizontal lines
    const gridLines = 4;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
    ctx.lineWidth = 1;
    ctx.font = '10px "JetBrains Mono", monospace';
    ctx.fillStyle = '#64748b';
    ctx.textAlign = 'right';

    for (let i = 0; i <= gridLines; i++) {
      const y = padY + (h - padY * 2) * (i / gridLines);
      const val = Math.round(maxVal - (maxVal * (i / gridLines)));
      
      ctx.beginPath();
      ctx.moveTo(padX, y);
      ctx.lineTo(w - 20, y);
      ctx.stroke();

      ctx.fillText(val, padX - 8, y + 3);
    }

    const stepX = (w - padX - 30) / (data.labels.length - 1);

    // 1. Draw Reported Area (Cyan gradient fill)
    const reportedPoints = data.reported.map((val, idx) => ({
      x: padX + idx * stepX,
      y: padY + (h - padY * 2) * (1 - val / maxVal)
    }));

    // Area fill
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(reportedPoints[0].x, h - padY);
    reportedPoints.forEach(p => ctx.lineTo(p.x, p.y));
    ctx.lineTo(reportedPoints[reportedPoints.length - 1].x, h - padY);
    ctx.closePath();

    const areaGrad = ctx.createLinearGradient(0, padY, 0, h - padY);
    areaGrad.addColorStop(0, 'rgba(6, 182, 212, 0.25)');
    areaGrad.addColorStop(1, 'rgba(6, 182, 212, 0.0)');
    ctx.fillStyle = areaGrad;
    ctx.fill();
    ctx.restore();

    // 2. Draw Reported Line
    ctx.beginPath();
    reportedPoints.forEach((p, idx) => {
      if (idx === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    });
    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // 3. Draw Resolved Line (Teal dashed)
    const resolvedPoints = data.resolved.map((val, idx) => ({
      x: padX + idx * stepX,
      y: padY + (h - padY * 2) * (1 - val / maxVal)
    }));

    ctx.save();
    ctx.beginPath();
    ctx.setLineDash([4, 4]);
    resolvedPoints.forEach((p, idx) => {
      if (idx === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    });
    ctx.strokeStyle = '#2dd4bf';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();

    // Draw dots & labels
    reportedPoints.forEach((p, idx) => {
      // Dot
      ctx.beginPath();
      ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#06b6d4';
      ctx.fill();
      ctx.strokeStyle = '#082f49';
      ctx.lineWidth = 2;
      ctx.stroke();

      // X Label
      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(data.labels[idx], p.x, h - 10);
    });
  }
}

window.UrbanEyeDashboard = UrbanEyeDashboard;
