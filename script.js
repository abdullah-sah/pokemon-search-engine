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

const notFound = () => {
	const p = document.createElement("p");
	p.innerText = "You used notAPokemon! It's not very effective...";
	const div = document.createElement("div");
	div.classList.add("not-found");
	div.append(p);
	body.append(div);
	setTimeout(() => {
		body.removeChild(div);
	}, 3000);
};

pokeBall.addEventListener("click", async () => {
	// fetch fn here
	try {
		await fetchPokemon(searchBar.value);
	} catch {
		notFound();
	}
});

searchBar.addEventListener("keyup", async (event) => {
	if (event.code === "Enter") {
		try {
			await fetchPokemon(event.target.value);
		} catch {
			notFound();
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
