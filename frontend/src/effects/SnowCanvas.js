export function createSnow(ctx, width, height) {
  const flakes = [];

  for (let i = 0; i < 150; i++) {
    flakes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 3 + 1,
      speed: Math.random() * 1 + 0.5
    });
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "white";

    flakes.forEach(flake => {
      ctx.beginPath();
      ctx.arc(flake.x, flake.y, flake.r, 0, Math.PI * 2);
      ctx.fill();
      flake.y += flake.speed;
      if (flake.y > height) {
        flake.y = -flake.r;
        flake.x = Math.random() * width;
      }
    });
  }

  return { draw };
}
     