import { Comet } from '@/types/crashAnimation';

export function createCometsManager(width: number, _height: number) {
  const comets: Comet[] = [];

  const drawComets = (
    ctx: CanvasRenderingContext2D,
    bgOffsetX: number,
    bgOffsetY: number,
    isRunning: boolean
  ) => {
    if (isRunning && Math.random() < 0.02) {
      comets.push({
        x: width + 100,
        y: -100 + Math.random() * 200,
        vx: -5 - Math.random() * 4,
        vy: 2 + Math.random() * 3,
        life: 100,
      });
    }

    comets.forEach((comet, index) => {
      comet.x += comet.vx;
      comet.y += comet.vy;
      comet.life--;

      if (comet.life <= 0 || comet.x < -150) {
        comets.splice(index, 1);
        return;
      }

      const alpha = comet.life / 100;
      const drawX = comet.x;
      const drawY = comet.y;

      ctx.strokeStyle = `rgba(150, 200, 255, ${alpha * 0.5})`;
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(drawX, drawY);
      ctx.lineTo(drawX - comet.vx * 12, drawY - comet.vy * 12);
      ctx.stroke();

      ctx.shadowColor = `rgba(200, 230, 255, ${alpha})`;
      ctx.shadowBlur = 20;
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.beginPath();
      ctx.arc(drawX, drawY, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    });
  };

  return { drawComets };
}
