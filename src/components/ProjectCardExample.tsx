import React from 'react';
import ProjectCard from './ProjectCard';
import type { ProjectData } from './ProjectCard.types';

// Example project data
const exampleProjects: ProjectData[] = [
  {
    id: 1,
    title: "E-Commerce Website",
    description: "A full-featured online store with cart, checkout, and payment processing. Built with modern React patterns and optimized for performance.",
    image: "/images/ecommerce.jpg",
    technologies: ["React", "TypeScript", "Node.js", "MongoDB", "Stripe"],
    demoUrl: "https://example-ecommerce.com",
    sourceUrl: "https://github.com/username/ecommerce-project",
    featured: true,
    category: "Full Stack"
  },
  {
    id: 2,
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
    image: "/images/task-manager.jpg",
    technologies: ["React", "Redux", "Socket.io", "Express", "PostgreSQL"],
    demoUrl: "https://example-tasks.com",
    sourceUrl: "https://github.com/username/task-manager",
    category: "Web App"
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description: "A beautiful weather application that displays current conditions, forecasts, and interactive maps with location-based services.",
    image: "/images/weather-app.jpg",
    technologies: ["React", "Chart.js", "OpenWeather API", "Geolocation"],
    demoUrl: "https://example-weather.com",
    sourceUrl: "https://github.com/username/weather-dashboard",
    category: "Frontend"
  }
];

// Example component demonstrating various usage patterns
const ProjectCardExample: React.FC = () => {
  return (
    <div className="project-examples">
      <h2>ProjectCard Component Examples</h2>
      
      {/* Basic Usage */}
      <section className="example-section">
        <h3>Basic Usage</h3>
        <div className="project-grid">
          <ProjectCard
            title="E-Commerce Website"
            description="A full-featured online store with cart, checkout, and payment processing"
            image="/images/ecommerce.jpg"
            technologies={["React", "Node.js", "MongoDB"]}
            demoUrl="https://example.com"
            sourceUrl="https://github.com/username/project"
          />
        </div>
      </section>

      {/* Grid Layout */}
      <section className="example-section">
        <h3>Grid Layout</h3>
        <div className="project-grid project-grid--three-columns">
          {exampleProjects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              image={project.image}
              technologies={project.technologies}
              demoUrl={project.demoUrl}
              sourceUrl={project.sourceUrl}
              priority={project.featured}
            />
          ))}
        </div>
      </section>

      {/* Demo Only (No Source) */}
      <section className="example-section">
        <h3>Demo Only</h3>
        <div className="project-grid">
          <ProjectCard
            title="Client Project"
            description="A confidential client project showcasing modern web development practices"
            image="/images/client-project.jpg"
            technologies={["React", "TypeScript", "AWS"]}
            demoUrl="https://client-demo.com"
            // No sourceUrl provided
          />
        </div>
      </section>

      {/* Source Only (No Demo) */}
      <section className="example-section">
        <h3>Source Only</h3>
        <div className="project-grid">
          <ProjectCard
            title="Open Source Library"
            description="A utility library for React developers with comprehensive documentation and examples"
            image="/images/library.jpg"
            technologies={["TypeScript", "Jest", "Rollup"]}
            sourceUrl="https://github.com/username/react-library"
            // No demoUrl provided
          />
        </div>
      </section>

      {/* Custom Styling */}
      <section className="example-section">
        <h3>Custom Styling</h3>
        <div className="project-grid">
          <ProjectCard
            title="Featured Project"
            description="A highlighted project with custom styling and enhanced visual treatment"
            image="/images/featured.jpg"
            technologies={["React", "Three.js", "WebGL"]}
            demoUrl="https://featured-demo.com"
            sourceUrl="https://github.com/username/featured-project"
            className="project-card--featured"
            priority={true}
            loading="eager"
          />
        </div>
      </section>
    </div>
  );
};

export default ProjectCardExample;

// CSS for the example layout
export const exampleStyles = `
.project-examples {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.example-section {
  margin-bottom: 3rem;
}

.example-section h3 {
  margin-bottom: 1rem;
  color: #f7fafc;
  font-size: 1.5rem;
}

.project-grid {
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
}

.project-grid--three-columns {
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.project-card--featured {
  border: 2px solid #667eea;
  box-shadow: 0 8px 32px rgba(102, 126, 234, 0.3);
}

@media (max-width: 768px) {
  .project-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .project-examples {
    padding: 1rem;
  }
}
`;
