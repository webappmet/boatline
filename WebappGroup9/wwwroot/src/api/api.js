// export const getRoutes = async () => {
//     return [
//         {id: 1, departure: "Oslo", destination: "København", duration: 1},
//         {id: 2, departure: "Oslo", destination: "Stockholm", duration: 4},
//         {id: 3, departure: "Bergen", destination: "Oslo", duration: 2},
//         {id: 4, departure: "København", destination: "Oslo", duration: 1},
//         {id: 5, departure: "København", destination: "Stockholm", duration: 3}
//     ]
// }

// export const getCabins = async () => {
//     return [
//         {id: 1, type: "Large", floor: 8, room: 34, price: 49.99, beds: 4},
//     ]
// }

import $ from 'jquery';

export const getRoutes = async () => {
    return new Promise((resolve, reject) => {
        $.get("BoatLine/GetRoutes", (routes) => {
            console.log("Got Routes")
            console.log(routes)
            resolve(routes)
        })
            .fail((e) => {
                console.log("GetRoutes failed")
                console.log(e);
                reject("Getroutes Promise failed: ");
            });
    });
}

export const getCabins = async () => {
    return new Promise((resolve, reject) => {
        $.get("BoatLine/GetCabins", (cabins) => {
            console.log("Got Cabins")
            console.log(cabins)
            resolve(cabins)
        })
            .fail((e) => {
                console.log(e)
                reject("GetCabins failed")
            });
    });
}

// TODO, actually set input instead of hardcoding test values
export const saveTicket = async () => {
    return new Promise((resolve, reject) => {
        const customerNoId = {
            firstName: "NewCustomer",
            lastName: "NewLastName",
            postalCode: {
                code: "0170"
            },
            payment: {
                cardHolderName: "Anthony GioGio",
                cardNumber: "5643 1234 4353 1234",
                cSC: "123",
                expirationMonth: "06",
                expirationYear: "24"
            },
            streetAddress: "NewAdress",
            phone: "73829462",
            email: "testtest@oslomet.no",
            tickets: [
                // Ticket 1
                {
                    route: {id: 2},
                    cabins: [
                        {id: 1 },
                        {id: 3}
                    ],
                    // id: 1,  // ticket ids are autogenerate if customer doesn't exist so just commenting these out as placeholder for saving known customers if they have Id
                    date: "12.34.45",
                    startTime: "23:45",
                    cabinAmount: 2
                },
                // Ticket 2
                {
                    route: {
                        id: 1
                    },
                    cabins: [
                        {
                            id: 1
                        },
                        {
                            id: 2
                        }
                    ],
                    // id: 2,
                    date: "12.23.34",
                    startTime: "87:00",
                    cabinAmount: 1
                }]
        };
        
        $.post("BoatLine/SaveOne", customerNoId, (OK) => {
            console.log("Saved noId")
        });
    });
}

export const saveTicketHasIdTest = async () => {
    return new Promise((resolve, reject) => {
        // just showing how to build json for existing customer, with existing payment. The DB takes nullvalues so just add stuff if you need to add card or whatever
        const customerHasId = {
            id: "1",
            tickets: [
                // Ticket 1
                {
                    route: {id: 1},
                    cabins: [{id: 2}],
                    date: "54.34.23",
                    startTime: "54:12",
                    cabinAmount: 1
                }]
        };

        $.post("BoatLine/SaveOne", customerHasId, (OK) => {
            console.log("Saved HasId")
            resolve("Ble lagret")
        })
            .fail((e) => {
                reject(e)
            });
    });
}

export const getTickets = async () => {
    return new Promise((resolve, reject) => {
        $.get("BoatLine/GetTickets", (tickets) => {
            console.log("Got tickets")
            resolve(tickets)
        })
            .fail((e) => {
                console.log(e);
                reject("GetTickets failed")
            });
    });
}

export const getCustomers = async () => {
    return new Promise((resolve, reject) => {
        $.get("BoatLine/GetCustomers", (customers) => {
            console.log("Got Customers")
            resolve(customers)
        })
            .fail((e) => {
                reject("GetCustomers failed")
            });
    });
}

export const getCustomer = async () => {
    return new Promise((resolve, reject) => {
        $.get("BoatLine/GetOne?Id=1", (customer) => {
            console.log("Got Customer")
            resolve(customer);
        })
            .fail((e) => {
                reject("GetCustomer failed")
            });
    });
}

//TODO do these
export const getPrice = async () => {
    return new Promise((resolve, reject) => {
        $.get("BoatLine/GetPrice", (price) => {
            resolve(price);
        })
            .fail((e) => {
                reject(e);
            });
    });
}

export const getCabinUnoccupied = async () => {
    return new Promise((resolve, reject) => {
        $.get("BoatLine/GetCabinUnoccupied", (cabins) => {
            resolve(cabins)
        })
            .fail((e) => {
                reject(e);
            });
    });
}

export const validatePayment = async () => {
    //todo actually get these values from frontend
    const payment = {
        cardHolderName: "Anthony GioGio",
        cardNumber: "5643 1234 4353 1234",
        cSC: "123",
        expirationMonth: "06",
        expirationYear: "24"
    }
    
    return new Promise((resolve, reject) => {
        $.get("BoatLine/ValidatePayment", payment, () => {
            console.log("payment suceeded")
            saveTicket();
            resolve("Payment went well placehodler")
        })
            .fail((e) => {
                reject("Payment wasn't validated" + e);
            });
    });
};