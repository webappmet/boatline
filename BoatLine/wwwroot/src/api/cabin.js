import { ROOT_URL } from "./base";

export const getCabin = async (id) => {
	const requestOptions = {
		method: 'GET'
	};

	try {
		const response = await fetch(`${ROOT_URL}/api/v1/BoatLine/GetCabin?id=${id}`, requestOptions);
		const data = response.json()
        return data;
  	} catch (error) {
  		return false;
  	}
}

export const upadateCabin = async ({ id, beds, price, type }) => {
	const requestOptions = {
		method: 'PUT',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            id,
            type,
            price,
            beds
        })
	};

	try {
		const response = await fetch(`${ROOT_URL}/api/v1/Auth/PutCabin`, requestOptions);
		const data = await response.text()
        console.log(data)
        return data;
  	} catch (error) {
  		return false;
  	}
}