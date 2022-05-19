import React from 'react';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { POST_URL } from '../../helpers/constants';
import { useGetSinglePost } from '../../helpers/getPosts';
import { Modal, Spin } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import { ReactComponent as HeartIcon } from '../../assets/img/heart.svg';
import { ReactComponent as TrashIcon } from '../../assets/img/trash.svg';
import { ReactComponent as EditIcon } from '../../assets/img/pen.svg';
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../store/slices/posts';
import { Editform } from '../../components/EditForm/Editform';

export const BlogPostPage = () => {
  const { postId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const [showEditForm, setShowEditForm] = React.useState(false);

  const { singlePost, isLoading, error, setSinglePost } = useGetSinglePost(POST_URL, postId);

  const { title, description, thumbnail, liked } = singlePost;

  const customFilling = liked ? 'crimson' : 'black';

  const handleLikePost = async () => {
    const updatedPost = { ...singlePost, liked: !singlePost.liked };
    dispatch(likePost(updatedPost)).then(() => {
      setSinglePost(updatedPost);
    });
  };

  const { confirm } = Modal;

  function showDeleteConfirm() {
    confirm({
      title: 'Удалить пост?',
      icon: <ExclamationCircleOutlined />,
      content: 'Some descriptions',
      okText: 'Да',
      okType: 'danger',
      cancelText: 'Нет',
      onOk() {
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  const handleDeletePost = async () => {
    if (showDeleteConfirm()) {
      dispatch(deletePost(postId)).then(() => history.goBack());
    }
  };

  const handleEditFormSHow = () => {
    setShowEditForm(true);
  };

  if (isLoading)
    return (
      <h1>
        <Spin size="large" />
      </h1>
    );
  if (error) return <h1>{error.message}</h1>;

  return (
    <div className="post">
      <img src={thumbnail} alt="post" />
      <h2>{title}</h2>
      <p>{description}</p>
      <div className="buttons">
        <button onClick={handleLikePost} className="likeBtn">
          <HeartIcon fill={customFilling} />
        </button>
        <button onClick={handleDeletePost} className="deleteBtn">
          <TrashIcon />
        </button>
        <button onClick={handleEditFormSHow} className="selectBtn">
          <EditIcon />
        </button>
      </div>

      {showEditForm && <Editform selectedPost={singlePost} setShowEditForm={setShowEditForm} />}
    </div>
  );
};
