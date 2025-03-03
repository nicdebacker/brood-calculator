// Example recipe data structure
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

// Update the ingredients and starter based on input
function updateIngrediënten() {
    const broodType = document.getElementById("broodType").value;
    const deegHoeveelheid = parseInt(document.getElementById("deegHoeveelheid").value);

    const recept = receptenData[broodType];

    // Clear previous ingredient list
    const ingredientenLijst = document.getElementById("ingredientenLijst");
    ingredientenLijst.innerHTML = '';

    // Calculate starter
    let starter = recept["Starter"] * deegHoeveelheid / 1000;

    // Calculate total ingredient value for scaling
    let totaal = 0;
    for (let ingredient in recept) {
        totaal += recept[ingredient];
    }

    const deegfactor = totaal / deegHoeveelheid;

    // Calculate and display ingredients
    for (let ingredient in recept) {
        const hoeveelheid = recept[ingredient] * deegfactor;
        if (hoeveelheid > 0) {
            let li = document.createElement("li");
            li.textContent = `${ingredient}: ${hoeveelheid.toFixed(1)} gram`;
            ingredientenLijst.appendChild(li);
        }
    }

    // Calculate and show starter for 1x and 2x feeding
    const starter1x = starter * 2.5;
    const starter2x = starter / (2.5 * 2.5);

    document.getElementById("starter1x").textContent = `Starter voor 1x voeden: ${starter1x.toFixed(1)} gram`;
    document.getElementById("starter2x").textContent = `Starter voor 2x voeden: ${starter2x.toFixed(1)} gram`;

    // Update slider value display
    document.getElementById("deegWaarde").textContent = `${deegHoeveelheid}g`;
}

// Event listeners to trigger ingredient updates when user changes inputs
document.getElementById("broodType").addEventListener("change", updateIngrediënten);
document.getElementById("deegHoeveelheid").addEventListener("input", updateIngrediënten);

// Initialize the ingredients list on page load
updateIngrediënten();
