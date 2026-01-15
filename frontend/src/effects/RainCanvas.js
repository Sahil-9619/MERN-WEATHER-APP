export function createRain(ctx, width, height) {
  const drops = [];

  for (let i = 0; i < 200; i++) {
    drops.push({
      x: Math.random() * width,
      y: Math.random() * height,
      length: Math.random() * 20 + 10,
      speed: Math.random() * 4 + 2
    });
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = "rgba(174, 194, 224, 0.6)";
    ctx.lineWidth = 1;

    drops.forEach(drop => {
      ctx.beginPath();
      ctx.moveTo(drop.x, drop.y);
      ctx.lineTo(drop.x, drop.y + drop.length);
      ctx.stroke();
      drop.y += drop.speed;
      if (drop.y > height) {
        drop.y = -drop.length;
        drop.x = Math.random() * width;
      }
    });
  }

  return { draw };
}
