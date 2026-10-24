import React, { useEffect, useRef } from 'react';

export const GlobeAnimation: React.FC<{ className?: string }> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 450);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Generate network nodes
    const nodeCount = 38;
    const nodes: { x: number; y: number; vx: number; vy: number; radius: number; baseAlpha: number }[] = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: prefersReducedMotion ? 0 : (Math.random() - 0.5) * 0.45,
        vy: prefersReducedMotion ? 0 : (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 2 + 1,
        baseAlpha: Math.random() * 0.5 + 0.3
      });
    }

    let angle = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const globeRadius = Math.min(width, height) * 0.38;

      // Draw subtle orbital rings
      ctx.save();
      ctx.translate(centerX, centerY);

      // Globe outer glow
      const radialGlow = ctx.createRadialGradient(0, 0, globeRadius * 0.2, 0, 0, globeRadius * 1.25);
      radialGlow.addColorStop(0, 'rgba(6, 182, 212, 0.08)');
      radialGlow.addColorStop(0.5, 'rgba(14, 165, 233, 0.03)');
      radialGlow.addColorStop(1, 'rgba(15, 23, 42, 0)');
      ctx.fillStyle = radialGlow;
      ctx.beginPath();
      ctx.arc(0, 0, globeRadius * 1.25, 0, Math.PI * 2);
      ctx.fill();

      // Latitude and Longitude subtle arcs
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.12)';
      ctx.lineWidth = 1;

      for (let i = -3; i <= 3; i++) {
        const yOffset = (i / 4) * globeRadius;
        const radiusAtY = Math.sqrt(Math.max(0, globeRadius * globeRadius - yOffset * yOffset));
        if (radiusAtY > 5) {
          ctx.beginPath();
          ctx.ellipse(0, yOffset, radiusAtY, radiusAtY * 0.28, 0, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // Rotating Meridian ring
      if (!prefersReducedMotion) {
        angle += 0.004;
      }
      ctx.save();
      ctx.rotate(angle);
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.2)';
      ctx.beginPath();
      ctx.ellipse(0, 0, globeRadius * 0.98, globeRadius * 0.35, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      ctx.restore();

      // Draw floating constellation nodes and connections
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.07)';
      ctx.lineWidth = 0.75;

      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i];

        if (!prefersReducedMotion) {
          n1.x += n1.vx;
          n1.y += n1.vy;

          if (n1.x < 0 || n1.x > width) n1.vx *= -1;
          if (n1.y < 0 || n1.y > height) n1.vy *= -1;
        }

        // Draw connections
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();
          }
        }

        // Draw node
        ctx.fillStyle = `rgba(34, 211, 238, ${n1.baseAlpha})`;
        ctx.beginPath();
        ctx.arc(n1.x, n1.y, n1.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <div className={`relative overflow-hidden pointer-events-none select-none ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};
