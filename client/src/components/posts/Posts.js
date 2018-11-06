import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../common/Spinner';
import PostContext from '../../context/PostContext';
import PostForm from './PostForm';
import PostFeed from './PostFeed';
import usePosts from "../../hook/usePosts";

const Posts = () => {
  const {posts, addPost, setPosts, deletePost, loading, likePost, unlikePost} = usePosts();

  return (
    <PostContext.Provider value={{posts, addPost, setPosts, loading, deletePost, likePost, unlikePost}}>
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
