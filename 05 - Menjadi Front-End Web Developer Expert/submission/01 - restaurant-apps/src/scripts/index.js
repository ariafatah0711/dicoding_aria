import "regenerator-runtime"; /* for async await transpile */
import $ from "jquery";

import "../styles/main.scss";

import datas from "../public/data/DATA.json";
import "./components/restaurant-list.js";
import "./view/render.js";

$(`restaurant-list`).prop(`restaurants`, datas.restaurants);

// function search() {
//   let input, filter, li, h3;
//   input = document.getElementById("explore-search");
//   filter = input.value.toUpperCase();
//   li = document.querySelectorAll("li");

//   for (let i = 0; i < li.length; i++) {
//     h3 = li[i].getElementsByTagName("h3")[0];
//     txtValue = h3.textContent || h3.innerText;

//     if (txtValue.toUpperCase().indexOf(filter) > -1) {
//       li[i].style.display = "";
//     } else {
//       li[i].style.display = "none";
//     }
//   }
// }
