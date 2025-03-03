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
    console.log(recept);  // Debug: Check if recipe data is correct
    
    const ingredientenLijst = document.getElementById("ingredientenLijst");
    ingredientenLijst.innerHTML = '';  // Maak de lijst leeg

    let starter = recept["Starter"] * deegHoeveelheid / 1000;

    var totaal = 0;

    // Calculate the total sum of ingredients for scaling
    for (let ingredient in recept) {
        totaal = totaal + recept[ingredient];
    }
    console.log("Total ingredient amount: ", totaal);  // Debug: Check if total sum is correct
    
    const deegfactor = totaal / deegHoeveelheid;
    console.log("Deegfactor: ", deegfactor);  // Debug: Check if deegfactor is correct
    
    // Calculate and display the ingredients
    for (let ingredient in recept) {
        const hoeveelheid = recept[ingredient] * deegfactor;
        console.log(`${ingredient}: ${hoeveelheid}`);  // Debug: Check the ingredient calculation
        
        if (hoeveelheid > 0) {
            let li = document.createElement("li");
            li.textContent = `${ingredient}: ${hoeveelheid.toFixed(1)} gram`;
            ingredientenLijst.appendChild(li);
        }
    }

    // Calculate and show the starter amount for 1x and 2x feeding
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
