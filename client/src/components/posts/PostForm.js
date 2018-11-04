import React, { useContext, useState } from 'react';
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import axios from 'axios';
import AuthContext from "../../context/AuthContext";
import PostContext from '../../context/PostContext';

const PostForm = () => {
  const {user}                     = useContext(AuthContext);
  const {posts, addPost, setPosts} = useContext(PostContext);
  const [contents, setContents]    = useState({
    text: '',
    errors: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('post submit');

    const newPost = {
      name: user.name,
      avatar: user.avatar,
      text: contents.text
    };

    const result = await addPost(newPost);
    console.log('result');
    setContents({...contents, text: '', errors: ''});
  };

  return (
    <div className="post-form mb-3">
      <div className="card card-info">
        <div className="card-header bg-info text-white">
          say something...
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <TextAreaFieldGroup
                placeholder="create a post.."
                name="text"
                onChange={e => setContents({...contents, text: e.target.value})}
                value={contents.text}
                error={contents.errors}
              >
              </TextAreaFieldGroup>

            </div>
            <button type="submit" className="btn btn-dark">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostForm;
