$(() => {
    generateDeparture();

    $("#choose").on("click", () => {
        // if (!(chosenDeparture === "Choose Departure" || outDestination === "Choose Departure to see desitantions")) {
        //     generateCustomerForm();
        // }

        customerAmmountQuestion();
        $("#choose").remove();
    });


    
/*    $("#registrer").click(() => {
        $.get("/mVogn/sjekkBruker", bool => {
            if (bool) {
                const bilObj = {
                    personNr: $("#personNr").val(),
                    navn: $("#navn").val(),
                    adresse: $("#adresse").val(),
                    regNr: $("#regNr").val(),
                    merke: $("#merke").val(),
                    biltype: $("#biltype").val()
                };

                if (nullfeil()) {
                    $.post("/mVogn/save", bilObj, () => {
                        window.location.href = "/"; // tar deg tilbake til index .html
                    })
                        .fail(function (jqXHR) {
                            const json = $.parseJSON(jqXHR.responseText);
                            console.log(json.message);
                            $("#feil").html(json.message);
                        });
                }
            } else {
                $("#feil").html("Er ikke logget inn");
            }
        });
    });*/
});

//TODO make things run based on onchange instead of buttons to make it adaptive
//Perhaps make some transitions to make it less jarring

function generateDeparture() {
    $.get("BoatLine/GetRoutes", function (routes) {
        let outDeparture = ""
        outDeparture += "<option>Choose Departure</option>";
        let oldDeparture = "";
        let departureArray = []

        for (const r of routes) {
            if (oldDeparture !== r.departure) {
                departureArray.push(r.departure);
            }
            oldDeparture = r.departure;
        }

        for (const m of departureArray) {
            outDeparture += "<option>" + m + "</option>";
        }

        $("#departure").html(outDeparture)

        getDestinations();
    })
        .fail(function (jqXHR) {
            const json = $.parseJSON(jqXHR.responseText);
            // const json = JSON.parse(jqXHR.responseText);
            console.log(json.message);
            $("#fail").html(json.message);
        });
}

function getDestinations() {
    $.get("BoatLine/GetRoutes", (routes) => {
        let chosenDeparture = $("#departure").val();
        let outDestination = "";
        //TODO remove this
        console.log(chosenDeparture);

        if (chosenDeparture === "Choose Departure") {
            outDestination += "<option>Choose Departure to see desitantions</option>";
        } else {
            outDestination += "<option>Choose destination</option>";
            for (const r of routes) {
                if (chosenDeparture === r.departure) {
                    outDestination += "<option>" + r.destination + "</option>";
                }
            }
        }

        $("#destination").html(outDestination);
    })
        .fail(function (jqXHR) {
            const json = $.parseJSON(jqXHR.responseText);
            console.log(json.message);
            $("#fail").html(json.message);
        });
}

//TODO make this better an reflect proper cabins
function getCabins() {
    $.get("BoatLine/GetCabins", (cabins) => {
        let outCabins = "";

        outCabins += "<option>Choose Cabin</option>";
        for (const c of cabins) {
            outCabins += "<option>" + c.type + "</option>";
        }

        $("#cabinInput").html(outCabins);
    })
        .fail(function (jqXHR) {
            const json = $.parseJSON(jqXHR.responseText);
            console.log(json.message);
            $("#fail").html(json.message);
        });
}

function customerAmmountQuestion() {
    $("#destinationDiv").after(
        "<h2>Customers and Cabins</h2>" +
                "<div class ='form-group'>\n" +
                "    <label for=\"ammountCustomers\">How many will be traveling?</label>\n" +
                "    <input class=\"form-control\" type=\"number\" id=\"ammountCustomers\" onchange=\"validateAmmount()\">\n" +
                "    <div id=\"ammountCustomersError\" style=\"color: red\"></div>\n" +
                "</div>" +
                "<div class ='form-group'>\n" +
                "    <label for=\"ammountCabins\">How many cabins would you like?</label>\n" +
                "    <input class=\"form-control\" type=\"number\" id=\"ammountCabins\" onchange=\"validateAmmount()\">\n" +
                "    <div id=\"ammountCustomersError\" style=\"color: red\"></div>\n" +
                "</div>" +
                "<input type=\"button\" id=\"chooseAmount\" class=\"btn btn-primary\" value=\"Choose\">\n" +
                "<a type=\"button\" id=\"reset\" class=\"btn btn-danger\" href=\"index.html\">Reset Form</a>\n"
    );
    
    // needs to have this here no idea why, think it loads the listener into ram or something
    $("#chooseAmount").on("click", () => {
        //TODO Remove these
        console.log("Clicked chooseAmmount")
        console.log($("#ammountCustomers").val());
        
        generateCustomerForm();
    });

}

function generateCustomerForm() {
    //TODO make adaptive ID's
    const custAmmount = 0 + $("#ammountCustomers").val();
    const cabinAmmount = 0 + $("#ammountCabins").val();

    if (custAmmount == 0) {
        $("#fail").html("Please enter more than one customer");
        return;
    }

    if (custAmmount > (24*3*6   )){
        $("#fail").html("The boat can't hold this many travelers");
        return;
    }

    if (cabinAmmount == 0) {
        $("#fail").html("Please enter more than one cabin");
        return;
    }

    if (cabinAmmount > (24*3)){
        $("#fail").html("There aren't enough cabins on the boat");
        return;
    }

    if (cabinAmmount > custAmmount){
        $("#fail").html("We do not permit you to have more cabins than customers");
        return;
    }
    
    // var outform = "<h2>Insert Contact Info</h2>";
    
    for (let i = 0; i < custAmmount; i++) {
        outform += 
            "<h3>Customer " + (i+1) + "</h3>\n" +
            "<div class ='form-group'>\n" +
            "    <label for=\"navn\">First Name</label>\n" +
            "    <input class=\"form-control\" type=\"text\" id=\"navn\" onchange=\"validerNavn()\">\n" +
            "    <div id=\"navnError\" style=\"color: red\"></div>\n" +
            "</div>\n" +
            "<div class ='form-group'>\n" +
            "    <label for=\"navn\">Last Name</label>\n" +
            "    <input class=\"form-control\" type=\"text\" id=\"navn\" onchange=\"validerNavn()\">\n" +
            "    <div id=\"navnError\" style=\"color: red\"></div>\n" +
            "</div>\n" +
            "<div class ='form-group'>\n" +
            "    <label for=\"adresse\">Adresse</label>\n" +
            "    <input class=\"form-control\" type=\"text\" id=\"adresse\" onchange=\"validerAdresse()\">\n" +
            "    <div id=\"adresseError\" style=\"color: red\"></div>\n" +
            "</div>\n" +
            "<div class=\"form-group\">\n" +
            "    <label for=\"regNr\">RegNr</label>\n" +
            "    <input class=\"form-control\" type=\"text\" id=\"regNr\" onchange=\"validerRegNr()\">\n" +
            "    <div id=\"regNrError\" style=\"color: red\"></div>\n" +
            "</div>";
    }

    // outform += "<h2>Choose Cabin</h2>\n"

    for (let i = 0; i < cabinAmmount; i++) {
        outform += "" +
            "<h3>Cabin " + (i+1) + "</h3>\n" +
            "<div class=\"form-group\">\n" +
            "    <label for=\"departure\">Choose Cabin</label><select class=\"form-control\" id=\"cabinInput\"></select>\n" +
            "    <div id=\"departureError\" style=\"color: red\"></div>\n" +
            "</div>";
    }
    
    outform +=         
        "<input type=\"button\" id=\"chooseCabin\" class=\"btn btn-primary\" value=\"Choose\">\n" +
        "<a type=\"button\" id=\"resetCust\" class=\"btn btn-danger\" href=\"index.html\">Reset Form</a>\n"
    
    // Inserting next form and removing previous buttons
    $("#reset").after(outform);
    $("#chooseAmount").remove();
    $("#reset").remove();

    getCabins();

    $("#chooseCabin").on("click", () => {
        console.log("Clicked Cabin Button")
    });
}