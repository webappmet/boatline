$(() => {
    /*
    * Denne er ikke i bruk men har tatt den med fra forelesning notat for kommer sikkert til å trenge den kanskje i dunno hahaha
    * 
    * 
    * */
    const id = window.location.search.substring(1);
    const url = "Kunde/hentEn?" + id;
    $.get(url, (kunde) => {
        $("#id").val(kunde.id);
        $("#navn").val(kunde.navn);
        $("#adresse").val(kunde.adresse);
    });
});

function endreKunde(id) {
    const kunde = {
        id: $("#id").val(),
        navn: $("#navn").val(),
        adresse: $("#adresse").val()
    }
    $.post("Kunde/endre", kunde, (OK) => {
        if (OK) {
            window.location.href = "index.html";
        } else {
            $("#feil").html("Feil hos server");
        }
    });
}