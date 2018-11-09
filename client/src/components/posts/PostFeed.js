import React, { useContext , useEffect} from 'react';
import PostItem from "./PostItem";
import PostContext from '../../context/PostContext';
import { createStore, useStore } from 'react-hookstore'

const PostFeed = () => {
  // const {posts} = useContext(PostContext);
  const [posts] = useStore('posts')
  useEffect(() => {
    // return posts.
  })

  return (
    posts.map(post => <PostItem key={post._id} post={post} />)
  )

};

export default PostFeed;
