import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text, useScroll } from '@react-three/drei';
import * as THREE from 'three';

function Contact3D() {
  const contactRef = useRef<THREE.Group>(null);
  const scroll = useScroll();

  useFrame((state) => {
    if (contactRef.current) {
      const offset = scroll.offset;
      // Position for contact section (page 4)
      contactRef.current.position.y = (offset - 0.8) * 20;
    }
  });

  return (
    <group ref={contactRef}>
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
        <Text
          position={[0, 5, -35]}
          fontSize={1.2}
          color="#8b5cf6"
          anchorX="center"
          anchorY="middle"
        >
          CONTACT
        </Text>
      </Float>
      
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh position={[0, 0, -35]}>
          <torusGeometry args={[2, 0.5, 16, 100]} />
          <meshStandardMaterial
            color="#8b5cf6"
            metalness={0.8}
            roughness={0.2}
            emissive="#8b5cf6"
            emissiveIntensity={0.2}
          />
        </mesh>
      </Float>
    </group>
  );
}

export default Contact3D;
