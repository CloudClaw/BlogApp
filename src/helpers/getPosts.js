import axios from 'axios';
import React from 'react';

export const useFetchPosts = (url) => {
  const [posts, setPosts] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        await axios.get(url).then((response) => {
          setPosts(response.data);
          setIsLoading(false);
        });
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        setError(error);
      }
    };
    fetchPosts();
  }, [url]);

  return { posts, isLoading, setPosts, error };
};

export const useGetSinglePost = (url, postId) => {
  const [singlePost, setSinglePost] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        await axios.get(url + '/' + postId).then((response) => {
          setSinglePost(response.data);
          setIsLoading(false);
        });
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        setError(error);
      }
    };
    fetchPosts();
  }, [url]);

  return { singlePost, isLoading, error, setSinglePost };
};
