import { useState, useEffect, useContext } from 'react';
import axios from 'axios';

const usePosts = () => {
  const [posts, setPosts]     = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPost();
  }, []);

  const getPost = () => {
    axios.get('/api/posts')
      .then(res => {
        setPosts(res.data);
        setLoading(false);
        console.log('complete');
      })
      .catch(e => {
        console.log(e);
      })
  };

  const addPost = (payload) => {
    axios.post('/api/posts', payload)
      .then((res) => {
        setPosts([res.data, ...posts]);
        return {errors: ''}
      })
      .catch(e => {
        console.log('usePosts] addPost error', e.response);
        return {errors: e.response.data.text}
      });
  };

  const deletePost = (postId) => {
    axios.delete(`/api/posts/${postId}`)
      .then(() => {
        const filteredPosts = posts.filter(post => post._id !== postId);
        setPosts(filteredPosts);
      })
      .catch(e => {
        console.log('usePosts] deletePost:', e);
      })
  };

  const likePost = (postId) => {
    axios.post(`/api/posts/like/${postId}`)
      .then(() => getPost())
      .catch(e => e.response.data);
  };

  const unlikePost = (postId) => {
    axios.post(`/api/posts/unlike/${postId}`)
      .then(() => getPost())
      .catch(e => e.response.data);
  };
  return {posts, setPosts, deletePost, loading, addPost, likePost, unlikePost}
};

export default usePosts;