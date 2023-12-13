// import { coffeeStock as stock, isCoffeeMakerReady } from "./state.mjs";
import { coffeeStock, isCoffeeMakerReady } from "./state.mjs";

const displayStock = (stock) => {
  const coffeeStockListElement = document.getElementById("coffee-stock-list");

  for (const type in stock) {
    const coffeeStockItemElement = document.createElement("li");
    coffeeStockItemElement.innerHTML = `${type}: ${stock[type]}`;
    coffeeStockListElement.appendChild(coffeeStockItemElement);
  }
};

const coffeeOrder = (type, miligrams) => {
  return new Promise((resolve, reject) => {
    if (isCoffeeMakerReady) {
      if (coffeeStock[type] >= miligrams) {
        resolve("kopi berhasil dibuat!");
      } else {
        reject("maaf stock kopi habis!");
      }
    } else {
      reject("maaf mesin sedang rusak!");
    }
  });
};

const coffeeOrderButtonEventHandler = async (event) => {
  const type = prompt("kopi apa yang anda pesan?");
  const miligrams = prompt("berapa miligrams!");

  try {
    const result = await coffeeOrder(type, miligrams);
    alert(result);
  } catch (rejectReason) {
    alert(rejectReason);
  }
};

const coffeeOrderButton = document.getElementById("coffee-order-button");
coffeeOrderButton.addEventListener("click", coffeeOrderButtonEventHandler);

displayStock(coffeeStock);
