import { Post } from '../../models/Post';

import firestore from '@react-native-firebase/firestore';

const POSTS = firestore().collection('Posts');

export const GET_POSTS = 'GET_POSTS';

export const getPosts = posts => ({
  type: GET_POSTS,
  posts,
});

export const createPostRequest = post => {
  return async dispatch => {
    try {
      POSTS.add(post).then(docRef => {
        dispatch(getPostsRequest());
      });
    } catch (err) {}
  };
};

export const getPostsRequest = () => {
  return async dispatch => {
    try {
      POSTS.onSnapshot(querySnapshot => {
        const posts = [];
        querySnapshot.forEach(doc => {
          const post = doc.data();
          post.id = doc.id;
          posts.push(post);
        });
        dispatch(getPosts(posts));
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const getPostByIdRequest = id => {
  return async dispatch => {
    try {
      POSTS.doc(id)
        .get()
        .then(doc => {
          const post = doc.data();
          post.id = doc.id;
          dispatch(getPostById(post));
        });
    } catch (err) {
      console.log(err);
    }
  };
};
