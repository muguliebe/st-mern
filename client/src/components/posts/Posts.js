import React, {useEffect} from 'react';
import Spinner from '../common/Spinner';
import PostContext from '../../context/PostContext';
import PostForm from './PostForm';
import PostFeed from './PostFeed';
import usePosts from "../../hook/usePosts";
import { createStore, useStore } from 'react-hookstore'

const Posts = () => {
  const {posts, getPost, loading} = usePosts();

  useEffect(() => {
    getPost()
  }, [])

  return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <PostForm />
            </div>
          </div>
          {loading? <Spinner/> : <PostFeed key={posts} posts={posts} />}
        </div>
      </div>
  );
};

export default Posts;
