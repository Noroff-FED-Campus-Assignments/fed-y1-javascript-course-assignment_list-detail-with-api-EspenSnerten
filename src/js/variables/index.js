const apiList = document.getElementById("apiList");

function displayError(message = "unknown error") {
  return `<div class="errorbox">${message}</div>`;
}

const fetchPokeData = async () => {
  try {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=150`;
    const res = await fetch(url);
    const data = await res.json();
    const pokemon = data.results.map((result, index) => ({
      ...result,
      id: index + 1,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
        index + 1
      }.png`,
    }));
    displayPokemon(pokemon);
  } catch (error) {
    apiList.innerHTML = displayError("An error has occurred");
  }
};

const displayPokemon = (pokemon) => {
  const pokemonHTMLString = pokemon
    .map(
      (poke) => `
  <li class="card" onclick="selectPokemon(${poke.id})">
  <img class="card_image" src="${poke.image}"/>
  <h2 class="card_title">${poke.id}. ${poke.name}</h2>
  </li>
  `
    )
    .join("");
  apiList.innerHTML = pokemonHTMLString;
};

const selectPokemon = async (id) => {
  try {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    console.log(res.ok);
    const poke = await res.json();
    displayPopup(poke);
  } catch (error) {
    apiList.innerHTML = displayError("An error has occurred");
  }
};

const displayPopup = (poke) => {
  const type = poke.types.map((type) => type.type.name).join(", ");
  const image = poke.sprites["front_default"];
  const htmlString = `
    <div class="popup">
      <button id="closeBtn" onclick="closePopup()"><i class="bi bi-x-lg"></i></button>
      <div class="card_popup">
        <img class="card_image" src="${image}"/>
        <h2 class="card_title">${poke.id}. ${poke.name}</h2>
        <p class="types"><small>Height:&nbsp;</small>${poke.height}  <p class="types"><small>Weight:&nbsp; </small>${poke.weight}  <p class="types"><small>Type:&nbsp; </small>${type}
      </div>
    </div>
    `;
  apiList.innerHTML = htmlString + apiList.innerHTML;
};

const closePopup = () => {
  const popup = document.querySelector(".popup");
  popup.parentElement.removeChild(popup);
};

fetchPokeData();
