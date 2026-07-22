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

      // Render chapter-specific background art
      if (chapterId === 1) {
        // Chapter 1: Judean Courtyard
        // Sky
        const skyGrad = ctx.createLinearGradient(0, 0, 0, h);
        skyGrad.addColorStop(0, '#fef3c7');
        skyGrad.addColorStop(1, '#fde68a');
        ctx.fillStyle = skyGrad;
        ctx.fillRect(0, 0, w, h);

        // Distant hills
        ctx.fillStyle = '#d97706';
        ctx.beginPath();
        ctx.ellipse(w * 0.3, h * 0.65, w * 0.4, h * 0.25, 0, 0, Math.PI * 2);
        ctx.ellipse(w * 0.8, h * 0.7, w * 0.5, h * 0.3, 0, 0, Math.PI * 2);
        ctx.fill();

        // Courtyard Stone Ground
        ctx.fillStyle = '#b45309';
        ctx.fillRect(0, h * 0.65, w, h * 0.35);

        // Stone house wall
        ctx.fillStyle = '#78350f';
        ctx.fillRect(w * 0.05, h * 0.25, w * 0.35, h * 0.45);
        ctx.fillStyle = '#451a03';
        ctx.fillRect(w * 0.15, h * 0.45, w * 0.1, h * 0.25); // Doorway

        // Fruit tree foliage
        ctx.fillStyle = '#15803d';
        ctx.beginPath();
        ctx.arc(w * 0.82, h * 0.4, 70, 0, Math.PI * 2);
        ctx.arc(w * 0.75, h * 0.35, 50, 0, Math.PI * 2);
        ctx.arc(w * 0.88, h * 0.38, 55, 0, Math.PI * 2);
        ctx.fill();

        // Trunk
        ctx.fillStyle = '#78350f';
        ctx.fillRect(w * 0.81, h * 0.48, 20, 80);

      } else if (chapterId === 2) {
        // Chapter 2: Road to Jerusalem & Mountain Trail
        const skyGrad = ctx.createLinearGradient(0, 0, 0, h);
        skyGrad.addColorStop(0, '#bae6fd');
        skyGrad.addColorStop(0.6, '#fef08a');
        skyGrad.addColorStop(1, '#f97316');
        ctx.fillStyle = skyGrad;
        ctx.fillRect(0, 0, w, h);

        // Sun
        ctx.fillStyle = '#fef08a';
        ctx.beginPath();
        ctx.arc(w * 0.85, h * 0.25, 45, 0, Math.PI * 2);
        ctx.fill();

        // Jerusalem Outline on distant hill
        ctx.fillStyle = '#92400e';
        ctx.fillRect(w * 0.4, h * 0.35, w * 0.2, h * 0.08);
        ctx.beginPath();
        ctx.arc(w * 0.5, h * 0.35, 25, Math.PI, 0); // Temple dome silhouette
        ctx.fill();

        // Rolling Hills
        ctx.fillStyle = '#d97706';
        ctx.beginPath();
        ctx.moveTo(0, h * 0.55);
        ctx.quadraticCurveTo(w * 0.3, h * 0.4, w * 0.6, h * 0.58);
        ctx.quadraticCurveTo(w * 0.8, h * 0.65, w, h * 0.5);
        ctx.lineTo(w, h);
        ctx.lineTo(0, h);
        ctx.fill();

        // Winding Path
        ctx.fillStyle = '#fef3c7';
        ctx.beginPath();
        ctx.moveTo(w * 0.5, h * 0.55);
        ctx.quadraticCurveTo(w * 0.4, h * 0.7, w * 0.1, h);
        ctx.lineTo(w * 0.3, h);
        ctx.quadraticCurveTo(w * 0.5, h * 0.75, w * 0.55, h * 0.55);
        ctx.fill();

      } else if (chapterId === 3) {
        // Chapter 3: Jerusalem Market & Mikveh
        const skyGrad = ctx.createLinearGradient(0, 0, 0, h);
        skyGrad.addColorStop(0, '#fde047');
        skyGrad.addColorStop(1, '#ea580c');
        ctx.fillStyle = skyGrad;
        ctx.fillRect(0, 0, w, h);

        // Jerusalem Arches
        ctx.fillStyle = '#78350f';
        ctx.fillRect(0, h * 0.3, w * 0.3, h * 0.7);
        ctx.fillRect(w * 0.7, h * 0.3, w * 0.3, h * 0.7);

        // Arch curve
        ctx.beginPath();
        ctx.arc(w * 0.5, h * 0.3, w * 0.25, Math.PI, 0);
        ctx.fillStyle = '#451a03';
        ctx.fill();

        // Mikveh Water Pool Area
        ctx.fillStyle = '#0284c7';
        ctx.fillRect(w * 0.25, h * 0.7, w * 0.5, h * 0.25);

        // Water ripples
        ctx.strokeStyle = '#e0f2fe';
        ctx.lineWidth = 2;
        for (let i = 0; i < 3; i++) {
          const rx = w * 0.35 + i * 50;
          const ry = h * 0.8 + Math.sin(tick * 0.05 + i) * 3;
          ctx.beginPath();
          ctx.ellipse(rx, ry, 30, 8, 0, 0, Math.PI * 2);
          ctx.stroke();
        }

      } else if (chapterId === 4) {
        // Chapter 4: Temple Mount Plaza & Chambers
        const skyGrad = ctx.createLinearGradient(0, 0, 0, h);
        skyGrad.addColorStop(0, '#e0f2fe');
        skyGrad.addColorStop(1, '#fef08a');
        ctx.fillStyle = skyGrad;
        ctx.fillRect(0, 0, w, h);

        // Grand Limestone Columns
        ctx.fillStyle = '#fef3c7';
        const colWidth = 35;
        for (let i = 0; i < 6; i++) {
          const cx = w * 0.1 + i * (w * 0.16);
          ctx.fillRect(cx, h * 0.15, colWidth, h * 0.6);
          ctx.fillStyle = '#fde047';
          ctx.fillRect(cx - 5, h * 0.15, colWidth + 10, 15); // Capital
          ctx.fillRect(cx - 5, h * 0.72, colWidth + 10, 15); // Base
          ctx.fillStyle = '#fef3c7';
        }

        // Plaza Floor
        ctx.fillStyle = '#d97706';
        ctx.fillRect(0, h * 0.75, w, h * 0.25);

      } else if (chapterId === 5) {
        // Chapter 5: Nicanor Gate & Courtyard of Israel
        const skyGrad = ctx.createLinearGradient(0, 0, 0, h);
        skyGrad.addColorStop(0, '#0284c7');
        skyGrad.addColorStop(0.5, '#38bdf8');
        skyGrad.addColorStop(1, '#fef08a');
        ctx.fillStyle = skyGrad;
        ctx.fillRect(0, 0, w, h);

        // Nicanor Curved Steps (15 Steps)
        ctx.fillStyle = '#fef3c7';
        for (let s = 0; s < 10; s++) {
          const sy = h * 0.5 + s * 12;
          const sw = w * (0.8 - s * 0.04);
          const sx = (w - sw) / 2;
          ctx.fillRect(sx, sy, sw, 10);
        }

        // Altar Fire Particles (Mizbe'ach)
        ctx.fillStyle = '#ef4444';
        for (let f = 0; f < 8; f++) {
          const fx = w * 0.8 + (Math.random() - 0.5) * 30;
          const fy = h * 0.45 - Math.random() * 40;
          ctx.beginPath();
          ctx.arc(fx, fy, Math.random() * 6 + 2, 0, Math.PI * 2);
          ctx.fill();
        }

      } else if (chapterId === 6) {
        // Chapter 6: Inner Sanctuary & Altar Flame
        const skyGrad = ctx.createLinearGradient(0, 0, 0, h);
        skyGrad.addColorStop(0, '#f59e0b');
        skyGrad.addColorStop(0.5, '#b45309');
        skyGrad.addColorStop(1, '#451a03');
        ctx.fillStyle = skyGrad;
        ctx.fillRect(0, 0, w, h);

        // Gold Golden Entrance Pillars (Jachin & Boaz)
        ctx.fillStyle = '#fef08a';
        ctx.fillRect(w * 0.2, h * 0.1, 45, h * 0.65);
        ctx.fillRect(w * 0.7, h * 0.1, 45, h * 0.65);

        // Sanctuary Curtain / Golden Wall
        ctx.fillStyle = '#d97706';
        ctx.fillRect(w * 0.25, h * 0.1, w * 0.5, h * 0.65);

        // Altar Base (Mizbe'ach)
        ctx.fillStyle = '#78350f';
        ctx.fillRect(w * 0.35, h * 0.6, w * 0.3, h * 0.25);

        // Holy Fire on Altar
        for (let i = 0; i < 12; i++) {
          const flameX = w * 0.4 + Math.sin(tick * 0.1 + i) * 60;
          const flameY = h * 0.58 - (tick % 20 + i * 3);
          ctx.fillStyle = i % 2 === 0 ? '#f97316' : '#fef08a';
          ctx.beginPath();
          ctx.arc(flameX, flameY, 8 + Math.sin(tick * 0.2) * 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Celebration Particles (Fireworks / Confetti)
      if (isCelebrating) {
        if (particles.length < 60) {
          particles.push({
            x: Math.random() * w,
            y: h * 0.3,
            vx: (Math.random() - 0.5) * 8,
            vy: (Math.random() - 0.5) * 8 - 3,
            color: ['#f59e0b', '#38bdf8', '#10b981', '#ec4899', '#fef08a'][Math.floor(Math.random() * 5)],
            size: Math.random() * 6 + 4,
            alpha: 1
          });
        }

        particles.forEach((p, idx) => {
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.1; // gravity
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
