// Popup logic
const modal = document.getElementById("bookModal");
const addBookBtn = document.getElementById("addBookBtn");
const confirmBtn = document.getElementById("confirmSearchBtn");
const searchInput = document.getElementById("bookSearchInput");
const authorInput = document.getElementById("authorSearchInput");

addBookBtn.addEventListener("click", () => {
  modal.classList.remove("hidden");
  searchInput.value = "";
  authorInput.value = "";
});

document.querySelectorAll(".book-card").forEach((card) => {
  const dots = card.querySelector(".book-dots");
  const menu = card.querySelector(".book-menu");

  dots.addEventListener("click", (e) => {
    e.stopPropagation(); // prevent bubbling
    menu.classList.toggle("hidden");
  });

  document.addEventListener("click", () => {
    menu.classList.add("hidden");
  });

  // Prevent menu from closing if clicked inside
  menu.addEventListener("click", (e) => {
    e.stopPropagation();
  });
});

// Book sorting logic
function sortBooks() {
  const sortValue = document.getElementById("sort").value;
  const url = new URL(window.location.href);
  url.searchParams.set("sort", sortValue);
  window.location.href = url.toString();
}

window.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const selectedSort = urlParams.get("sort");
  if (selectedSort) {
    document.getElementById("sort").value = selectedSort;
  }
});
