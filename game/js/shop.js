let character;

const getCharacterData = () => (character = getData("character"));
const safeSubtract = (value1, value2) => Number(value1) - Number(value2);
const saveCharacter = (character) => setData("character", character);

const debug = () => {
  let debug = document.querySelector("#debug");
  debug.innerText = JSON.parse(character.backpack);
};

const setGold = () => {
  let gold = document.querySelector("h3");
  gold.innerText = `💰 ${character.gold}  (poor)`;
};

const startShop = () => {
  getCharacterData();
  setGold();

  let itemsSelect = document.querySelector("select");
  for (const item of merchantItems) {
    let itemsOptions = document.createElement("option");
    itemsOptions.value = item.value;
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

const buyItem = (itemValue) => {
  if (itemValue > character.gold) {
    alert(
      "You do not have enough gold! Please stop being poor and come again."
    );
  }

  console.log(typeof character.gold);
  console.log(typeof itemValue);

  character.gold = safeSubtract(character.gold, itemValue);
  saveCharacter(character);
  setGold();
  debug();
};

startShop();
