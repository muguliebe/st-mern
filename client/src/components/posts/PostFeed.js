import React, { useContext,useEffect } from 'react';
import PostItem from "./PostItem";
import PostContext from '../../context/PostContext';

const PostFeed = () => {
  const {posts} = useContext(PostContext);

  return (
    posts.map(post => <PostItem key={post._id} post={post} />)
  )

};

export default PostFeed;
