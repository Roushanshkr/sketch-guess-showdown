import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float, MeshDistortMaterial, useScroll } from '@react-three/drei';
import * as THREE from 'three';

// Animated 3D Text
function AnimatedText() {
  const textRef = useRef<THREE.Mesh>(null);
  const scroll = useScroll();

  useFrame((state) => {
    if (textRef.current) {
      const offset = scroll.offset;
      textRef.current.position.y = -offset * 10;
      textRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Text
        ref={textRef}
        position={[0, 2, 0]}
        fontSize={2}
        color="#667eea"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter-Bold.woff"
      >
        FRONTEND
        <meshStandardMaterial
          color="#667eea"
          metalness={0.8}
          roughness={0.2}
          emissive="#667eea"
          emissiveIntensity={0.2}
        />
      </Text>
    </Float>
  );
}

// Floating code symbols
function CodeSymbols() {
  const symbols = ['<>', '{}', '[]', '()', '/>', '&&', '=>', '++'];
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {symbols.map((symbol, index) => {
        const angle = (index / symbols.length) * Math.PI * 2;
        const radius = 6;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        
        return (
          <Float
            key={symbol}
            speed={1 + index * 0.2}
            rotationIntensity={0.5}
            floatIntensity={2}
          >
            <Text
              position={[x, Math.sin(index) * 2, z]}
              fontSize={0.8}
              color="#06b6d4"
              anchorX="center"
              anchorY="middle"
            >
              {symbol}
              <meshStandardMaterial
                color="#06b6d4"
                transparent
                opacity={0.8}
                emissive="#06b6d4"
                emissiveIntensity={0.1}
              />
            </Text>
          </Float>
        );
      })}
    </group>
  );
}

// Interactive sphere with shader material
function InteractiveSphere() {
  const sphereRef = useRef<THREE.Mesh>(null);
  const scroll = useScroll();

  // Custom shader material
  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color1: { value: new THREE.Color('#667eea') },
        color2: { value: new THREE.Color('#06b6d4') },
        color3: { value: new THREE.Color('#8b5cf6') },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        uniform float time;
        
        void main() {
          vUv = uv;
          vPosition = position;
          
          vec3 pos = position;
          pos.x += sin(time * 2.0 + position.y * 3.0) * 0.1;
          pos.y += cos(time * 1.5 + position.x * 2.0) * 0.1;
          pos.z += sin(time * 1.8 + position.x * position.y) * 0.05;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 color1;
        uniform vec3 color2;
        uniform vec3 color3;
        varying vec2 vUv;
        varying vec3 vPosition;
        
        void main() {
          float noise = sin(vPosition.x * 10.0 + time) * 
                       cos(vPosition.y * 8.0 + time * 1.5) * 
                       sin(vPosition.z * 6.0 + time * 0.8);
          
          vec3 color = mix(color1, color2, vUv.x);
          color = mix(color, color3, vUv.y);
          color += noise * 0.1;
          
          float alpha = 0.8 + noise * 0.2;
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
    });
  }, []);

  useFrame((state) => {
    if (sphereRef.current && shaderMaterial) {
      const offset = scroll.offset;
      shaderMaterial.uniforms.time.value = state.clock.elapsedTime;
      
      sphereRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      sphereRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      sphereRef.current.position.z = -offset * 5;
      sphereRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime) * 0.1);
    }
  });

  return (
    <mesh ref={sphereRef} position={[0, -2, -5]} material={shaderMaterial}>
      <sphereGeometry args={[2, 64, 64]} />
    </mesh>
  );
}

// Holographic grid
function HolographicGrid() {
  const gridRef = useRef<THREE.Group>(null);
  const scroll = useScroll();

  useFrame((state) => {
    if (gridRef.current) {
      const offset = scroll.offset;
      gridRef.current.position.y = -8 - offset * 5;
      gridRef.current.rotation.x = -Math.PI / 2;
    }
  });

  const gridLines = useMemo(() => {
    const lines = [];
    const size = 20;
    const divisions = 20;
    
    for (let i = 0; i <= divisions; i++) {
      const position = (i / divisions - 0.5) * size;
      
      // Horizontal lines
      lines.push(
        <line key={`h-${i}`}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([
                -size/2, 0, position,
                size/2, 0, position
              ])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#667eea" transparent opacity={0.3} />
        </line>
      );
      
      // Vertical lines
      lines.push(
        <line key={`v-${i}`}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([
                position, 0, -size/2,
                position, 0, size/2
              ])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#06b6d4" transparent opacity={0.3} />
        </line>
      );
    }
    
    return lines;
  }, []);

  return (
    <group ref={gridRef}>
      {gridLines}
    </group>
  );
}

// Floating tech icons (simplified geometric representations)
function TechIcons() {
  const iconsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (iconsRef.current) {
      iconsRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  const icons = [
    { position: [-4, 0, -3], color: '#61dafb', shape: 'react' },
    { position: [4, 1, -4], color: '#f7df1e', shape: 'js' },
    { position: [-2, -3, -2], color: '#3178c6', shape: 'ts' },
    { position: [3, -2, -3], color: '#06b6d4', shape: 'css' },
  ];

  return (
    <group ref={iconsRef}>
      {icons.map((icon, index) => (
        <Float
          key={index}
          speed={1 + index * 0.3}
          rotationIntensity={1}
          floatIntensity={2}
        >
          <mesh position={icon.position}>
            {icon.shape === 'react' && <octahedronGeometry args={[0.5]} />}
            {icon.shape === 'js' && <boxGeometry args={[0.8, 0.8, 0.8]} />}
            {icon.shape === 'ts' && <tetrahedronGeometry args={[0.6]} />}
            {icon.shape === 'css' && <cylinderGeometry args={[0.4, 0.4, 0.8]} />}
            <meshStandardMaterial
              color={icon.color}
              metalness={0.8}
              roughness={0.2}
              emissive={icon.color}
              emissiveIntensity={0.2}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

// Main Hero3D Component
function Hero3D() {
  const heroRef = useRef<THREE.Group>(null);
  const scroll = useScroll();

  useFrame((state) => {
    if (heroRef.current) {
      const offset = scroll.offset;
      // Move hero elements as user scrolls
      heroRef.current.position.y = offset * 10;
    }
  });

  return (
    <group ref={heroRef}>
      {/* Animated 3D Text */}
      <AnimatedText />
      
      {/* Code Symbols */}
      <CodeSymbols />
      
      {/* Interactive Sphere */}
      <InteractiveSphere />
      
      {/* Holographic Grid */}
      <HolographicGrid />
      
      {/* Tech Icons */}
      <TechIcons />
      
      {/* Additional atmospheric elements */}
      <Float speed={0.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh position={[0, 0, -10]}>
          <torusKnotGeometry args={[1, 0.3, 128, 16]} />
          <MeshDistortMaterial
            color="#8b5cf6"
            distort={0.3}
            speed={1.5}
            metalness={0.9}
            roughness={0.1}
            transparent
            opacity={0.6}
          />
        </mesh>
      </Float>
    </group>
  );
}

export default Hero3D;
