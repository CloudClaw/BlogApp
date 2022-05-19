import React from 'react';
import { useDispatch } from 'react-redux';

import { ReactComponent as CloseIcon } from '../../assets/img/close.svg';
import { editPost } from '../../store/slices/posts';

import './EditForm.scss';

export const Editform = ({ selectedPost, setShowEditForm }) => {
  const [postTitle, setPostTitle] = React.useState(selectedPost?.title);
  const [postDesc, setPostDesc] = React.useState(selectedPost?.description);

  const dispatch = useDispatch();

  const handlePostTitleChange = (e) => {
    setPostTitle(e.target.value);
  };
  const handlePostDescChange = (e) => {
    setPostDesc(e.target.value);
  };

  const handleEditPost = async (e) => {
    e.preventDefault();

    const updatedPost = {
      ...selectedPost,
      title: postTitle,
      description: postDesc,
    };

    dispatch(editPost(updatedPost)).finally(() => {
      setShowEditForm(false);
    });
  };

  return (
    <>
      <form className="editForm" onSubmit={handleEditPost}>
        <button className="hideBtn" onClick={() => setShowEditForm(false)}>
          <CloseIcon />
        </button>
        <h2>Редактирование поста</h2>
        <div>
          <input
            className="editFormInput"
            type="text"
            name="postTitle"
            placeholder="Заголовок поста"
            value={postTitle}
            onChange={handlePostTitleChange}
            required
          />
        </div>
        <div>
          <textarea
            className="editFormInput"
            name="postDescription"
            placeholder="Описание поста"
            value={postDesc}
            onChange={handlePostDescChange}
            rows={8}
            required
          />
        </div>
        <div>
          <button className="editPostBtn" type="submit">
            Добавить изменения
          </button>
        </div>
      </form>
      <div onClick={() => setShowEditForm(false)} className="overlay"></div>
    </>
  );
};
