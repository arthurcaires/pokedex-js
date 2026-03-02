export function createCard(pokemon, container, onClick) {
  const card = document.createElement("div");
  card.classList.add("card");

  card.innerHTML = `
    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" />
  `;

  card.addEventListener("click", () => {
    if (onClick) onClick(pokemon);
  });

  container.appendChild(card);
}