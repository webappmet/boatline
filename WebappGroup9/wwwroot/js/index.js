$(() => {
    hentPizzaer();
});

function hentPizzaer() {
    $.get("Holberg/hentPizza", (pizzaer) => {
        let ut = "<option>Velg merke</option>";
        for (const p of pizzaer) {
            ut += "<option id='" + p.id + "'>" + p.type + "</option>"
        }

        $("#type").html(ut);
    });
}

function saveTicket() {
    const ticket = {
        pizza: {
            type: $("#type").val()
        },
        customer: {
            // id: null,
            navn: $("#navn").val(),
            adresse: $("#adresse").val(),
            tlfNr: $("#tlfNr").val()
        }
    }
    $.post("Holberg/lagre", ticket, (OK) => {
        if (OK) {
            window.location.href = "index.html";
        } else {
            $("#feil").html("Feil hos server");
        }
    });
};