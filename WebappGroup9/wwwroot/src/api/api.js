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
        $.get("/api/v1/GetRoutes", (routes) => {
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

export const getRoute = async (id) => {
    return new Promise((resolve, reject) => {
        $.get("/api/v1/GetRoute", id, (route) => {
            resolve(route)
        })
            .fail((e) => {
                console.log("GetRoutes failed")
                console.log(e);
                reject("Getroutes Promise failed: ");
            });
    });
}

export const getCabin = async (id) => {
    return new Promise((resolve, reject) => {
        $.get("/api/v1/GetRoute", id, (cabin) => {
            resolve(cabin)
        })
            .fail((e) => {
                console.log("GetRoutes failed")
                console.log(e);
                reject("Getroutes Promise failed: ");
            });
    });
}

export const getReferenceNumber = async ({ firstName, lastName }) => {
    return new Promise((resolve, reject) => {
        $.get("/api/v1/GetReference", { firstName, lastName },(reference) => {
            console.log(reference)
            resolve(reference)
        })
            .fail((e) => {
                console.log("GetRoutes failed")
                console.log(e);
                reject("Getroutes Promise failed: ");
            });
    });
}

export const getTicketsByReference = async (references) => {
    return new Promise((resolve, reject) => {
        $.get("/api/v1/GetTicketByReference", { references }, (tickets) => {
            console.log(tickets)
            resolve(tickets)
        })
            .fail((e) => {
                console.log("Get tickets by references failed")
                console.log(e);
                reject("Could not get tickets per references");
            });
    });
}

export const getCabins = async () => {
    return new Promise((resolve, reject) => {
        $.get("/api/v1/GetCabins", (cabins) => {
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
export const saveTicket = async (customer) => {
    return new Promise((resolve, reject) => {
        $.post("/api/v1/SaveCustomer", customer, (OK) => {
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

        $.post("/api/v1/SaveOne", customerHasId, (OK) => {
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
        $.get("/api/v1/GetTickets", (tickets) => {
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
        $.get("/api/v1/GetCustomers", (customers) => {
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
        $.get("/api/v1/GetOne?Id=1", (customer) => {
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
        $.get("/api/v1/GetPrice", (price) => {
            resolve(price);
        })
            .fail((e) => {
                reject(e);
            });
    });
}

export const getCabinUnoccupied = async () => {
    return new Promise((resolve, reject) => {
        $.get("/api/v1/GetCabinUnoccupied", (cabins) => {
            resolve(cabins)
        })
            .fail((e) => {
                reject(e);
            });
    });
}

export const validatePayment = async (payment) => {    
    return new Promise((resolve, reject) => {
        $.get("/api/v1/ValidatePayment", payment, () => {
            console.log("payment suceeded")
            resolve(true);
        })
            .fail((e) => {
                reject("Payment wasn't validated" + e);
            });
    });
};