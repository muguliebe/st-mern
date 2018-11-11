import React from 'react';
import Spinner from '../common/Spinner';
import PostContext from '../../context/PostContext';
import PostForm from './PostForm';
import PostFeed from './PostFeed';
import usePosts from "../../hook/usePosts";

const Posts = () => {
  const postStore = usePosts();

  return (
    <PostContext.Provider value={postStore}>
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <PostForm />
            </div>
          </div>
          {postStore.loading ? <Spinner /> : <PostFeed key={postStore.posts.toString()} posts={postStore.posts} />}
        </div>
      </div>
    </PostContext.Provider>
  );
};

export default Posts;
