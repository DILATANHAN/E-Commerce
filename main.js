let menu = document.querySelector(".navbar");

let menuIcon = document.querySelector("#menu-icon");
//* Menu iconuna tiklanildiginda "open-menu"classini ekle cikar
menuIcon.addEventListener("click", () => menu.classList.toggle("open-menu"));

