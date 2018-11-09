import { useEffect, useState } from 'react';
import axios from 'axios';
import { createStore, useStore } from 'react-hookstore'

createStore({name: 'posts', state: []})

const usePosts = () => {
  const [state, setPosts]     = useStore('posts');
  const [loading, setLoading] = useState(true);
  const posts = state.posts

  // useEffect(() => {
  //   getPost();
  // }, []);

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
    return axios.post('/api/posts', payload)
      .then((res) => {
        setPosts([res.data, ...state]);
        return ''
      })
      .catch(e => {
        console.log('usePosts] addPost error', e);
        return e.response.data.text
      });
  };

  const deletePost = (postId) => {
    axios.delete(`/api/posts/${postId}`)
      .then(() => {
        const filteredPosts = state.filter(post => post._id !== postId);
        setPosts(filteredPosts);
      })
      .catch(e => {
        console.log('usePosts] deletePost:', e);
      })
  };

  const likePost = (postId) => {
    axios.post(`/api/posts/${postId}/like`)
      .then(() => getPost())
      .catch(e => e.response.data);
  };

  const unlikePost = (postId) => {
    axios.post(`/api/posts/${postId}/unlike`)
      .then(() => getPost())
      .catch(e => e.response.data);
  };
  return {posts, getPost, setPosts, deletePost, loading, addPost, likePost, unlikePost}
};

export default usePosts;
