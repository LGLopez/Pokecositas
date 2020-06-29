let input = document.getElementById("toSearch");
const btnToSearch = document.getElementById("btnS");

async function retrieveStatsTypes(urlForTypes){
  const response = await fetch(urlForTypes);
  const jsonTypes = await response.json();

  const { damage_relations } = jsonTypes;
  const { double_damage_from } = damage_relations;

  const { double_damage_to } = damage_relations;

  const jsonStrong = double_damage_to.map(types => types.name).join(", ");
  const jsonWeakness = double_damage_from.map(types => types.name).join(", ");

  document.getElementById("pokeStrong").textContent = "Efectividad contra: " + jsonStrong;
  document.getElementById("pokeWeakness").textContent = 'Debilidad contra: ' + jsonWeakness;
}

async function retrieveData(urlFetch) {
  const response = await fetch(urlFetch);
  const jsonData = await response.json();

  const { sprites } = jsonData;
  const { front_default } = sprites;
  const { types } = jsonData;
  const { type } = types[0];

  const { weight } = jsonData;
  const { height } = jsonData;

  const typeToShow = "Tipo: " + type.name.toUpperCase();
  const weightToShow = 'Peso: ' + (weight/10) + " KG";
  const heightToShow = 'Altura: ' + (height*10) + " CM";

  document.getElementById("pokeToShow").src = front_default;
  document.getElementById("pokeName").textContent = input.value.toUpperCase();
  document.getElementById("pokeType").textContent = typeToShow;
  document.getElementById("pokeWeight").textContent = weightToShow;
  document.getElementById("pokeHeight").textContent = heightToShow;

  retrieveStatsTypes(type.url);

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
