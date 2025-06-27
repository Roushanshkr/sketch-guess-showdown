import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial, useScroll } from '@react-three/drei';
import * as THREE from 'three';

// Floating geometric shapes
function FloatingGeometry({ position, color, scale = 1 }: { 
  position: [number, number, number]; 
  color: string; 
  scale?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 0]} />
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
}

// Particle system
function ParticleField() {
  const points = useRef<THREE.Points>(null);
  const particleCount = 1000;
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
    }
    
    return positions;
  }, []);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.x = state.clock.elapsedTime * 0.05;
      points.current.rotation.y = state.clock.elapsedTime * 0.03;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color="#667eea"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

// Animated background spheres
function BackgroundSpheres() {
  const scroll = useScroll();
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      const offset = scroll.offset;
      groupRef.current.rotation.y = offset * Math.PI * 2;
      groupRef.current.position.y = -offset * 20;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Large background spheres */}
      <Sphere args={[4, 32, 32]} position={[-20, 10, -20]}>
        <MeshDistortMaterial
          color="#4f46e5"
          attach="material"
          distort={0.6}
          speed={1.5}
          roughness={0.2}
          metalness={0.9}
          transparent
          opacity={0.3}
        />
      </Sphere>
      
      <Sphere args={[3, 32, 32]} position={[25, -15, -30]}>
        <MeshDistortMaterial
          color="#06b6d4"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.1}
          metalness={0.8}
          transparent
          opacity={0.4}
        />
      </Sphere>
      
      <Sphere args={[5, 32, 32]} position={[15, 25, -40]}>
        <MeshDistortMaterial
          color="#8b5cf6"
          attach="material"
          distort={0.5}
          speed={1}
          roughness={0.3}
          metalness={0.7}
          transparent
          opacity={0.2}
        />
      </Sphere>
    </group>
  );
}

// Glowing orbs that follow scroll
function ScrollOrbs() {
  const scroll = useScroll();
  const orbsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (orbsRef.current) {
      const offset = scroll.offset;
      orbsRef.current.children.forEach((child, index) => {
        const orb = child as THREE.Mesh;
        orb.position.y = Math.sin(offset * Math.PI * 4 + index) * 5;
        orb.position.x = Math.cos(offset * Math.PI * 3 + index) * 8;
      });
    }
  });

  return (
    <group ref={orbsRef}>
      {Array.from({ length: 5 }, (_, i) => (
        <mesh key={i} position={[0, 0, -10 - i * 5]}>
          <sphereGeometry args={[0.5, 16, 16]} />
          <meshBasicMaterial
            color={`hsl(${240 + i * 30}, 70%, 60%)`}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
    </group>
  );
}

// Main Scene Component
function Scene3D() {
  const sceneRef = useRef<THREE.Group>(null);
  const scroll = useScroll();

  useFrame((state) => {
    if (sceneRef.current) {
      // Subtle scene rotation based on scroll
      const offset = scroll.offset;
      sceneRef.current.rotation.y = offset * 0.5;
    }
  });

  return (
    <group ref={sceneRef}>
      {/* Particle field */}
      <ParticleField />
      
      {/* Background spheres */}
      <BackgroundSpheres />
      
      {/* Scroll-based orbs */}
      <ScrollOrbs />
      
      {/* Floating geometric shapes */}
      <FloatingGeometry position={[-8, 5, -5]} color="#667eea" scale={0.8} />
      <FloatingGeometry position={[10, -3, -8]} color="#06b6d4" scale={1.2} />
      <FloatingGeometry position={[-5, -8, -12]} color="#8b5cf6" scale={0.6} />
      <FloatingGeometry position={[12, 8, -15]} color="#f59e0b" scale={1.0} />
      <FloatingGeometry position={[-12, -5, -18]} color="#ef4444" scale={0.9} />
      
      {/* Additional ambient elements */}
      <Float speed={1} rotationIntensity={0.5} floatIntensity={1}>
        <mesh position={[0, 0, -25]}>
          <torusGeometry args={[8, 2, 16, 100]} />
          <meshStandardMaterial
            color="#667eea"
            metalness={0.8}
            roughness={0.2}
            transparent
            opacity={0.3}
          />
        </mesh>
      </Float>
      
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={1.5}>
        <mesh position={[0, 0, -35]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[5, 8, 32]} />
          <meshStandardMaterial
            color="#06b6d4"
            metalness={0.9}
            roughness={0.1}
            transparent
            opacity={0.4}
            side={THREE.DoubleSide}
          />
        </mesh>
      </Float>
    </group>
  );
}

export default Scene3D;
