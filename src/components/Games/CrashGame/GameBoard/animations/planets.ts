import { Planet, PLANET_TYPES } from '@/types/crashAnimation';

export function createPlanetsManager() {
  const planets: Planet[] = [];

  const spawnPlanet = (w: number, h: number) => {
    let validPosition = false;
    let attempts = 0;
    let y = 0;
    let radius = 0;
    let scale = 0;

    while (!validPosition && attempts < 10) {
      scale = 0.5 + Math.random() * 1.0;
      radius = (40 + Math.random() * 60) * scale;
      y = Math.random() * (h - radius * 2) + radius;

      validPosition = true;
      for (const planet of planets) {
        const dx = w + 200 - planet.x;
        const dy = y - planet.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < (radius + planet.radius) * 1.5) {
          validPosition = false;
          break;
        }
      }
      attempts++;
    }

    if (!validPosition) return;

    const type = PLANET_TYPES[Math.floor(Math.random() * PLANET_TYPES.length)];

    planets.push({
      x: w + 200,
      y: y,
      radius: radius,
      vx: -(0.5 + scale * 1.5),
      rot: 0,
      rotSpeed: (Math.random() * 0.01 - 0.005) / scale,
      alpha: 0,
      phase: 'in',
      type,
      life: 0,
      maxLife: 600 + Math.random() * 400,
    });
  };

  const drawPlanet = (ctx: CanvasRenderingContext2D, planet: Planet) => {
    ctx.save();
    ctx.globalAlpha = planet.alpha;
    ctx.translate(planet.x, planet.y);
    ctx.rotate(planet.rot);

    const glowGradient = ctx.createRadialGradient(
      0,
      0,
      planet.radius * 0.5,
      0,
      0,
      planet.radius * 2.5
    );
    glowGradient.addColorStop(0, planet.type.colors[0] + '80');
    glowGradient.addColorStop(0.5, planet.type.colors[0] + '40');
    glowGradient.addColorStop(1, 'transparent');
    ctx.fillStyle = glowGradient;
    ctx.beginPath();
    ctx.arc(0, 0, planet.radius * 2.5, 0, Math.PI * 2);
    ctx.fill();

    if (planet.type.ring) {
      ctx.strokeStyle = planet.type.colors[1] + 'b0';
      ctx.lineWidth = planet.radius * 0.18;
      ctx.beginPath();
      ctx.ellipse(
        0,
        0,
        planet.radius * 2,
        planet.radius * 0.5,
        0.3,
        Math.PI,
        Math.PI * 2
      );
      ctx.stroke();
    }

    const bodyGradient = ctx.createRadialGradient(
      -planet.radius * 0.3,
      -planet.radius * 0.3,
      0,
      0,
      0,
      planet.radius
    );
    bodyGradient.addColorStop(0, planet.type.colors[0]);
    bodyGradient.addColorStop(0.6, planet.type.colors[1]);
    bodyGradient.addColorStop(1, planet.type.colors[2]);
    ctx.fillStyle = bodyGradient;
    ctx.beginPath();
    ctx.arc(0, 0, planet.radius, 0, Math.PI * 2);
    ctx.fill();

    if (planet.type.bands) {
      ctx.globalAlpha = planet.alpha * 0.4;
      ctx.strokeStyle = planet.type.colors[2];
      ctx.lineWidth = planet.radius * 0.15;
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.arc(0, 0, planet.radius * (0.4 + i * 0.2), 0.2, Math.PI - 0.2);
        ctx.stroke();
      }
    }

    if (planet.type.ring) {
      ctx.globalAlpha = planet.alpha;
      ctx.strokeStyle = planet.type.colors[0] + 'd0';
      ctx.lineWidth = planet.radius * 0.15;
      ctx.beginPath();
      ctx.ellipse(
        0,
        0,
        planet.radius * 2,
        planet.radius * 0.5,
        0.3,
        0,
        Math.PI
      );
      ctx.stroke();
    }

    ctx.restore();
  };

  const updatePlanets = (
    ctx: CanvasRenderingContext2D,
    canvasWidth: number,
    canvasHeight: number,
    _isRunning: boolean
  ) => {
    if (planets.length < 2 && Math.random() < 0.0005) {
      spawnPlanet(canvasWidth, canvasHeight);
    }

    planets.forEach((planet, index) => {
      planet.x += planet.vx;
      planet.rot += planet.rotSpeed;
      planet.life++;

      if (planet.phase === 'in') {
        planet.alpha = Math.min(1, planet.alpha + 0.015);
        if (planet.alpha >= 1) planet.phase = 'stable';
      } else if (planet.phase === 'stable' && planet.life > planet.maxLife) {
        planet.phase = 'out';
      } else if (planet.phase === 'out') {
        planet.alpha = Math.max(0, planet.alpha - 0.015);
        if (planet.alpha <= 0) {
          planets.splice(index, 1);
          return;
        }
      }

      if (planet.x < -planet.radius * 3) {
        planets.splice(index, 1);
        return;
      }
    });

    planets.sort((a, b) => a.radius - b.radius);

    planets.forEach(planet => {
      drawPlanet(ctx, planet);
    });
  };

  const reset = () => {
    planets.length = 0;
  };

  return { spawnPlanet, updatePlanets, reset };
}
