export const addToBackpack = (itemId, quantity, character) => {
	let foundItems = character.backpack.filter((x) => x.id == itemId);
    if (foundItems.length > 0) {
        foundItems[0].quantity += quantity;
    } else {
        character.backpack.push({ id: itemId, quantity: quantity });
    }
}
  
export const removeFromBackpack = (itemId, quantity, character) => {
    let foundItems = character.backpack.filter((x) => x.id == itemId);
    if (foundItems.length > 0) {
        foundItems[0].quantity -= quantity;
        if (foundItems[0].quantity <= 0) {
            character.backpack = character.backpack.filter((x) => x.id != itemId);
        }
    }
}

const createBackpackItemElement = (itemReference) => {
    let item = retrieveItem(itemReference.id);
    let itemElement = document.createElement("p");
    let itemText = `${itemReference.quantity}x ${item.name}`;
    if (itemReference.quantity > 1) {
        itemText += "s";
    }
    if (item.attack) {
        itemText += ` (atk: ${item.attack})`;
    }
    if (item.defense) {
        itemText += ` (def: ${item.defense})`;
    }
    itemElement.innerText = itemText;
    return itemElement;
}

export const showCharacterBackpack = (character) => {
    const backpackSpace = document.querySelector('.backpack__items');
    const backpackItems = backpackSpace.querySelectorAll('p');

    if (backpackItems) {
        for (let item of backpackItems) {
            item.remove();
        }
    }

    if (character.backpack.length > 0) {
        let emptyElement = document.querySelector("#backpack-empty");
        if (emptyElement) {
            emptyElement.remove();
        }
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
}