$(() => {
    testGetCustomers();
    testGetCustomer();
    testGetCabins();
    testGetRoutes();
    testGetTickets();
    testSaveCustomer();
});

function testGetCustomers() {
    $.get("BoatLine/GetCustomers", (customers) => {
        console.log("Got Customers")
    });
}

function testGetCustomer() {
    $.get("BoatLine/GetOne?Id=1", (customer) => {
        console.log("Got Customer")
    });
}

function testGetCabins() {
    $.get("BoatLine/GetCabins", (cabins) => {
        console.log("Got Cabins")
    });
}

function testGetRoutes() {
    $.get("BoatLine/GetRoutes", (routes) => {
        console.log("Got Routes")
    });
}

function testGetTickets() {
    $.get("BoatLine/GetTickets", (tickets) => {
        console.log("Got tickets")
    });
}

function testSaveCustomer() {
    const customer = {
        firstName: "NewCustomer",
        lastName: "NewLastName",
        postalCode: "0170",
        streetAddress: "NewAdress",
        phone: "73829462",
        email: "testtest@oslomet.no",
        tickets:
            [
                // Ticket 1
                {
                    route: {
                        id: 2,
                        departure: "Oslo",
                        destination: "Copenhagen",
                        durationDays: 17,
                        durationHours: 11
                    },
                    cabins: [
                        {
                            id: 1,
                            type: "Luksus",
                            floor: "1st",
                            room: "02",
                            price: 1890.99,
                            beds: 4
                        },
                        {
                            id: 3,
                            type: "Billig",
                            floor: null,
                            room: null,
                            price: 0,
                            beds: 0
                        }
                    ],
                    // id: 1,  // ticket ids are autogenerate so just commenting these out
                    date: "12.34.45",
                    startTime: "23:45",
                    cabinAmount: 2
                },
                // Ticket 2
                {
                    route: {
                        id: 1,
                        departure: "Vermillion City",
                        destination: "Sevii Islands",
                        durationDays: 3,
                        durationHours: 17
                    },
                    cabins: [
                        {
                            id: 1,
                            type: "Luksus",
                            floor: "1st",
                            room: "02",
                            price: 1890.99,
                            beds: 4
                        },
                        {
                            id: 2,
                            type: "Super Luksus",
                            floor: null,
                            room: null,
                            price: 0,
                            beds: 0
                        }
                    ],
                    // id: 2,
                    date: "12.23.34",
                    startTime: "87:00",
                    cabinAmount: 1
                }
            ]
    };

    $.post("BoatLine/SaveOne", customer, (OK) => {
        console.log("Saved one")
    });
}