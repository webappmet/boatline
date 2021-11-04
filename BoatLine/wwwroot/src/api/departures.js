import { ROOT_URL } from "./base";

export const getDeparturesByDateAndRoute = async ({ date, route }) => {
	const requestOptions = {
		method: 'GET'
	};

	try {
		let response = await fetch(`${ROOT_URL}/api/v1/BoatLine/GetDeparturesByDateAndRoute?${new URLSearchParams({
            date: date,
            routeId: route
        })}`, requestOptions);
		let data = await response.json();
		if (data) return data		
  	} catch (error) {
  		return false;
  	}
}

export const createDeparture = async ({ date, time, routeId }) => {
	const requestOptions = {
		method: 'POST',
		headers: {
			'Content-Type' : 'application/json'
		},
		body: JSON.stringify({ date, time })
	};

	try {
		let response = await fetch(`${ROOT_URL}/api/v1/Auth/PostDeparture?routeId=${routeId}`, requestOptions);
		let data = await response.text();
		if (data) return data;
  	} catch (error) {
		console.log(error);
  		return false;
  	}
}