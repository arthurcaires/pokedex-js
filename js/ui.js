import { typeColors } from "./colors.js";

export function createCard(pokemon, container, onClick) {

    const card = document.createElement("div");
    card.classList.add("card");

    const types = pokemon.types.map(t => t.type.name);


    if (types.length === 1) {
        card.style.background = typeColors[types[0]];
    } else {
        card.style.background =
            `linear-gradient(135deg,
                ${typeColors[types[0]]},
                ${typeColors[types[1]]})`;
    }

    const originalBackground = card.style.background;

    card.innerHTML = `
        <img src="${pokemon.sprites.front_default}">
        <p>#${pokemon.id}</p>
        <h3>${pokemon.name}</h3>
    `;

    card.addEventListener("click", () => onClick(pokemon));

    container.appendChild(card);

    card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * 12;
    const rotateY = ((x - centerX) / centerX) * 12;

     card.style.transform = `
        rotateX(${-rotateX}deg)
        rotateY(${rotateY}deg)
        scale(1.05)
    `;

     // brilho dinâmico
    card.style.background = `
    radial-gradient(
        circle at ${x}px ${y}px,
        rgba(255,255,255,0.35),
        rgba(255,255,255,0.05) 40%
    )
`;
});

card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0) rotateY(0) scale(1)";
    card.style.background = originalBackground;

});
}
