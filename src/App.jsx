
import { useEffect, useState } from 'react'
import './App.css'
import profileImage from './assets/profile.png'
import BlogDetails from './components/BlogDetails'


 
function App() {
  const [projects, setProjects] = useState([])
  const [apiLoading, setApiLoading] = useState(true)
  const [apiError, setApiError] = useState('')
  const [selectedArticle, setSelectedArticle] = useState(null)
  const [blogPosts, setBlogPosts] = useState([])
  const [blogLoading, setBlogLoading] = useState(true)
  const [blogSearch, setBlogSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [blogCategories, setBlogCategories] = useState(['All'])

  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [contactStatus, setContactStatus] = useState('')
  const [contactSubmitting, setContactSubmitting] = useState(false)

  const handleContactChange = (event) => {
    const { name, value } = event.target
    setContactForm((current) => ({ ...current, [name]: value }))
  }

  const handleContactSubmit = async (event) => {
    event.preventDefault()
    setContactStatus('')
    setContactSubmitting(true)

    try {
      const response = await fetch(
        'https://abdul-khalek-portfolio-backend.onrender.com/api/contact/',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(contactForm),
        },
      )

      const data = await response.json()

      if (!response.ok) {
        const firstError = Object.values(data).flat()[0]
        throw new Error(
          firstError || 'Could not send your message. Please try again.',
        )
      }

      setContactStatus(
        data.message || 'Your message has been sent successfully.',
      )
      setContactForm({
        name: '',
        email: '',
        subject: '',
        message: '',
      })
    } catch (error) {
      console.error('Contact form error:', error)
      setContactStatus(
        error.message || 'Could not send your message. Please try again.',
      )
    } finally {
      setContactSubmitting(false)
    }
  }
  useEffect(() => {
    fetch('https://abdul-khalek-portfolio-backend.onrender.com/api/projects/')
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

  useEffect(() => {
  fetch('https://abdul-khalek-portfolio-backend.onrender.com/api/blog/')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to load blog posts')
      }
      return response.json()
    })
    .then((data) => {
      const posts = Array.isArray(data) ? data : data.value ?? []

      setBlogPosts(posts)

      const categories = [
      'All',
      ...new Set(
        posts
        .map((post) => post.category?.trim())
        .filter(Boolean)
      ),
      ]

      setBlogCategories(categories)
    })
    .catch((error) => {
      console.error('Blog API error:', error)
      setBlogPosts([])
    })
    .finally(() => {
      setBlogLoading(false)
    })
}, [])
const filteredBlogPosts = blogPosts.filter((post) => {
  const searchText = blogSearch.trim().toLowerCase()

  const matchesSearch =
    !searchText ||
    post.title?.toLowerCase().includes(searchText) ||
    post.excerpt?.toLowerCase().includes(searchText) ||
    post.content?.toLowerCase().includes(searchText) ||
    post.category?.toLowerCase().includes(searchText)

  const matchesCategory =
    selectedCategory === 'All' ||
    post.category?.trim() === selectedCategory

  return matchesSearch && matchesCategory
})
  return (

    <div className="portfolio">
      <nav className="navbar">
        <a className="logo" href="#home">AK<span>.</span></a>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
	  <a href="#blog">Blog</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <p className="eyebrow">TEACHER Â· DEVELOPER Â· LIFELONG LEARNER</p>

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
                Download CV â†“
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
            <p>Mathematics Â· Physics Â· Technology</p>
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
             		 ? 'ðŸ“±'
             		 : project.category?.toLowerCase().includes('frontend')
              		  ? 'ðŸ›’'
              		  : 'âš™ï¸'}
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
           	 View on GitHub <span>â†—</span>
         	 </a>
       		 </article>
     		))
   		)}
 	 	</div>
	</section>


	
  
<section className="info-section" id="blog">
  {selectedArticle ? (
    <BlogDetails
      article={selectedArticle}
      onBack={() => setSelectedArticle(null)}
    />
  ) : (
    <>
      <p className="eyebrow">LATEST ARTICLES</p>

      <h2>Learning & Development Blog</h2>

      <p>
        Sharing ideas about education, programming, and technology
        to help students and aspiring developers learn and grow.
      </p>
      <div className="blog-filters">
  <input
    type="search"
    className="blog-search"
    placeholder="Search blog articles..."
    value={blogSearch}
    onChange={(event) => setBlogSearch(event.target.value)}
    aria-label="Search blog articles"
  />

  <select
    className="blog-category-filter"
    value={selectedCategory}
    onChange={(event) => setSelectedCategory(event.target.value)}
    aria-label="Filter by category"
  >
    {blogCategories.map((category) => (
      <option key={category} value={category}>
        {category === 'All' ? 'All Categories' : category}
      </option>
    ))}
  </select>

  <button
    type="button"
    className="btn secondary"
    onClick={() => {
      setBlogSearch('')
      setSelectedCategory('All')
    }}
  >
    Reset Filters
  </button>
</div>
      {blogLoading ? (
        <p>Loading blog posts...</p>
      ) : filteredBlogPosts.length > 0 ? (
      <div className="blog-grid">
          {filteredBlogPosts.map((post) => (
            <article className="blog-card" key={post.id}>
              <p className="blog-category">
                {post.category?.toUpperCase() || 'BLOG'}
              </p>

              <h3>{post.title}</h3>

              <p className="blog-description">
                {post.excerpt}
              </p>

              <span className="blog-read-time">
                Blog article
              </span>

              <button
                className="btn secondary"
                onClick={() =>
                  setSelectedArticle({
		    slug: post.slug,
                    category: post.category?.toUpperCase() || 'BLOG',
                    title: post.title,
                    description: post.excerpt,
                    content: String(post.content || '')
                      .split(/\n+/)
                      .filter((paragraph) => paragraph.trim()),
                  })
                }
              >
                Read Article â†’
              </button>
            </article>
          ))}
        </div>
      ) : (
        <p>
          {blogPosts.length === 0
            ? 'No published blog posts available yet.'
            : 'No blog posts match your search or selected category.'}
      </p>
      )}
    </>
  )}
</section>

        <section className="info-section contact-section" id="contact">
          <p className="eyebrow">LET'S CONNECT</p>
          <h2>Have a project in mind?</h2>
          <p>Send me a message using the form below, or connect with me on LinkedIn.</p>

          <form className="contact-form" onSubmit={handleContactSubmit}>
            <div className="contact-form-grid">
              <label>
                Name
                <input
                  type="text"
                  name="name"
                  value={contactForm.name}
                  onChange={handleContactChange}
                  maxLength={100}
                  autoComplete="name"
                  required
                />
              </label>

              <label>
                Email
                <input
                  type="email"
                  name="email"
                  value={contactForm.email}
                  onChange={handleContactChange}
                  autoComplete="email"
                  required
                />
              </label>
            </div>

            <label>
              Subject (optional)
              <input
                type="text"
                name="subject"
                value={contactForm.subject}
                onChange={handleContactChange}
                maxLength={200}
              />
            </label>

            <label>
              Message
              <textarea
                name="message"
                value={contactForm.message}
                onChange={handleContactChange}
                maxLength={5000}
                rows={6}
                required
              />
            </label>

            <button
              className="btn primary"
              type="submit"
              disabled={contactSubmitting}
            >
              {contactSubmitting ? 'Sending...' : 'Send Message'}
            </button>

            {contactStatus && (
              <p className="contact-status" role="status" aria-live="polite">
                {contactStatus}
              </p>
            )}
          </form>

          <a
            className="btn primary contact-linkedin"
            href="https://www.linkedin.com/in/abdul-khalek-sir/"
            target="_blank"
            rel="noreferrer"
          >
            Connect on LinkedIn
          </a>
        </section>
      </main>

      <footer>
        Â© {new Date().getFullYear()} Abdul Khalek. All rights reserved.
      </footer>
    </div>
  )
}

export default App




