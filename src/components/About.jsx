import './About.css'

const About = () => {
  return (
    <section id="about" className="about">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <div className="about-content">
          <div className="about-text">
            <p>
              I'm a passionate frontend developer with a love for creating 
              intuitive and engaging user experiences. With expertise in modern 
              web technologies, I enjoy turning complex problems into simple, 
              beautiful, and intuitive solutions.
            </p>
            <p>
              When I'm not coding, you can find me exploring new technologies, 
              contributing to open-source projects, or sharing my knowledge 
              with the developer community.
            </p>
            <div className="about-stats">
              <div className="stat">
                <h3>2+</h3>
                <p>Years Experience</p>
              </div>
              <div className="stat">
                <h3>20+</h3>
                <p>Projects Completed</p>
              </div>
              <div className="stat">
                <h3>5+</h3>
                <p>Technologies Mastered</p>
              </div>
            </div>
          </div>
          <div className="about-image">
            <div className="image-placeholder">
              <span>About Image</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
