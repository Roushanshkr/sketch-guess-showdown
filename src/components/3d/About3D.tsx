import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text, useScroll } from '@react-three/drei';
import * as THREE from 'three';

function About3D() {
  const aboutRef = useRef<THREE.Group>(null);
  const scroll = useScroll();

  useFrame((state) => {
    if (aboutRef.current) {
      const offset = scroll.offset;
      // Position for about section (page 1)
      aboutRef.current.position.y = (offset - 0.2) * 20;
    }
  });

  return (
    <group ref={aboutRef}>
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
        <Text
          position={[0, 5, -10]}
          fontSize={1.2}
          color="#06b6d4"
          anchorX="center"
          anchorY="middle"
        >
          ABOUT ME
        </Text>
      </Float>
      
      {/* Skill spheres */}
      {['React', 'Three.js', 'WebGL', 'TypeScript'].map((skill, index) => {
        const angle = (index / 4) * Math.PI * 2;
        const radius = 4;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius - 10;
        
        return (
          <Float key={skill} speed={1 + index * 0.2} rotationIntensity={1} floatIntensity={2}>
            <mesh position={[x, 0, z]}>
              <sphereGeometry args={[0.8]} />
              <meshStandardMaterial
                color="#06b6d4"
                metalness={0.8}
                roughness={0.2}
                emissive="#06b6d4"
                emissiveIntensity={0.1}
              />
            </mesh>
            <Text
              position={[x, -1.5, z]}
              fontSize={0.2}
              color="white"
              anchorX="center"
              anchorY="middle"
            >
              {skill}
            </Text>
          </Float>
        );
      })}
    </group>
  );
}

export default About3D;
