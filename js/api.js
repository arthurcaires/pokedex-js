// api.js

export async function fetchAllPokemon(offset = 0, limit = 30) {
  const promises = [];

  const start = offset + 1;
  const end = offset + limit;

  for (let i = start; i <= end; i++) {
    promises.push(
      fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
        .then(res => {
          if (!res.ok) throw new Error("Erro ao buscar Pokémon");
          return res.json();
        })
    );
  }

  return Promise.all(promises);
}