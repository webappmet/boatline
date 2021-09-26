$(() => {
    getAllCustomers();
});

function getAllCustomers() {
    $.get("BoatLine/GetCustomers", (customers) => {
        formatCustomers(customers);
        }
    );
}

function formatCustomers(customers) {
    let out = "<table class='table table-striped'>" +
        "<tr>" +
        "<th>Departure</th>" +
        "<th>Destination</th>" +
        "<th>Name</th>" +
        "<th></th>" + // holder for lastname
        "<th>Adress</th>" +
        "<th>Phone</th>" +
        "</tr>";
    
    // Use lowercase names, JSON atribute names gets turned to lowercase somehow
    for (let c of customers) {
        if (c && c.tickets) { // asserting that the tickets actually are there
            for (let t of c.tickets) {
                if (t && t.route) {
                    out += "<tr>" +
                        "<td>" + t.route.departure + "</td>" +
                        "<td>" + t.route.destination + "</td>" +
                        "<td>" + c.firstName + "</td>" +
                        "<td>" + c.lastName + "</td>" +
                        "<td>" + c.address + "</td>" +
                        "<td>" + c.phone + "</td>" +
                        "</tr>";
                }

            }
        }
    }
    out += "</table>"
    $("#inDiv").html(out);
}

// Woop også bare liftet fra 1700 ukesoppgaver vet ikke om kommer til å brukes
function slettKunde(id) {
    const url = "Kunde/Slett?id=" + id;
    $.get(url, (OK) => {
        if (OK) {
            window.location.href = "index.html";
        } else {
            $("#feil").html("Feil hos server");
        }
    });
}