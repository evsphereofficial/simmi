// Three.js scene: sky, moon, stars, rain. Dynamically imported by gl.ts so the first
// paint never waits for it. One render entry point; all state arrives as plain numbers.
import * as THREE from 'three';

/* ------------------------------------------------------------ shaders */

const SKY_VERT = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.9999, 1.0);
}`;

const SKY_FRAG = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform vec2 uRes;
uniform float uTime;
uniform vec3 uTop;
uniform vec3 uBottom;
uniform float uStars;
uniform float uFlash;
uniform float uGolden;
uniform vec2 uMoon;
uniform float uMoonR;
uniform float uGlow;
uniform float uPhase;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }

float starField(vec2 uv, float t) {
  vec2 g = uv * vec2(uRes.x / max(uRes.y, 1.0), 1.0) * 96.0;
  vec2 id = floor(g);
  vec2 f = fract(g);
  float h = hash(id);
  if (h < 0.982) return 0.0;
  vec2 pos = vec2(hash(id + 1.7), hash(id + 3.1)) * 0.8 + 0.1;
  float d = length(f - pos);
  float tw = 0.55 + 0.45 * sin(t * (0.4 + h * 2.4) + h * 40.0);
  float mag = (h - 0.982) / 0.018;
  return smoothstep(0.10, 0.0, d) * tw * mag;
}

void main() {
  vec3 col = mix(uBottom, uTop, pow(clamp(vUv.y, 0.0, 1.0), 1.15));

  // golden hour: a warm band she loves, low on the horizon
  vec3 goldLow = vec3(0.86, 0.45, 0.16);
  vec3 goldHigh = vec3(0.32, 0.16, 0.24);
  col = mix(col, mix(goldLow, goldHigh, vUv.y), uGolden * (1.0 - vUv.y * 0.45));

  // stars, dimmed inside the moon's halo
  vec2 p = (vUv - uMoon) * vec2(uRes.x / max(uRes.y, 1.0), 1.0);
  float d = length(p);
  float mask = smoothstep(uMoonR * 1.6, uMoonR * 5.0, d);
  col += vec3(0.82, 0.84, 0.95) * starField(vUv, uTime) * uStars * mask;

  // moon halo (phase-aware: a thin crescent barely lights the sky)
  float phaseLight = clamp(0.25 + 1.5 * smoothstep(0.0, 0.5, uPhase) * smoothstep(1.0, 0.5, uPhase), 0.2, 1.0);
  float halo = exp(-d / max(uMoonR * 3.4, 0.001)) * 0.30 + exp(-d / max(uMoonR * 1.35, 0.001)) * 0.22;
  col += vec3(0.72, 0.75, 0.88) * halo * uGlow * phaseLight;

  // lightning: light falls from the sky, brightest at the top
  col += vec3(0.78, 0.82, 1.0) * uFlash * (0.22 + 0.78 * vUv.y);

  // vignette + grain
  float vig = 1.0 - 0.38 * pow(length(vUv - 0.5) * 1.32, 2.2);
  col *= vig;
  col += (hash(vUv * uRes + fract(uTime)) - 0.5) * 0.03;

  gl_FragColor = vec4(col, 1.0);
}`;

const MOON_VERT = /* glsl */ `
varying vec3 vN;
varying vec2 vAlbedo;
uniform float uTime;

float hash3(vec3 p) { return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453123); }

float vnoise(vec3 p) {
  vec3 i = floor(p);
  vec3 f = fract(p);
  vec3 u = f * f * (3.0 - 2.0 * f);
  float n000 = hash3(i);
  float n100 = hash3(i + vec3(1.0, 0.0, 0.0));
  float n010 = hash3(i + vec3(0.0, 1.0, 0.0));
  float n110 = hash3(i + vec3(1.0, 1.0, 0.0));
  float n001 = hash3(i + vec3(0.0, 0.0, 1.0));
  float n101 = hash3(i + vec3(1.0, 0.0, 1.0));
  float n011 = hash3(i + vec3(0.0, 1.0, 1.0));
  float n111 = hash3(i + vec3(1.0, 1.0, 1.0));
  return mix(mix(mix(n000, n100, u.x), mix(n010, n110, u.x), u.y),
             mix(mix(n001, n101, u.x), mix(n011, n111, u.x), u.y), u.z);
}

float fbm(vec3 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) { v += a * vnoise(p); p *= 2.03; a *= 0.5; }
  return v;
}

void main() {
  vN = normalMatrix * normal;

  // The maria and the pits are baked once per vertex, not per fragment: the
  // surface detail costs ~64 hash evaluations a pixel, which is the whole
  // frame budget on a phone. The sphere is dense enough (72x72) for the
  // large maria to survive the interpolation; the moon is never bigger
  // than a fifth of the screen, so the finest pit octaves were invisible
  // anyway.
  vec3 sp = normalize(position);
  float maria = fbm(sp * 2.1 + vec3(uTime * 0.008, 0.0, 0.0));
  float pits = fbm(sp * 7.5);
  vAlbedo = vec2(0.72 + 0.5 * smoothstep(0.35, 0.72, maria),
                 0.86 + 0.3 * smoothstep(0.42, 0.62, pits));

  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;

const MOON_FRAG = /* glsl */ `
precision highp float;
varying vec3 vN;
varying vec2 vAlbedo;
uniform vec3 uLightDir;

void main() {
  vec3 n = normalize(vN);
  float albedo = 0.78 * vAlbedo.x * vAlbedo.y;

  vec3 lit = vec3(0.94, 0.92, 0.88) * albedo;
  vec3 shade = vec3(0.35, 0.38, 0.55) * albedo * 0.10;

  float ndl = dot(n, normalize(uLightDir));
  float terminator = smoothstep(-0.06, 0.30, ndl);
  vec3 col = mix(shade, lit * (0.42 + 0.78 * terminator), terminator);

  // warm rim right at the terminator — the edge that catches light first
  col += vec3(1.0, 0.9, 0.82) * pow(max(1.0 - abs(ndl + 0.05), 0.0), 7.0) * 0.35 * step(-0.35, ndl);

  gl_FragColor = vec4(col, 1.0);
}`;

const RAIN_VERT = /* glsl */ `
attribute float aSeed;
uniform float uTime;
uniform float uRain;
varying float vA;
void main() {
  float span = 46.0;
  float speed = 16.0 + aSeed * 12.0;
  float y = mod(aSeed * 173.7 - uTime * speed, span) - span * 0.42;
  float sway = sin(uTime * 0.35 + aSeed * 31.0) * 1.6;
  vec3 pos = vec3(position.x + sway, y + position.y, position.z);
  vA = (0.10 + 0.55 * aSeed) * uRain;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}`;

const RAIN_FRAG = /* glsl */ `
precision highp float;
varying float vA;
void main() { gl_FragColor = vec4(0.74, 0.79, 0.94, vA); }`;

/* ------------------------------------------------------------ state */

export type SceneState = {
  phase: number; x: number; y: number; radius: number;
  rain: number; golden: number; glow: number; flash: number;
};

const SKY_NIGHT_TOP = '#140b16';
const SKY_NIGHT_BOTTOM = '#0b0709';
const SKY_DUSK_TOP = '#2a1420';
const SKY_DUSK_BOTTOM = '#120a10';

export type Scene = { canvas: HTMLCanvasElement; resize: () => void; render: (s: SceneState, time: number) => void };

export function createScene(): Scene | null {
  try {
    // Phones render at a capped ratio without MSAA: the SwiftShader pass in
    // the mobile audit runs the CPU at 4x, and the soft edge costs less than
    // the frames it buys back.
    const mobile = matchMedia('(max-width: 767px)').matches;
    const renderer = new THREE.WebGLRenderer({ antialias: !mobile, alpha: false, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(devicePixelRatio, mobile ? 1.5 : 2));
    renderer.autoClear = false;

    const skyU = {
      uRes: { value: new THREE.Vector2(1, 1) },
      uTime: { value: 0 },
      uTop: { value: new THREE.Color(SKY_NIGHT_TOP) },
      uBottom: { value: new THREE.Color(SKY_NIGHT_BOTTOM) },
      uStars: { value: 1 },
      uFlash: { value: 0 },
      uGolden: { value: 0 },
      uMoon: { value: new THREE.Vector2(0.7, 0.43) },
      uMoonR: { value: 0.12 },
      uGlow: { value: 1 },
      uPhase: { value: 0.16 },
    };
    const skyScene = new THREE.Scene();
    const skyGeo = new THREE.PlaneGeometry(2, 2);
    const skyMat = new THREE.ShaderMaterial({
      vertexShader: SKY_VERT, fragmentShader: SKY_FRAG, uniforms: skyU, depthWrite: false, depthTest: false,
    });
    skyScene.add(new THREE.Mesh(skyGeo, skyMat));
    const skyCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 300);
    camera.position.z = 0;

    const moonU = { uLightDir: { value: new THREE.Vector3(0, 0.25, 1) }, uTime: { value: 0 } };
    const moonGeo = new THREE.SphereGeometry(1, 72, 72);
    const moonMat = new THREE.ShaderMaterial({ vertexShader: MOON_VERT, fragmentShader: MOON_FRAG, uniforms: moonU });
    const moon = new THREE.Mesh(moonGeo, moonMat);
    moon.position.z = -30;
    scene.add(moon);

    // rain: line streaks, one seed per streak, everything moved in the vertex shader
    const COUNT = 260;
    const pos = new Float32Array(COUNT * 2 * 3);
    const seed = new Float32Array(COUNT * 2);
    for (let i = 0; i < COUNT; i++) {
      const s = Math.random();
      const x = (Math.random() - 0.5) * 60;
      const z = -8 - Math.random() * 24;
      const len = 0.5 + Math.random() * 0.7;
      pos.set([x, 0, z, x, -len, z], i * 6);
      seed[i * 2] = s;
      seed[i * 2 + 1] = s;
    }
    const rainGeo = new THREE.BufferGeometry();
    rainGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    rainGeo.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1));
    const rainU = { uTime: { value: 0 }, uRain: { value: 0.5 } };
    const rainMat = new THREE.ShaderMaterial({
      vertexShader: RAIN_VERT, fragmentShader: RAIN_FRAG, uniforms: rainU,
      transparent: true, depthWrite: false,
    });
    scene.add(new THREE.LineSegments(rainGeo, rainMat));

    let viewH = 1;
    const resize = () => {
      const w = innerWidth;
      const h = innerHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      skyU.uRes.value.set(w * renderer.getPixelRatio(), h * renderer.getPixelRatio());
      viewH = 2 * Math.tan((camera.fov * Math.PI) / 360) * Math.abs(moon.position.z);
    };
    resize();

    const duskTop = new THREE.Color(SKY_DUSK_TOP);
    const duskBottom = new THREE.Color(SKY_DUSK_BOTTOM);
    const nightTop = new THREE.Color(SKY_NIGHT_TOP);
    const nightBottom = new THREE.Color(SKY_NIGHT_BOTTOM);
    const ndc = new THREE.Vector3();

    const render = (s: SceneState, time: number) => {
      const worldScale = s.radius * viewH;
      moon.scale.setScalar(worldScale);
      moon.position.x = (s.x * viewH * camera.aspect) / 2;
      moon.position.y = (s.y * viewH) / 2;
      moon.rotation.y = time * 0.012; // idle: the surface drifts, barely

      const a = (s.phase - 0.5) * Math.PI;
      moonU.uLightDir.value.set(Math.sin(a) * 0.95, 0.24, Math.cos(a)).normalize();
      moonU.uTime.value = time;

      const dusk = Math.max(0, 1 - s.phase * 2.4); // near new moon we are still at dusk
      skyU.uTime.value = time;
      skyU.uFlash.value = s.flash;
      skyU.uGolden.value = s.golden;
      skyU.uPhase.value = s.phase;
      skyU.uGlow.value = s.glow;
      skyU.uStars.value = 0.55 + 0.45 * (1 - s.golden);
      skyU.uTop.value.copy(nightTop).lerp(duskTop, dusk * 0.8);
      skyU.uBottom.value.copy(nightBottom).lerp(duskBottom, dusk * 0.8);

      ndc.copy(moon.position).project(camera);
      skyU.uMoon.value.set((ndc.x + 1) / 2, (ndc.y + 1) / 2);
      skyU.uMoonR.value = worldScale / viewH;

      rainU.uTime.value = time;
      rainU.uRain.value = s.rain;

      renderer.clear();
      renderer.render(skyScene, skyCam);
      renderer.clearDepth();
      renderer.render(scene, camera);
    };

    return { canvas: renderer.domElement, resize, render };
  } catch {
    return null; // no WebGL: the CSS night takes over
  }
}
