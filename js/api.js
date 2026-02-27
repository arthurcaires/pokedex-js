export async function fetchAllPokemon(limit = 151) {
    const promises = [];

    for (let i = 1; i <= limit; i++) {
        promises.push(
            fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
                .then(res => res.json())
        );
    }

    return Promise.all(promises);
}