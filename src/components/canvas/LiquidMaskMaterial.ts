import * as THREE from 'three';

export const LiquidMaskShader = {
  uniforms: {
    u_textureA: { value: null as THREE.Texture | null },
    u_textureB: { value: null as THREE.Texture | null },
    u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
    u_resolution: { value: new THREE.Vector2(1, 1) },
    u_imageRes: { value: new THREE.Vector2(1920, 1080) },
    u_time: { value: 0 },
    u_radius: { value: 0.12 },
    u_noiseScale: { value: 4.0 },
    u_noiseStrength: { value: 0.025 },
    u_hoverIntensity: { value: 1.0 },
  },

  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 1.0);
    }
  `,

  fragmentShader: /* glsl */ `
    uniform sampler2D u_textureA;
    uniform sampler2D u_textureB;
    uniform vec2 u_mouse;
    uniform vec2 u_resolution;
    uniform vec2 u_imageRes;
    uniform float u_time;
    uniform float u_radius;
    uniform float u_noiseScale;
    uniform float u_noiseStrength;
    uniform float u_hoverIntensity;

    varying vec2 vUv;

    // Simplex Noise 2D / 3D Implementation (Stefan Gustavson)
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
    vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

    float snoise(vec3 v) {
      const vec2 C = vec2(1.0/6.0, 1.0/3.0);
      const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

      vec3 i  = floor(v + dot(v, C.yyy));
      vec3 x0 = v - i + dot(i, C.xxx);

      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min(g.xyz, l.zxy);
      vec3 i2 = max(g.xyz, l.zxy);

      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy;
      vec3 x3 = x0 - D.yyy;

      i = mod289(i);
      vec4 p = permute(permute(permute(
                i.z + vec4(0.0, i1.z, i2.z, 1.0))
              + i.y + vec4(0.0, i1.y, i2.y, 1.0))
              + i.x + vec4(0.0, i1.x, i2.x, 1.0));

      float n_ = 0.142857142857;
      vec3  ns = n_ * D.wyz - D.xzx;

      vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_);

      vec4 x = x_ *ns.x + ns.yyyy;
      vec4 y = y_ *ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);

      vec4 b0 = vec4(x.xy, y.xy);
      vec4 b1 = vec4(x.zw, y.zw);

      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));

      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;

      vec3 p0 = vec3(a0.xy, h.x);
      vec3 p1 = vec3(a0.zw, h.y);
      vec3 p2 = vec3(a1.xy, h.z);
      vec3 p3 = vec3(a1.zw, h.w);

      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
      p0 *= norm.x;
      p1 *= norm.y;
      p2 *= norm.z;
      p3 *= norm.w;

      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
    }

    // Cover UV calculation ensuring 1:1 pixel fidelity without stretching
    vec2 getCoverUV(vec2 uv, vec2 screenRes, vec2 imgRes) {
      float screenAspect = screenRes.x / screenRes.y;
      float imgAspect = imgRes.x / imgRes.y;
      vec2 newUV = uv;
      if (screenAspect > imgAspect) {
        float scale = screenAspect / imgAspect;
        newUV.y = (uv.y - 0.5) * (1.0 / scale) + 0.5;
      } else {
        float scale = imgAspect / screenAspect;
        newUV.x = (uv.x - 0.5) * (1.0 / scale) + 0.5;
      }
      return newUV;
    }

    void main() {
      vec2 coverUV = getCoverUV(vUv, u_resolution, u_imageRes);

      // Aspect ratio correction for circular distance calculation
      float aspect = u_resolution.x / u_resolution.y;
      vec2 aspectUV = vUv;
      aspectUV.x *= aspect;

      vec2 aspectMouse = u_mouse;
      aspectMouse.x *= aspect;

      float dist = distance(aspectUV, aspectMouse);

      // Subtle organic fluid contour on the mask boundary
      float t = u_time * 0.9;
      float n1 = snoise(vec3(aspectUV * u_noiseScale, t * 0.6));
      float n2 = snoise(vec3(aspectUV * (u_noiseScale * 2.0) + vec2(12.5, 6.2), t * 0.8)) * 0.4;
      float liquidEdgeNoise = (n1 + n2) * (u_noiseStrength * u_hoverIntensity);

      // Clean, small reveal radius
      float dynamicRadius = u_radius * u_hoverIntensity;
      float distortedDist = dist + liquidEdgeNoise;

      // Smooth mask blend
      float feather = 0.035;
      float mask = smoothstep(dynamicRadius + feather, dynamicRadius - feather, distortedDist);

      // Sample Texture A and Texture B 100% crisp without distortion
      vec4 colA = texture2D(u_textureA, coverUV);
      vec4 colB = texture2D(u_textureB, coverUV);

      // Subtle meniscus rim highlight on the fluid edge
      float rimDist = abs(distortedDist - dynamicRadius);
      float rim = smoothstep(feather, 0.0, rimDist) * u_hoverIntensity * 0.25;

      vec4 finalColor = mix(colA, colB, mask);
      finalColor.rgb += vec3(1.0, 1.0, 1.0) * rim;

      gl_FragColor = finalColor;
    }
  `,
};
