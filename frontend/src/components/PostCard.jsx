import { Link } from 'react-router-dom';
import './PostCard.css';

function PostCard({ post }) {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <span className="post-category">{post.category}</span>
        <span className="post-views">👁️ {post.views}</span>
      </div>
      <Link to={`/post/${post._id}`} className="post-title">
        <h3>{post.title}</h3>
      </Link>
      <p className="post-excerpt">
        {post.excerpt || post.content.substring(0, 150)}...
      </p>
      <div className="post-footer">
        <div className="post-author">
          <span>By {post.author?.name || 'Anonymous'}</span>
        </div>
        <span className="post-date">{formatDate(post.createdAt)}</span>
      </div>
      {post.tags && post.tags.length > 0 && (
        <div className="post-tags">
          {post.tags.map((tag, index) => (
            <span key={index} className="tag">#{tag}</span>
          ))}
        </div>
      )}
    </div>
  );
}

export default PostCard;
