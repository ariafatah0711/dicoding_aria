import $ from "jquery";
import datas from "../../public/data/DATA.json";

const main = async () => {
  // restaurant list
  $(`restaurant-list`).prop(`restaurants`, datas.restaurants);

  $("body").on("dragstart", function () {
    return false;
  });

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
