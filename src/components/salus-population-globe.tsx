"use client";

import { OrbitControls, Stars } from "@react-three/drei";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

type PopulationCluster = {
  color?: string;
  count: number;
  lat: number;
  lon: number;
  radius: number;
  size: number;
};

const populationClusters: PopulationCluster[] = [
  { lat: 23, lon: 78, count: 85, radius: 18, size: 0.022, color: "#facc15" },
  { lat: 34, lon: 112, count: 76, radius: 16, size: 0.021, color: "#fbbf24" },
  { lat: 30, lon: 120, count: 38, radius: 9, size: 0.02 },
  { lat: 36, lon: 138, count: 24, radius: 7, size: 0.019 },
  { lat: 36, lon: 127, count: 18, radius: 6, size: 0.018 },
  { lat: -6, lon: 107, count: 36, radius: 8, size: 0.019, color: "#fb923c" },
  { lat: 14, lon: 121, count: 24, radius: 7, size: 0.018 },
  { lat: 16, lon: 106, count: 30, radius: 12, size: 0.018 },
  { lat: 24, lon: 90, count: 34, radius: 7, size: 0.02 },
  { lat: 31, lon: 72, count: 30, radius: 10, size: 0.019 },
  { lat: 52, lon: 10, count: 54, radius: 16, size: 0.017, color: "#7dd3fc" },
  { lat: 41, lon: 29, count: 22, radius: 8, size: 0.017 },
  { lat: 30, lon: 31, count: 28, radius: 5, size: 0.019, color: "#38bdf8" },
  { lat: 9, lon: 8, count: 38, radius: 14, size: 0.019, color: "#34d399" },
  { lat: -1, lon: 37, count: 24, radius: 12, size: 0.018 },
  { lat: -26, lon: 28, count: 18, radius: 8, size: 0.017 },
  { lat: 40, lon: -74, count: 28, radius: 7, size: 0.018, color: "#93c5fd" },
  { lat: 34, lon: -118, count: 18, radius: 8, size: 0.017 },
  { lat: 42, lon: -88, count: 24, radius: 12, size: 0.017 },
  { lat: 19, lon: -99, count: 20, radius: 8, size: 0.018 },
  { lat: -23, lon: -46, count: 24, radius: 10, size: 0.018, color: "#a7f3d0" },
  { lat: -34, lon: -58, count: 14, radius: 8, size: 0.016 },
  { lat: -12, lon: -77, count: 12, radius: 7, size: 0.016 },
  { lat: -33, lon: 151, count: 10, radius: 6, size: 0.015 },
];

function drawPopulationDot(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  color: string,
) {
  context.fillStyle = color;
  context.shadowBlur = radius * 1.5;
  context.shadowColor = color;
  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI * 2);
  context.fill();
}

function lonToTextureX(lon: number, width: number) {
  return ((lon + 180) / 360) * width;
}

function latToTextureY(lat: number, height: number) {
  return ((90 - lat) / 180) * height;
}

function clampLatitude(lat: number) {
  return Math.max(-84, Math.min(84, lat));
}

function createPopulationTexture() {
  const width = 2048;
  const height = 1024;
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  canvas.width = width;
  canvas.height = height;

  if (!context) {
    return null;
  }

  context.clearRect(0, 0, width, height);
  context.globalCompositeOperation = "source-over";

  populationClusters.forEach((cluster) => {
    const color = cluster.color ?? "#67e8f9";
    const dotCount = Math.max(8, cluster.count);
    const dotRadius = Math.max(2.2, cluster.size * width * 0.075);
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));

    for (let index = 0; index < dotCount; index += 1) {
      const distance = Math.sqrt((index + 0.5) / dotCount) * cluster.radius;
      const angle = index * goldenAngle + cluster.lat * 0.03 + cluster.lon * 0.01;
      const lat = clampLatitude(cluster.lat + Math.sin(angle) * distance * 0.55);
      const lonSpread = distance / Math.max(0.32, Math.cos(THREE.MathUtils.degToRad(lat)));
      const lon = cluster.lon + Math.cos(angle) * lonSpread;
      const x = lonToTextureX(((lon + 540) % 360) - 180, width);
      const y = latToTextureY(lat, height);
      const radius = dotRadius * (0.72 + ((index % 5) / 10));

      context.globalAlpha = 0.34 + Math.min(0.34, cluster.count / 260);

      [x - width, x, x + width].forEach((wrappedX) => {
        drawPopulationDot(context, wrappedX, y, radius, color);
        drawPopulationDot(context, wrappedX, y, radius * 0.38, "rgba(255, 255, 255, 0.9)");
      });
    }
  });

  context.globalAlpha = 1;
  context.shadowBlur = 0;

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;

  return texture;
}

function PopulationDotMapLayer() {
  const texture = useMemo(() => {
    if (typeof document === "undefined") {
      return null;
    }

    return createPopulationTexture();
  }, []);

  useEffect(() => {
    return () => {
      texture?.dispose();
    };
  }, [texture]);

  if (!texture) {
    return null;
  }

  return (
    <mesh scale={1.014} renderOrder={24}>
      <sphereGeometry args={[1, 96, 96]} />
      <meshBasicMaterial
        map={texture}
        transparent
        opacity={0.92}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

function SalusGlobeScene() {
  const globeRef = useRef<THREE.Group>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const loadedTexture = useLoader(THREE.TextureLoader, "/textures/earth-blue-marble.jpg");
  const texture = useMemo(() => {
    const clonedTexture = loadedTexture.clone();
    clonedTexture.colorSpace = THREE.SRGBColorSpace;
    clonedTexture.anisotropy = 8;
    clonedTexture.needsUpdate = true;

    return clonedTexture;
  }, [loadedTexture]);

  useFrame((_, delta) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.05;
    }

    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y -= delta * 0.025;
    }
  });

  return (
    <>
      <ambientLight intensity={1.1} />
      <directionalLight position={[-2.4, 2.8, 4]} intensity={2.2} color="#fff4df" />
      <pointLight position={[2.5, 1.4, 2.2]} intensity={2.4} color="#38bdf8" />
      <Stars radius={9} depth={16} count={360} factor={1.7} saturation={0} fade speed={0.12} />
      <group ref={globeRef} rotation={[0.05, -0.4, 0]}>
        <mesh>
          <sphereGeometry args={[1, 96, 96]} />
          <meshStandardMaterial map={texture} roughness={0.82} metalness={0.02} />
        </mesh>
        <PopulationDotMapLayer />
      </group>
      <mesh ref={atmosphereRef} scale={1.035}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial color="#77b9ff" transparent opacity={0.11} side={THREE.BackSide} />
      </mesh>
      <OrbitControls enablePan={false} enableZoom={false} rotateSpeed={0.25} />
    </>
  );
}

export function SalusPopulationGlobe() {
  return (
    <div className="relative h-[min(62vh,36rem)] min-h-[24rem] w-full overflow-hidden border border-sky-200/15 bg-black shadow-[0_0_34px_rgba(14,165,233,0.14)]">
      <Canvas
        camera={{ position: [0, 0.1, 3.35], fov: 42 }}
        dpr={[1, 1.8]}
        gl={{ antialias: true, alpha: true }}
        className="!h-full !w-full"
      >
        <Suspense fallback={null}>
          <SalusGlobeScene />
        </Suspense>
      </Canvas>
      <div className="pointer-events-none absolute bottom-4 left-4 max-w-xs border border-white/10 bg-black/50 px-3 py-2 text-xs leading-5 text-slate-300 backdrop-blur-sm">
        <p className="font-semibold uppercase tracking-[0.16em] text-sky-200/90">Population Geography</p>
        <p className="mt-1">
          Approximate UV-mapped dots show major human population concentrations across the inhabited Earth.
        </p>
      </div>
    </div>
  );
}
