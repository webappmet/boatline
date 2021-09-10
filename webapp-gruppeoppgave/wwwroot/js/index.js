$(() => {
    getAllCustomers();
});

function getAllCustomers() {
    $.get("BoatLine/getCustomers", (customers) => {
        formatCustomers(customers);
        }
    );
}

function formatCustomers(customers) {
    let out = "<table class='table table-striped'>" +
        "<tr>" +
        "<th>Route</th>" +
        "<th>Name</th>" +
        "<th></th>" + // holder for lastname
        "<th>Adress</th>" +
        "<th>Phone</th>" +
        "</tr>";
    
    for (let c of customers) {
        if (c && c.Tickets) { // asserting that the tickets actually are there
            for (let t of c.Tickets) {
                out += "<tr>" +
                    "<td>" + t.Route + "</td>" +
                    "<td>" + c.FirstName + "</td>" +
                    "<td>" + c.LastName + "</td>" +
                    "<td>" + c.Address + "</td>" +
                    "<td>" + c.Phone + "</td>" +
                    "</tr>";
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