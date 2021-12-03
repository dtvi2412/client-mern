import React, { useEffect, useContext } from 'react';
import { PostsContext } from '../../Context/PostsContext';
import { AuthContext } from '../../Context/AuthContext';
import Loader from 'react-loader-spinner';
import SinglePost from '../../Components/Posts/SinglePost/SinglePost';
import AddPostModal from '../../Components/Posts/AddPostModel/AddPostModal';

import { IoAddCircleSharp } from 'react-icons/io5';

import { FaLeanpub } from 'react-icons/fa';

import './Dashboard.css';
import ToastMessage from '../../Components/layouts/ToastMessage/ToastMessage';
import UpdatePostModal from '../../Components/Posts/UpdatePostModal/UpdatePostModal';

function Dashboard() {
  const {
    loadPosts,
    postState: { posts, postsLoading, post },

    setModalAdd,
    toastMessage: { display, message, style },
  } = useContext(PostsContext);

  const {
    authState: {
      user: { username },
    },
  } = useContext(AuthContext);
  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  let body;
  if (postsLoading) {
    body = (
      <>
        <Loader
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={3000} //3 secs
        />
      </>
    );
  } else if (posts.length === 0) {
    body = (
      <div className="postNothing">
        <div className="postNothing__icon">
          <FaLeanpub />
        </div>
        <h1>Hi {username}</h1>
        <div>Welcome to LEARN MEAN</div>
        <p>Click the button below to track your first skill to learn.</p>
        <button onClick={setModalAdd.bind(this, true)}>Learn</button>
      </div>
    );
  } else {
    body = (
      <>
        {posts.map((post) => (
          <SinglePost key={post._id} post={post} />
        ))}
        <div
          className="dashboard__openModal"
          onClick={setModalAdd.bind(this, true)}
        >
          <IoAddCircleSharp className="dashboard__openModal__icon" />
        </div>
      </>
    );
  }
  return (
    <div className="dashboard">
      <div className="dashboard__posts">
        {body}
        <AddPostModal />
        {post !== null && <UpdatePostModal />}

        <ToastMessage message={message} style={style} display={display} />
      </div>
    </div>
  );
}

export default Dashboard;
