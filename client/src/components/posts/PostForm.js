import React, { useContext, useState } from 'react';
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import AuthContext from "../../context/AuthContext";
import PostContext from '../../context/PostContext';

const PostForm = () => {
  const {user}                  = useContext(AuthContext);
  const {addPost}               = useContext(PostContext);
  const [contents, setContents] = useState({
    text: '',
    email: '',
    emailErrors: '',
    errors: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('post submit');

    const newPost = {
      name: user.name,
      text: contents.text
    };

    const result = await addPost(newPost);
    if (result) {
      setContents({...contents, errors: result});
    } else {
      setContents({...contents, text: '', errors: ''});
    }
  };

  const handleEmailChange = e => {
    const afterContents = {
      ...contents,
      email: e.target.value,
      emailErrors: ''
    };

    if (!e.target.value) {
      afterContents.emailErrors = 'email must be entered';
    }

    setContents(afterContents);
  };

  return (
    <div>
      <div className="row my-2">
        <label htmlFor="chat-username" className="col-2 control-label">gravatar mail</label>
        <div className="col-10 ">
          <TextAreaFieldGroup
            name="text"
            placeholder="Enter your mail address"
            onChange={handleEmailChange}
            value={contents.email}
            error={contents.emailErrors}
          >
          </TextAreaFieldGroup>
        </div>
      </div>
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
    </div>
  );
};

export default PostForm;
