"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Environment,
  Float,
  ContactShadows,
  MeshTransmissionMaterial,
  Sparkles,
} from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

/**
 * A stylised premium water bottle built from procedural geometry.
 * Combines a rounded bottle body (lathe geometry), water fill,
 * shoulder, neck, cap and a branded label band.
 */

function BottleBody() {
  // Lathe profile for a sleek water-bottle silhouette (x = radius, y = height)
  const points: THREE.Vector2[] = [];
  const segments = 40;
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const y = -1.7 + t * 3.4; // total height 3.4
    let r: number;
    if (t < 0.04) {
      r = 0.62; // base
    } else if (t < 0.7) {
      // gentle barrel body
      const local = (t - 0.04) / 0.66;
      r = 0.62 + Math.sin(local * Math.PI) * 0.08;
    } else if (t < 0.82) {
      // shoulder taper
      const local = (t - 0.7) / 0.12;
      r = 0.62 - local * 0.42;
    } else if (t < 0.92) {
      // neck
      r = 0.2;
    } else {
      // rim
      const local = (t - 0.92) / 0.08;
      r = 0.2 + local * 0.04;
    }
    points.push(new THREE.Vector2(r, y));
  }

  const geom = new THREE.LatheGeometry(points, 64);
  geom.computeVertexNormals();

  return (
    <mesh geometry={geom} castShadow receiveShadow>
      <MeshTransmissionMaterial
        thickness={0.6}
        roughness={0.05}
        transmission={1}
        ior={1.33}
        chromaticAberration={0.06}
        backside
        samples={6}
        resolution={256}
        distortion={0.2}
        distortionScale={0.4}
        temporalDistortion={0.1}
        color="#dffafc"
        attenuationColor="#9fe9f2"
        attenuationDistance={1.4}
      />
    </mesh>
  );
}

function WaterFill() {
  const ref = useRef<THREE.Mesh>(null);
  // Slightly smaller cylinder inside the bottle to represent water
  const points: THREE.Vector2[] = [];
  const segments = 12;
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const y = -1.5 + t * 2.7; // fill ~80% of body
    let r: number;
    if (t < 0.05) r = 0.55;
    else {
      const local = (t - 0.05) / 0.95;
      r = 0.55 + Math.sin(local * Math.PI) * 0.06;
    }
    points.push(new THREE.Vector2(r * 0.92, y));
  }
  const geom = new THREE.LatheGeometry(points, 48);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const m = ref.current.material as THREE.MeshPhysicalMaterial;
    // subtle shimmer on the water emissive
    m.emissiveIntensity = 0.18 + Math.sin(clock.elapsedTime * 1.4) * 0.05;
  });

  return (
    <mesh ref={ref} geometry={geom}>
      <meshPhysicalMaterial
        color="#00A8B5"
        transparent
        opacity={0.55}
        roughness={0.15}
        metalness={0}
        transmission={0.6}
        ior={1.33}
        emissive="#00A8B5"
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}

function Cap() {
  return (
    <group position={[0, 1.85, 0]}>
      <mesh castShadow>
        <cylinderGeometry args={[0.22, 0.22, 0.3, 32]} />
        <meshStandardMaterial color="#006B6B" roughness={0.4} metalness={0.3} />
      </mesh>
      {/* gold ring */}
      <mesh position={[0, -0.12, 0]}>
        <cylinderGeometry args={[0.225, 0.225, 0.04, 32]} />
        <meshStandardMaterial color="#FFD84D" metalness={0.9} roughness={0.25} />
      </mesh>
    </group>
  );
}

function Label() {
  // A curved label band around the bottle body
  const labelRef = useRef<THREE.Group>(null);
  return (
    <group ref={labelRef} position={[0, -0.2, 0]}>
      <mesh>
        <cylinderGeometry args={[0.62, 0.62, 1.15, 64, 1, true]} />
        <meshPhysicalMaterial
          color="#021C24"
          roughness={0.45}
          metalness={0.2}
          transparent
          opacity={0.92}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* teal accent stripe top */}
      <mesh position={[0, 0.6, 0]}>
        <cylinderGeometry args={[0.625, 0.625, 0.04, 64, 1, true]} />
        <meshStandardMaterial color="#00A8B5" emissive="#00A8B5" emissiveIntensity={0.4} side={THREE.DoubleSide} />
      </mesh>
      {/* gold accent stripe bottom */}
      <mesh position={[0, -0.6, 0]}>
        <cylinderGeometry args={[0.625, 0.625, 0.03, 64, 1, true]} />
        <meshStandardMaterial color="#FFD84D" metalness={0.8} roughness={0.3} emissive="#FFD84D" emissiveIntensity={0.25} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

interface BottleProps {
  pointer: { x: number; y: number };
}

function Bottle({ pointer }: BottleProps) {
  const group = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!group.current) return;
    // Smooth idle rotation + mouse-driven rotation
    const targetY = group.current.rotation.y + delta * 0.15 + (pointer.x * 0.5 - group.current.rotation.y) * 0.02;
    group.current.rotation.y = targetY;
    const targetX = pointer.y * 0.18;
    group.current.rotation.x += (targetX - group.current.rotation.x) * 0.04;
    // gentle bob
    group.current.position.y = Math.sin(state.clock.elapsedTime * 1.2) * 0.06;
  });

  return (
    <group ref={group} rotation={[0, 0.4, 0]} scale={1.05}>
      <BottleBody />
      <WaterFill />
      <Cap />
      <Label />
    </group>
  );
}

function Droplets() {
  return (
    <Sparkles
      count={40}
      scale={[5, 5, 5]}
      size={3}
      speed={0.4}
      opacity={0.6}
      color="#80DEEA"
    />
  );
}

function Rig({ children }: { children: React.ReactNode }) {
  const { camera } = useThree();
  const target = useRef(new THREE.Vector3(0, 1.2, 6));
  useFrame((state) => {
    target.set(state.pointer.x * 1.2, 1.2 + state.pointer.y * 0.6, 6);
    camera.position.lerp(target, 0.05);
    camera.lookAt(0, 0, 0);
  });
  return <>{children}</>;
}

export interface HeroBottleProps {
  pointer?: { x: number; y: number };
  className?: string;
}

export function HeroBottle({ pointer = { x: 0, y: 0 }, className = "" }: HeroBottleProps) {
  return (
    <div className={className}>
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 1, 6], fov: 38 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <Rig>
            <ambientLight intensity={0.4} />
            <spotLight
              position={[4, 6, 4]}
              angle={0.45}
              penumbra={1}
              intensity={2.4}
              color="#FFD84D"
              castShadow
              shadow-mapSize={[1024, 1024]}
            />
            <spotLight
              position={[-5, 3, -2]}
              angle={0.5}
              penumbra={1}
              intensity={1.8}
              color="#00A8B5"
            />
            <pointLight position={[0, -2, 3]} intensity={1.2} color="#4DD0E1" />

            <Float speed={2} rotationIntensity={0.25} floatIntensity={0.5}>
              <Bottle pointer={pointer} />
            </Float>

            <Droplets />

            <ContactShadows
              position={[0, -2.1, 0]}
              opacity={0.45}
              scale={9}
              blur={2.4}
              far={4}
              color="#001417"
            />
            <Environment preset="studio" />
          </Rig>
        </Suspense>
      </Canvas>
    </div>
  );
}
