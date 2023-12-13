import coffeeStock from "./state.mjs";

const displayStock = (stock) => {
  const coffeeStockListElement = document.getElementById("coffee-stock-list");

  for (const type in stock) {
    const coffeeStockItemElement = document.createElement("li");
    coffeeStockItemElement.innerHTML = `${type}: ${stock[type]}`;
    coffeeStockListElement.appendChild(coffeeStockItemElement);
  }
};

displayStock(coffeeStock);
