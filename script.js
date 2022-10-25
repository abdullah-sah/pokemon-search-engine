const body = document.querySelector("body");
const searchContainer = document.querySelector("#search-container");
const searchBar = document.querySelector("#poke-search");
const pokeBall = document.querySelector("#poke-ball-img");
const main = document.querySelector("main");

async function fetchPokemon(pokemon) {
	// removing spaces from string and making it lowercase
	pokemon = pokemon.replace(/\s/g, "");
	pokemon = pokemon.toLowerCase();
	const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
	const data = await res.json();
	console.log(data);
}

pokeBall.addEventListener("click", async () => {
	// fetch fn here
	try {
		await fetchPokemon(searchBar.value);
	} catch {
		throw new Error("Pokemon not found");
	}
});

searchBar.addEventListener("keyup", async (event) => {
	if (event.code === "Enter") {
		try {
			await fetchPokemon(event.target.value);
		} catch {
			throw new Error("Pokemon not found");
		}
	}
});

const createCard = (pokemon) => {
	const card = document.createElement("p");
	card.classList.toggle("card");
	const title = document.createElement("p");
	const img = document.createElement("img");
	const p = document.createElement("p");
};
