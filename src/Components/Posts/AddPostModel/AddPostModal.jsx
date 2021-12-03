import React, { useContext, useState } from 'react';
import './AddPostModel.css';
import { PostsContext } from '../../../Context/PostsContext';
const AddPostModal = () => {
  const { modalAdd, setModalAdd, addPost, toastMessage, setToastMessage } =
    useContext(PostsContext);

  const [postForm, setPostForm] = useState({
    title: '',
    description: '',
    url: '',
  });

  const { title, description, url } = postForm;
  //Handle onchange get value in input
  const onChangeInput = (event) => {
    setPostForm({ ...postForm, [event.target.name]: event.target.value });
  };

  //Reset Value Form
  const ResetForm = () => {
    setPostForm({
      title: '',
      description: '',
      url: '',
    });
  };

  //Handle Post
  const handleAddPost = async (e) => {
    e.preventDefault();
    const { success, message } = await addPost(postForm);
    handleCloseModal();
    setToastMessage({
      ...toastMessage,
      display: success,
      message: message,
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

  //Close modal
  const handleCloseModal = () => {
    setModalAdd(false);
    ResetForm();
  };
  return (
    <>
      {modalAdd && (
        <div className="addModalPost" onClick={() => handleCloseModal()}>
          <form
            onSubmit={handleAddPost}
            action=""
            className="form modalForm"
            onClick={(e) => e.stopPropagation()}
          >
            <h1 className="addModalPost__title">Bạn muốn học gì ?</h1>
            <div className="form__group">
              <label className="addModalPost__title" htmlFor="title">
                Tên
              </label>
              <input
                id="title"
                type="text"
                name="title"
                placeholder="Nhập tên bạn muốn học"
                required
                onChange={onChangeInput}
                value={title}
              />
            </div>
            <div className="form__group">
              <label className="addModalPost__title" htmlFor="description">
                Mô tả
              </label>
              <textarea
                id="description"
                name="description"
                placeholder="Nhập mô tả..."
                rows="6"
                onChange={onChangeInput}
                value={description}
              ></textarea>
            </div>
            <div className="form__group">
              <label className="addModalPost__title" htmlFor="url">
                Đường dẫn
              </label>
              <input
                id="url"
                type="text"
                name="url"
                placeholder="Nhập tên bạn muốn học"
                onChange={onChangeInput}
                value={url}
              />
            </div>
            <div className="addModalPost__button">
              <button
                className="addModalPost__button__cancel"
                onClick={() => handleCloseModal()}
              >
                Thoát
              </button>
              <button className="addModalPost__button__add">Thêm</button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default AddPostModal;
