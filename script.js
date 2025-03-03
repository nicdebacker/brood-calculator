// Voorbeeld van de recepten data (deze zou je normaal dynamisch laden)
const receptenData = {
    "Wit": {
        "Tarwe": 1000,
        "Rogge": 0,
        "Water": 600,
        "Starter": 200,
        "Zout": 20,
        "Zaden": 0,
        "Weekwater": 0
    },
    "Rogge": {
        "Tarwe": 0,
        "Rogge": 138,
        "Water": 74,
        "Starter": 272,
        "Zout": 6,
        "Zaden": 127,
        "Weekwater": 127
    }
};

// Functie om de ingrediënten te berekenen
function updateIngrediënten() {
    const broodType = document.getElementById("broodType").value;
    const deegHoeveelheid = parseInt(document.getElementById("deegHoeveelheid").value);
    
    const recept = receptenData[broodType];
    
    const ingredientenLijst = document.getElementById("ingredientenLijst");
    ingredientenLijst.innerHTML = '';  // Maak de lijst leeg

    let starter = recept["Starter"] * deegHoeveelheid / 1000;

    var totaal = 0;

    for (let ingredient in recept) {
        totaal = totaal + recept[ingredient];
    }    

    const deegfactor = totaal/deegHoeveelheid;
    
    for (let ingredient in recept) {
        const hoeveelheid = recept[ingredient] * deegfactor);
        if (hoeveelheid > 0) {
            let li = document.createElement("li");
            li.textContent = `${ingredient}: ${hoeveelheid.toFixed(1)} gram`;
            ingredientenLijst.appendChild(li);
        }
    }

    // Bereken en toon de starter
    const starter1x = starter * 2.5;
    const starter2x = starter / (2.5 * 2.5);

    document.getElementById("starter1x").textContent = `Starter voor 1x voeden: ${starter1x.toFixed(1)} gram`;
    document.getElementById("starter2x").textContent = `Starter voor 2x voeden: ${starter2x.toFixed(1)} gram`;
}

// Functie om de waarde van de deeg slider bij te werken
function updateSliderValue() {
    const deegWaarde = document.getElementById("deegHoeveelheid").value;
    document.getElementById("deegWaarde").textContent = `${deegWaarde}g`;
    updateIngrediënten();  // Update ingrediënten wanneer de slider wordt aangepast
}

// Event listeners voor interacties
document.getElementById("broodType").addEventListener("change", updateIngrediënten);
document.getElementById("deegHoeveelheid").addEventListener("input", updateSliderValue);

// Initialiseer de app
updateIngrediënten();
