import { 
	CHANGE_SEARCH_FIELD,
	REQUEST_API_PENDING,
	REQUEST_API_SUCCESS,
	REQUEST_API_FAILED } from './constants';

export const setSearchField = (text) => ({
	type: CHANGE_SEARCH_FIELD,
	payload: text
});

export const requestAPI = () => (dispatch) => {
	dispatch({type: REQUEST_API_PENDING});
	fetch('https://jsonplaceholder.typicode.com/users')
		.then(response => response.json())
		.then(users => {
			if(users.constructor !== Array){
				throw new Error('Invalid return data type');
			}
			dispatch({type: REQUEST_API_SUCCESS, payload: users});
		})
		.catch(error => dispatch({type: REQUEST_API_FAILED, payload: error}));
};