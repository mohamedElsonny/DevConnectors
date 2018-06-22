import axios from 'axios';
import {
	ADD_POST,
	GET_ERRORS,
	GET_POSTS,
	POST_LOADING,
	DELETE_POST,
	GET_POST,
	CLEAR_ERRORS,
} from './types';

// set loading state
export const setPostLoading = () => ({
	type: POST_LOADING,
});

// clear errors
export const clearErrors = () => ({
	type: CLEAR_ERRORS,
});

// create post
export const addPost = postData => dispatch => {
	dispatch(clearErrors());
	axios
		.post('/api/posts', postData)
		.then(res => {
			dispatch({
				type: ADD_POST,
				payload: res.data,
			});
		})
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			})
		);
};

// get posts
export const getPosts = () => dispatch => {
	dispatch(setPostLoading());
	axios
		.get('/api/posts')
		.then(res =>
			dispatch({
				type: GET_POSTS,
				payload: res.data,
			})
		)
		.catch(err =>
			dispatch({
				type: GET_POSTS,
				payload: null,
			})
		);
};

// get posts by user_id
export const getPostsById = id => dispatch => {
	dispatch(setPostLoading());
	axios
		.get(`/api/posts/by_user_id/${id}`)
		.then(res =>
			dispatch({
				type: GET_POSTS,
				payload: res.data,
			})
		)
		.catch(err =>
			dispatch({
				type: GET_POSTS,
				payload: null,
			})
		);
};

// get post
export const getPost = id => dispatch => {
	dispatch(setPostLoading());
	axios
		.get(`/api/posts/${id}`)
		.then(res =>
			dispatch({
				type: GET_POST,
				payload: res.data,
			})
		)
		.catch(err =>
			dispatch({
				type: GET_POST,
				payload: null,
			})
		);
};

// add comment
export const addComment = (postId, commentData) => dispatch => {
	dispatch(clearErrors());
	axios
		.post(`/api/posts/comment/${postId}`, commentData)
		.then(res =>
			dispatch({
				type: GET_POST,
				payload: res.data,
			})
		)
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			})
		);
};

// delete comment
export const deleteComment = (postId, commentId) => dispatch => {
	axios
		.delete(`/api/posts/comment/${postId}/${commentId}`)
		.then(res =>
			dispatch({
				type: GET_POST,
				payload: res.data,
			})
		)
		.catch(err =>
			dispatch({
				type: GET_POST,
				payload: null,
			})
		);
};

// delete post
export const deletePost = id => dispatch => {
	axios
		.delete(`/api/posts/${id}`)
		.then(res =>
			dispatch({
				type: DELETE_POST,
				payload: id,
			})
		)
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			})
		);
};

// add like
export const addLike = (id, { match, location }) => dispatch => {
	axios
		.post(`/api/posts/like/${id}`)
		.then(res => {
			if (location.pathname === '/feed') {
				dispatch(getPosts());
			} else {
				dispatch(getPostsById(match.params.user_id));
			}
		})
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			})
		);
};

// remove like
export const removeLike = (id, { match, location }) => dispatch => {
	axios
		.post(`/api/posts/unlike/${id}`)
		.then(res => {
			if (location.pathname === '/feed') {
				dispatch(getPosts());
			} else {
				dispatch(getPostsById(match.params.user_id));
			}
		})
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			})
		);
};
