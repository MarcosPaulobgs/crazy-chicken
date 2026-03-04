document.addEventListener("DOMContentLoaded", () => {
  const chicken = document.getElementById("chicken");
  const mundo = document.getElementById("mundo");
  const scoreDisplay = document.getElementById("score");

  if (!chicken || !mundo || !scoreDisplay) {
    alert("IDs faltando no HTML: chicken, mundo, score.");
    return;
  }

  // bloqueia menu do botão direito
  document.addEventListener("contextmenu", (e) => e.preventDefault());

  let score = 0;

  function clamp(v, min, max) {
    return Math.max(min, Math.min(max, v));
  }

  function criarPintinho() {
    score++;
    scoreDisplay.textContent = score;

    const animal = document.createElement("div");
    animal.className = "pinto";
    animal.textContent = "🐣";
    animal.style.position = "absolute";

    // adiciona no mundo (tela toda)
    mundo.appendChild(animal);

    const size = 40;

    // posição inicial aleatória pela tela inteira
    let W = window.innerWidth;
    let H = window.innerHeight;

    let x = Math.random() * (W - size);
    let y = Math.random() * (H - size);

    animal.style.left = x + "px";
    animal.style.top = y + "px";

    // velocidade inicial
    let dx = (Math.random() * 2 - 1) * 6;
    let dy = (Math.random() * 2 - 1) * 6;
    if (Math.abs(dx) < 1) dx = 2;
    if (Math.abs(dy) < 1) dy = -2;

    // evolução
    let estado = "pinto";
    let clicks = 0;

    // clique com qualquer botão
    animal.addEventListener("mousedown", (e) => {
      e.stopPropagation();
      clicks++;

      if (estado === "pinto" && clicks >= 3) {
        animal.textContent = "🐓";
        animal.className = "galo";
        estado = "galo";
        clicks = 0;
        return;
      }

      if (estado === "galo" && clicks >= 5) {
        animal.textContent = "🍗";
        animal.className = "frango";
        estado = "frango";
        return;
      }
    });

    // movimento livre pela tela toda, passando atrás do HUD
    const tick = setInterval(() => {
      W = window.innerWidth;
      H = window.innerHeight;

      // aleatoriedade suave na direção
      dx += (Math.random() * 2 - 1) * 0.8;
      dy += (Math.random() * 2 - 1) * 0.8;

      // limita velocidade
      const vmax = 10;
      dx = clamp(dx, -vmax, vmax);
      dy = clamp(dy, -vmax, vmax);

      x += dx;
      y += dy;

      // quica nas bordas da tela
      if (x <= 0) { x = 0; dx *= -1; }
      if (y <= 0) { y = 0; dy *= -1; }
      if (x >= W - size) { x = W - size; dx *= -1; }
      if (y >= H - size) { y = H - size; dy *= -1; }

      animal.style.left = x + "px";
      animal.style.top = y + "px";
    }, 60);

    // opcional: remover depois de 90s (se quiser infinito, remova isso)
    // setTimeout(() => { clearInterval(tick); animal.remove(); }, 90000);
  }

  // galinha cria pintinho com qualquer botão do mouse
  chicken.addEventListener("mousedown", criarPintinho);
});