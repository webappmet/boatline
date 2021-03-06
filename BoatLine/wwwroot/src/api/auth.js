import { base64Encode } from '../scripts/base64';
import { ROOT_URL } from './base';

export const loginUser = async (dispatch, loginPayload) => {
	const credentials = base64Encode(`${loginPayload.username}:${loginPayload.password}`)

	const requestOptions = {
		method: 'GET',
		headers: { 
			'Content-Type': 'application/json',
			'Authorization': `Basic ${credentials}`
		}
	};

	try {
		dispatch({ type: 'REQUEST_LOGIN' });
		let response = await fetch(`${ROOT_URL}/api/v1/Auth/LogIn`, requestOptions);
		let data = await response.text();

		if (data !== 'false') {
			dispatch({ type: 'LOGIN_SUCCESS', payload: { user: data } });
			localStorage.setItem('currentUser', data);
			return data
		}

		return false;
  	} catch (error) {
  		return false;
  	}
}

export const registerUser = async (dispatch, payload) => {
	const requestOptions = {
		method: 'GET',
		headers: { 
			'Content-Type': 'application/json',
			'Authorization': `Basic ${base64Encode(`${payload.username}:${payload.password}`)}`
		}
	};

	try {
		await fetch(`${ROOT_URL}/api/v1/Auth/CreateAdmin`, requestOptions);
		return true;
  	} catch (error) {
  		return { error: "Could not create new user" };
  	}
}

export const logout = async (dispatch) => {
  	dispatch({ type: 'LOGOUT' });
  	localStorage.removeItem('currentUser');
}
