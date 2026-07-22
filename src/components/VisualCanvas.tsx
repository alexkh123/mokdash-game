import React, { useEffect, useRef } from 'react';
import { ChapterId } from '../types';

interface VisualCanvasProps {
  chapterId: ChapterId;
  isNight?: boolean;
  isCelebrating?: boolean;
}

export const VisualCanvas: React.FC<VisualCanvasProps> = ({ chapterId, isCelebrating = false }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let tick = 0;

    // Fire & celebration particles
    const particles: { x: number; y: number; vx: number; vy: number; color: string; size: number; alpha: number }[] = [];

    const resize = () => {
      if (!canvas) return;
      canvas.width = canvas.parentElement?.clientWidth || 800;
      canvas.height = canvas.parentElement?.clientHeight || 450;
    };

    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      tick++;
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      // Render chapter-specific high quality background art
      if (chapterId === 1) {
        // ==========================================
        // Chapter 1: Haifa - Port & Mt. Carmel Courtyard & Journey Blueprint
        // ==========================================
        // Sky: Bright coastal morning
        const skyGrad = ctx.createLinearGradient(0, 0, 0, h * 0.6);
        skyGrad.addColorStop(0, '#bae6fd'); // Clear Mediterranean sky
        skyGrad.addColorStop(0.5, '#e0f2fe');
        skyGrad.addColorStop(1, '#fef3c7');
        ctx.fillStyle = skyGrad;
        ctx.fillRect(0, 0, w, h);

        // Sun over Carmel Coast
        ctx.fillStyle = '#fef08a';
        ctx.beginPath();
        ctx.arc(w * 0.75, h * 0.18, 38, 0, Math.PI * 2);
        ctx.fill();

        // Mediterranean Sea (Haifa Bay - Left side)
        const seaGrad = ctx.createLinearGradient(0, h * 0.45, w * 0.55, h * 0.75);
        seaGrad.addColorStop(0, '#0284c7');
        seaGrad.addColorStop(1, '#0369a1');
        ctx.fillStyle = seaGrad;
        ctx.beginPath();
        ctx.moveTo(0, h * 0.45);
        ctx.lineTo(w * 0.55, h * 0.52);
        ctx.lineTo(w * 0.5, h * 0.7);
        ctx.lineTo(0, h * 0.7);
        ctx.fill();

        // Animated Sea Waves
        ctx.strokeStyle = '#e0f2fe';
        ctx.lineWidth = 1.5;
        for (let i = 0; i < 4; i++) {
          const wy = h * 0.48 + i * 12 + Math.sin(tick * 0.04 + i) * 2;
          ctx.beginPath();
          ctx.moveTo(0, wy);
          ctx.quadraticCurveTo(w * 0.2, wy - 3, w * 0.4, wy + 2);
          ctx.stroke();
        }

        // Mount Carmel slopes (Right side rising)
        ctx.fillStyle = '#15803d'; // Carmel green
        ctx.beginPath();
        ctx.moveTo(w * 0.35, h * 0.7);
        ctx.quadraticCurveTo(w * 0.6, h * 0.35, w, h * 0.25);
        ctx.lineTo(w, h * 0.7);
        ctx.fill();

        ctx.fillStyle = '#166534';
        ctx.beginPath();
        ctx.moveTo(w * 0.5, h * 0.7);
        ctx.quadraticCurveTo(w * 0.75, h * 0.42, w, h * 0.38);
        ctx.lineTo(w, h * 0.7);
        ctx.fill();

        // Pine & Olive trees on Carmel
        ctx.fillStyle = '#14532d';
        for (let t = 0; t < 5; t++) {
          const tx = w * 0.6 + t * (w * 0.08);
          const ty = h * 0.48 - t * 15;
          ctx.beginPath();
          ctx.arc(tx, ty, 18, 0, Math.PI * 2);
          ctx.fill();
        }

        // Haifa Courtyard Stone Terrace Floor
        const courtyardGrad = ctx.createLinearGradient(0, h * 0.65, 0, h);
        courtyardGrad.addColorStop(0, '#d97706');
        courtyardGrad.addColorStop(1, '#92400e');
        ctx.fillStyle = courtyardGrad;
        ctx.fillRect(0, h * 0.65, w, h * 0.35);

        // Stone paving lines
        ctx.strokeStyle = '#78350f';
        ctx.lineWidth = 1;
        for (let x = 0; x < w; x += 60) {
          ctx.beginPath();
          ctx.moveTo(x, h * 0.65);
          ctx.lineTo(x - 40, h);
          ctx.stroke();
        }

        // Ancient Haifa Stone House & Arch on Left
        ctx.fillStyle = '#b45309';
        ctx.fillRect(0, h * 0.35, w * 0.22, h * 0.35);
        ctx.fillStyle = '#78350f';
        ctx.beginPath();
        ctx.arc(w * 0.11, h * 0.5, 30, Math.PI, 0);
        ctx.fillRect(w * 0.08, h * 0.5, 36, h * 0.2);
        ctx.fill();

        // Parchment Journey Scroll Map (Haifa -> Jerusalem & Temple)
        ctx.fillStyle = '#fef3c7';
        ctx.strokeStyle = '#b45309';
        ctx.lineWidth = 2;
        const mapX = w * 0.38;
        const mapY = h * 0.68;
        const mapW = w * 0.28;
        const mapH = h * 0.26;
        ctx.fillRect(mapX, mapY, mapW, mapH);
        ctx.strokeRect(mapX, mapY, mapW, mapH);

        // Map Route Line: Haifa -> Jerusalem
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 2.5;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(mapX + 15, mapY + 20); // Haifa
        ctx.quadraticCurveTo(mapX + mapW * 0.5, mapY + mapH * 0.6, mapX + mapW - 20, mapY + mapH - 20); // Jerusalem
        ctx.stroke();
        ctx.setLineDash([]); // Reset line dash

        // Map Start & End Points
        ctx.fillStyle = '#0284c7';
        ctx.beginPath();
        ctx.arc(mapX + 15, mapY + 20, 5, 0, Math.PI * 2); // Haifa
        ctx.fill();

        // Jerusalem Temple Icon on Map
        ctx.fillStyle = '#eab308';
        ctx.beginPath();
        ctx.arc(mapX + mapW - 20, mapY + mapH - 20, 8, 0, Math.PI * 2); // Jerusalem Temple
        ctx.fill();

      } else if (chapterId === 2) {
        // ==========================================
        // Chapter 2: Road to Jerusalem & Mt. Scopus Overlook of Beit HaMikdash
        // ==========================================
        // Sunset sky over Judean Hills
        const skyGrad = ctx.createLinearGradient(0, 0, 0, h);
        skyGrad.addColorStop(0, '#1e1b4b'); // Deep indigo top
        skyGrad.addColorStop(0.3, '#7c2d12'); // Amber twilight
        skyGrad.addColorStop(0.6, '#ea580c');
        skyGrad.addColorStop(1, '#fef08a');
        ctx.fillStyle = skyGrad;
        ctx.fillRect(0, 0, w, h);

        // Setting Sun
        ctx.fillStyle = '#fef08a';
        ctx.beginPath();
        ctx.arc(w * 0.5, h * 0.38, 40, 0, Math.PI * 2);
        ctx.fill();

        // DISTANT HOLY TEMPLE (Beit HaMikdash) Silhouette on Mount Moriah
        const templeX = w * 0.5;
        const templeY = h * 0.34;

        // White Marble & Golden Facade of Heichal
        ctx.fillStyle = '#fef08a';
        ctx.fillRect(templeX - 35, templeY - 30, 70, 30); // Main sanctuary
        ctx.fillStyle = '#eab308';
        ctx.fillRect(templeX - 42, templeY - 36, 84, 8); // Golden roof cornice
        ctx.fillRect(templeX - 10, templeY - 22, 20, 22); // Golden Entrance

        // Temple Courtyard Walls (Kotel / Soreg)
        ctx.fillStyle = '#b45309';
        ctx.fillRect(templeX - 70, templeY, 140, 15);

        // Rising Sacred Altar Smoke Column
        ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
        for (let s = 0; s < 6; s++) {
          const smY = templeY - 35 - s * 14;
          const smX = templeX + Math.sin(tick * 0.05 + s) * 8;
          ctx.beginPath();
          ctx.arc(smX, smY, 10 + s * 3, 0, Math.PI * 2);
          ctx.fill();
        }

        // Rolling Mountains Layers
        ctx.fillStyle = '#9a3412';
        ctx.beginPath();
        ctx.moveTo(0, h * 0.45);
        ctx.quadraticCurveTo(w * 0.3, h * 0.38, w * 0.6, h * 0.48);
        ctx.quadraticCurveTo(w * 0.8, h * 0.52, w, h * 0.42);
        ctx.lineTo(w, h);
        ctx.lineTo(0, h);
        ctx.fill();

        ctx.fillStyle = '#7c2d12';
        ctx.beginPath();
        ctx.moveTo(0, h * 0.58);
        ctx.quadraticCurveTo(w * 0.4, h * 0.48, w * 0.8, h * 0.6);
        ctx.lineTo(w, h * 0.55);
        ctx.lineTo(w, h);
        ctx.lineTo(0, h);
        ctx.fill();

        // Winding Pilgrims' Trail
        ctx.fillStyle = '#fef3c7';
        ctx.beginPath();
        ctx.moveTo(w * 0.5, h * 0.55);
        ctx.quadraticCurveTo(w * 0.35, h * 0.72, w * 0.08, h);
        ctx.lineTo(w * 0.28, h);
        ctx.quadraticCurveTo(w * 0.48, h * 0.76, w * 0.54, h * 0.55);
        ctx.fill();

        // Pilgrim Silhouettes Walking
        ctx.fillStyle = '#451a03';
        for (let p = 0; p < 3; p++) {
          const px = w * 0.18 + p * 35;
          const py = h * 0.82 - p * 15;
          ctx.beginPath();
          ctx.arc(px, py - 14, 5, 0, Math.PI * 2); // Head
          ctx.fillRect(px - 3, py - 9, 6, 12); // Body
          ctx.fill();
        }

      } else if (chapterId === 3) {
        // ==========================================
        // Chapter 3: Jerusalem Market & Pure Mikveh
        // ==========================================
        // Sunset over Jerusalem Stone Walls
        const skyGrad = ctx.createLinearGradient(0, 0, 0, h * 0.5);
        skyGrad.addColorStop(0, '#f59e0b');
        skyGrad.addColorStop(1, '#b45309');
        ctx.fillStyle = skyGrad;
        ctx.fillRect(0, 0, w, h);

        // Jerusalem Limestone Arches & Market Stalls
        ctx.fillStyle = '#78350f';
        ctx.fillRect(0, h * 0.2, w * 0.28, h * 0.8);
        ctx.fillRect(w * 0.72, h * 0.2, w * 0.28, h * 0.8);

        // Top Jerusalem Stone Wall Arch
        ctx.beginPath();
        ctx.arc(w * 0.5, h * 0.2, w * 0.3, Math.PI, 0);
        ctx.fillStyle = '#451a03';
        ctx.fill();

        // Temple Wall Outline in distant background
        ctx.fillStyle = '#eab308';
        ctx.fillRect(w * 0.38, h * 0.12, w * 0.24, h * 0.08);

        // MIKVEH - Pure Water Pool Area (Lower Center)
        const poolX = w * 0.2;
        const poolY = h * 0.65;
        const poolW = w * 0.6;
        const poolH = h * 0.35;

        // Mikveh Stone Steps
        ctx.fillStyle = '#d97706';
        for (let st = 0; st < 4; st++) {
          ctx.fillRect(poolX + st * 15, poolY + st * 12, poolW - st * 30, 10);
        }

        // Pure Crystalline Mikveh Water
        const waterGrad = ctx.createLinearGradient(0, poolY + 40, 0, h);
        waterGrad.addColorStop(0, '#0284c7');
        waterGrad.addColorStop(1, '#0369a1');
        ctx.fillStyle = waterGrad;
        ctx.fillRect(poolX + 45, poolY + 40, poolW - 90, poolH - 40);

        // Animated Water Ripples
        ctx.strokeStyle = '#e0f2fe';
        ctx.lineWidth = 1.5;
        for (let r = 0; r < 4; r++) {
          const rx = w * 0.4 + (r % 2) * 50;
          const ry = poolY + 55 + r * 15 + Math.sin(tick * 0.06 + r) * 3;
          ctx.beginPath();
          ctx.ellipse(rx, ry, 25, 6, 0, 0, Math.PI * 2);
          ctx.stroke();
        }

      } else if (chapterId === 4) {
        // ==========================================
        // Chapter 4: Temple Mount Plaza & Chambers (Azarat Nashim)
        // ==========================================
        // Bright Sky over Temple Mount
        const skyGrad = ctx.createLinearGradient(0, 0, 0, h);
        skyGrad.addColorStop(0, '#38bdf8');
        skyGrad.addColorStop(0.6, '#fef08a');
        skyGrad.addColorStop(1, '#fef3c7');
        ctx.fillStyle = skyGrad;
        ctx.fillRect(0, 0, w, h);

        // Grand Marble Columns of the Temple Mount
        const colWidth = 32;
        for (let i = 0; i < 6; i++) {
          const cx = w * 0.08 + i * (w * 0.17);
          ctx.fillStyle = '#fef3c7'; // White Marble
          ctx.fillRect(cx, h * 0.12, colWidth, h * 0.62);

          // Golden Capital & Base
          ctx.fillStyle = '#eab308';
          ctx.fillRect(cx - 6, h * 0.12, colWidth + 12, 14); // Capital
          ctx.fillRect(cx - 6, h * 0.72, colWidth + 12, 14); // Base
        }

        // Temple Mount Stone Plaza
        ctx.fillStyle = '#d97706';
        ctx.fillRect(0, h * 0.74, w, h * 0.26);

        // Chamber of Wood (Lishkat HaEtzim) Stacked Logs - Left
        ctx.fillStyle = '#78350f';
        ctx.fillRect(w * 0.02, h * 0.6, w * 0.18, h * 0.16);
        ctx.fillStyle = '#b45309';
        for (let log = 0; log < 4; log++) {
          ctx.beginPath();
          ctx.arc(w * 0.05 + log * 20, h * 0.65, 8, 0, Math.PI * 2);
          ctx.fill();
        }

        // Chamber of Oils (Lishkat HaShemanim) Press & Jars - Right
        ctx.fillStyle = '#eab308';
        ctx.beginPath();
        ctx.ellipse(w * 0.9, h * 0.66, 14, 22, 0, 0, Math.PI * 2); // Golden oil amphora
        ctx.fill();

        // God Rays / Light Beams streaming down
        ctx.fillStyle = 'rgba(254, 240, 138, 0.18)';
        ctx.beginPath();
        ctx.moveTo(w * 0.2, 0);
        ctx.lineTo(w * 0.45, h);
        ctx.lineTo(w * 0.3, h);
        ctx.fill();

      } else if (chapterId === 5) {
        // ==========================================
        // Chapter 5: Courtyard of Israel (Azarat Yisrael) & Nicanor Steps & Levites
        // ==========================================
        // Celestial Azure Sky
        const skyGrad = ctx.createLinearGradient(0, 0, 0, h);
        skyGrad.addColorStop(0, '#0284c7');
        skyGrad.addColorStop(0.5, '#38bdf8');
        skyGrad.addColorStop(1, '#fef08a');
        ctx.fillStyle = skyGrad;
        ctx.fillRect(0, 0, w, h);

        // Golden Nicanor Gate Doors (Center)
        ctx.fillStyle = '#eab308';
        ctx.fillRect(w * 0.35, h * 0.15, w * 0.3, h * 0.35);
        ctx.fillStyle = '#ca8a04';
        ctx.fillRect(w * 0.49, h * 0.15, 4, h * 0.35); // Gate divide

        // Nicanor 15 Semicircular Marble Steps
        for (let s = 0; s < 10; s++) {
          const sy = h * 0.48 + s * 14;
          const sw = w * (0.75 - s * 0.04);
          const sx = (w - sw) / 2;
          ctx.fillStyle = s % 2 === 0 ? '#fef3c7' : '#fde047';
          ctx.fillRect(sx, sy, sw, 12);
        }

        // Great Altar (Mizbe'ach) on Right
        const altarX = w * 0.78;
        const altarY = h * 0.45;
        ctx.fillStyle = '#78350f';
        ctx.fillRect(altarX, altarY, w * 0.18, h * 0.35);

        // Roaring Holy Altar Flame & Smoke
        for (let f = 0; f < 10; f++) {
          const fx = altarX + w * 0.09 + Math.sin(tick * 0.1 + f) * 20;
          const fy = altarY - (tick % 25 + f * 4);
          ctx.fillStyle = f % 2 === 0 ? '#ef4444' : '#f59e0b';
          ctx.beginPath();
          ctx.arc(fx, fy, Math.random() * 8 + 4, 0, Math.PI * 2);
          ctx.fill();
        }

      } else if (chapterId === 6) {
        // ==========================================
        // Chapter 6: Inner Sanctuary (Heichal) & Simchat Beit HaShoeva Celebration
        // ==========================================
        // Festive Twilight Sky
        const skyGrad = ctx.createLinearGradient(0, 0, 0, h);
        skyGrad.addColorStop(0, '#311b92');
        skyGrad.addColorStop(0.5, '#b45309');
        skyGrad.addColorStop(1, '#451a03');
        ctx.fillStyle = skyGrad;
        ctx.fillRect(0, 0, w, h);

        // Towers of the Golden Sanctuary (Heichal Facade)
        const heichalX = w * 0.25;
        const heichalY = h * 0.1;
        const heichalW = w * 0.5;

        // White Marble Wall & Gold Roof Spikes (Kilah Oreb)
        ctx.fillStyle = '#fef3c7';
        ctx.fillRect(heichalX, heichalY, heichalW, h * 0.55);

        // Gold Trim & Pillars Jachin & Boaz
        ctx.fillStyle = '#eab308';
        ctx.fillRect(heichalX - 10, heichalY - 10, heichalW + 20, 16); // Golden roof cornice
        ctx.fillRect(heichalX + 20, heichalY + 20, 24, h * 0.5); // Pillar Jachin
        ctx.fillRect(heichalX + heichalW - 44, heichalY + 20, 24, h * 0.5); // Pillar Boaz

        // Sanctuary Entrance Golden Gate
        ctx.fillStyle = '#ca8a04';
        ctx.fillRect(w * 0.42, heichalY + h * 0.15, w * 0.16, h * 0.4);

        // Altar Platform Base
        ctx.fillStyle = '#78350f';
        ctx.fillRect(0, h * 0.65, w, h * 0.35);

        // Holy Altar Fire Sparks
        for (let i = 0; i < 15; i++) {
          const sparkX = w * 0.2 + Math.sin(tick * 0.08 + i) * (w * 0.6);
          const sparkY = h * 0.65 - (tick * 2 + i * 15) % (h * 0.5);
          ctx.fillStyle = i % 3 === 0 ? '#fef08a' : '#f97316';
          ctx.beginPath();
          ctx.arc(sparkX, sparkY, 4, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Celebration Particles (Fireworks / Torch Sparks for Simchat HeChag)
      if (isCelebrating) {
        if (particles.length < 80) {
          particles.push({
            x: Math.random() * w,
            y: h * 0.3,
            vx: (Math.random() - 0.5) * 10,
            vy: (Math.random() - 0.5) * 10 - 4,
            color: ['#f59e0b', '#38bdf8', '#10b981', '#ec4899', '#fef08a', '#eab308'][Math.floor(Math.random() * 6)],
            size: Math.random() * 7 + 4,
            alpha: 1
          });
        }

        particles.forEach((p, idx) => {
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.12; // gravity
          p.alpha -= 0.015;

          ctx.fillStyle = p.color;
          ctx.globalAlpha = Math.max(0, p.alpha);
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();

          if (p.alpha <= 0) {
            particles.splice(idx, 1);
          }
        });
        ctx.globalAlpha = 1;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [chapterId, isCelebrating]);

  return (
    <div className="absolute inset-0 pointer-events-none rounded-2xl overflow-hidden shadow-inner">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};

