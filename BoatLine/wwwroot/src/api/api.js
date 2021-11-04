import $ from 'jquery';

export const getRoutes = async () => {
    return new Promise((resolve, reject) => {
        $.get("/api/v1/customer/routes", (routes) => {
            resolve(routes)
        })
        .fail((e) => {
            reject("Failed to get routes");
        });
    });
}

export const getRoute = async (id) => {
    return new Promise((resolve, reject) => {
        $.get("/api/v1/customer/route", id, (route) => {
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
        $.get("/api/v1/customer/route", id, (cabin) => {
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
        $.get("/api/v1/customer/reference", { firstName, lastName },(reference) => {
            resolve(reference)
        })
        .fail((e) => {
            reject("Getroutes Promise failed: ");
        });
    });
}

export const getTicketsByReference = async (references) => {
    let refString = ''
    for (const ref of references) {
        refString += `${ref}-`
    }
    refString = refString.slice(0, -1);
    return new Promise((resolve, reject) => {
        $.get(`/api/v1/customer/references?reference=${refString}`, (customers) => {
            resolve(customers);
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
        $.get("/api/v1/customer/cabins", (cabins) => {
            resolve(cabins)
        })
            .fail((e) => {
                console.log(e)
                reject("GetCabins failed")
            });
    });
}

export const saveTicket = async (customer) => {
    return new Promise((resolve, reject) => {
        $.post("/api/v1/customer/customer", customer, (OK) => {
            console.log("Saved noId")
        });
    });
}

export const getTickets = async () => {
    return new Promise((resolve, reject) => {
        $.get("/api/v1/customer/tickets", (tickets) => {
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
        $.get("/api/v1/customer/customers", (customers) => {
            console.log("Got Customers")
            resolve(customers)
        })
            .fail((e) => {
                reject("GetCustomers failed")
            });
    });
}

export const getPrice = async () => {
    return new Promise((resolve, reject) => {
        $.get("/api/v1/customer/price", (price) => {
            resolve(price);
        })
            .fail((e) => {
                reject(e);
            });
    });
}

export const validatePayment = async (payment) => {    
    return new Promise((resolve, reject) => {
        console.log(payment);
        $.post("/api/v1/customer/validate", payment, () => {
            resolve(true);
        })
            .fail((e) => {
                console.log(payment);
                reject("Payment wasn't validated" + e);
            });
    });
};

export const getCityByZip = async (zip) => {    
    return new Promise((resolve, reject) => {
        $.get("/api/v1/customer/postalcode", { code: zip }, (postalCode) => {
            resolve(postalCode);
        })
        .fail((e) => {
            resolve(null);
        });
    });
};