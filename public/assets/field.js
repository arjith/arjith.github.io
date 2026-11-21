(() => {
  const noise = `
    float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
    float noise(vec2 p){
      vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
      return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+1.),f.x),f.y);
    }
    float fbm(vec2 p){
      float v=0.,a=.5;
      for(int i=0;i<4;i++){v+=a*noise(p);p=p*2.1+3.;a*=.5;}
      return v;
    }`;
  const shaders = {
    halftone: `${noise}
      void main(){
        float cell=9.*min(uRes.x/700.,1.5)+5.;
        vec2 g=gl_FragCoord.xy/cell,id=floor(g),f=fract(g)-.5;
        vec2 p=(id+.5)*cell/uRes.y,uv=(id+.5)*cell/uRes;
        float t=uTime*.08;
        float v=fbm(p*2.2+vec2(t,-t*.6)+fbm(p*1.5-t)*1.4);
        float d=length(uv-uMouse);
        v+=.25*sin(d*40.-uTime*2.)*exp(-d*5.);
        v=smoothstep(.25,.85,v);
        float r=.52*sqrt(v),dotInk=1.-smoothstep(r-.07,r+.07,length(f));
        vec3 baseInk=mix(vec3(.09,.10,.11),vec3(.64,.73,.76),uDark);
        vec3 accentInk=mix(vec3(.70,.23,.06),vec3(.92,.43,.23),uDark);
        vec3 ink=mix(baseInk,accentInk,smoothstep(.7,1.,v)*.9);
        vec3 paper=mix(vec3(.922,.910,.882),vec3(.035,.043,.052),uDark);
        o=vec4(mix(paper,ink,dotInk),1.);
      }`,
    strata: `${noise}
      void main(){
        vec2 uv=gl_FragCoord.xy/uRes,p=(gl_FragCoord.xy-.5*uRes)/uRes.y;
        float t=uTime*.05;
        vec2 q=vec2(fbm(p*1.4+t),fbm(p*1.4-t+3.));
        float e=fbm(p*1.2+q*1.6+vec2(t*.6,0.));
        float m=exp(-24.*dot(uv-uMouse,uv-uMouse));e+=m*.18;
        float lv=e*26.,f=fract(lv),w=fwidth(lv);
        float line=1.-smoothstep(0.,w*1.4,min(f,1.-f));
        float major=1.-smoothstep(0.,w*1.6,abs(fract(lv/5.+.5)-.5)*5.);
        vec3 ink=mix(vec3(.30,.78,.74),vec3(.98,.66,.36),smoothstep(.35,.75,e));
        o=vec4(vec3(.027,.035,.047)+ink*(line*.35+major*.55)*(.45+.9*m+.4*uv.y),1.);
      }`,
    native: `
      float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
      vec2 hash2(vec2 p){return fract(sin(vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3))))*43758.5453);}
      float bayer(vec2 p){
        ivec2 q=ivec2(mod(p,4.));int i=q.x+q.y*4;
        float m[16]=float[](0.,8.,2.,10.,12.,4.,14.,6.,3.,11.,1.,9.,15.,7.,13.,5.);
        return m[i]/16.;
      }
      void main(){
        vec2 fc=floor(gl_FragCoord.xy/3.),p=fc*3./uRes.y*5.,m=uMouse*uRes/uRes.y*5.;
        vec2 i=floor(p),f=fract(p),cid=vec2(0.);float d1=9.,d2=9.;
        for(int y=-1;y<=1;y++)for(int x=-1;x<=1;x++){
          vec2 g=vec2(x,y),r=.5+.4*sin(uTime*.4+6.28*hash2(i+g));
          float d=length(g+r-f);
          if(d<d1){d2=d1;d1=d;cid=i+g;}else if(d<d2)d2=d;
        }
        float edge=smoothstep(0.,.06,d2-d1),near=exp(-length(cid+.5-m)*.6);
        float pulse=.5+.5*sin(uTime*1.3-hash(cid)*30.);
        float lum=(.12+.55*pulse*hash(cid+1.)+.6*near)*edge*(.6+.4*fc.y*3./uRes.y);
        vec3 ink=mix(vec3(.42,.76,.84),vec3(.80,.56,.30),step(.82,hash(cid+3.))*.8+near*.4);
        vec3 c=mix(vec3(.04,.043,.05),ink*.75,step(bayer(fc),lum));
        o=vec4(mix(c,vec3(.15,.16,.18),(1.-edge)*.8),1.);
      }`,
    caustics: `
      void main(){
        vec2 uv=gl_FragCoord.xy/uRes,p=(gl_FragCoord.xy-.5*uRes)/uRes.y;
        float t=uTime*.25+23.;
        vec2 q=mod(p*6.28318*1.3+(uMouse-.5)*1.5,6.28318)-250.,i=q;
        float c=1.,inten=.005;
        for(int n=0;n<5;n++){
          float tt=t*(1.-3.5/float(n+1));
          i=q+vec2(cos(tt-i.x)+sin(tt+i.y),sin(tt-i.y)+cos(tt+i.x));
          c+=1./max(length(vec2(q.x/(sin(i.x+tt)/inten),q.y/(cos(i.y+tt)/inten))),.0001);
        }
        c=1.17-pow(c/5.,1.4);
        float v=pow(abs(c),8.);
        vec3 col=mix(vec3(.01,.07,.10),vec3(.02,.25,.30),uv.y*.8+.1);
        col+=vec3(.75,.98,.95)*clamp(v,0.,1.2)*.75;
        o=vec4(col*(1.-.55*length(uv-.5)),1.);
      }`
  };
  for (const host of document.querySelectorAll("[data-effect]")) {
    const source = shaders[host.dataset.effect];
    if (!source) { console.error("Unknown visual effect:", host.dataset.effect); continue; }
    const canvas = document.createElement("canvas");
    canvas.setAttribute("aria-hidden", "true");
    const gl = canvas.getContext("webgl2", { antialias: false, alpha: false, powerPreference: "low-power" });
    if (!gl) { console.info("WebGL2 unavailable; keeping static artwork."); continue; }
    host.prepend(canvas);
    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    let program, uniforms, raf = 0, visible = false, lost = false, last = 0;
    let mouse = [.5, .5], target = [.5, .5];
    const start = performance.now();
    function compile(type, source) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Visual shader compilation failed:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }
    function init() {
      const vertex = compile(gl.VERTEX_SHADER, "#version 300 es\nin vec2 p;void main(){gl_Position=vec4(p,0.,1.);}");
      const fragment = compile(gl.FRAGMENT_SHADER, `#version 300 es
        precision highp float;uniform vec2 uRes,uMouse;uniform float uTime,uDark;out vec4 o;
        ${source}`);
      if (!vertex || !fragment) return false;
      program = gl.createProgram();
      gl.attachShader(program, vertex); gl.attachShader(program, fragment);
      gl.linkProgram(program);
      gl.deleteShader(vertex); gl.deleteShader(fragment);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error("Visual shader linking failed:", gl.getProgramInfoLog(program));
        return false;
      }
      gl.useProgram(program);
      const buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
      const position = gl.getAttribLocation(program, "p");
      gl.enableVertexAttribArray(position);
      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
      uniforms = ["uRes", "uTime", "uMouse", "uDark"].map(name => gl.getUniformLocation(program, name));
      return true;
    }
    function draw(now) {
      if (lost) return;
      const dpr = Math.min(devicePixelRatio || 1, 1.5);
      const width = Math.max(1, Math.round(host.clientWidth * dpr));
      const height = Math.max(1, Math.round(host.clientHeight * dpr));
      if (canvas.width !== width || canvas.height !== height) { canvas.width = width; canvas.height = height; }
      mouse = mouse.map((value, index) => value + (target[index] - value) * .08);
      gl.viewport(0, 0, width, height);
      gl.uniform2f(uniforms[0], width, height);
      gl.uniform1f(uniforms[1], reduce.matches ? 12 : (now - start) / 1000);
      gl.uniform2f(uniforms[2], mouse[0], mouse[1]);
      gl.uniform1f(uniforms[3], document.documentElement.dataset.theme === "dark" ? 1 : 0);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }
    function loop(now) {
      raf = 0;
      if (!visible || document.hidden || reduce.matches || lost) return;
      if (now - last >= 33) { draw(now); last = now; }
      raf = requestAnimationFrame(loop);
    }
    function kick() {
      cancelAnimationFrame(raf); raf = 0;
      if (lost || !visible || document.hidden) return;
      if (reduce.matches) draw(performance.now());
      else raf = requestAnimationFrame(loop);
    }
    if (!init()) { canvas.remove(); continue; }
    draw(performance.now()); host.classList.add("ready");
    new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; kick(); }).observe(host);
    new ResizeObserver(() => { if (!lost) draw(performance.now()); }).observe(host);
    const pointerSurface = host.closest(".home") ? document : host;
    pointerSurface.addEventListener("pointermove", event => {
      if (reduce.matches) return;
      const rect = host.getBoundingClientRect();
      target = [(event.clientX - rect.left) / rect.width, 1 - (event.clientY - rect.top) / rect.height];
    });
    pointerSurface.addEventListener("pointerleave", () => { target = [.5, .5]; });
    document.addEventListener("visibilitychange", kick);
    reduce.addEventListener("change", () => { mouse = target = [.5, .5]; kick(); });
    document.addEventListener("themechange", () => { if (!lost) draw(performance.now()); });
    canvas.addEventListener("webglcontextlost", event => {
      event.preventDefault(); lost = true; cancelAnimationFrame(raf); raf = 0; host.classList.remove("ready");
    });
    canvas.addEventListener("webglcontextrestored", () => {
      lost = false;
      if (init()) { draw(performance.now()); host.classList.add("ready"); kick(); }
      else { lost = true; host.classList.remove("ready"); }
    });
  }
})();
