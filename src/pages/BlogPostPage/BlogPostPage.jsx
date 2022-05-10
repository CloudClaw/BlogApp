import React from 'react';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { POST_URL } from '../../helpers/constants';
import { useGetSinglePost } from '../../helpers/getPosts';

import { ReactComponent as HeartIcon } from '../../assets/img/heart.svg';
import { ReactComponent as TrashIcon } from '../../assets/img/trash.svg';
import { ReactComponent as EditIcon } from '../../assets/img/pen.svg';
import axios from 'axios';
import { Editform } from '../BlogPostPage/EditForm/Editform';

export const BlogPostPage = ({ setPosts }) => {
  const { postId } = useParams();
  const history = useHistory();

  const [showEditForm, setShowEditForm] = React.useState(false);

  const { singlePost, isLoading, error, setSinglePost } = useGetSinglePost(POST_URL, postId);

  const { title, description, thumbnail, liked } = singlePost;

  const customFilling = liked ? 'crimson' : 'black';

  const like = async () => {
    const updatedPost = { ...singlePost, liked: !singlePost.liked };

    try {
      await axios.put(POST_URL + '/' + postId, updatedPost).then((updatedPostFromServer) => {
        setSinglePost(updatedPostFromServer.data);
      });
      await axios.get(POST_URL).then((response) => {
        setPosts(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deletePost = async () => {
    try {
      if (window.confirm('Удалить пост ?')) {
        await axios.delete(POST_URL + '/' + postId);
        await axios.get(POST_URL).then((response) => {
          setPosts(response.data);
          history.goBack();
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditFormSHow = () => {
    setShowEditForm(true);
  };

  if (isLoading) return <h1>Получаем данные...</h1>;
  if (error) return <h1>{error.message}</h1>;

  return (
    <div className="post">
      <img src={thumbnail} alt="post" />
      <h2>{title}</h2>
      <p>{description}</p>
      <div className="buttons">
        <button onClick={like} className="likeBtn">
          <HeartIcon fill={customFilling} />
        </button>
        <button onClick={deletePost} className="deleteBtn">
          <TrashIcon />
        </button>
        <button onClick={handleEditFormSHow} className="selectBtn">
          <EditIcon />
        </button>
      </div>

      {showEditForm && (
        <Editform
          singlePost={singlePost}
          setSinglePost={setSinglePost}
          setShowEditForm={setShowEditForm}
			 setPosts={setPosts}
        />
      )}
    </div>
  );
};
