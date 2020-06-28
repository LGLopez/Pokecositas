let input = document.getElementById("toSearch");
const btnToSearch = document.getElementById("btnS");

async function retrieveData(urlFetch) {
  const response = await fetch(urlFetch);
  const jsonData = await response.json();

  const { sprites } = jsonData;
  const { front_default } = sprites;
  const { types } = jsonData;
  const { type } = types[0];
  const typeToShow = "Tipo: " + type.name.toUpperCase();
  document.getElementById("pokeToShow").src = front_default;
  document.getElementById("pokeName").textContent = input.value.toUpperCase();
  document.getElementById("pokeType").textContent = typeToShow;
}

const getPokemonData = (pokemonName) => {
  let request = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
  retrieveData(request).catch( error => {
    alert("No se encontro el pokemon :c")
    console.log("Error!")
    console.error(error);
  });
  
}

const toCreateQuery = () => {
  getPokemonData(input.value.toLowerCase());
}


btnToSearch.addEventListener("click", toCreateQuery);
