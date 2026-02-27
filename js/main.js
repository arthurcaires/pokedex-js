import { fetchAllPokemon } from "./api.js";
import { createCard } from "./ui.js";

const pokemonList = document.getElementById("pokemonList");

// Modal elementos
const modal = document.getElementById("modal");
const modalName = document.getElementById("modalName");
const modalImage = document.getElementById("modalImage");
const modalNumber = document.getElementById("modalNumber");
const modalType = document.getElementById("modalType");
const closeModal = document.getElementById("closeModal");
const modalContent = document.querySelector(".modal-content");

// profundidade 3d

    modalContent.addEventListener("mousemove", (e) => {
    const rect = modalContent.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = ((y - rect.height / 2) / rect.height) * 8;
    const rotateY = ((x - rect.width / 2) / rect.width) * 8;

    modalContent.style.transform =
        `rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
});

modalContent.addEventListener("mouseleave", () => {
    modalContent.style.transform = "rotateX(0) rotateY(0)";
});


async function init() {
    const pokemons = await fetchAllPokemon();

    pokemons.forEach(pokemon => {
        createCard(pokemon, pokemonList, showDetails);
    });
}

function showDetails(pokemon) {

    modalName.textContent =
        pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

    modalImage.src = pokemon.sprites.front_default;
    modalNumber.textContent = `#${pokemon.id}`;
    modalType.textContent = pokemon.types
        .map(t => t.type.name)
        .join(", ");

// Remover stats antigas
const oldStats = document.querySelectorAll(".stat");
oldStats.forEach(stat => stat.remove());

// Criar stats animadas
const statsHTML = pokemon.stats.map(stat => {
    const value = stat.base_stat;
    return `
        <div class="stat">
            <span>${stat.stat.name.toUpperCase()} (${value})</span>
            <div class="bar">
                <div class="fill" style="width: ${value}%"></div>
            </div>
        </div>
    `;
}).join("");

modalType.insertAdjacentHTML("afterend", statsHTML);

    modal.classList.remove("hidden");

    // profundidade 3d

}

// Fechar no X
closeModal.addEventListener("click", () => {
    modal.classList.add("hidden");
});

// Fechar clicando fora
modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.classList.add("hidden");
    }
});

init();