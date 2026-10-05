'use client';

import React, { useRef, useMemo, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { LiquidMaskShader } from './LiquidMaskMaterial';

export const ASSETS = {
  TEXTURE_A: '/1.jpg',
  TEXTURE_B: '/2.jpg',
};

export interface MousePosTracker {
  current: THREE.Vector2;
  target: THREE.Vector2;
}

interface SceneProps {
  mousePosRef: React.RefObject<MousePosTracker | null>;
  textureAUrl?: string;
  textureBUrl?: string;
}

function LiquidPlane({
  mousePosRef,
  textureAUrl = ASSETS.TEXTURE_A,
  textureBUrl = ASSETS.TEXTURE_B,
}: SceneProps) {
  const { size } = useThree();
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const [textureA, textureB] = useTexture([textureAUrl, textureBUrl]);

  useMemo(() => {
    if (textureA) {
      textureA.minFilter = THREE.LinearFilter;
      textureA.magFilter = THREE.LinearFilter;
      textureA.generateMipmaps = false;
    }
    if (textureB) {
      textureB.minFilter = THREE.LinearFilter;
      textureB.magFilter = THREE.LinearFilter;
      textureB.generateMipmaps = false;
    }
  }, [textureA, textureB]);

  const uniforms = useMemo(() => {
    return {
      u_textureA: { value: textureA },
      u_textureB: { value: textureB },
      u_mouse: { value: new THREE.Vector2(0.5, 0.45) },
      u_resolution: { value: new THREE.Vector2(size.width, size.height) },
      u_imageRes: {
        value: new THREE.Vector2(
          textureA?.image?.width || 1920,
          textureA?.image?.height || 1080
        ),
      },
      u_time: { value: 0 },
      u_radius: { value: 0.14 }, // Perfect subtle reveal window
      u_noiseScale: { value: 4.2 },
      u_noiseStrength: { value: 0.024 },
      u_hoverIntensity: { value: 1.0 },
    };
  }, [textureA, textureB, size.width, size.height]);

  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.u_resolution.value.set(size.width, size.height);
      if (textureA?.image) {
        materialRef.current.uniforms.u_imageRes.value.set(
          textureA.image.width || 1920,
          textureA.image.height || 1080
        );
      }
    }
  }, [size, textureA]);

  useFrame((_, delta) => {
    if (!materialRef.current || !mousePosRef.current) return;

    const u = materialRef.current.uniforms;
    u.u_time.value += delta;

    const tracker = mousePosRef.current;
    // Fluid responsive lerping
    const lerpFactor = 0.09;
    tracker.current.x += (tracker.target.x - tracker.current.x) * lerpFactor;
    tracker.current.y += (tracker.target.y - tracker.current.y) * lerpFactor;
    u.u_mouse.value.set(tracker.current.x, tracker.current.y);

    // Keep active reveal persistent wherever it is left
    u.u_hoverIntensity.value = 1.0;
  });

  return (
    <mesh position={[0, 0, 0]}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={LiquidMaskShader.vertexShader}
        fragmentShader={LiquidMaskShader.fragmentShader}
        uniforms={uniforms}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
}

function LoaderFallback() {
  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <meshBasicMaterial color="#FAFAFA" />
    </mesh>
  );
}

interface LiquidMaskCanvasProps {
  onHoverStateChange?: (hovered: boolean) => void;
  onMouseMoveCoords?: (coords: { x: number; y: number }) => void;
  targetCoord?: { x: number; y: number } | null;
}

export default function LiquidMaskCanvas({
  onHoverStateChange,
  onMouseMoveCoords,
  targetCoord,
}: LiquidMaskCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  // Initial default point (Chest / Collar area)
  const mousePosRef = useRef<MousePosTracker>({
    current: new THREE.Vector2(0.5, 0.45),
    target: new THREE.Vector2(0.5, 0.45),
  });

  // Handle external targeted coordinates (e.g. clicking breakdown hotspots)
  useEffect(() => {
    if (targetCoord && mousePosRef.current) {
      mousePosRef.current.target.set(targetCoord.x, 1.0 - targetCoord.y);
      if (onMouseMoveCoords) {
        onMouseMoveCoords({ x: targetCoord.x, y: targetCoord.y });
      }
    }
  }, [targetCoord, onMouseMoveCoords]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.05,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !mousePosRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = 1.0 - (e.clientY - rect.top) / rect.height;

    mousePosRef.current.target.set(x, y);

    if (onMouseMoveCoords) {
      onMouseMoveCoords({ x: Number(x.toFixed(3)), y: Number((1.0 - y).toFixed(3)) });
    }
  };

  const handleMouseEnter = () => {
    onHoverStateChange?.(true);
  };

  const handleMouseLeave = () => {
    onHoverStateChange?.(false);
    // NOTICE: Do NOT reset position back to center; let it remain locked where left!
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full custom-cursor-area select-none overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Canvas
        frameloop={isVisible ? 'always' : 'never'}
        dpr={typeof window !== 'undefined' ? [1, Math.min(window.devicePixelRatio, 2)] : [1, 2]}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          alpha: false,
          preserveDrawingBuffer: false,
        }}
        camera={{ position: [0, 0, 1] }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      >
        <Suspense fallback={<LoaderFallback />}>
          <LiquidPlane mousePosRef={mousePosRef} />
        </Suspense>
      </Canvas>
    </div>
  );
}
