import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppLayout from '../components/AppLayout';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { LOAD_POSTS_REQUEST } from '../reducers/post';

const Home = () => {
  const { me } = useSelector((state) => state.user);
  const { mainPosts, hasMorePost } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: LOAD_POSTS_REQUEST,
    });
  }, []);

  useEffect(() => {
    function onscroll() {
      if (window.scrollY + document.documentElement.clientHeight === document.documentElement.scrollHeight) {
        if (hasMorePost) {
          dispatch({
            type: LOAD_POSTS_REQUEST,
          });
        }
      }
    }
    window.addEventListener('scroll', onscroll);
    return () => {
      window.removeEventListener('scroll', onscroll);
    };
  }, [hasMorePost]);

  return (
    <AppLayout>
      {me && <PostForm />}
      {mainPosts.map((post) => <PostCard key={post.id} post={post} />)}
    </AppLayout>
  );
};

export default Home;
