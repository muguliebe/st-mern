import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import AuthContext from "../../context/AuthContext";
import PostContext from "../../context/PostContext";

const PostItem = (props) => {
  const {user}           = useContext(AuthContext);
  const {deletePost}     = useContext(PostContext);
  const [post, setPosts] = useState({
    name: '',
    text: '',
    avatar: '',
    user: ''
  });

  useEffect(() => {
    setPosts(props.post);
  }, [props.posts]);

  const findUserLike = (likes) => {
    if (likes == null) return false;
    return likes.filter(like => like.user === user.id).length > 0;
  };

  const handleDelete = () => {
    deletePost(post._id);
  };

  return (
    <div className="card card-body mb-3">
      <div className="row">
        <div className="col-md-2">
          <a href="profile.html">
            <img
              className="rounded-circle d-none d-md-block"
              src={post.avatar}
              alt={post.name}
            />
          </a>
          <br />
          <p className="text-center">{post.name}</p>
        </div>
        <div className="col-md-10">
          <p className="lead">{post.text}</p>
          <span>
            <button className="btn btn-light mr-1">
              <i className={classnames('fas fa-thumbs-up', {
                'text-info': findUserLike(post.likes)
              })}
              />
              <span className="badge badge-light">{post.likes ? post.likes.length : 0}</span>
            </button>
            <button className="btn btn-light mr-1">
              <i className="text-secondary fas fa-thumbs-down" />
            </button>
            <Link to="" className="btn btn-info mr-1">
              Comments
            </Link>
            {post.user !== user.id ? null : (
              <button className="btn btn-danger mr-1"
                      onClick={handleDelete}>
                <i className="fas fa-times" />
              </button>
            )}
          </span>
        </div>
      </div>
    </div>
  )
};

export default PostItem;
