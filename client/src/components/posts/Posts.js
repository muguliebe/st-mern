import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../common/Spinner';
import PostContext from '../../context/PostContext';
import PostForm from './PostForm';
import PostFeed from './PostFeed';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/posts')
      .then(res => {
        setLoading(false);
        setPosts(res.data);
      })
      .catch(e => {
        console.log(e);
      })
  }, []);

  return (
    <PostContext.Provider value={{posts, setPosts}}>
    <div className="feed">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <PostForm />
          </div>
        </div>
        {loading ? <Spinner /> : <PostFeed key={posts.toString()} posts={posts} />}
      </div>
    </div>
    </PostContext.Provider>
  );
};

export default Posts;
