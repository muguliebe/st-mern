import React from 'react';
import PostForm from "./PostForm";

const Posts = () => {
  return (
    <div className="feed">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <PostForm/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;
