import React from 'react';

import { Post } from './Post/Post';
import { PostsHeader } from './PostsHeader/PostsHeader';
import { useHistory } from 'react-router-dom';

import { Modal, Spin } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import './Posts.scss';

import { deletePost, fetchPosts, likePost, setPosts } from '../../../store/slices/posts';

import { useDispatch } from 'react-redux';
import { Editform } from '../../../components/EditForm/Editform';

export const Posts = ({ title, isLikedPosts = true, posts, error, isLoading }) => {
  const history = useHistory();
  const [selectedPost, setSelectedPost] = React.useState();
  const [showEditForm, setShowEditForm] = React.useState(false);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleLikePost = async (index) => {
    const updatedPosts = [...posts];
    updatedPosts[index] = { ...updatedPosts[index], liked: !updatedPosts[index].liked };
    dispatch(likePost(updatedPosts[index]));
  };

  const { confirm } = Modal;

  function handleDeletePost(postId) {
    confirm({
      title: 'Удалить пост?',
      icon: <ExclamationCircleOutlined />,
      content: 'Some descriptions',
      okText: 'Да',
      okType: 'danger',
      cancelText: 'Нет',
      onOk() {
        dispatch(deletePost(postId));
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  const selectPost = (post) => {
    setSelectedPost(post);
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
    <div className="postsWrapper">
      <PostsHeader title={title} isLikedPosts={isLikedPosts} posts={posts} setPosts={setPosts} />

      <section className="posts">
        {posts.map((post, index) => {
          return (
            <Post
              {...post}
              key={`${post}_${index}`}
              like={() => handleLikePost(index)}
              deletePost={() => handleDeletePost(post.id)}
              selectPost={() => selectPost(post)}
            />
          );
        })}
      </section>
      {showEditForm && (
        <Editform
          posts={posts}
          setPosts={setPosts}
          selectedPost={selectedPost}
          setShowEditForm={setShowEditForm}
        />
      )}
    </div>
  );
};
