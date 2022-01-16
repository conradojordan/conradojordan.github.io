let character;
let characterName = "Dumbass";
let currentEnemy = {};
let battleLogs = []


// Main game space (global)
let gs = document.getElementById("game-space");


// Game functions
function gameOver() {
    character = {
        name: characterName,
        level: 1,
        experience: 0,
        strength: 10,
        resilience: 10,
        intelligence: 5,
        currentHealth: 20,
        maxHealth: 20,
        equippedWeapon: {
            id: 1000,
            name: "Small Knife",
            type: "weapon",
            attack: 5,
            defense: 0
        },
        equippedShield: {},
        gold: 0,
        backpack: []
    };
}

function clearGameSpace() {
    while (gs.firstChild) {
        gs.lastChild.remove()
    }
}

function getHealthColor(currentHealth, maxHealth) {
    if (currentHealth / maxHealth > 0.7) return "green";
    else if (currentHealth / maxHealth < 0.3) return "red";
    else return "goldenrod";
}

function getName() {
    let nameInput = document.getElementById("name-input");
    if (nameInput.value) {
        characterName = nameInput.value;
    }
}

function insertLineBreak(element, count = 1) {
    for (let i = 0; i < count; i++) {
        let br = document.createElement("br");
        element.appendChild(br);
    }
}

function chooseBattle() {
    clearGameSpace();
    showNameLevelAndExp();
    showHuntScreen();
}

function showEnemiesList() {
    // Choose enemy
    let choseEnemyLabel = document.createElement("label");
    choseEnemyLabel.innerText = "Choose enemy: ";
    choseEnemyLabel.setAttribute("for", "choose-enemies");
    gs.appendChild(choseEnemyLabel);

    let enemiesSelect = document.createElement("select");
    enemiesSelect.name = "choose-enemies";
    enemiesSelect.id = "choose-enemies";

    let unlockedEnemies = all_enemies.filter(enemy => enemy.level <= character.level);
    for (let enemy of unlockedEnemies) {
        let enemyOption = document.createElement("option");
        enemyOption.value = enemy.id;
        enemyOption.innerText = `${enemy.symbol} ${enemy.name}`;
        enemiesSelect.appendChild(enemyOption);
    }
    gs.appendChild(enemiesSelect);
}

function showBattleButton() {
    let battleButton = document.createElement("button");
    battleButton.innerText = "⚔️ Battle!";
    battleButton.setAttribute("onclick", "startBattle()");
    gs.appendChild(battleButton);
}

function startBattle() {
    battleLogs = [];
    let battleStarted = document.createElement("p");
    battleStarted.innerText = "The battle has started!";
    battleLogs.push(battleStarted);

    let chooseEnemies = document.getElementById("choose-enemies");
    let chosenEnemyId = chooseEnemies.value;

    let enemy = all_enemies.filter(en => en.id == chosenEnemyId)[0];
    // Clone enemy and set as currentEnemy (global variable)
    currentEnemy = JSON.parse(JSON.stringify(enemy));
    currentEnemy.currentHealth = currentEnemy.maxHealth;
    battleTurn();
}

function normalDistribution(mean = 0, variance = 1) {
    let u = 0, v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    let result = Math.sqrt(- 2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    return (result * variance + mean);
}

function showBattleLogs() {
    let battleLog = document.createElement("div");
    battleLog.id = "battle-log";

    let battleLogTitle = document.createElement("h3");
    battleLogTitle.id = "battle-log-title";
    battleLogTitle.innerText = "Battle logs";
    battleLog.appendChild(battleLogTitle);

    if (battleLogs.length > 0) {
        for (let element of battleLogs) {
            battleLog.appendChild(element);
        }
    }
    gs.appendChild(battleLog);

}

function showReturnToTownButton() {
    let returnToTownButton = document.createElement("button");
    returnToTownButton.innerText = "🏘️ Return to town";
    returnToTownButton.id = "return-to-town-button";
    returnToTownButton.setAttribute("onclick", "clearGameSpace(); showMainScreen();");
    gs.appendChild(returnToTownButton);
}

function calculateLevelAndExp() {
    character.experience += currentEnemy.experience;
    if (character.experience >= totalExpForLevel(character.level + 1)) {
        // TODO: solve case form when character ups more than 1 level
        character.level += 1;
        character.maxHealth += 5;
        character.strength += 2;
        character.resilience += 2;
        character.intelligence += 1;
    }
}

function battleTurn() {
    calculateBattleTurn();
    clearGameSpace();
    showNameLevelAndExp();
    showCharacterInfo();

    insertLineBreak(gs, 1);

    // VERSUS
    let versus = document.createElement("h2");
    versus.innerText = "VS.";
    versus.id = "versus"
    gs.appendChild(versus);

    showEnemyInformation();

    showBattleLogs();

    if (character.currentHealth == 0 || currentEnemy.currentHealth == 0) {
        if (character.currentHealth == 0) {
            alert(`Battle over!! The ${currentEnemy.name.toLowerCase()} won. Game over 💀`);
            gameOver();
        } else {
            let lootItems = calculateBattleLoot();
            if (lootItems.length == 0) {
                lootItems.push("nothing")
            }
            calculateLevelAndExp();
            showReturnToTownButton();
            alert(`Battle over! You won, yay!! 🎉\nFound: ${lootItems.join(', ')}`);
        }
    } else {
        setTimeout(battleTurn, 1000);
    }
}

function calculateBattleLoot() {
    let lootItems = [];
    for (let possibleLoot of currentEnemy.loot) {
        let lottery = Math.random() * 100;
        if (lottery <= possibleLoot.chance) {
            let quantity = Math.ceil(Math.random() * possibleLoot.max);
            let item = retrieveItem(possibleLoot.itemId);
            lootItems.push(item.name);

            if (item.type == "gold") {
                character.gold += quantity;
            } else {
                addToBackpack(item.id, quantity);
            }
        }
    }
    return lootItems;
}

function getCharacterDamagePotential() {
    let characterEffectivePower = (0.3 * character.strength);
    if ("attack" in character.equippedWeapon) {
        characterEffectivePower += (0.3 * character.equippedWeapon.attack);
    }
    let characterDamagePotential = (character.level / 5) + characterEffectivePower;
    return characterDamagePotential
}

function getEnemyDamagePotential() {
    let enemyDamagePotential = (currentEnemy.level / 5) + (0.3 * currentEnemy.strength);
    return enemyDamagePotential
}

function getCharacterEffectiveDefense() {
    let characterEffectiveDefense = (0.4 * character.resilience);
    if ("defense" in character.equippedShield) {
        characterEffectiveDefense += (0.1 * character.equippedShield.defense);
    }
    return characterEffectiveDefense
}

function getFinalDamage(damagePotential, target) {
    let damage = damagePotential * normalDistribution(1, 0.4);
    let strength = target == "enemy" ? character.strength : currentEnemy.strength;
    let tenPercentOfStrength = strength * 0.1;
    damage += Math.random() * 2 * tenPercentOfStrength - tenPercentOfStrength;

    let resilience = target == "enemy" ? currentEnemy.resilience : character.resilience;
    let defense = 0.4 * resilience;

    if (target == "character" && "defense" in character.equippedShield) {
        defense += (0.1 * character.equippedShield.defense);
    }
    damage = Math.round(damage - defense);
    if (damage < 0) {
        damage = 0;
    }
    return damage
}

function nameAndSymbol(enemy) {
    return enemy.symbol + " " + enemy.name;
}

function logDamage(damage, toEnemy = true) {
    let damageLog = document.createElement("p");
    if (toEnemy) {
        damageLog.innerText = `You hit the ${nameAndSymbol(currentEnemy)} for ${damage} damage.`;
    } else {
        damageLog.innerText = `The ${nameAndSymbol(currentEnemy)} hit you for ${damage} damage.`;
    }
    battleLogs.push(damageLog);
}

function calculateBattleTurn() {
    let characterDamagePotential = getCharacterDamagePotential();
    let enemyDamagePotential = getEnemyDamagePotential();

    let damageToEnemy = getFinalDamage(characterDamagePotential, target = "enemy");
    let damageToCharacter = getFinalDamage(enemyDamagePotential, target = "character");

    // Damage to character
    if (damageToCharacter > 0) {
        character.currentHealth -= damageToCharacter;
        logDamage(damageToCharacter, toEnemy = false);
    }
    if (character.currentHealth < 0) {
        character.currentHealth = 0;
    }

    // Damage to enemy
    if (damageToEnemy > 0) {
        currentEnemy.currentHealth -= damageToEnemy;
        logDamage(damageToEnemy, toEnemy = true);
    }
    if (currentEnemy.currentHealth < 0) {
        currentEnemy.currentHealth = 0;
    }
}

function showEnemyInformation() {
    let enemyName = document.createElement("h3");
    enemyName.innerText = `${currentEnemy.symbol} ${currentEnemy.name}`;
    gs.appendChild(enemyName);

    let enemyHealth = document.createElement("p");
    enemyHealth.innerHTML = `Health: <span style="color:${getHealthColor(currentEnemy.currentHealth, currentEnemy.maxHealth)};">${currentEnemy.currentHealth}</span> / ${currentEnemy.maxHealth}`;
    gs.appendChild(enemyHealth);
}


function showHuntScreen() {
    clearGameSpace();
    showEnemiesList();
    insertLineBreak(gs, 2);
    showBattleButton();
}

function totalExpForLevel(level) {
    let prev = level - 1;
    return (50 * (prev ** 3) - 150 * (prev ** 2) + 400 * prev) / 3
}

function expForNextLevel(exp, level) {
    return totalExpForLevel(level + 1) - exp
}

function showNameLevelAndExp() {
    // Name and level
    let characterNameAndLevel = document.createElement("h3");
    characterNameAndLevel.id = "name-and-level";
    characterNameAndLevel.innerText = `${character.name} - human level ${character.level}`;
    gs.appendChild(characterNameAndLevel);

    // Exp text
    let characterExpTitle = document.createElement("span");
    characterExpTitle.id = "exp-title";
    let totExp = character.experience;
    characterExpTitle.innerText = `🛠 Exp - ${totExp}`;
    gs.appendChild(characterExpTitle);

    // Exp for next level
    let expNextLevel = document.createElement("p");
    expNextLevel.id = "exp-next-level";
    let expNext = expForNextLevel(totExp, character.level);
    expNextLevel.innerText = `(${expNext} for next level)`;

    // Experience Bar
    let characterExpBar = document.createElement("progress");
    characterExpBar.id = "exp-bar";
    let percentageExp = (character.experience - totalExpForLevel(character.level));
    percentageExp /= (totalExpForLevel(character.level + 1) - totalExpForLevel(character.level));
    characterExpBar.setAttribute("value", Math.round(percentageExp * 100));
    characterExpBar.setAttribute("max", 100);
    gs.appendChild(characterExpBar);
    gs.appendChild(expNextLevel);
}

function showCharacterInfo() {
    // Character info
    let characterInfo = document.createElement("div");
    characterInfo.id = "character-info";
    characterInfo.className = "gray-border";

    // Character info title
    let characterInfoTitle = document.createElement("p");
    characterInfoTitle.id = "character-info-title";
    characterInfoTitle.innerText = "Character Information";
    characterInfo.appendChild(characterInfoTitle);

    // Character health
    let characterHealth = document.createElement("p");
    characterHealth.innerHTML = `&#128151; Health: <span style="color:${getHealthColor(character.currentHealth, character.maxHealth)};">${character.currentHealth}</span> / ${character.maxHealth}`;
    characterInfo.appendChild(characterHealth);

    // Character strength
    let characterStrength = document.createElement("p");
    characterStrength.innerText = `💪 Strength: ${character.strength}`;
    characterInfo.appendChild(characterStrength);


    // Character resilience
    let characterResilience = document.createElement("p");
    characterResilience.innerText = `✊ Resilience: ${character.resilience}`;
    characterInfo.appendChild(characterResilience);

    // Character intelligence
    let characterIntelligence = document.createElement("p");
    characterIntelligence.innerText = `📚 Intelligence: ${character.intelligence}`;
    characterInfo.appendChild(characterIntelligence);

    gs.appendChild(characterInfo);
}

function createBackpackItemElement(itemReference) {
    let item = retrieveItem(itemReference.id);
    let itemElement = document.createElement("p");
    let itemText = `${itemReference.quantity}x ${item.name}`;
    if (itemReference.quantity > 1) {
        itemText += "s";
    }
    if (item.attack || item.defense) {
        itemText += ` (atk: ${item.attack}, def: ${item.defense})`;
    }
    itemElement.innerText = itemText;
    return itemElement;
}

function showCharacterBackpack() {
    let backpackSpace = document.createElement("div");
    backpackSpace.id = "backpack-space";
    backpackSpace.className = "gray-border";

    let backpackTitle = document.createElement("p");
    backpackTitle.id = "backpack-title";
    backpackTitle.innerText = "🎒 Backpack";
    backpackSpace.appendChild(backpackTitle);

    if (character.backpack.length > 0) {
        for (let itemReference of character.backpack) {
            let itemElement = createBackpackItemElement(itemReference);
            backpackSpace.appendChild(itemElement);
        }
    } else {
        let emptyElement = document.createElement("p");
        emptyElement.id = "backpack-empty";
        emptyElement.innerText = "<empty>";
        backpackSpace.appendChild(emptyElement);
    }

    gs.appendChild(backpackSpace);
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

function addToBackpack(itemId, quantity) {
    let foundItems = character.backpack.filter(x => x.id == itemId);
    if (foundItems.length > 0) {
        foundItems[0].quantity += quantity;
    } else {
        character.backpack.push({ id: itemId, quantity: quantity });
    }
}

function removeFromBackpack(itemId, quantity) {
    let foundItems = character.backpack.filter(x => x.id == itemId);
    if (foundItems.length > 0) {
        foundItems[0].quantity -= quantity;
        if (foundItems[0].quantity <= 0) {
            character.backpack = character.backpack.filter(x => x.id != itemId);
        }
    }
}

function equipItem(itemType) {
    let elementId = itemType == "weapon" ? "character-weapons" : "character-shields"
    let characterItems = document.getElementById(elementId);
    chosenItemId = characterItems.value
    if (chosenItemId == "0") {
        if (itemType == "weapon") {
            addToBackpack(character.equippedWeapon.id, 1);
            character.equippedWeapon = {};
        } else {
            addToBackpack(character.equippedShield.id, 1);
            character.equippedShield = {};
        }
    } else {
        if (itemType == "weapon") {
            character.equippedWeapon = retrieveItem(chosenItemId);
        } else {
            character.equippedShield = retrieveItem(chosenItemId);
        }
        removeFromBackpack(chosenItemId, 1);
    }
    clearGameSpace();
    showMainScreen();
}



function showEquippedItems() {
    let equippedItems = document.createElement("div");
    equippedItems.id = "equipped-items";
    equippedItems.className = "gray-border";

    let equippedItemsTitle = document.createElement("p");
    equippedItemsTitle.id = "equipped-items-title";
    equippedItemsTitle.innerText = "Equipped items"
    equippedItems.appendChild(equippedItemsTitle);

    // Character Weapons
    let characterWeaponsLabel = document.createElement("label");
    characterWeaponsLabel.innerText = "🗡 Weapon: ";
    characterWeaponsLabel.setAttribute("for", "weapons");
    equippedItems.appendChild(characterWeaponsLabel);

    let characterWeapons = document.createElement("select");
    characterWeapons.name = "weapons";
    characterWeapons.id = "character-weapons";
    characterWeapons.setAttribute("onchange", "equipItem('weapon')");

    let backpackItems = getBackpackItems(character.backpack);
    let noWeapon = document.createElement("option");
    noWeapon.value = 0;
    noWeapon.innerText = "<No weapon>";
    characterWeapons.appendChild(noWeapon);

    let weaponIds = [];

    // Add equipped weapon to select
    if (("id" in character.equippedWeapon) && !(weaponIds.includes(character.equippedWeapon.id))) {
        let equippedWeaponOption = document.createElement("option");
        equippedWeaponOption.value = character.equippedWeapon.id;
        equippedWeaponOption.innerText = `${character.equippedWeapon.name} (atk: ${character.equippedWeapon.attack})`;
        weaponIds.push(character.equippedWeapon.id);
        characterWeapons.appendChild(equippedWeaponOption);
        equippedWeaponOption.setAttribute("selected", "selected");
    } else {
        noWeapon.setAttribute("selected", "selected");
    }

    let weapons = backpackItems.filter(item => item.type == "weapon");
    // Add backpack weapons to select
    for (let weapon of weapons) {
        if (weaponIds.includes(weapon.id)) {
            continue;
        }
        weaponIds.push(weapon.id);
        let weaponOption = document.createElement("option");
        weaponOption.value = weapon.id;
        weaponOption.innerText = `${weapon.name} (atk: ${weapon.attack})`;
        characterWeapons.appendChild(weaponOption);
    }
    equippedItems.appendChild(characterWeapons);

    insertLineBreak(equippedItems, 1);

    // Character shields
    let characterShieldsLable = document.createElement("label");
    characterShieldsLable.innerText = "🛡 Shield: ";
    characterShieldsLable.setAttribute("for", "shields");
    equippedItems.appendChild(characterShieldsLable);

    let characterShields = document.createElement("select");
    characterShields.name = "shields";
    characterShields.id = "character-shields";
    characterShields.setAttribute("onchange", "equipItem('shield')");

    let noShield = document.createElement("option");
    noShield.value = 0;
    noShield.innerText = "<No shield>";
    characterShields.appendChild(noShield);

    let shieldIds = [];

    // Add equipped shield to select
    if (("id" in character.equippedShield) && !(weaponIds.includes(character.equippedShield.id))) {
        let equippedShieldOption = document.createElement("option");
        equippedShieldOption.value = character.equippedShield.id;
        equippedShieldOption.innerText = `${character.equippedShield.name} (atk: ${character.equippedShield.attack})`;
        shieldIds.push(character.equippedShield.id);
        characterShields.appendChild(equippedShieldOption);
        equippedShieldOption.setAttribute("selected", "selected");
    } else {
        noShield.setAttribute("selected", "selected");
    }

    // Add backpack shields to select
    let shields = backpackItems.filter(item => item.type == "shield");
    for (let shield of shields) {
        if (shieldIds.includes(shield.id)) {
            continue;
        }
        shieldIds.push(shield.id);
        let shieldOption = document.createElement("option");
        shieldOption.value = shield.id;
        shieldOption.innerText = `${shield.name} (def: ${shield.defense})`;
        characterShields.appendChild(shieldOption);
    }

    equippedItems.appendChild(characterShields);

    gs.appendChild(equippedItems);
}

function showCharacterGold() {
    let characterGold = document.createElement("div");
    characterGold.id = "character-gold";
    characterGold.className = "gray-border";

    let characterGoldTitle = document.createElement("p");
    characterGoldTitle.id = "character-gold-title";
    characterGoldTitle.innerText = "💰 Gold";
    characterGold.appendChild(characterGoldTitle);

    let characterGoldText = document.createElement("p")
    characterGoldText.innerText = `${character.gold} gold coins  (poor)`;
    characterGold.appendChild(characterGoldText);

    gs.appendChild(characterGold);
}

function shop() {
    alert("🚧 Shop is currently under construction. Please come back later!");
}

function heal() {
    let healPrice = Math.ceil(character.gold * 0.1);
    // Enforce it to be at least 5
    healPrice = Math.max(5, healPrice);
    if (confirm(`Are you sure you want to heal? It will cost you ${healPrice} gold coins.`)) {
        if (character.gold >= healPrice) {
            character.currentHealth = character.maxHealth;
            character.gold -= healPrice;
        } else {
            alert("You do not have enough gold! Please stop being poor and come again.");
        }
        clearGameSpace();
        showMainScreen();
    }
}

function travelInTime() {
    alert("It worked!! You are a couple of seconds in the future.")
}

function showHuntShopAndHealButtons() {
    let goHuntButton = document.createElement("button");
    goHuntButton.innerText = "🏹 Go Hunt!";
    goHuntButton.id = "hunt-button";
    goHuntButton.setAttribute("onclick", "chooseBattle()");
    gs.appendChild(goHuntButton);

    let shopButton = document.createElement("button");
    shopButton.innerText = "🛒 Shop";
    shopButton.id = "shop-button";
    shopButton.setAttribute("onclick", "shop()");
    gs.appendChild(shopButton);

    let healButton = document.createElement("button");
    healButton.innerText = "🩹 Heal";
    healButton.id = "heal-button";
    healButton.setAttribute("onclick", "heal()");
    gs.appendChild(healButton);

    let travelInTimeButton = document.createElement("button");
    travelInTimeButton.innerText = "⌛ Travel in time";
    travelInTimeButton.id = "time-button";
    travelInTimeButton.setAttribute("onclick", "travelInTime()");
    gs.appendChild(travelInTimeButton);
}

function showMainScreen() {
    showNameLevelAndExp();
    showCharacterInfo();
    showEquippedItems();
    showCharacterGold();
    showCharacterBackpack();

    insertLineBreak(gs, 2);

    showHuntShopAndHealButtons();
}

function newGame() {
    getName();
    gameOver();
    clearGameSpace();
    showMainScreen();
}