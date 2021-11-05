import { ROOT_URL } from "./base";

export const getRoutes = async (date, route) => {
	const requestOptions = { method: 'GET' };
	try {
		let response = await fetch(`${ROOT_URL}/api/v1/BoatLine/GetRoutes`, requestOptions);
		let data = await response.json();
		return data;
  	} catch (error) {
  		return false;
  	}
}

export const postRoute = async ({ departure, destination, durationDays, durationHours }) => {
	const requestOptions = { 
		method: 'POST',
		headers: {
			'Content-Type' : 'application/json'
		},
		body: JSON.stringify({
			departure,
			destination,
			durationDays,
			durationHours
		})
	};
	try {
		let response = await fetch(`${ROOT_URL}/api/v1/Auth/PostRoute`, requestOptions);
		let data = await response.text();
		if (data === 'Route saved') return true;
		else return false;
  	} catch (error) {
  		return false;
  	}
}

export const deleteRoute = async (id) => {
	const requestOptions = { method: 'DELETE' };
	try {
		let response = await fetch(`${ROOT_URL}/api/v1/Auth/DeleteRoute?id=${id}`, requestOptions);
		let data = await response.text();
		return data;
  	} catch (error) {
  		return false;
  	}
}