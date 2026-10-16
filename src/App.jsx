
import { useEffect, useState } from 'react'
import './App.css'
import profileImage from './assets/profile.png'


 
function App() {
  const [projects, setProjects] = useState([])
  const [apiLoading, setApiLoading] = useState(true)
  const [apiError, setApiError] = useState('')

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/projects/')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to load projects')
        }
        return response.json()
      })
      .then((data) => {
        const projectList = Array.isArray(data)
          ? data
          : data.results ?? data.projects ?? []

        setProjects(projectList)
        setApiError('')
      })
      .catch((error) => {
        console.error('Projects API error:', error)
        setApiError('Could not connect to the Projects API.')
      })
      .finally(() => {
        setApiLoading(false)
      })
  }, [])

  return (

    <div className="portfolio">
      <nav className="navbar">
        <a className="logo" href="#home">AK<span>.</span></a>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <p className="eyebrow">TEACHER · DEVELOPER · LIFELONG LEARNER</p>

            <h1>
              Hello, I'm <span>Abdul Khalek</span>
            </h1>

            <h2>Teacher & Software/Web Developer</h2>

            <p className="hero-description">
              I teach Mathematics and Physics and build modern web
              applications, Flutter apps, and digital solutions.
            </p>

            <div className="hero-buttons">
              <a className="btn primary" href="#projects">
                Explore My Projects
              </a>
              <a className="btn secondary" href="#contact">
                Contact Me
              </a>
              
              <a
                className="btn secondary"
                href="/resume.pdf"
                download="Abdul-Khalek-CV.pdf"
              >
                Download CV ↓
            </a>

            </div>

            <div className="hero-tags">
              <span>React</span>
              <span>Python & Django</span>
              <span>WordPress</span>
              <span>Flutter</span>
            </div>
          </div>

          <div className="hero-card">
            <div className="avatar">
              <img src={profileImage} alt="Abdul Khalek" />
            </div>
            <h3>Abdul Khalek</h3>
            <p>Educator & Developer</p>
            <div className="card-line" />
            <p>Mathematics · Physics · Technology</p>
          </div>
        </section>

        <section className="info-section" id="about">
          <p className="eyebrow">ABOUT ME</p>
          <h2>Teaching meets technology.</h2>
          <p>
            With over 37 years of teaching experience, I combine
            education and technology to create useful digital
            experiences and help learners grow.
          </p>
        </section>

        <section className="info-section" id="skills">
          <p className="eyebrow">WHAT I DO</p>
          <h2>My Skills</h2>
          <div className="skill-grid">
            <div className="skill">React & JavaScript</div>
            <div className="skill">Python & Django</div>
            <div className="skill">Flutter App Development</div>
            <div className="skill">WordPress Development</div>
            <div className="skill">HTML & CSS</div>
            <div className="skill">Mathematics & Physics</div>
          </div>
        </section>

        
      
<section className="info-section" id="projects">
  <p className="eyebrow">MY WORK</p>
  <h2>Featured Projects</h2>
  <p>
    A selection of my work in web development, mobile apps,
    and backend API development.
  </p>

  <div className="project-grid">
    {apiLoading ? (
      <p>Loading projects...</p>
    ) : apiError ? (
      <p>{apiError}</p>
    ) : projects.length === 0 ? (
      <p>No projects found.</p>
    ) : (
      projects.map((project) => (
        <article className="project-card" key={project.id}>
          <div className="project-icon">
            {project.category?.toLowerCase().includes('flutter')
              ? '📱'
              : project.category?.toLowerCase().includes('frontend')
                ? '🛒'
                : '⚙️'}
          </div>

          <p className="project-type">
            {project.category}
          </p>

          <h3>{project.title}</h3>

          <p className="project-description">
            {project.description}
          </p>

          <div className="project-tags">
            {project.technologies?.map((technology) => (
              <span key={technology}>{technology}</span>
            ))}
          </div>

          <a
            className="project-link"
            href={project.github_url}
            target="_blank"
            rel="noreferrer"
          >
            View on GitHub <span>↗</span>
          </a>
        </article>
      ))
    )}
  </div>
</section>



        <section className="info-section contact-section" id="contact">
          <p className="eyebrow">LET'S CONNECT</p>
          <h2>Have a project in mind?</h2>
          <p>Let's connect and create something useful together.</p>
          <a
            className="btn primary"
            href="https://www.linkedin.com/in/abdul-khalek-sir/"
            target="_blank"
            rel="noreferrer"
          >
            Connect on LinkedIn
          </a>
        </section>
      </main>

      <footer>
        © {new Date().getFullYear()} Abdul Khalek. All rights reserved.
      </footer>
    </div>
  )
}

export default App
