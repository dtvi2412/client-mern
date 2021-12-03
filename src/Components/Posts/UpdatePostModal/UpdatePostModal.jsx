import React, { useContext, useEffect, useState } from 'react';
import '../AddPostModel/AddPostModel.css';
import { PostsContext } from '../../../Context/PostsContext';
const UpdatePostModal = () => {
  const {
    updateModal,
    setUpdateModal,
    postState: { post },
    updatePost,

    toastMessage,
    setToastMessage,
  } = useContext(PostsContext);

  useEffect(() => setUpdateForm(post), [post]);

  const [updateForm, setUpdateForm] = useState(post);

  const { title, description, url, status } = updateForm;
  //Handle onchange get value in input
  const onChangeInput = (event) => {
    setUpdateForm({ ...updateForm, [event.target.name]: event.target.value });
  };

  //Reset Value Form
  const ResetForm = () => {
    setUpdateForm(post);
  };

  //Handle Post
  const handleUpdatePost = async (e) => {
    e.preventDefault();

    const { success, message } = await updatePost(post._id, updateForm);
    if (success) {
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
    }
  };

  //Close modal
  const handleCloseModal = () => {
    setUpdateModal(false);
    ResetForm();
  };
  return (
    <>
      {updateModal && (
        <div className="addModalPost" onClick={() => handleCloseModal()}>
          <form
            onSubmit={handleUpdatePost}
            action=""
            className="form modalForm"
            onClick={(e) => e.stopPropagation()}
          >
            <h1 className="addModalPost__title">
              Bạn muốn sửa nôi dung này chứ?
            </h1>
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
              >
                {description}
              </textarea>
            </div>
            <div className="form__group">
              <label className="addModalPost__title" htmlFor="url">
                Trạng thái
              </label>
              <select
                className="addModalPost__select"
                name="status"
                onChange={onChangeInput}
                value={status}
              >
                <option value="TO LEARN">TO LEARN</option>
                <option value="LEARNING">LEARNING</option>
                <option value="LEARNED">LEARNED</option>
              </select>
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
              <button className="addModalPost__button__add">Sửa</button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default UpdatePostModal;
