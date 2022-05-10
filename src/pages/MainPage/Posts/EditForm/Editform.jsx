import axios from 'axios';
import React from 'react';

import { ReactComponent as CloseIcon } from '../../../../assets/img/close.svg';
import { POST_URL } from '../../../../helpers/constants';
import './EditForm.scss';

export const Editform = ({ posts, setPosts, selectedPost, setShowEditForm }) => {
  const [postTitle, setPostTitle] = React.useState(selectedPost?.title);
  const [postDesc, setPostDesc] = React.useState(selectedPost?.description);

  const handlePostTitleChange = (e) => {
    setPostTitle(e.target.value);
  };
  const handlePostDescChange = (e) => {
    setPostDesc(e.target.value);
  };

  const editPost = async (e) => {
    e.preventDefault();

    const updatedPost = {
      ...selectedPost,
      title: postTitle,
      description: postDesc,
    };

    try {
      await axios
        .put(POST_URL + '/' + selectedPost.id, updatedPost)
        .then((updatedPostFromServer) => {
          setPosts(
            posts.map((post) => {
              if (post.id === updatedPostFromServer.data.id) return updatedPost;
              return post;
            }),
          );
          setShowEditForm(false);
        });
    } catch (error) {
      console.log(console.error());
      setShowEditForm(false);
    }
  };

  return (
    <>
      <form className="editForm" onSubmit={editPost}>
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
