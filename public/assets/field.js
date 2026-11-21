// Hero field: a grid of small blocks with a slow front moving across it.
// WebGL2, ~30fps, paused when offscreen/hidden, one static frame for reduced motion.
(() => {
  const host = document.querySelector(".hero-field");
  if (!host) return;
  const canvas = document.createElement("canvas");
  canvas.setAttribute("aria-hidden", "true");
  const gl = canvas.getContext("webgl2", { antialias: false, alpha: true, premultipliedAlpha: true, powerPreference: "low-power" });
  if (!gl) return;
  host.appendChild(canvas);

  const vs = `#version 300 es
  in vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }`;

  const fs = `#version 300 es
  precision highp float;
  uniform vec2 uRes; uniform float uTime; uniform vec3 uInk; uniform vec3 uBg; uniform float uDpr;
  out vec4 o;
  float h(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
  float n(vec2 p){ vec2 i = floor(p), f = fract(p); f = f*f*(3.0-2.0*f);
    return mix(mix(h(i), h(i+vec2(1,0)), f.x), mix(h(i+vec2(0,1)), h(i+vec2(1,1)), f.x), f.y); }
  void main(){
    float cell = 14.0 * uDpr;
    vec2 g = gl_FragCoord.xy / cell;
    vec2 id = floor(g);
    vec2 f = fract(g);
    // square block with a 1px-ish gutter
    float gap = 1.6 / 14.0;
    vec2 b = step(vec2(gap), f) * step(f, vec2(1.0 - gap));
    float inBlock = b.x * b.y;

    float t = uTime * 0.045;
    float r = h(id);
    // occupancy: which blocks hold data
    float occ = step(0.58, n(id * 0.09 + vec2(t * 0.6, 0.0)) * 0.7 + r * 0.45);
    // a soft diagonal front sweeping left to right, offset per block
    float x = (id.x + id.y * 0.35) / (uRes.x / cell + uRes.y / cell * 0.35);
    float front = fract(t * 0.35);
    float d = x - front + r * 0.04;
    float wave = exp(-d * d * 900.0);
    float trail = smoothstep(-0.18, 0.0, d) * (1.0 - smoothstep(0.0, 0.002, d)) * 0.35;

    float a = inBlock * (occ * 0.12 + wave * 0.5 * (0.35 + occ) + trail * occ);
    o = vec4(uInk * a, a);
  }`;

  const compile = (type, src) => {
    const s = gl.createShader(type);
    gl.shaderSource(s, src); gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) { console.warn(gl.getShaderInfoLog(s)); return null; }
    return s;
  };
  let prog, loc, raf = 0, visible = true, last = 0;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)");
  const dark = matchMedia("(prefers-color-scheme: dark)");
  const start = performance.now() - 20000;

  const colors = () => {
    const cs = getComputedStyle(document.documentElement);
    const parse = (v) => v.split(",").map(Number);
    return { ink: parse(cs.getPropertyValue("--shader-a")), bg: parse(cs.getPropertyValue("--shader-b")) };
  };
  let palette = colors();

  function init() {
    const v = compile(gl.VERTEX_SHADER, vs), f = compile(gl.FRAGMENT_SHADER, fs);
    if (!v || !f) return false;
    prog = gl.createProgram();
    gl.attachShader(prog, v); gl.attachShader(prog, f); gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return false;
    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const p = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(p);
    gl.vertexAttribPointer(p, 2, gl.FLOAT, false, 0, 0);
    loc = ["uRes", "uTime", "uInk", "uBg", "uDpr"].reduce((m, k) => (m[k] = gl.getUniformLocation(prog, k), m), {});
    return true;
  }

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const w = Math.max(1, Math.round(host.clientWidth * dpr));
    const h = Math.max(1, Math.round(host.clientHeight * dpr));
    if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
    gl.viewport(0, 0, w, h);
    return dpr;
  }

  function draw(now) {
    const dpr = resize();
    gl.uniform2f(loc.uRes, canvas.width, canvas.height);
    gl.uniform1f(loc.uTime, (now - start) / 1000);
    gl.uniform3f(loc.uInk, ...palette.ink);
    gl.uniform3f(loc.uBg, ...palette.bg);
    gl.uniform1f(loc.uDpr, dpr);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  function loop(now) {
    raf = 0;
    if (!visible || document.hidden || reduce.matches) return;
    if (now - last > 33) { draw(now); last = now; }
    raf = requestAnimationFrame(loop);
  }
  const kick = () => {
    if (reduce.matches) { draw(performance.now()); return; }
    if (!raf) raf = requestAnimationFrame(loop);
  };

  if (!init()) { canvas.remove(); return; }
  draw(performance.now());
  canvas.classList.add("ready");

  new IntersectionObserver(([e]) => { visible = e.isIntersecting; kick(); }).observe(host);
  document.addEventListener("visibilitychange", kick);
  reduce.addEventListener("change", kick);
  dark.addEventListener("change", () => { palette = colors(); draw(performance.now()); });
  addEventListener("resize", () => draw(performance.now()), { passive: true });
  canvas.addEventListener("webglcontextlost", (e) => { e.preventDefault(); cancelAnimationFrame(raf); raf = 0; });
  canvas.addEventListener("webglcontextrestored", () => { if (init()) kick(); });
  kick();
})();
