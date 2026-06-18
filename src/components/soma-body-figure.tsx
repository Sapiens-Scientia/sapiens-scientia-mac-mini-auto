"use client";

import { Canvas } from "@react-three/fiber";
import {
  Bounds,
  Center,
  ContactShadows,
  Environment,
  Html,
  OrbitControls,
  useGLTF,
} from "@react-three/drei";
import { Suspense, useEffect } from "react";
import * as THREE from "three";

const modelPath = "/models/soma-anatomy.glb";

function AnatomicalBody() {
  const { scene } = useGLTF(modelPath, false, true);

  useEffect(() => {
    scene.traverse((object) => {
      if (!(object instanceof THREE.Mesh)) {
        return;
      }

      object.castShadow = true;
      object.receiveShadow = true;

      const materials = Array.isArray(object.material)
        ? object.material
        : [object.material];

      materials.forEach((material) => {
        if (
          material instanceof THREE.MeshStandardMaterial ||
          material instanceof THREE.MeshPhysicalMaterial
        ) {
          material.roughness = Math.max(material.roughness, 0.5);
          material.envMapIntensity = 0.42;
        }
      });
    });
  }, [scene]);

  return (
    <Bounds fit clip observe margin={1.08}>
      <Center>
        <primitive object={scene} />
      </Center>
    </Bounds>
  );
}

function LoadingFigure() {
  return (
    <Html center>
      <p className="whitespace-nowrap font-mono text-[0.65rem] uppercase tracking-[0.22em] text-rose-200/65">
        Assembling anatomy
      </p>
    </Html>
  );
}

export function SomaBodyFigure({ className }: { className?: string }) {
  return (
    <div
      role="img"
      aria-label="Rotatable 3D anatomical figure showing the muscular, cardiovascular, nervous, and internal organ systems"
      className={`relative ${className ?? ""}`}
    >
      <Canvas
        camera={{ position: [0, 0.15, 4], fov: 34 }}
        dpr={[1, 1.7]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        shadows
      >
        <color attach="background" args={["#050304"]} />
        <ambientLight intensity={0.48} />
        <directionalLight
          castShadow
          position={[3.5, 5, 5]}
          intensity={1.45}
          color="#fff1e8"
        />
        <directionalLight
          position={[-4, 1.5, 3]}
          intensity={0.7}
          color="#fecdd3"
        />
        <pointLight position={[0, -2, 3]} intensity={0.45} color="#7dd3fc" />

        <Suspense fallback={<LoadingFigure />}>
          <AnatomicalBody />
          <Environment preset="studio" environmentIntensity={0.12} />
          <ContactShadows
            position={[0, -2.2, 0]}
            opacity={0.32}
            scale={5}
            blur={2.4}
            far={4}
          />
        </Suspense>

        <OrbitControls
          makeDefault
          enableDamping
          enablePan={false}
          enableZoom
          minDistance={1.7}
          maxDistance={6}
          minPolarAngle={Math.PI * 0.32}
          maxPolarAngle={Math.PI * 0.68}
          minAzimuthAngle={-Math.PI * 0.72}
          maxAzimuthAngle={Math.PI * 0.72}
          rotateSpeed={0.5}
        />
      </Canvas>

      <div className="pointer-events-none absolute bottom-3 left-3 border border-rose-100/10 bg-black/55 px-3 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-rose-100/55 backdrop-blur-sm">
        Drag to rotate
      </div>
    </div>
  );
}

useGLTF.preload(modelPath, false, true);
