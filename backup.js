const typeColors = {
    fire: "#f08030",
    water: "#6890f0",
    grass: "#78c850",
    electric: "#f8d030",
    psychic: "#f85888",
    ice: "#98d8d8",
    dragon: "#7038f8",
    dark: "#705848",
    fairy: "#ee99ac",
    normal: "#a8a878",
    fighting: "#c03028",
    flying: "#a890f0",
    poison: "#a040a0",
    ground: "#e0c068",
    rock: "#b8a038",
    bug: "#a8b820",
    ghost: "#705898",
    steel: "#b8b8d0"
}
const pokemonList = document.getElementById("pokemonList");
const searchInput = document.getElementById("searchInput");

const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");

const modalName = document.getElementById("modalName");
const modalImage = document.getElementById("modalImage");
const modalNumber = document.getElementById("modalNumber");
const modalType = document.getElementById("modalType");

async function loadPokemon(){
    const promises = [];

    for(let i = 1; i <= 151; i++){
        promises.push(
            fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
                .then(res => res.json())
        );
    }
    const results = await Promise.all(promises);

    results.forEach(pokemon => createCard(pokemon));
}

function createCard(pokemon){
    const card = document.createElement("div");
    card.classList.add("card");

    const types = pokemon.types.map(t => t.type.name);

    if(types.length === 1){
        card.style.background = typeColors[types[0]];
    } else {
        card.style.background = `linear-gradient(135deg, 
            ${typeColors[types[0]]}, 
            ${typeColors[types[1]]})`;
    }

    card.innerHTML = `
        <img src="${pokemon.sprites.front_default}">
        <p>#${pokemon.id}</p>
        <h3>${pokemon.name}</h3>
    `;

    card.addEventListener("click", () => showDetails(pokemon));

    pokemonList.appendChild(card);
}

function showDetails(pokemon){
    modal.classList.remove("hidden");

    modalName.textContent = pokemon.name;
    modalImage.src = pokemon.sprites.front_default;
    modalNumber.textContent = "Número: #" + pokemon.id;
    modalType.textContent =
        "Tipo: " + pokemon.types.map(t => t.type.name).join(", ");

    const statsContainer = document.querySelector(".modal-content");

    // 🔥 remove stats antigas antes de adicionar novas
    const oldStats = document.querySelectorAll(".stat");
    oldStats.forEach(stat => stat.remove());

    const statsHTML = pokemon.stats.map(stat => {
        return `
            <div class="stat">
                <span>${stat.stat.name}</span>
                <div class="bar">
                    <div class="fill" style="width:${stat.base_stat}%"></div>
                </div>
            </div>
        `;
    }).join("");

    statsContainer.insertAdjacentHTML("beforeend", statsHTML);
}

closeModal.addEventListener("click", () => {
    modal.classList.add("hidden");
});

searchInput.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();
    const cards = document.querySelectorAll(".card");

    cards.forEach(card =>{
        const name = card.querySelector("h3").textContent;
        card.style.display = name.includes(value) ? "block" : "none";
    });
});

loadPokemon();