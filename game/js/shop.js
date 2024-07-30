import {addToBackpack, showCharacterBackpack, removeFromBackpack} from './backpack.js'

let character;

const getCharacterData = () => (character = getData("character"));
const safeSubtract = (value1, value2) => Number(value1) - Number(value2);
const safeAddition = (value1, value2) => Number(value1) + Number(value2);
const saveCharacter = (character) => setData("character", character);
const getMerchantItemById = itemId => merchantItems.find((item) => item.id === Number(itemId));

const setGold = () => {
  let gold = document.querySelector("h3");
  gold.innerText = `💰 ${character.gold}  (poor)`;
};

const startShop = () => {
  getCharacterData();
  setGold();
  showCharacterBackpack(character);

  let itemsToBuySelect = document.querySelector("select[name='availableItemsToBuy']");
  let itemsToSellSelect = document.querySelector("select[name='availableItemsToSell']");

  renderBuyItemSection();
  renderSellItemSection();

  const buttons = document.querySelectorAll(".link__button-styled");

  const buyButton = Array.from(buttons).find(
    (button) => button.textContent === "Buy"
  );
  const sellButton = Array.from(buttons).find(
    (button) => button.textContent === "Sell"
  );
  buyButton.addEventListener("click", () => buyItem(itemsToBuySelect.value));
  sellButton.addEventListener("click", () => sellItem(itemsToSellSelect.value));
};

const buyItem = (itemId) => {
  const item = getMerchantItemById(itemId)
  if (item.value > character.gold) {
    alert(
      "You do not have enough gold! Please stop being poor and come again."
    );
    return;
  }

  character.gold = safeSubtract(character.gold, item.value * 2);
  addToBackpack(item.id, 1, character)
  saveCharacter(character);
  setGold();
  showCharacterBackpack(character);
  renderSellItemSection();
};

const sellItem = (itemId) => {
  if (itemId === 'null') {
    alert(
      "You do not have items to sell!"
    );
    return;
  }  
  const item = getMerchantItemById(itemId);

  character.gold = safeAddition(character.gold, Math.round(item.value / 2));
  removeFromBackpack(item.id, 1, character)
  saveCharacter(character);
  setGold();
  showCharacterBackpack(character);
  renderSellItemSection();
};

const renderBuyItemSection = () => {
  let itemsToBuySelect = document.querySelector("select[name='availableItemsToBuy']");
  for (const item of merchantItems) {
    let itemsOptions = document.createElement("option");
    itemsOptions.value = item.id;
    itemsOptions.innerText = `${item.name} (${item.attack ? "atk" : "def"}: ${
      item.attack ? item.attack : item.defense
    }) Value: ${item.value * 2}`;
    itemsToBuySelect.appendChild(itemsOptions);
  }
}
const renderSellItemSection = () => {
  let itemsToSellSelect = document.querySelector("select[name='availableItemsToSell']");
  const selectOptions = itemsToSellSelect.querySelectorAll('option');

  if (selectOptions) {
    for (let option of selectOptions) {
      option.remove();
    }
  }

  if (character.backpack.length === 0) {
    let itemsOptions = document.createElement("option");
    itemsOptions.value = null;
    itemsOptions.innerText = 'empty';
    itemsToSellSelect.appendChild(itemsOptions);
  } else {
    for (const item of character.backpack) {
      let filteredItem = getMerchantItemById(item.id);
      let itemsOptions = document.createElement("option");
      itemsOptions.value = filteredItem.id;
      itemsOptions.innerText = `${filteredItem.name} (${filteredItem.attack ? "atk" : "def"}: ${
        filteredItem.attack ? filteredItem.attack : filteredItem.defense
      }) Value: ${Math.round(filteredItem.value / 2)}`;
      itemsToSellSelect.appendChild(itemsOptions);
    }
  }
}

startShop();
