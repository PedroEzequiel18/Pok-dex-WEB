const inputBusca = document.querySelector("#input-busca");
const btnBuscar = document.querySelector("#btn-buscar");
const resultado = document.querySelector("#resultado");
const erro = document.querySelector("#erro");
const pokemonImage = document.querySelector("#pokemon-image");
const pokemonName = document.querySelector("#pokemon-name");
const pokemonType = document.querySelector("#pokemon-type");
const erroMessage = document.querySelector("#erro-message");

btnBuscar.addEventListener("click", buscarPokemon);

async function buscarPokemon() {
  const nome = inputBusca.value.trim().toLowerCase();

  if (nome === "") {
    return;
  }

  try {
    const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nome}`);

    if (!resposta.ok) {
      throw new Error("Pokémon não encontrado!");
    }

    const dados = await resposta.json();

    pokemonName.textContent = dados.name;
    pokemonType.textContent = dados.types
      .map((type) => type.type.name)
      .join(", ");
    pokemonImage.src = dados.sprites.front_default;
    pokemonImage.alt = dados.name;
    resultado.classList.remove("oculto");
    erro.classList.add("oculto");
  } catch (e) {
    erroMessage.textContent = e.message;
    erro.classList.remove("oculto");
    resultado.classList.add("oculto");
  }
}
