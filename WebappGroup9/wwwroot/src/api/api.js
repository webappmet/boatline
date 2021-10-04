// export const getRoutes = async () => {
//     return [
//         {id: 1, departure: "Oslo", destination: "København", duration: 1},
//         {id: 2, departure: "Oslo", destination: "Stockholm", duration: 4},
//         {id: 3, departure: "Bergen", destination: "Oslo", duration: 2},
//         {id: 4, departure: "København", destination: "Oslo", duration: 1},
//         {id: 5, departure: "København", destination: "Stockholm", duration: 3}
//     ]
// }
import $ from 'jquery';

const host = "localhost:5001"

export const getRoutes = async () => {
    const promi = new Promise((resolve, reject) => {
        $.get("localhost:5001/BoatLine/GetRoutes", (routes) => {
            console.log("Got Routes")
            console.log(routes)
            resolve(routes)
        })
            .fail((e) => {
                console.log("Get request failed somehow")
                console.log(e);
                reject("Promise failed");
            });
        });
    return promi;
}

export const getCabins = async () => {
    return [
        {id: 1, type: "Large", floor: 8, room: 34, price: 49.99, beds: 4},
    ]
}

export const saveTicket = async () => {
    
}
