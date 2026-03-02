import { typeColors } from "./colors.js";

export function createCard(pokemon, container) {
  const card = document.createElement("div");
  card.classList.add("card");

  card.innerHTML = `
    <img src="${pokemon.sprites.front_default}" />
    <div class="info">
      <strong>${pokemon.name.toUpperCase()}</strong>
      <p>#${pokemon.id}</p>
      <p>${pokemon.types.map(t => t.type.name).join(", ")}</p>
    </div>
  `;

  card.addEventListener("click", () => {
    const alreadyExpanded = card.classList.contains("expanded");

    // remove expansão de todos
    document.querySelectorAll(".card").forEach(c =>
      c.classList.remove("expanded")
    );

    if (!alreadyExpanded) {
      card.classList.add("expanded");
    }
  });

  container.appendChild(card);
}


