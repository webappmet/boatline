$(() => {
    testSaveCustomer();
    testGetCustomers();
    testGetCustomer();
    testGetCabins();
    testGetRoutes();
    testGetTickets();
});

/*TODO
*  GetPrice
*  GetCabinsTaken
* */

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


//react
function testGetCabins() {
    $.get("BoatLine/GetCabins", (cabins) => {
        console.log("Got Cabins")
    });
}

//react
function testGetRoutes() {
    $.get("BoatLine/GetRoutes", (routes) => {
        console.log("Got Routes")
    });
}

//react
function testGetTickets() {
    $.get("BoatLine/GetTickets", (tickets) => {
        console.log("Got tickets")
    });
}

//react
function testSaveCustomer() {
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

    $.post("BoatLine/SaveOne", customerNoId, (OK) => {
        console.log("Saved noId")
    });

    $.post("BoatLine/SaveOne", customerHasId, (OK) => {
        console.log("Saved HasId")
    });
}