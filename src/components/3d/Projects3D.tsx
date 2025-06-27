import React, { useRef, useState, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float, Text, RoundedBox, useScroll, Html } from '@react-three/drei';
import * as THREE from 'three';

// Project data
const projects = [
  {
    id: 1,
    title: "3D E-Commerce",
    description: "Immersive shopping experience with WebGL",
    tech: ["React", "Three.js", "WebGL"],
    color: "#667eea",
    position: [-6, 2, -15] as [number, number, number],
  },
  {
    id: 2,
    title: "AR Portfolio",
    description: "Augmented reality portfolio showcase",
    tech: ["React", "AR.js", "WebXR"],
    color: "#06b6d4",
    position: [6, -1, -18] as [number, number, number],
  },
  {
    id: 3,
    title: "VR Dashboard",
    description: "Virtual reality data visualization",
    tech: ["A-Frame", "D3.js", "WebVR"],
    color: "#8b5cf6",
    position: [-4, -3, -22] as [number, number, number],
  },
  {
    id: 4,
    title: "3D Game Engine",
    description: "Custom WebGL game engine",
    tech: ["TypeScript", "WebGL", "GLSL"],
    color: "#f59e0b",
    position: [8, 3, -25] as [number, number, number],
  },
];

// Individual 3D Project Card
function ProjectCard3D({ project, index }: { project: typeof projects[0]; index: number }) {
  const cardRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const scroll = useScroll();

  useFrame((state) => {
    if (cardRef.current) {
      const offset = scroll.offset;
      
      // Floating animation
      cardRef.current.position.y = project.position[1] + Math.sin(state.clock.elapsedTime + index) * 0.5;
      
      // Scroll-based movement
      cardRef.current.position.z = project.position[2] + offset * 10;
      
      // Rotation based on scroll and time
      cardRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5 + index) * 0.1 + offset * 2;
      cardRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.3 + index) * 0.05;
      
      // Scale on hover
      const targetScale = hovered ? 1.1 : 1;
      cardRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <group
      ref={cardRef}
      position={project.position}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      {/* Main card container */}
      <Float speed={2} rotationIntensity={0.3} floatIntensity={1}>
        <RoundedBox
          args={[4, 3, 0.2]}
          radius={0.1}
          smoothness={4}
        >
          <meshStandardMaterial
            color={project.color}
            metalness={0.8}
            roughness={0.2}
            transparent
            opacity={0.9}
            emissive={project.color}
            emissiveIntensity={hovered ? 0.3 : 0.1}
          />
        </RoundedBox>
      </Float>

      {/* Project title */}
      <Text
        position={[0, 0.8, 0.15]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter-Bold.woff"
      >
        {project.title}
      </Text>

      {/* Project description */}
      <Text
        position={[0, 0.2, 0.15]}
        fontSize={0.15}
        color="rgba(255, 255, 255, 0.8)"
        anchorX="center"
        anchorY="middle"
        maxWidth={3.5}
        textAlign="center"
      >
        {project.description}
      </Text>

      {/* Tech stack */}
      {project.tech.map((tech, techIndex) => (
        <Text
          key={tech}
          position={[-1.5 + techIndex * 1, -0.5, 0.15]}
          fontSize={0.1}
          color={project.color}
          anchorX="center"
          anchorY="middle"
        >
          {tech}
          <meshStandardMaterial
            color={project.color}
            emissive={project.color}
            emissiveIntensity={0.2}
          />
        </Text>
      ))}

      {/* Interactive elements */}
      {hovered && (
        <group>
          {/* Glow effect */}
          <mesh position={[0, 0, -0.1]}>
            <planeGeometry args={[5, 4]} />
            <meshBasicMaterial
              color={project.color}
              transparent
              opacity={0.2}
              side={THREE.DoubleSide}
            />
          </mesh>
          
          {/* Floating particles */}
          {Array.from({ length: 10 }, (_, i) => (
            <mesh
              key={i}
              position={[
                (Math.random() - 0.5) * 6,
                (Math.random() - 0.5) * 4,
                0.3 + Math.random() * 0.5
              ]}
            >
              <sphereGeometry args={[0.02]} />
              <meshBasicMaterial
                color={project.color}
                transparent
                opacity={0.8}
              />
            </mesh>
          ))}
        </group>
      )}

      {/* HTML overlay for detailed info */}
      {hovered && (
        <Html
          position={[0, -2, 0]}
          center
          distanceFactor={10}
          style={{
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          <div className="project-3d-overlay">
            <button className="project-3d-btn">View Project</button>
            <button className="project-3d-btn secondary">Source Code</button>
          </div>
        </Html>
      )}
    </group>
  );
}

// Floating project showcase platform
function ShowcasePlatform() {
  const platformRef = useRef<THREE.Group>(null);
  const scroll = useScroll();

  useFrame((state) => {
    if (platformRef.current) {
      const offset = scroll.offset;
      platformRef.current.position.y = -5 - offset * 15;
      platformRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={platformRef}>
      {/* Main platform */}
      <mesh position={[0, 0, -20]} rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[15, 15, 0.5, 32]} />
        <meshStandardMaterial
          color="#1a1a2e"
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Platform rings */}
      {Array.from({ length: 3 }, (_, i) => (
        <mesh
          key={i}
          position={[0, 0.1, -20]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <ringGeometry args={[8 + i * 3, 9 + i * 3, 32]} />
          <meshStandardMaterial
            color="#667eea"
            transparent
            opacity={0.2 - i * 0.05}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}

      {/* Holographic grid */}
      <mesh position={[0, 0.2, -20]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[30, 30]} />
        <meshBasicMaterial
          color="#06b6d4"
          transparent
          opacity={0.1}
          wireframe
        />
      </mesh>
    </group>
  );
}

// Project connection lines
function ProjectConnections() {
  const linesRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  const connections = useMemo(() => {
    const lines = [];
    
    for (let i = 0; i < projects.length - 1; i++) {
      const start = projects[i].position;
      const end = projects[i + 1].position;
      
      lines.push(
        <line key={i}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([
                start[0], start[1], start[2],
                end[0], end[1], end[2]
              ])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial
            color="#667eea"
            transparent
            opacity={0.3}
          />
        </line>
      );
    }
    
    return lines;
  }, []);

  return <group ref={linesRef}>{connections}</group>;
}

// Main Projects3D Component
function Projects3D() {
  const projectsRef = useRef<THREE.Group>(null);
  const scroll = useScroll();

  useFrame((state) => {
    if (projectsRef.current) {
      const offset = scroll.offset;
      // Adjust position based on scroll (projects section starts at page 2)
      projectsRef.current.position.y = (offset - 0.4) * 20;
    }
  });

  return (
    <group ref={projectsRef}>
      {/* Showcase Platform */}
      <ShowcasePlatform />
      
      {/* Project Connection Lines */}
      <ProjectConnections />
      
      {/* Individual Project Cards */}
      {projects.map((project, index) => (
        <ProjectCard3D
          key={project.id}
          project={project}
          index={index}
        />
      ))}
      
      {/* Section title */}
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
        <Text
          position={[0, 8, -15]}
          fontSize={1.5}
          color="#667eea"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Inter-Bold.woff"
        >
          3D PROJECTS
          <meshStandardMaterial
            color="#667eea"
            metalness={0.8}
            roughness={0.2}
            emissive="#667eea"
            emissiveIntensity={0.2}
          />
        </Text>
      </Float>
      
      {/* Ambient project elements */}
      <Float speed={0.5} rotationIntensity={0.1} floatIntensity={1}>
        <mesh position={[0, 0, -30]}>
          <dodecahedronGeometry args={[3]} />
          <meshStandardMaterial
            color="#8b5cf6"
            metalness={0.9}
            roughness={0.1}
            transparent
            opacity={0.3}
            wireframe
          />
        </mesh>
      </Float>
    </group>
  );
}

export default Projects3D;
