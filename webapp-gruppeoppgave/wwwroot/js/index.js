$(() => {
    getAllTickets();
});

function getAllTickets() {
    $.get("Tur/Tur/getRoutes", (routes) => {
        formatRoutes(routes);
        }
    );
}

function formatRoutes(routes) {
    let out = "<table class='table table-striped'>" +
        "<tr>" +
        "<th>Route</th>" +
        "<th>Name</th>" +
        "<th></th>" +
        "<th>Adress</th>" +
        "<th>Phone</th>" +
        "</tr>";
    
    for (let r of routes) {

        // used this i dunno : https://hackernoon.com/accessing-nested-objects-in-javascript-f02f1bd6387f
        // Didn't really use this but good to have: https://stackoverflow.com/questions/2098276/nested-json-objects-do-i-have-to-use-arrays-for-everything
        const type = r && r.pizza ? r.pizza.type : null;
        const name = r && r.kunde ? r.kunde.navn : null;
        const adresse = r && r.kunde ? r.kunde.adresse : null;
        const tlfNr = r && r.kunde ? r.kunde.tlfNr : null;
        
        
        out += "<tr>" +
            // user && user.personalInfo ? user.personalInfo.name : null
            // "<td>" + b.pizza.type + "</td>" + // kan man ha nested objects i JSON?
            // "<td>" + b && b.pizza ? b.pizza.type : null + "</td>" + // kan man ha nested objects i JSON?
            "<td>" + type + "</td>" +
            "<td>" + (r.tykk ? "Tykk" : "Tynn") + "</td>" + // tester fordi jeg dum og bruker bool i type erklæring
            "<td>" + r.antall + "</td>" +
            "<td>" + name + "</td>" +
            "<td>" + adresse + "</td>" +
            "<td>" + tlfNr + "</td>" +
            "</tr>";
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