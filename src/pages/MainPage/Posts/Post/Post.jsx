import React from 'react';

import { ReactComponent as HeartIcon } from '../../../../assets/img/heart.svg';
import { ReactComponent as TrashIcon } from '../../../../assets/img/trash.svg';
import { ReactComponent as EditIcon } from '../../../../assets/img/pen.svg';
import imagePlaceholder from '../../../../assets/img/placeholder.png';

import './Post.scss';
import { Link } from 'react-router-dom';

export const Post = ({
  selectPost,
  title,
  description,
  liked,
  thumbnail = imagePlaceholder,
  like,
  deletePost,
  id,
}) => {
  const customFilling = liked ? 'crimson' : 'black';

  const customDescription = (
    <p>
      {description.length > 100 ? <>{description.slice(0, 101)}...</> : description}&nbsp;&nbsp;
      <Link to={`/blog/${id}`}>Подробнее</Link>
    </p>
  );

  return (
    <div className="post">
      <img src={thumbnail} alt="post" />
      <h2>{title}</h2>
      <p>{customDescription}</p>
      <div className="buttons">
        <button onClick={like} className="likeBtn">
          <HeartIcon fill={customFilling} />
        </button>
        <button onClick={deletePost} className="deleteBtn">
          <TrashIcon />
        </button>
        <button onClick={selectPost} className="selectBtn">
          <EditIcon />
        </button>
      </div>
    </div>
  );
};
