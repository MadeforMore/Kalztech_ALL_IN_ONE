import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getPost, deletePost, getComments, createComment, deleteComment } from '../services/api';
import './PostDetail.css';

function PostDetail({ user }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, [id]);

  const fetchPost = async () => {
    try {
      const data = await getPost(id);
      setPost(data);
    } catch (err) {
      setError('Failed to load post');
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const data = await getComments(id);
      setComments(data);
    } catch (err) {
      console.error('Failed to load comments');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePost(id);
        navigate('/my-posts');
      } catch (err) {
        setError('Failed to delete post');
      }
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    try {
      const newComment = await createComment(id, commentText);
      setComments([newComment, ...comments]);
      setCommentText('');
    } catch (err) {
      setError('Failed to post comment');
    }
  };

  const handleCommentDelete = async (commentId) => {
    if (window.confirm('Delete this comment?')) {
      try {
        await deleteComment(commentId);
        setComments(comments.filter(c => c._id !== commentId));
      } catch (err) {
        setError('Failed to delete comment');
      }
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) return <div className="loading">Loading post...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!post) return <div className="error-message">Post not found</div>;

  const isAuthor = user && post.author._id === user._id;

  return (
    <div className="post-detail-container">
      <article className="post-detail">
        <div className="post-meta">
          <span className="post-category">{post.category}</span>
          <span className="post-views">👁️ {post.views} views</span>
        </div>

        <h1>{post.title}</h1>

        <div className="post-author-info">
          <div>
            <strong>{post.author.name}</strong>
            <span className="post-date">{formatDate(post.createdAt)}</span>
          </div>
          {isAuthor && (
            <div className="post-actions">
              <Link to={`/edit/${post._id}`} className="btn-edit">Edit</Link>
              <button onClick={handleDelete} className="btn-delete">Delete</button>
            </div>
          )}
        </div>

        {post.author.bio && (
          <div className="author-bio">
            <em>{post.author.bio}</em>
          </div>
        )}

        <div className="post-content">
          {post.content.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="post-tags">
            {post.tags.map((tag, index) => (
              <span key={index} className="tag">#{tag}</span>
            ))}
          </div>
        )}
      </article>

      <section className="comments-section">
        <h2>Comments ({comments.length})</h2>

        {user ? (
          <form onSubmit={handleCommentSubmit} className="comment-form">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a comment..."
              rows="3"
              required
            />
            <button type="submit" className="btn-primary">Post Comment</button>
          </form>
        ) : (
          <p className="login-prompt">
            <Link to="/login">Login</Link> to leave a comment
          </p>
        )}

        <div className="comments-list">
          {comments.map(comment => (
            <div key={comment._id} className="comment">
              <div className="comment-header">
                <strong>{comment.author.name}</strong>
                <span className="comment-date">{formatDate(comment.createdAt)}</span>
              </div>
              <p className="comment-content">{comment.content}</p>
              {user && comment.author._id === user._id && (
                <button
                  onClick={() => handleCommentDelete(comment._id)}
                  className="btn-delete-comment"
                >
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default PostDetail;
