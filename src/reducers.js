import { 
	CHANGE_SEARCH_FIELD,
	REQUEST_API_PENDING,
	REQUEST_API_SUCCESS,
	REQUEST_API_FAILED } from './constants';

const initialStateSearchRobots = {
	searchfield: ''
};

export const searchRobots = (state=initialStateSearchRobots, action={}) => {
	switch (action.type) {
		case CHANGE_SEARCH_FIELD:
			return {...state, searchfield: action.payload};
		default:
			return state;
	}
};

const initialStateRequestRobots = {
	isPending: false,
	error: '',
	robots: []
};

export const requestRobots = (state=initialStateRequestRobots, action={}) => {
	switch (action.type) {
		case REQUEST_API_PENDING:
			return {...state, isPending: true};
		case REQUEST_API_SUCCESS:
			return {...state, isPending: false, robots: action.payload};
		case REQUEST_API_FAILED:
			return {...state, isPending:false, error: action.payload};
		default:
			return state;
	}
};