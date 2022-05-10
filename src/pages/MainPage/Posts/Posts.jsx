import React from 'react';
import axios from 'axios';

import { Post } from './Post/Post';
import { PostsHeader } from './PostsHeader/PostsHeader';
import { Editform } from './EditForm/Editform';
import { useHistory } from 'react-router-dom';

import './Posts.scss';
import { POST_URL } from '../../../helpers/constants';

export const Posts = ({ title, isLikedPosts = false, posts, isLoading, setPosts, error }) => {
  const history = useHistory();
  const [selectedPost, setSelectedPost] = React.useState();
  const [showEditForm, setShowEditForm] = React.useState(false);

  const likedPosts = posts.filter((post) => post.liked);

  const likePost = async (index) => {
    const updatedPosts = [...posts];
    updatedPosts[index].liked = !updatedPosts[index].liked;

    try {
      await axios
        .put(POST_URL + '/' + updatedPosts[index].id, updatedPosts[index])
        .then((updatedPostFromServer) => {
          updatedPosts[index] = updatedPostFromServer.data;
          setPosts(updatedPosts);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const deletePost = async (postId) => {
    try {
      if (window.confirm('Удалить пост ?')) {
        await axios.delete(POST_URL + '/' + postId).then(() => {
          setPosts(
            posts.filter((post) => {
              return post.id !== postId;
            }),
          );
          history.goBack();
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const selectPost = (post) => {
    setSelectedPost(post);
    setShowEditForm(true);
  };

  if (isLoading) return <h1>Получаем данные...</h1>;
  if (error) return <h1>{error.message}</h1>;

  return (
    <div className="postsWrapper">
      <PostsHeader title={title} isLikedPosts={isLikedPosts} posts={posts} setPosts={setPosts} />

      <section className="posts">
        {(isLikedPosts ? likedPosts : posts).map((post, index) => {
          return (
            <Post
              {...post}
              key={`${post}_${index}`}
              like={() => likePost(index)}
              deletePost={() => deletePost(post.id)}
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
