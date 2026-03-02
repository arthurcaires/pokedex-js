import { fetchAllPokemon } from "./api.js";
import { createCard } from "./ui.js";

const pokemonList = document.getElementById("pokemonList");
const loading = document.getElementById("loading");
const closePanel = document.getElementById("closePanel");

closePanel.addEventListener("click", () => {
  sidePanel.classList.add("hidden");
});

const sidePanel = document.getElementById("sidePanel");
const panelImage = document.getElementById("panelImage");
const panelName = document.getElementById("panelName");
const panelNumber = document.getElementById("panelNumber");
const panelType = document.getElementById("panelType");
const favoriteBtn = document.getElementById("favoriteBtn");

let offset = 0;
const limit = 30;
let loadingMore = false;

/* ============================= */
/* PAINEL LATERAL */
/* ============================= */

function openSidePanel(pokemon) {
  panelImage.src = pokemon.sprites.front_default;
  panelName.textContent = pokemon.name.toUpperCase();
  panelNumber.textContent = `#${pokemon.id}`;
  panelType.textContent = pokemon.types.map(t => t.type.name).join(", ");

  sidePanel.classList.remove("hidden");

  favoriteBtn.onclick = () => toggleFavorite(pokemon);
}

function toggleFavorite(pokemon) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  const exists = favorites.find(p => p.id === pokemon.id);

  if (exists) {
    favorites = favorites.filter(p => p.id !== pokemon.id);
  } else {
    favorites.push({ id: pokemon.id, name: pokemon.name });
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
}

/* ============================= */
/* LOAD INFINITO */
/* ============================= */

async function loadMorePokemon() {
  if (loadingMore) return;
  loadingMore = true;

  try {
    const data = await fetchAllPokemon(offset, limit);

    data.forEach(pokemon => {
      createCard(pokemon, pokemonList, openSidePanel);
    });

    offset += limit;

  } catch (error) {
    console.error("Erro ao carregar Pokémon:", error);
  }

  loadingMore = false;
}

pokemonList.addEventListener("scroll", () => {
  const nearEnd =
    pokemonList.scrollLeft >=
    pokemonList.scrollWidth - pokemonList.clientWidth - 200;

  if (nearEnd) {
    loadMorePokemon();
  }
});

/* ============================= */
/* AUTO SCROLL ESTILO GAME */
/* ============================= */

let scrollDirection = 0;
const scrollSpeed = 5;
const edgeSize = 120;

function autoScroll() {
  if (scrollDirection !== 0) {
    pokemonList.scrollLeft += scrollDirection * scrollSpeed;
  }
  requestAnimationFrame(autoScroll);
}

document.addEventListener("mousemove", (e) => {
  if (e.clientX > window.innerWidth - edgeSize) {
    scrollDirection = 1;
  } else if (e.clientX < edgeSize) {
    scrollDirection = -1;
  } else {
    scrollDirection = 0;
  }
});

autoScroll();

/* ============================= */
/* INICIALIZAÇÃO */
/* ============================= */

async function init() {
  await loadMorePokemon();
  await loadMorePokemon(); // garante largura maior que a tela
  loading.style.display = "none";
}

document.addEventListener("click", (e) => {
  if (!sidePanel.contains(e.target) &&
      !e.target.closest(".card")) {
    sidePanel.classList.add("hidden");
  }
});

init();