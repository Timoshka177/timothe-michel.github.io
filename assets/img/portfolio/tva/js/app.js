function formatInputValue(valeurNonFormattee) {

    let valeurFormatee;

    valeurFormatee = valeurNonFormattee.replace(",", ".");
    valeurFormatee = valeurFormatee.replace(/[^0-9$.]/g, '')

    return valeurFormatee;
}

function calculerTVA(typeMontantDepart) {

    let montantHT = formatInputValue(document.getElementById("montantHT").value);
    let montantTVA = formatInputValue(document.getElementById("montantTVA").value);
    let montantTTC = formatInputValue(document.getElementById("montantTTC").value);
    let tauxTVA = formatInputValue(document.getElementById("tauxTVA").value);

    // console.log("montant HT :" + montantHT);
    // console.log("montant TVA :" + montantTVA);
    // console.log("montant TTC :" + montantTTC);
    // console.log("taux TVA :" + tauxTVA);

    if (typeMontantDepart == "tauxTVA") {
        typeMontantDepart = "montantHT";
    }

    if (typeMontantDepart == "montantHT") {

        console.log("hey");

        montantTVA = Math.round(montantHT * tauxTVA / 100);
        montantTTC = Math.round(Number(montantHT) + Number(montantTVA));

        document.getElementById("montantTVA").value = montantTVA + " €";
        document.getElementById("montantTTC").value = montantTTC + " €";

    } else if (typeMontantDepart == "montantTVA") {

        montantHT = Math.round(montantTVA / (tauxTVA / 100));
        montantTTC = Math.round(Number(montantHT) + Number(montantTVA));

        document.getElementById("montantHT").value = montantHT + " €";
        document.getElementById("montantTTC").value = montantTTC + " €";

    } else if (typeMontantDepart == "montantTTC") {

        montantHT = Math.round(montantTTC / (1 + tauxTVA / 100));
        montantTVA = Math.round(montantTTC - montantHT);

        document.getElementById("montantHT").value = montantHT + " €";
        document.getElementById("montantTVA").value = montantTVA + " €";

    }

    document.getElementById("totalTva").innerHTML = "<p>Montant HT : " + montantHT + "€ <br> Montant TVA : " + montantTVA + "€ <br> Montant TTC : " + montantTTC + "€ </p>"

}

function mettreAjourTauxTVA(tauxTVA) {
    // console.log(tauxTVA);
    document.getElementById("tauxTVA").value = tauxTVA;
}

function reInitInputTelValue(inputId, symbol) {
    let myInput = document.getElementById(inputId),
        inputValue = myInput.value.replace(/\s/g, "");

    if (inputValue.length == 0) {
        myInput.value = 0 + " " + symbol;
    } else if (inputValue.indexOf(symbol) == -1) {
        myInput.value = inputValue + " " + symbol;
    }
}

// KEYUP
let listInputTel = document.querySelectorAll("input[type='tel']");

for (let i = 0; i < listInputTel.length; i++) {
    listInputTel[i].addEventListener("keyup", function (event) {
        calculerTVA(event.currentTarget.id);
    });

    // BLUR
    listInputTel[i].addEventListener("blur", function (event) {

        if (event.currentTarget.id == "tauxTVA") {
            reInitInputTelValue(event.currentTarget.id, "%");
        } else {
            reInitInputTelValue(event.currentTarget.id, "€");

        }

    });
}

// CLICK
let listInputButton = document.querySelectorAll("input[type='button']");

for (let i = 0; i < listInputButton.length; i++) {
    listInputButton[i].addEventListener("click", function (event) {
        mettreAjourTauxTVA(event.currentTarget.value);
        calculerTVA("tauxTVA");
    });
}




