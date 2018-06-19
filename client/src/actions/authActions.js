import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';

import { GET_ERRORS, SET_CURRENT_USER } from './types';

// Register function
export const registerUser = (
	{ name, email, password, password2 },
	history
) => dispatch => {
	axios
		.post('/api/users/register', {
			name,
			email,
			password,
			password2,
		})
		.then(res => history.push('/login'))
		.catch(err => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			});
		});
};

// login user - get user token
export const loginUser = ({ email, password }) => dispatch => {
	axios
		.post('/api/users/login', {
			email,
			password,
		})
		.then(res => {
			// save to storage
			const { token } = res.data;

			//set token to localstorage
			localStorage.setItem('jwtToken', token);

			// set token to auth header
			setAuthToken(token);

			// decode token to get user data
			const decoded = jwt_decode(token);

			// set current user
			dispatch(setCurrentUser(decoded));
		})
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			})
		);
};

// set logged user
export const setCurrentUser = decoded => {
	return {
		type: SET_CURRENT_USER,
		payload: decoded,
	};
};

// log user out

export const logoutUser = () => dispatch => {
	// remove token from localstorage
	localStorage.removeItem('jwtToken');

	// remove auth header for future requests
	setAuthToken(false);

	// set the current user to {} which will set isAuthenticated to false
	dispatch(setCurrentUser({}));
};
