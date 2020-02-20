import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from './types';
// Register User
export const registerUser = (user, history) => async (dispatch) => {
	try {
		let po = await axios.post('http://localhost:9000/api/signup', user);
		history.push('/');
	} catch (err) {
		dispatch({
			type: GET_ERRORS,
			payload: err.response.data
		});
	}
};
// Login - get user token
export const loginUser = (user) => async (dispatch) => {
	try {
		let res = await axios.post('http://localhost:9000/api/signin', user);
		const { token } = res.data;
		localStorage.setItem('jwtToken', token);
		setAuthToken(token);
		const decoded = jwt_decode(token);
		dispatch(setCurrentUser(decoded));
	} catch (err) {
		dispatch({
			type: GET_ERRORS,
			payload: err.response.data
		});
	}
};
// Set logged in user
export const setCurrentUser = (decoded) => {
	return {
		type: SET_CURRENT_USER,
		payload: decoded
	};
};
// User loading
export const setUserLoading = () => {
	return {
		type: USER_LOADING
	};
};
// Log user out
export const logoutUser = () => (dispatch) => {
	// Remove token from local storage
	localStorage.removeItem('jwtToken');
	// Remove auth header for future requests
	setAuthToken(false);
	// Set current user to empty object {} which will set isAuthenticated to false
	dispatch(setCurrentUser({}));
};
