
import { useEffect, useState } from 'react'
import './BlogDetails.css'

const API_BASE =
  'https://abdul-khalek-portfolio-backend.onrender.com/api'

function getVisitorId() {
  const storageKey = 'abdul_khalek_blog_visitor_id'
  let visitorId = localStorage.getItem(storageKey)

  if (!visitorId) {
    visitorId =
      typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `visitor-${Date.now()}-${Math.random().toString(36).slice(2)}`

    localStorage.setItem(storageKey, visitorId)
  }

  return visitorId
}

function BlogDetails({ article, onBack }) {
  const [likeCount, setLikeCount] = useState(
    Number(article?.like_count) || 0,
  )
  const [liked, setLiked] = useState(false)
  const [likeLoading, setLikeLoading] = useState(false)
  const [likeError, setLikeError] = useState('')

  const [comments, setComments] = useState([])
  const [commentsLoading, setCommentsLoading] = useState(true)
  const [commentForm, setCommentForm] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [commentStatus, setCommentStatus] = useState('')
  const [commentSubmitting, setCommentSubmitting] = useState(false)

  useEffect(() => {
    if (!article?.slug) return

    let cancelled = false

    async function loadArticleAndComments() {
      setCommentsLoading(true)

      try {
        const [articleResponse, commentsResponse] = await Promise.all([
          fetch(`${API_BASE}/blog/${encodeURIComponent(article.slug)}/`),
          fetch(
            `${API_BASE}/blog/${encodeURIComponent(article.slug)}/comments/`,
          ),
        ])

        if (!articleResponse.ok || !commentsResponse.ok) {
          throw new Error('Unable to load blog information.')
        }

        const articleData = await articleResponse.json()
        const commentsData = await commentsResponse.json()

        if (!cancelled) {
          setLikeCount(Number(articleData.like_count) || 0)
          setComments(commentsData)
        }
      } catch {
        if (!cancelled) {
          setCommentStatus('Comments could not be loaded. Please try again.')
        }
      } finally {
        if (!cancelled) setCommentsLoading(false)
      }
    }

    loadArticleAndComments()

    const visitorId = getVisitorId()
    const likedKey = `abdul_khalek_liked_${article.slug}`
    setLiked(localStorage.getItem(likedKey) === visitorId)

    return () => {
      cancelled = true
    }
  }, [article?.slug])

  async function handleLike() {
    if (!article?.slug || likeLoading) return

    setLikeLoading(true)
    setLikeError('')

    try {
      const visitorId = getVisitorId()

      const response = await fetch(
        `${API_BASE}/blog/${encodeURIComponent(article.slug)}/like/`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ visitor_id: visitorId }),
        },
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Unable to update Like.')
      }

      setLiked(Boolean(data.liked))
      setLikeCount(Number(data.like_count) || 0)

      const likedKey = `abdul_khalek_liked_${article.slug}`

      if (data.liked) {
        localStorage.setItem(likedKey, visitorId)
      } else {
        localStorage.removeItem(likedKey)
      }
    } catch (error) {
      setLikeError(error.message || 'Like could not be updated.')
    } finally {
      setLikeLoading(false)
    }
  }

  function handleCommentChange(event) {
    const { name, value } = event.target
    setCommentForm((current) => ({ ...current, [name]: value }))
  }

  async function handleCommentSubmit(event) {
    event.preventDefault()

    if (!article?.slug || commentSubmitting) return

    setCommentSubmitting(true)
    setCommentStatus('')

    try {
      const response = await fetch(
        `${API_BASE}/blog/${encodeURIComponent(article.slug)}/comments/`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(commentForm),
        },
      )

      const data = await response.json()

      if (!response.ok) {
        const messages = Object.values(data).flat().join(' ')
        throw new Error(messages || 'Unable to submit your comment.')
      }

      setCommentForm({ name: '', email: '', message: '' })
      setCommentStatus(
        data.message || 'Your comment was submitted for moderation.',
      )
    } catch (error) {
      setCommentStatus(
        error.message || 'Comment submission failed. Please try again.',
      )
    } finally {
      setCommentSubmitting(false)
    }
  }

  if (!article) return null

  return (
    <section className="blog-details">
      <button className="blog-back-button" onClick={onBack}>
        &larr; Back to Blog
      </button>

      <p className="blog-category">{article.category}</p>
      <h1>{article.title}</h1>
      <p className="blog-details-intro">{article.description}</p>

      <div className="blog-article-content">
        {article.content.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      <div className="blog-like-section">
        <button
          type="button"
          className="blog-like-button"
          onClick={handleLike}
          disabled={likeLoading}
          aria-pressed={liked}
        >
          {liked ? 'Liked' : 'Like'} ({likeCount})
        </button>

        {likeError && (
          <p className="blog-like-error" role="alert">{likeError}</p>
        )}
      </div>

      <section className="blog-comments">
        <h2>Comments</h2>

        {commentsLoading ? (
          <p>Loading comments...</p>
        ) : comments.length === 0 ? (
          <p>No approved comments yet. Be the first to comment!</p>
        ) : (
          <div className="blog-comment-list">
            {comments.map((comment) => (
              <article className="blog-comment" key={comment.id}>
                <h3>{comment.name}</h3>
                <p>{comment.message}</p>
                <small>
                  {new Date(comment.created_at).toLocaleDateString()}
                </small>
              </article>
            ))}
          </div>
        )}

        <h3>Leave a Comment</h3>

        <form className="blog-comment-form" onSubmit={handleCommentSubmit}>
          <label htmlFor="comment-name">Name</label>
          <input
            id="comment-name"
            name="name"
            value={commentForm.name}
            onChange={handleCommentChange}
            required
            maxLength={100}
            autoComplete="name"
          />

          <label htmlFor="comment-email">Email</label>
          <input
            id="comment-email"
            name="email"
            type="email"
            value={commentForm.email}
            onChange={handleCommentChange}
            required
            autoComplete="email"
          />

          <label htmlFor="comment-message">Comment</label>
          <textarea
            id="comment-message"
            name="message"
            value={commentForm.message}
            onChange={handleCommentChange}
            required
            rows={4}
            maxLength={3000}
          />

          <button
            type="submit"
            className="btn primary"
            disabled={commentSubmitting}
          >
            {commentSubmitting ? 'Submitting...' : 'Submit Comment'}
          </button>

          {commentStatus && (
            <p className="blog-comment-status" role="status">
              {commentStatus}
            </p>
          )}
        </form>
      </section>

      <button className="btn primary" onClick={onBack}>
        Back to All Articles
      </button>
    </section>
  )
}

export default BlogDetails



