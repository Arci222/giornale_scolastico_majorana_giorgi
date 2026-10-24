const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("menu");
const overlay = document.getElementById("overlay");

function openMenu() {
  menu.classList.add("open");
  overlay.classList.add("show");
  hamburger.setAttribute("aria-expanded", "true");
}

function closeMenu() {
  menu.classList.remove("open");
  overlay.classList.remove("show");
  hamburger.setAttribute("aria-expanded", "false");
}

hamburger.addEventListener("click", () => {
  menu.classList.contains("open") ? closeMenu() : openMenu();
});

overlay.addEventListener("click", closeMenu);
document
  .querySelectorAll(".menu a")
  .forEach((link) => link.addEventListener("click", closeMenu));

// BARRA DI RICERCA
const searchInput = document.getElementById("searchInput");
const searchDropdown = document.getElementById("searchDropdown");

function getArticoli() {
  return Array.from(document.querySelectorAll(".tendina details")).map(
    (details) => ({
      titolo: details.querySelector("summary").textContent.trim(),
      details,
    }),
  );
}

searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim().toLowerCase();
  searchDropdown.innerHTML = "";

  if (!query) {
    searchDropdown.classList.remove("visible");
    return;
  }

  const risultati = getArticoli().filter((a) =>
    a.titolo.toLowerCase().includes(query),
  );

  if (risultati.length === 0) {
    searchDropdown.classList.remove("visible");
    return;
  }

  risultati.forEach(({ titolo, details }) => {
    const li = document.createElement("li");
    li.textContent = titolo;
    li.addEventListener("click", () => {
      searchDropdown.classList.remove("visible");
      searchInput.value = "";

      details.open = true;
      details.scrollIntoView({ behavior: "smooth", block: "start" });

      const summary = details.querySelector("summary");
      summary.classList.add("highlight");
      setTimeout(() => summary.classList.remove("highlight"), 2000);
    });
    searchDropdown.appendChild(li);
  });

  searchDropdown.classList.add("visible");
});

document.addEventListener("click", (e) => {
  if (!e.target.closest(".search-wrapper")) {
    searchDropdown.classList.remove("visible");
  }
});
