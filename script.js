const body = document.querySelector("body");
const searchContainer = document.querySelector("#search-container");
const searchBar = document.querySelector("#poke-search");
const pokeBall = document.querySelector("#poke-ball-img");
const main = document.querySelector("main");

const types = {
	normal: ["#e6c5ac", "#315a7b"],
	fire: ["#ffeebd", "#de7339"],
	water: ["#8bc5cd", "#ffe69c"],
	grass: ["#83cd6a", "#204a20"],
	electric: ["#fff6a4", "#9c5200"],
	ice: ["#94e6ee", "#52629c"],
	fighting: ["#c5bdac", "#ac3131"],
	poison: ["#a483c5", "#52397b"],
	ground: ["#f6d520", "#8b6218"],
	flying: ["#8bb4ee", "#4a417b"],
	psychic: ["#f6de00", "#835a41"],
	bug: ["#83c54a", "#6a8b5a"],
	rock: ["#948b73", "#bd6239"],
	ghost: ["#a4acd5", "#625a8b"],
	dark: ["#a4a4a4", "#414141"],
	dragon: ["#ffffff", "#293183"],
	steel: ["#b4acac", "#838b83"],
	fairy: ["#ffd5bd", "#9c5252"],
};

let cardCount = 0;

async function fetchPokemon(pokemon) {
	// removing spaces from string and making it lowercase
	pokemon = pokemon.replace(/\s/g, "");
	pokemon = pokemon.toLowerCase();
	const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
	const data = await res.json();
	console.log(data.types[0].type.name);
	if (cardCount > 0) {
		removeCard();
		cardCount--;
		return data;
	} else {
		cardCount++;
		return data;
	}
}

async function fetchPokedex(pokemon) {
	pokemon = pokemon.replace(/\s/g, "");
	pokemon = pokemon.toLowerCase();
	const res = await fetch(
		`https://pokeapi.co/api/v2/pokemon-species/${pokemon}/`
	);
	const data = await res.json();
	const englishFlavorEntries = data.flavor_text_entries.filter(
		(el) => el.language.name === "en"
	);
	const randomNum = Math.floor(Math.random() * englishFlavorEntries.length);
	return englishFlavorEntries[randomNum].flavor_text;
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
	}, 3500);
	searchBar.value = "";
};

pokeBall.addEventListener("click", async () => {
	// fetch fn here
	try {
		const pokemon = await fetchPokemon(searchBar.value);
	} catch {
		notFound();
	}
});

searchBar.addEventListener("keyup", async (event) => {
	if (event.code === "Enter") {
		try {
			const pokemon = await fetchPokemon(event.target.value);
			const pokedex = await fetchPokedex(event.target.value);
			addCard(pokemon);
		} catch {
			notFound();
		}
	}
});

const createCard = async (pokemon) => {
	const div = document.createElement("div");
	const title = document.createElement("p");
	const img = document.createElement("img");
	const shinyImg = document.createElement("img");
	const alt = `An image of the ${pokemon.name} pokemon.`;
	const info = document.createElement("p");
	div.style.backgroundColor = types[pokemon.types[0].type.name][0];
	div.style.border = `5px solid ${types[pokemon.types[0].type.name][1]}`;
	div.classList.add("pokemon-card");
	title.innerText = pokemon.name;
	title.classList.add("pokemon-title");
	img.src = pokemon.sprites.front_default;
	img.alt = alt;
	img.classList.add("pokemon-img");
	shinyImg.src = pokemon.sprites.front_shiny;
	shinyImg.alt = alt;
	info.innerText = await fetchPokedex(pokemon.name);
	info.classList.add("pokemon-info");
	div.append(title, img, info);
	return div;
};

const addCard = async (pokemon) => {
	const card = await createCard(pokemon);
	body.append(card);
};

async function removeCard() {
	const poke = await fetchPokemon("pikachu");
	const card = document.querySelector(".pokemon-card");
	body.removeChild(card);
}
