import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Post {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  createdAt: string;
  likes: number;
  comments: number;
  tags: string[];
  isLiked: boolean;
}

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    tags: [] as string[]
  });

  useEffect(() => {
    fetchPosts();
  }, [selectedTag]);

  const fetchPosts = async () => {
    try {
      const url = selectedTag 
        ? `/api/posts?tag=${selectedTag}`
        : '/api/posts';
      
      const response = await fetch(url, {
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      }
    } catch (error) {
      setError('Erreur lors de la récupération des posts');
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (postId: string) => {
    try {
      const response = await fetch(`/api/posts/${postId}/like`, {
        method: 'POST',
        credentials: 'include'
      });

      if (response.ok) {
        setPosts(posts.map(post => {
          if (post.id === postId) {
            return {
              ...post,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
              isLiked: !post.isLiked
            };
          }
          return post;
        }));
      }
    } catch (error) {
      console.error('Erreur lors du like:', error);
    }
  };

  const handleSubmitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        setPosts([data, ...posts]);
        setShowNewPostForm(false);
        setNewPost({ title: '', content: '', tags: [] });
      }
    } catch (error) {
      setError('Erreur lors de la création du post');
    }
  };

  if (loading) return <div className="p-4">Chargement...</div>;
  if (error) return <div className="text-red-600 p-4">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* En-tête avec bouton de création */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Forum de la communauté</h1>
        <button
          onClick={() => setShowNewPostForm(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Nouveau post
        </button>
      </div>

      {/* Tags populaires */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedTag(null)}
            className={`px-3 py-1 rounded-full text-sm ${
              !selectedTag ? 'bg-indigo-600 text-white' : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            Tous
          </button>
          {['React', 'TypeScript', 'Design', 'Freelance', 'Business'].map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedTag === tag ? 'bg-indigo-600 text-white' : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Formulaire de nouveau post */}
      {showNewPostForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h2 className="text-xl font-bold mb-4">Créer un nouveau post</h2>
            <form onSubmit={handleSubmitPost}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Titre
                </label>
                <input
                  type="text"
                  value={newPost.title}
                  onChange={e => setNewPost({ ...newPost, title: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Contenu
                </label>
                <textarea
                  value={newPost.content}
                  onChange={e => setNewPost({ ...newPost, content: e.target.value })}
                  className="w-full p-2 border rounded"
                  rows={6}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Tags
                </label>
                <input
                  type="text"
                  placeholder="Séparez les tags par des virgules"
                  onChange={e => setNewPost({
                    ...newPost,
                    tags: e.target.value.split(',').map(tag => tag.trim())
                  })}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewPostForm(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                  Publier
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Liste des posts */}
      <div className="space-y-6">
        {posts.map(post => (
          <div key={post.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <Link
                to={`/profile/${post.author.id}`}
                className="flex items-center"
              >
                <img
                  src={post.author.avatar || '/default-avatar.png'}
                  alt={post.author.name}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <div className="font-medium">{post.author.name}</div>
                  <div className="text-sm text-gray-500">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </Link>
            </div>
            <Link to={`/posts/${post.id}`}>
              <h2 className="text-xl font-semibold mb-2 hover:text-indigo-600">
                {post.title}
              </h2>
            </Link>
            <p className="text-gray-600 mb-4">{post.content}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map(tag => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-gray-100 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-4 text-gray-500">
              <button
                onClick={() => handleLike(post.id)}
                className={`flex items-center gap-1 ${
                  post.isLiked ? 'text-indigo-600' : ''
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill={post.isLiked ? 'currentColor' : 'none'}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                {post.likes}
              </button>
              <Link
                to={`/posts/${post.id}`}
                className="flex items-center gap-1"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                {post.comments}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;