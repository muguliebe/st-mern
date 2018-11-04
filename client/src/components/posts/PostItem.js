import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from "../../context/AuthContext";

const PostItem = (props) => {
  const {user}           = useContext(AuthContext);
  const [post, setPosts] = useState({
    name: '',
    text: '',
    avatar: '',
    user: ''
  });

  useEffect(() => {
    setPosts(props.post);
  }, [props.post]);

  return (
    <div className="card card-body mb-3">
      <div className="row">
        <div className="col-md-2">
          <a href="profile.html">
            <img
              className="rounded-circle d-none d-md-block"
            />
          </a>
          <br />
          <p className="text-center">{post.name}</p>
        </div>
        <div className="col-md-10">
          <p className="lead">{post.text}</p>
          <span>
            <button className="btn btn-light mr-1">
              <i className='fas fa-thumbs-up'/>
              <span className="badge badge-light"></span>
            </button>
            <button className="btn btn-light mr-1">
              <i className="text-secondary fas fa-thumbs-down" />
            </button>
            <Link to="" className="btn btn-info mr-1">
              Comments
            </Link>
          </span>
        </div>
      </div>
    </div>
  )
};

export default PostItem;
