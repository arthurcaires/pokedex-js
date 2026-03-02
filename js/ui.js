export function createCard(pokemon, container) {
  const card = document.createElement("div");
  card.classList.add("card");

  card.innerHTML = `
    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" />
  `;

  container.appendChild(card);
}