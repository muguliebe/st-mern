import React, { useEffect } from 'react';

const PostFeed = (props) => {
  useEffect(() => {
    console.log(props.posts);
    if (props.posts) {
      props.posts.map(e => console.log(e));
    }
  });
  return (
    props.posts.map(post => <div className="row"> {post._id} </div> )
  )
};

export default PostFeed;
