import React from 'react';

const PostForm = () => {
  return (
    <div className="post-form mb-3">
      <div className="card card-info">
        <div className="card-header bg-info text-white">
          say something...
        </div>
        <div className="card-body">
          <form>
            <div className="form-group">
              <textarea className="form-control form-control-lg" placeholder="Create a post"></textarea>
            </div>
            <button type="submit" className="btn btn-dark">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostForm;
