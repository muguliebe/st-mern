import React, { useEffect, useState } from 'react';
import PostItem from "./PostItem";

const PostFeed = (props) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setPosts(props.posts);
  }, [props.posts]);

  return (
    posts.map(post => <PostItem key={post._id} post={post} />)
  )

};

export default PostFeed;
