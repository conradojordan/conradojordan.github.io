function getHealthColor(currentHealth, maxHealth) {
    if (currentHealth / maxHealth > 0.7) return "green";
    else if (currentHealth / maxHealth < 0.3) return "red";
    else return "goldenrod";
}

function insertLineBreak(element, count = 1) {
    for (let i = 0; i < count; i++) {
        let br = document.createElement("br");
        element.appendChild(br);
    }
}

function normalDistribution(mean = 0, variance = 1) {
    let u = 0, v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    let result = Math.sqrt(- 2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    return (result * variance + mean);
}

function nameAndSymbol(enemy) {
    return enemy.symbol + " " + enemy.name;
}

function totalExpForLevel(level) {
    let prev = level - 1;
    return (50 * (prev ** 3) - 150 * (prev ** 2) + 400 * prev) / 3
}

function expForNextLevel(exp, level) {
    return totalExpForLevel(level + 1) - exp
}

function retrieveItem(id) {
    return all_items.filter(item => item.id == id)[0];
}

function getBackpackItems(backpack) {
    let items = [];
    for (let itemReference of backpack) {
        item = retrieveItem(itemReference.id);
        for (let i = 0; i < itemReference.quantity; i++) {
            items.push(item);
        }
    }
    return items
}


function travelInTime() {
    alert("It worked!! You are a couple of seconds in the future.")
}
