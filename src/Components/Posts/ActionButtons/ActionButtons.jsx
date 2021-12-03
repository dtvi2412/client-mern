import React, { useContext } from 'react';
import { FiYoutube, FiEdit, FiDelete } from 'react-icons/fi';
import './ActionButtons.css';
import { PostsContext } from '../../../Context/PostsContext';
const ActionButtons = ({ url, id }) => {
  const {
    deletePost,
    toastMessage,
    setToastMessage,
    setUpdateModal,
    getValuePostWithId,
  } = useContext(PostsContext);
  //Handle Delete
  const handleDelete = async (id) => {
    const { success } = await deletePost(id);

    setToastMessage({
      ...toastMessage,
      display: success,
      message: 'Xóa thành công',
      style: { backgroundColor: 'rgb(45 206 255)' },
    });
    setTimeout(() => {
      setToastMessage({
        ...toastMessage,
        display: false,
        message: '',
        style: {},
      });
    }, 5000);
  };

  //handleUpdateModalWithValue
  const handleUpdateModalWithValue = (id) => {
    setUpdateModal(true);
    getValuePostWithId(id);
  };
  return (
    <div className="actionButtons">
      <a
        className="actionButtons__icon link"
        href={url}
        target="_blank"
        rel="noreferrer"
      >
        <FiYoutube />
      </a>
      <div
        className="actionButtons__icon edit"
        target="_blank"
        rel="noreferrer"
        onClick={() => handleUpdateModalWithValue(id)}
      >
        <FiEdit />
      </div>
      <div
        className="actionButtons__icon delete"
        target="_blank"
        rel="noreferrer"
      >
        <FiDelete onClick={() => handleDelete(id)} />
      </div>
    </div>
  );
};

export default ActionButtons;
