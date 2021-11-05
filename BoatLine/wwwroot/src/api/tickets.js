import { ROOT_URL } from "./base";

export const getTickets = async () => {
	const requestOptions = {
		method: 'GET'
	};

	try {
		let response = await fetch(`${ROOT_URL}/api/v1/BoatLine/GetTickets`, requestOptions);
		let data = await response.json();
		if (data) return data		
  	} catch (error) {
  		return false;
  	}
}