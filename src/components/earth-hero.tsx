"use client";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Billboard, Html, Line, OrbitControls, Stars, Text } from "@react-three/drei";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Suspense, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

const physicalCenter = new THREE.Vector3(-1.9, -0.08, 0);
const digitalCenter = new THREE.Vector3(1.9, -0.08, 0);
const metaCenter = new THREE.Vector3(0, -0.08, 0);
const digitalNetworkRadius = 1.16;
const maxPanTargetRadius = 0.9;
const labelFont = "/fonts/barlow-condensed-light.ttf";
const earthLabelFont = "/fonts/barlow-condensed-bold.ttf";
const earthViewUrl = "https://earthview3d.vercel.app/";

type ArcPath = {
  curve: THREE.CatmullRomCurve3;
  points: THREE.Vector3[];
  color: string;
};

type DataCenterSite = {
  name: string;
  lat: number;
  lon: number;
};

type ConceptNode = {
  label: string;
  level: number;
};

const dataCenterSites: DataCenterSite[] = [
  { name: "Northern Virginia", lat: 39.04, lon: -77.49 },
  { name: "Dallas", lat: 32.78, lon: -96.8 },
  { name: "Silicon Valley", lat: 37.39, lon: -122.08 },
  { name: "Sao Paulo", lat: -23.55, lon: -46.63 },
  { name: "Dublin", lat: 53.35, lon: -6.26 },
  { name: "Frankfurt", lat: 50.11, lon: 8.68 },
  { name: "Mumbai", lat: 19.07, lon: 72.88 },
  { name: "Singapore", lat: 1.35, lon: 103.82 },
  { name: "Tokyo", lat: 35.68, lon: 139.76 },
  { name: "Sydney", lat: -33.87, lon: 151.21 },
];

const earthSystemNodes: ConceptNode[] = [
  { label: "Microsystems", level: 0 },
  { label: "Nanosystems", level: 1 },
  { label: "Elementary Particles", level: 2 },
  { label: "Atoms", level: 2 },
  { label: "Molecules", level: 2 },
  { label: "Microsystems", level: 1 },
  { label: "Cells", level: 2 },
  { label: "Microbes", level: 2 },
  { label: "Bacteria", level: 2 },
  { label: "Viruses", level: 2 },
  { label: "Mesosystems", level: 0 },
  { label: "Tree of Life", level: 1 },
  { label: "Multicellular Life Forms", level: 1 },
  { label: "Mammals", level: 2 },
  { label: "Homo sapiens", level: 3 },
  { label: "Macrosystems", level: 0 },
  { label: "Nations", level: 1 },
  { label: "Legal System", level: 1 },
  { label: "Economic System", level: 1 },
  { label: "Healthcare System", level: 1 },
  { label: "People", level: 1 },
  { label: "Technology", level: 1 },
  { label: "Information Systems", level: 1 },
  { label: "Buildings", level: 1 },
  { label: "Transportation, Pipes, & Cables", level: 1 },
  { label: "Business & Industrial System", level: 1 },
  { label: "Financial System", level: 1 },
  { label: "Agricultural Systems", level: 1 },
  { label: "Energy Generation System", level: 1 },
  { label: "Waste Management System", level: 1 },
  { label: "Megasystems", level: 0 },
  { label: "The Sun", level: 1 },
  { label: "Atmosphere", level: 1 },
  { label: "Climate System", level: 1 },
  { label: "Freshwater", level: 1 },
  { label: "Fossil Fuels", level: 1 },
  { label: "Anthropogenic Waste", level: 1 },
  { label: "Soil System", level: 1 },
  { label: "Ecosystems", level: 1 },
  { label: "Biosphere", level: 1 },
  { label: "Hydrosphere", level: 1 },
  { label: "Geosphere", level: 1 },
];

const humanPlatformNodes: ConceptNode[] = [
  { label: "Human Health Platform (Person)", level: 0 },
  { label: "Human Society Platform (People)", level: 0 },
  { label: "Environmental Platform (Planet)", level: 0 },
];

function seededRandom(seed: number) {
  let value = seed;

  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}

function spherePoint(index: number, count: number, radius: number) {
  const phi = Math.acos(1 - (2 * index + 1) / count);
  const theta = Math.PI * (1 + Math.sqrt(5)) * index;

  return new THREE.Vector3(
    Math.cos(theta) * Math.sin(phi) * radius,
    Math.cos(phi) * radius,
    Math.sin(theta) * Math.sin(phi) * radius,
  );
}

function latLonToSpherePoint(lat: number, lon: number, radius: number) {
  const latRad = THREE.MathUtils.degToRad(lat);
  const lonRad = THREE.MathUtils.degToRad(lon + 90);
  const horizontalRadius = Math.cos(latRad) * radius;

  return new THREE.Vector3(
    Math.sin(lonRad) * horizontalRadius,
    Math.sin(latRad) * radius,
    Math.cos(lonRad) * horizontalRadius,
  );
}

function DataCenterMarker({
  site,
}: {
  site: DataCenterSite;
}) {
  const markerRef = useRef<THREE.Mesh>(null);
  const surfacePoint = useMemo(() => latLonToSpherePoint(site.lat, site.lon, 1.105), [site.lat, site.lon]);

  useFrame(({ clock }) => {
    if (!markerRef.current) {
      return;
    }

    const pulse = 1 + Math.sin(clock.getElapsedTime() * 3.2 + site.lon * 0.04) * 0.22;
    markerRef.current.scale.setScalar(pulse);
  });

  return (
    <mesh ref={markerRef} position={surfacePoint}>
      <sphereGeometry args={[0.032, 18, 18]} />
      <meshBasicMaterial color="#57a6ff" transparent opacity={0.95} />
    </mesh>
  );
}

function DataCenterMarkers() {
  return (
    <group>
      {dataCenterSites.map((site) => (
        <DataCenterMarker key={site.name} site={site} />
      ))}
    </group>
  );
}

function PhysicalEarth({ targetPosition }: { targetPosition: THREE.Vector3 }) {
  const groupRef = useRef<THREE.Group>(null);
  const earthRef = useRef<THREE.Group>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const hasPositionedRef = useRef(false);
  const loadedTexture = useLoader(THREE.TextureLoader, "/textures/earth-blue-marble.jpg");
  const texture = useMemo(() => {
    const clonedTexture = loadedTexture.clone();
    clonedTexture.colorSpace = THREE.SRGBColorSpace;
    clonedTexture.anisotropy = 8;
    clonedTexture.needsUpdate = true;

    return clonedTexture;
  }, [loadedTexture]);

  const openEarthView = () => {
    window.open(earthViewUrl, "_blank", "noopener,noreferrer");
  };

  useFrame((_, delta) => {
    if (groupRef.current) {
      if (!hasPositionedRef.current) {
        groupRef.current.position.copy(targetPosition);
        hasPositionedRef.current = true;
      }

      groupRef.current.position.lerp(targetPosition, 1 - Math.pow(0.0008, delta));
    }

    if (earthRef.current) {
      earthRef.current.rotation.y += delta * 0.12;
    }

    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y -= delta * 0.04;
    }
  });

  return (
    <group
      ref={groupRef}
      onClick={(event) => {
        event.stopPropagation();
        openEarthView();
      }}
      onPointerOver={() => {
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        document.body.style.cursor = "";
      }}
    >
      <Html position={[0, 0.2, 1.24]} center zIndexRange={[30, 0]}>
        <a
          href={earthViewUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open EarthView 3D"
          className="block h-64 w-64 cursor-pointer rounded-full bg-transparent"
        />
      </Html>
      <group ref={earthRef}>
        <mesh>
          <sphereGeometry args={[1.08, 96, 96]} />
          <meshStandardMaterial map={texture} roughness={0.85} metalness={0.02} />
        </mesh>
        <DataCenterMarkers />
      </group>
      <mesh ref={atmosphereRef} scale={1.04}>
        <sphereGeometry args={[1.1, 64, 64]} />
        <meshBasicMaterial color="#77b9ff" transparent opacity={0.12} side={THREE.BackSide} />
      </mesh>
      <mesh rotation={[Math.PI / 2.35, 0.35, 0]}>
        <torusGeometry args={[1.18, 0.004, 8, 160]} />
        <meshBasicMaterial color="#d8eeff" transparent opacity={0.24} />
      </mesh>
    </group>
  );
}

function DigitalEarth({ targetPosition }: { targetPosition: THREE.Vector3 }) {
  const groupRef = useRef<THREE.Group>(null);
  const shellRef = useRef<THREE.Mesh>(null);
  const networkRef = useRef<THREE.Group>(null);
  const hasPositionedRef = useRef(false);

  const { nodePositions, linkPositions } = useMemo(() => {
    const nodes: number[] = [];
    const links: number[] = [];
    const count = 190;
    const nodeVectors = Array.from({ length: count }, (_, index) =>
      spherePoint(index, count, digitalNetworkRadius),
    );

    nodeVectors.forEach((point) => nodes.push(point.x, point.y, point.z));

    nodeVectors.forEach((point, index) => {
      const next = nodeVectors[(index + 9) % count];
      const near = nodeVectors[(index + 21) % count];

      if (index % 3 !== 0) {
        links.push(point.x, point.y, point.z, next.x, next.y, next.z);
      }

      if (index % 8 === 0) {
        links.push(point.x, point.y, point.z, near.x, near.y, near.z);
      }
    });

    return {
      nodePositions: new Float32Array(nodes),
      linkPositions: new Float32Array(links),
    };
  }, []);

  useFrame(({ clock }, delta) => {
    if (groupRef.current) {
      if (!hasPositionedRef.current) {
        groupRef.current.position.copy(targetPosition);
        hasPositionedRef.current = true;
      }

      groupRef.current.position.lerp(targetPosition, 1 - Math.pow(0.0008, delta));
    }

    if (shellRef.current) {
      shellRef.current.rotation.y += delta * 0.08;
      shellRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.35) * 0.04;
    }

    if (networkRef.current) {
      networkRef.current.rotation.y -= delta * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={shellRef}>
        <sphereGeometry args={[1.12, 96, 96]} />
        <meshPhysicalMaterial
          color="#1d76ff"
          roughness={0.28}
          metalness={0.12}
          transmission={0.25}
          thickness={0.9}
          transparent
          opacity={0.22}
          side={THREE.DoubleSide}
          depthTest
          depthWrite={false}
        />
      </mesh>
      <mesh scale={1.045}>
        <sphereGeometry args={[1.12, 32, 32]} />
        <meshBasicMaterial color="#62c7ff" wireframe transparent opacity={0.16} depthTest depthWrite={false} />
      </mesh>
      <group ref={networkRef}>
        <points>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[nodePositions, 3]} />
          </bufferGeometry>
          <pointsMaterial
            color="#b8ecff"
            size={0.074}
            sizeAttenuation
            transparent
            opacity={1}
            depthTest
            depthWrite={false}
          />
        </points>
        <lineSegments>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[linkPositions, 3]} />
          </bufferGeometry>
          <lineBasicMaterial color="#2fe3ff" transparent opacity={0.38} depthTest depthWrite={false} />
        </lineSegments>
        <FeaturedDigitalNode />
      </group>
    </group>
  );
}

function FeaturedDigitalNode() {
  const router = useRouter();
  const nodeRef = useRef<THREE.Mesh>(null);
  const labelRef = useRef<THREE.Mesh>(null);
  const position: [number, number, number] = [-0.18, 0.14, 1.18];

  useFrame(({ clock }) => {
    if (!nodeRef.current) {
      return;
    }

    const pulse = 1 + Math.sin(clock.getElapsedTime() * 3.4) * 0.16;
    nodeRef.current.scale.setScalar(pulse);

    const material = labelRef.current?.material;

    if (material && !Array.isArray(material)) {
      material.depthTest = true;
      material.depthWrite = false;
      material.needsUpdate = true;
    }
  });

  const openProjects = () => {
    router.push("/projects");
  };

  const handleActivate = (event: { stopPropagation: () => void }) => {
    event.stopPropagation();
    openProjects();
  };

  return (
    <group
      position={position}
      onClick={handleActivate}
      onPointerDown={handleActivate}
      onPointerOver={() => {
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        document.body.style.cursor = "";
      }}
    >
      <mesh>
        <sphereGeometry args={[0.12, 24, 24]} />
        <meshBasicMaterial transparent opacity={0} depthTest depthWrite={false} />
      </mesh>
      <mesh ref={nodeRef} renderOrder={20}>
        <sphereGeometry args={[0.082, 32, 32]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.98} depthTest depthWrite={false} />
      </mesh>
      <mesh renderOrder={19}>
        <sphereGeometry args={[0.14, 32, 32]} />
        <meshBasicMaterial color="#58d7ff" transparent opacity={0.18} depthTest depthWrite={false} />
      </mesh>
      <Billboard position={[0, 0.28, 0.08]} follow lockX={false} lockY={false} lockZ={false}>
        <Text
          ref={labelRef}
          anchorX="center"
          anchorY="middle"
          color="#ffffff"
          font={labelFont}
          fontSize={0.12}
          fontWeight={300}
          renderOrder={50}
          onClick={handleActivate}
          onPointerDown={handleActivate}
        >
          Sapiens Scientia
        </Text>
      </Billboard>
      <Html position={[0, 0.17, 0.1]} center zIndexRange={[40, 0]}>
        <Link
          href="/projects"
          aria-label="Open Sapiens Scientia projects"
          className="block h-8 w-36 cursor-pointer bg-transparent"
          onPointerEnter={() => {
            document.body.style.cursor = "pointer";
          }}
          onPointerLeave={() => {
            document.body.style.cursor = "";
          }}
        />
      </Html>
    </group>
  );
}

function DataConnectors() {
  const pulsesRef = useRef<THREE.Group>(null);

  const arcs = useMemo<ArcPath[]>(() => {
    const random = seededRandom(42);
    const paths: ArcPath[] = [];

    for (let index = 0; index < 18; index += 1) {
      const yOffset = (random() - 0.5) * 1.45;
      const zOffset = (random() - 0.5) * 0.75;
      const start = new THREE.Vector3(
        physicalCenter.x + 1.0,
        physicalCenter.y + yOffset,
        physicalCenter.z + zOffset,
      );
      const end = new THREE.Vector3(
        digitalCenter.x - 1.0,
        digitalCenter.y + yOffset * 0.72,
        digitalCenter.z - zOffset * 0.6,
      );
      const lift = 0.5 + random() * 0.6;
      const middle = new THREE.Vector3(0, yOffset * 0.35 + lift, zOffset * 0.2);
      const curve = new THREE.CatmullRomCurve3([start, middle, end]);

      paths.push({
        curve,
        points: curve.getPoints(64),
        color: index % 3 === 0 ? "#84f3ff" : "#2c8dff",
      });
    }

    return paths;
  }, []);

  useFrame(({ clock }) => {
    if (!pulsesRef.current) {
      return;
    }

    const elapsed = clock.getElapsedTime();

    pulsesRef.current.children.forEach((pulse, index) => {
      const arc = arcs[index % arcs.length];
      const baseProgress = (elapsed * 0.18 + index * 0.075) % 1;
      const progress = index % 2 === 0 ? baseProgress : 1 - baseProgress;
      pulse.position.copy(arc.curve.getPoint(progress));
    });
  });

  return (
    <group>
      {arcs.map((arc, index) => (
        <Line
          key={index}
          points={arc.points}
          color={arc.color}
          lineWidth={index % 4 === 0 ? 1.9 : 1.05}
          transparent
          opacity={index % 4 === 0 ? 0.58 : 0.28}
        />
      ))}
      <group ref={pulsesRef}>
        {arcs.map((arc, index) => (
          <mesh key={index} position={arc.points[0]}>
            <sphereGeometry args={[0.018 + (index % 3) * 0.003, 16, 16]} />
            <meshBasicMaterial
              color={index % 2 === 0 ? "#d8fbff" : "#57a6ff"}
              transparent
              opacity={0.95}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function GlobeLabel({
  children,
  onClick,
  position,
}: {
  children: string;
  onClick?: () => void;
  position: [number, number, number];
}) {
  return (
    <Billboard position={position} follow lockX={false} lockY={false} lockZ={false}>
      <group
        onClick={(event) => {
          if (!onClick) {
            return;
          }

          event.stopPropagation();
          onClick();
        }}
        onPointerOver={() => {
          if (onClick) {
            document.body.style.cursor = "pointer";
          }
        }}
        onPointerOut={() => {
          if (onClick) {
            document.body.style.cursor = "";
          }
        }}
      >
        <mesh>
          <planeGeometry args={[0.9, 0.22]} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </mesh>
        {onClick && (
          <Html position={[0, 0, 0.04]} center zIndexRange={[35, 0]}>
            <button
              type="button"
              aria-label={`Open ${children}`}
              className="block h-8 w-32 cursor-pointer bg-transparent outline-none focus:outline-none"
              onClick={(event) => {
                event.stopPropagation();
                onClick();
              }}
            />
          </Html>
        )}
        <Text
          anchorX="center"
          anchorY="middle"
          color="#ffffff"
          font={earthLabelFont}
          fontSize={0.18}
          fontWeight={700}
          outlineColor="#000000"
          outlineWidth={0.012}
          renderOrder={10}
        >
          {children}
        </Text>
      </group>
    </Billboard>
  );
}

function MetaEarthLabel({
  isMerged,
  onToggle,
}: {
  isMerged: boolean;
  onToggle: () => void;
}) {
  return (
    <Billboard position={[0, metaCenter.y + 1.56, 0.16]} follow lockX={false} lockY={false} lockZ={false}>
      <group
        onClick={(event) => {
          event.stopPropagation();
          onToggle();
        }}
        onPointerOver={() => {
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          document.body.style.cursor = "";
        }}
      >
        <mesh>
          <planeGeometry args={[0.75, 0.22]} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </mesh>
        <Text
          anchorX="center"
          anchorY="middle"
          color={isMerged ? "#b8ecff" : "#ffffff"}
          font={earthLabelFont}
          fontSize={0.17}
          fontWeight={700}
          outlineColor="#000000"
          outlineWidth={0.012}
          renderOrder={12}
        >
          Meta Earth
        </Text>
        <Html position={[0, 0, 0.04]} center zIndexRange={[35, 0]}>
          <button
            type="button"
            aria-label={isMerged ? "Separate Meta Earth" : "Merge into Meta Earth"}
            className="block h-8 w-32 cursor-pointer bg-transparent outline-none focus:outline-none"
            onClick={(event) => {
              event.stopPropagation();
              onToggle();
            }}
            onPointerEnter={() => {
              document.body.style.cursor = "pointer";
            }}
            onPointerLeave={() => {
              document.body.style.cursor = "";
            }}
          />
        </Html>
      </group>
    </Billboard>
  );
}

function ConstrainedOrbitControls() {
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const panCenter = useMemo(() => metaCenter.clone(), []);
  const panOffsetRef = useRef(new THREE.Vector3());
  const clampedTargetRef = useRef(new THREE.Vector3());
  const excessPanRef = useRef(new THREE.Vector3());

  useFrame(() => {
    const controls = controlsRef.current;

    if (!controls) {
      return;
    }

    const panOffset = panOffsetRef.current.copy(controls.target).sub(panCenter);

    if (panOffset.length() <= maxPanTargetRadius) {
      return;
    }

    const clampedTarget = clampedTargetRef.current
      .copy(panOffset)
      .setLength(maxPanTargetRadius)
      .add(panCenter);
    const excessPan = excessPanRef.current.copy(controls.target).sub(clampedTarget);

    controls.target.copy(clampedTarget);
    controls.object.position.sub(excessPan);
    controls.update();
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan
      enableZoom
      minDistance={3.4}
      maxDistance={10}
      minPolarAngle={Math.PI / 2.7}
      maxPolarAngle={Math.PI / 1.75}
      panSpeed={0.55}
      rotateSpeed={0.22}
    />
  );
}

function Scene() {
  const [isMerged, setIsMerged] = useState(false);
  const physicalTarget = isMerged ? metaCenter : physicalCenter;
  const digitalTarget = isMerged ? metaCenter : digitalCenter;

  return (
    <>
      <color attach="background" args={["#000000"]} />
      <ambientLight intensity={0.9} />
      <directionalLight position={[-3, 2.6, 4]} intensity={2.1} color="#fff4df" />
      <pointLight position={[2.9, 1.6, 2.2]} intensity={3.2} color="#278aff" />
      <pointLight position={[0, 1.4, 2.8]} intensity={1.3} color="#8ff2ff" />
      <Stars radius={16} depth={24} count={900} factor={2.4} saturation={0} fade speed={0.18} />
      <PhysicalEarth targetPosition={physicalTarget} />
      <DigitalEarth targetPosition={digitalTarget} />
      {!isMerged && <DataConnectors />}
      {!isMerged && (
        <>
          <GlobeLabel
            onClick={() => {
              window.open(earthViewUrl, "_blank", "noopener,noreferrer");
            }}
            position={[physicalCenter.x, physicalCenter.y + 1.42, physicalCenter.z + 0.08]}
          >
            Physical Earth
          </GlobeLabel>
          <GlobeLabel position={[digitalCenter.x, digitalCenter.y + 1.42, digitalCenter.z + 0.08]}>
            Digital Earth
          </GlobeLabel>
        </>
      )}
      <MetaEarthLabel isMerged={isMerged} onToggle={() => setIsMerged((value) => !value)} />
      <ConstrainedOrbitControls />
    </>
  );
}

function ConceptColumn({
  align,
  nodes,
  title,
}: {
  align: "left" | "right";
  nodes: ConceptNode[];
  title: string;
}) {
  return (
    <aside
      className={[
        "scrollbar-hidden pointer-events-auto max-h-[72vh] w-72 overflow-y-auto py-4",
        "border-white/15 bg-black/42 text-white shadow-[0_0_28px_rgba(91,181,255,0.13)] backdrop-blur-sm",
        "max-lg:max-h-[34vh] max-lg:w-full max-lg:px-4 max-lg:py-3",
        align === "left"
          ? "border-l border-t pl-6 pr-4 text-left"
          : "border-r border-t pl-4 pr-6 text-right max-lg:text-left",
      ].join(" ")}
      aria-label={title}
      onWheelCapture={(event) => event.stopPropagation()}
      onTouchMoveCapture={(event) => event.stopPropagation()}
    >
      <h2 className="mb-3 text-2xl font-semibold leading-none text-white max-lg:text-xl">{title}</h2>
      <ol className="space-y-1.5">
        {nodes.map((node) => (
          <li
            key={`${node.level}-${node.label}`}
            className={[
              "flex items-baseline gap-2 text-sm leading-tight text-slate-100/88",
              align === "right" ? "justify-end max-lg:justify-start" : "",
            ].join(" ")}
            style={{
              paddingLeft: align === "left" ? `${node.level * 0.72}rem` : undefined,
              paddingRight: align === "right" ? `${node.level * 0.72}rem` : undefined,
            }}
          >
            <span className={node.level === 0 ? "font-semibold text-sky-100" : "font-normal"}>
              {node.label}
            </span>
          </li>
        ))}
      </ol>
    </aside>
  );
}

function ConceptOverlay() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-1/2 z-10 flex -translate-y-1/2 items-center justify-between gap-6 px-8 max-lg:inset-x-4 max-lg:bottom-4 max-lg:top-auto max-lg:grid max-lg:translate-y-0 max-lg:grid-cols-2 max-lg:px-0 max-md:grid-cols-1">
      <ConceptColumn
        align="left"
        title="Earth Systems"
        nodes={earthSystemNodes}
      />
      <ConceptColumn
        align="right"
        title="Human Platforms"
        nodes={humanPlatformNodes}
      />
    </div>
  );
}

export function EarthHero() {
  return (
    <section className="relative min-h-screen bg-black">
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0.28, 9.99], fov: 45 }}
          dpr={[1, 1.8]}
          gl={{ antialias: true, alpha: false }}
          className="!h-full !w-full"
          style={{ height: "100%", width: "100%" }}
        >
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>
      <ConceptOverlay />
    </section>
  );
}
