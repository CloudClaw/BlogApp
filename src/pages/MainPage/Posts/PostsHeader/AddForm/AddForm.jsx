import React from 'react';

import './AddForm.scss';
import { ReactComponent as CloseIcon } from '../../../../../assets/img/close.svg';
import { POST_URL } from '../../../../../helpers/constants';
import axios from 'axios';

export const AddForm = ({ posts, setShowAddForm, setPosts }) => {
  const [postTitle, setPostTitle] = React.useState('');
  const [postDesc, setPostDesc] = React.useState('');

  const handlePostTitleChange = (e) => {
    setPostTitle(e.target.value);
  };
  const handlePostDescChange = (e) => {
    setPostDesc(e.target.value);
  };

  const createPost = async (e) => {
    e.preventDefault();

    const newPost = {
      title: postTitle,
      description: postDesc,
      liked: false,
      thumbnail: posts[0].thumbnail,
    };

    try {
      await axios.post(POST_URL, newPost).then((newPostFromServer) => {
        setPosts([...posts, newPostFromServer.data]);
        setShowAddForm(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form className="addPostForm" onSubmit={createPost}>
        <button className="hideBtn" onClick={() => setShowAddForm(false)}>
          <CloseIcon />
        </button>
        <h2>Создание поста</h2>
        <div>
          <input
            className="addFormInput"
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
            className="addFormInput"
            name="postDescription"
            placeholder="Описание поста"
            value={postDesc}
            onChange={handlePostDescChange}
            rows={8}
            required
          />
        </div>
        <div>
          <button className="addPostBtn" type="submit">
            Добавить пост
          </button>
        </div>
      </form>
      <div onClick={() => setShowAddForm(false)} className="overlay"></div>
    </>
  );
};
