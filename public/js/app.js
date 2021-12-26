const img = document.querySelector("img");
const info = document.querySelector(".info");
const back = document.getElementById("back");
const popup = document.querySelector(".popup");
const mainLink = document.getElementById("main-link");
const option = document.getElementById("option");

img.addEventListener("mouseenter", () => {
  info.classList.add("show");
});
img.addEventListener("mouseleave", () => {
  info.classList.remove("show");
});

if (back) {
  back.addEventListener("mouseenter", () => {
    popup.classList.add("popup-show");
  });

  back.addEventListener("mouseleave", () => {
    popup.classList.remove("popup-show");
  });
}
if (option) {
  option.addEventListener("change", () => {
    console.log(option.value);
    mainLink.setAttribute("href", `/input?type=${option.value}`);
  });
}
