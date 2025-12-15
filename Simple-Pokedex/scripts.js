document.getElementById("searchBtn").addEventListener("click", buscarPokemon);

document.getElementById("pokemonInput").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    buscarPokemon();
  }
});

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function buscarPokemon() {
  const nomeOuNumero = document.getElementById("pokemonInput").value.toLowerCase();
  const url = `https://pokeapi.co/api/v2/pokemon/${nomeOuNumero}`;

  document.getElementById("loading").classList.remove("hidden");
  document.getElementById("pokemonInfo").classList.add("hidden");
  document.getElementById("error").classList.add("hidden");

  fetch(url)
    .then(res => {
      if (!res.ok) throw new Error("Pokémon não encontrado");
      return res.json();
    })
    .then(data => {
      const sprite = data.sprites.versions['generation-v']['black-white'].animated.front_default
                    || data.sprites.front_default;

      const nome = capitalize(data.name);
      const numero = data.id;
      const tipos = data.types.map(t => t.type.name).join(", ");
      const altura = `${data.height / 10} m`;
      const peso = `${data.weight / 10} kg`;

      document.getElementById("pokemonImg").src = sprite;
      document.getElementById("pokemonImgDisplay").src = sprite;

      document.getElementById("pokemonName").textContent = nome;
      document.getElementById("pokemonNameDisplay").textContent = nome;

      document.getElementById("pokemonIdDisplay").textContent = numero;
      document.getElementById("pokemonType").textContent = tipos;
      document.getElementById("pokemonHeight").textContent = altura;
      document.getElementById("pokemonWeight").textContent = peso;

      document.getElementById("loading").classList.add("hidden");
      document.getElementById("pokemonInfo").classList.remove("hidden");
    })
    .catch(() => {
      document.getElementById("loading").classList.add("hidden");
      document.getElementById("pokemonInfo").classList.add("hidden");
      document.getElementById("error").classList.remove("hidden");
    });
}
