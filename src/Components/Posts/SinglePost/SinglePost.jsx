import React from 'react';
import ActionButtons from '../ActionButtons/ActionButtons';
import './SinglePost.css';
const SinglePost = ({ post: { title, description, status, url, _id } }) => {
  return (
    <div className="post">
      <div className="post__header">
        <h1>{title}</h1>
        <ActionButtons url={url} id={_id} />
      </div>
      <p
        className={`post__status ${
          status === 'TO LEARN'
            ? 'toLearn'
            : status === 'LEARNING'
            ? 'learning'
            : 'learned'
        } `}
      >
        {status}
      </p>
      <p>{description}</p>
    </div>
  );
};

export default SinglePost;
