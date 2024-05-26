/** Mobile Actions  *** */

const menu = document.getElementById("mobile-hide");

document.getElementById("menu-open").addEventListener("click", function () {
  menu.className = "mobile-show";
});

document.getElementById("menu-close").addEventListener("click", function () {
  menu.className = "mobile-hide";
});
