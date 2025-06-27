import './Skills.css'

const Skills = () => {
  const skills = [
    {
      category: "Frontend",
      items: [
        { name: "React", level: 90 },
        { name: "JavaScript", level: 85 },
        { name: "HTML5", level: 95 },
        { name: "CSS3", level: 90 },
        { name: "TypeScript", level: 80 }
      ]
    },
    {
      category: "Tools & Libraries",
      items: [
        { name: "Git", level: 85 },
        { name: "Webpack", level: 75 },
        { name: "Sass/SCSS", level: 85 },
        { name: "Tailwind CSS", level: 80 },
        { name: "Vite", level: 85 }
      ]
    },
    {
      category: "Design",
      items: [
        { name: "Responsive Design", level: 90 },
        { name: "UI/UX Principles", level: 80 },
        { name: "Figma", level: 75 },
        { name: "Adobe XD", level: 70 }
      ]
    }
  ]

  return (
    <section id="skills" className="skills">
      <div className="container">
        <h2 className="section-title">Skills & Technologies</h2>
        <div className="skills-grid">
          {skills.map((skillCategory, index) => (
            <div key={index} className="skill-category">
              <h3 className="category-title">{skillCategory.category}</h3>
              <div className="skill-items">
                {skillCategory.items.map((skill, skillIndex) => (
                  <div key={skillIndex} className="skill-item">
                    <div className="skill-header">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-percentage">{skill.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <div 
                        className="skill-progress" 
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
