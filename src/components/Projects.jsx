import './Projects.css'

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "E-Commerce Website",
      description: "A fully responsive e-commerce platform built with React and modern CSS. Features include product catalog, shopping cart, and user authentication.",
      technologies: ["React", "CSS3", "JavaScript", "Local Storage"],
      image: "project1.jpg",
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: 2,
      title: "Task Management App",
      description: "A productivity app for managing daily tasks and projects. Includes drag-and-drop functionality, priority levels, and progress tracking.",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Context API"],
      image: "project2.jpg",
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: 3,
      title: "Weather Dashboard",
      description: "A beautiful weather application that displays current conditions and forecasts. Features location-based weather and interactive charts.",
      technologies: ["React", "API Integration", "Chart.js", "CSS Modules"],
      image: "project3.jpg",
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: 4,
      title: "Portfolio Website",
      description: "A responsive portfolio website showcasing my work and skills. Built with modern web technologies and optimized for performance.",
      technologies: ["React", "Vite", "CSS3", "Responsive Design"],
      image: "project4.jpg",
      liveUrl: "#",
      githubUrl: "#"
    }
  ]

  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2 className="section-title">Featured Projects</h2>
        <p className="section-subtitle">
          Discover my latest work and creative solutions
        </p>
        <div className="projects-showcase">
          {projects.map((project, index) => (
            <div key={project.id} className={`project-item ${index % 2 === 0 ? 'project-left' : 'project-right'}`}>
              <div className="project-visual">
                <div className="project-image-container">
                  <div className="project-image-bg">
                    <div className="image-placeholder">
                      <div className="project-icon">
                        <span>💻</span>
                      </div>
                      <div className="project-number">0{project.id}</div>
                    </div>
                  </div>
                  <div className="project-glow"></div>
                </div>
              </div>

              <div className="project-details">
                <div className="project-header">
                  <span className="project-category">Web Development</span>
                  <h3 className="project-title">{project.title}</h3>
                </div>

                <div className="project-description-box">
                  <p className="project-description">{project.description}</p>
                </div>

                <div className="project-tech-stack">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-pill">{tech}</span>
                  ))}
                </div>

                <div className="project-actions">
                  <a href={project.liveUrl} className="project-link live-link" target="_blank" rel="noopener noreferrer">
                    <span className="link-icon">🚀</span>
                    <span>Live Demo</span>
                  </a>
                  <a href={project.githubUrl} className="project-link code-link" target="_blank" rel="noopener noreferrer">
                    <span className="link-icon">⚡</span>
                    <span>View Code</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
