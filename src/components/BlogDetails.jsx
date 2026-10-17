import './BlogDetails.css'

function BlogDetails({ article, onBack }) {
  if (!article) return null

  return (
    <section className="blog-details">
      <button className="blog-back-button" onClick={onBack}>
        ← Back to Blog
      </button>

      <p className="blog-category">{article.category}</p>

      <h1>{article.title}</h1>

      <p className="blog-details-intro">{article.description}</p>

      <div className="blog-article-content">
        {article.content.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      <button className="btn primary" onClick={onBack}>
        Back to All Articles
      </button>
    </section>
  )
}

export default BlogDetails