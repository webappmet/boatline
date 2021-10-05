$(() => {
    const failDiv = $("#fail");
    
    generateDeparture();

    $("#choose").on("click", () => {
        if ($("#departure").val() === "Choose Departure" || $("#destination").val() === "Choose Departure to see destinations") {
            failDiv.html("Please pick a departure and a destination");
            return;
        }
        failDiv.html("");


        dateQuestion();
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
// i don't know why but you need to declare this both inside and outside of the document ready function
// const failDiv = $("#fail");


function rowStart(insID) {
    const out =
        "    <div class=\"row m-3 justify-content-center\" id='" + insID + "'>\n" +
        "        <div class=\"col-md-8 card\">\n" +
        "            <form class=\"form card-body\">";
    return out;
}

const rowEnd = 
    "            </form>\n" +
    "        </div>\n" +
    "    </div>"


//TODO make things run based on onchange instead of buttons to make it adaptive
//Perhaps add some transitions to make it less jarring

const dateRowId = "dateRow";

function dateQuestion() {
    //TODO add departure date
    $("#destinationRow").after(
        rowStart(dateRowId) +
        "<div class=\"form-group\">\n" +
        "    <label for=\"dDate\">Departure Date</label>\n" +
        "    <input class=\"form-control\" type=\"date\" id=\"dDate\" />\n" +
        "</div>\n" +
        "<div class=\"form-group\">\n" +
        "    <label for=\"aDate\">Arrival Date</label>\n" +
        "    <input class=\"form-control\" type=\"date\" id=\"aDate\" />\n" +
        "</div>" +
        "<input type=\"button\" id=\"chooseDate\" class=\"btn btn-primary\" value=\"Choose\">\n" +
        "<a type=\"button\" id=\"reset\" class=\"btn btn-danger\" href=\"index.html\">Reset Form</a>\n" +
        rowEnd
    );

    //TODO date validation
    $("#chooseDate").on("click", () => {
        customerAmmountQuestion()
        $("#chooseDate").remove();
        $("#reset").remove();
    });
    
}

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
            failDiv.html(json.message);
        });
}

function getDestinations() {
    $.get("BoatLine/GetRoutes", (routes) => {
        let chosenDeparture = $("#departure").val();
        let outDestination = "";
        //TODO remove this
        console.log(chosenDeparture);

        if (chosenDeparture === "Choose Departure") {
            outDestination += "<option>Choose Departure to see destinations</option>";
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
            failDiv.html(json.message);
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

        $(".cabininput").html(outCabins);
    })
        .fail(function (jqXHR) {
            const json = $.parseJSON(jqXHR.responseText);
            console.log(json.message);
            failDiv.html(json.message);
        });
}

const cabinRowID = "customerCabinRow";

function customerAmmountQuestion() {
    $("#" + dateRowId + "").after(
rowStart(cabinRowID) +
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
        "<a type=\"button\" id=\"reset\" class=\"btn btn-danger\" href=\"index.html\">Reset Form</a>\n" +
        rowEnd
    );
    
    // needs to have this here no idea why, think it loads the listener into ram or something
    $("#chooseAmount").on("click", () => {
        //TODO Remove these
        console.log("Clicked chooseAmmount")
        console.log($("#ammountCustomers").val());
        
        generateCustomerForm();
    });

}

const customerRowId = "customerRow";
const cabinRowId = "cabinRow"

function generateCustomerForm() {
    //TODO make adaptive ID's
    const custAmmount = 0 + $("#ammountCustomers").val();
    const cabinAmmount = 0 + $("#ammountCabins").val();

    if (custAmmount == 0) {
        $("#fail").html("Please enter more than one customer");
        return;
    }

    if (custAmmount > (24*3*6)){
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
    // resetting after clearing validation
    $("#fail").html("");

    var outform = "";
    
    for (let i = 0; i < custAmmount; i++) {
        outform += 
            rowStart("customerRow" + i) +
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
            "</div>" +
            rowEnd;
    }

    for (let i = 0; i < cabinAmmount; i++) {
        outform +=
            rowStart(cabinRowID + i) +
            "<h3>Cabin " + (i + 1) + "</h3>\n" +
            "<div class=\"form-group\">\n" +
            "    <label for=\"departure\">Choose Cabin</label><select class=\"form-control cabininput\" id=\"cabinInput\"></select>\n" +
            "    <div id=\"departureError\" style=\"color: red\"></div>\n" +
            "</div>";
        if (i == cabinAmmount - 1) {
            outform +=
                "<input type=\"button\" id=\"chooseCabin\" class=\"btn btn-primary\" value=\"Choose\">\n" +
                "<a type=\"button\" id=\"resetCust\" class=\"btn btn-danger\" href=\"index.html\">Reset Form</a>\n";
        }
        outform += rowEnd;
    }
    
    // Inserting next form and removing previous buttons
    $("#" + cabinRowID +"").after(outform);
    $("#chooseAmount").remove();
    $("#reset").remove();

    getCabins();

    $("#chooseCabin").on("click", () => {
        console.log("Clicked Cabin Button")
    });
}