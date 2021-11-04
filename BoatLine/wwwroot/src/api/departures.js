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
		if (data) {
			return data
		}

		return false;
  	} catch (error) {
  		return false;
  	}
}