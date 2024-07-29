import {addToBackpack, showCharacterBackpack} from './backpack.js'

let character;

const getCharacterData = () => (character = getData("character"));
const safeSubtract = (value1, value2) => Number(value1) - Number(value2);
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

  let itemsSelect = document.querySelector("select");
  for (const item of merchantItems) {
    let itemsOptions = document.createElement("option");
    itemsOptions.value = item.id;
    itemsOptions.innerText = `${item.name} (${item.attack ? "atk" : "def"}: ${
      item.attack ? item.attack : item.defense
    }) Value: ${item.value}`;
    itemsSelect.appendChild(itemsOptions);
  }

  const buttons = document.querySelectorAll(".link__button-styled");

  const buyButton = Array.from(buttons).find(
    (button) => button.textContent === "Buy"
  );
  buyButton.addEventListener("click", () => buyItem(itemsSelect.value));
};

const buyItem = (itemId) => {
  const item = getMerchantItemById(itemId)
  if (item.value > character.gold) {
    alert(
      "You do not have enough gold! Please stop being poor and come again."
    );
    return;
  }

  character.gold = safeSubtract(character.gold, item.value);
  addToBackpack(item.id, 1, character)
  saveCharacter(character);
  setGold();
  showCharacterBackpack(character);
  console.log(character.backpack)
};

startShop();
