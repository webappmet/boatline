import { ROOT_URL } from "./base";


// export const getRoutes = async () => {
//     return new Promise((resolve, reject) => {
//         $.get("/api/v1/BoatLine/GetRoutes", (routes) => {
//             resolve(routes)
//         })
//         .fail((e) => {
//             reject("Failed to get routes");
//         });
//     });
// }

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

// export const getRoute = async (id) => {
//     return new Promise((resolve, reject) => {
//         $.get("/api/v1/BoatLine/GetRoute", id, (route) => {
//             resolve(route)
//         })
//             .fail((e) => {
//                 console.log("GetRoutes failed")
//                 console.log(e);
//                 reject("Getroutes Promise failed: ");
//             });
//     });
// }