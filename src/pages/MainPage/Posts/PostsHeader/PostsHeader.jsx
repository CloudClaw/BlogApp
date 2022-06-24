import React from 'react';
import { SearchForm } from './SearchForm/SearchForm';
import './PostHeader.scss';
import { AddForm } from './AddForm/AddForm';

export const PostsHeader = ({ title, isLikedPosts, posts, addNewPost, setPosts }) => {
  const [showAddForm, setShowAddForm] = React.useState(false);

  return (
    <section className="postsHeader">
      <h1>{title}</h1>
      {isLikedPosts && (
        <button
          onClick={() => {
            setShowAddForm(true);
          }}
          className="showAddFormBtn">
          Создать пост
        </button>
      )}
      
      {showAddForm && (
        <AddForm
          addNewPost={addNewPost}
          setPosts={setPosts}
          posts={posts}
          setShowAddForm={setShowAddForm}
        />
      )}
    </section>
  );
};
