import $ from "jquery";
import datas from "../../public/data/DATA.json";
import top from "../../public/data/DATA-2.json";

const main = async () => {
  /* restaurant list */
  $(`restaurant-list`).prop(`restaurants`, datas.restaurants);
  $("top-restaurant-list").prop("restaurants", top.restaurants);

  /* dragable false */
  $("body").on("dragstart", function () {
    return false;
  });

  /* drawer */
  $("#menu").click((event) => {
    $("#drawer").toggleClass("open");
    event.stopPropagation();
  });
  $("main, .nav a").click(() => {
    $("#drawer").removeClass("open");
  });

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
};

export default main;
