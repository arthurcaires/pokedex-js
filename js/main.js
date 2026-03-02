import { fetchAllPokemon } from "./api.js";
import { createCard } from "./ui.js";

const pokemonList = document.getElementById("pokemonList");
const loading = document.getElementById("loading");

let offset = 0;
const limit = 30;
let loadingMore = false;

/* ============================= */
/* CARREGAMENTO INICIAL */
/* ============================= */

async function init() {
  await loadMorePokemon();
  loading.style.display = "none";
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
      createCard(pokemon, pokemonList);
    });

    offset += limit;

  } catch (error) {
    console.error("Erro ao carregar mais Pokémon:", error);
  }

  loadingMore = false;
}

/* Detecta quando chega perto do final */

pokemonList.addEventListener("scroll", () => {
  const nearEnd =
    pokemonList.scrollLeft + pokemonList.clientWidth >=
    pokemonList.scrollWidth - 300;

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

init();