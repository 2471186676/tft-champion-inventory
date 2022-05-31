let getChampElems = document.getElementsByClassName("champ_container")[0];
let sortBy = document.getElementsByClassName("sortBy")[0];
let searchBar = document.getElementsByClassName("searchBar")[0];

let byName = (array) => {
	console.log("sorting by name");
	let sortedElement = [];

	// clean data
	for (let i = 0; i < array.length; i++) {
		sortedElement.push(array[i][1]);
	}

	sortedElement.sort(function (a, b) {
		var keyA = a.id,
			keyB = b.id;
		// Compare the 2 key
		if (keyA < keyB) return -1;
		if (keyA > keyB) return 1;
		return 0;
	});

	console.log(sortedElement);
	return sortedElement;
};

let byCost = (array) => {
	console.log("sorting by cost");
	// order entries by cost then combain into array to return
	let sorting = { 1: [], 2: [], 3: [], 4: [], 5: [] };
	let sortedElement = [];

	// sort champ by cost
	for (let i = 0; i < array.length; i++) {
		// get cost of champion
		let cost = array[i][1].className.split("-")[1];
		sorting[cost].push(array[i]);
	}

	// turn object into array in order of cost
	for (const [key, entries] of Object.entries(sorting)) {
		entries.forEach((elem) => {
			sortedElement.push(elem[1]);
		});
	}

	return sortedElement;
};

let sorting = (e) => {
	let champions = Object.entries(getChampElems.childNodes);
	// check for bad data
	if (champions[0][1].id == undefined) {
		console.log(champions.splice(0, 1));
	}

	// remove all child node to remake in selected sort method
	getChampElems.innerHTML = "";

	// sorting method
	try {
		if (typeof e === "string") {
			e === "name"
				? (champions = byName(champions))
				: (champions = byCost(champions));
		} else if ("target" in e) {
			e.target.value === "name"
				? (champions = byName(champions))
				: (champions = byCost(champions));
		}
		champions.forEach((champ) => {
			getChampElems.appendChild(champ);
		});
	} catch (e) {
		console.log(e);
	}
};

searchBar.addEventListener("input", (e) => {
	let champions = Object.entries(getChampElems.childNodes);
	let input = e.target.value.toUpperCase();
	// check for bad data
	if (champions[0][1].id == undefined) {
		console.log(champions.splice(0, 1));
	}

	for (let i = 0; i < champions.length; i++) {
        let id = champions[i][1].id;
		let target = document.getElementById(id);

		if (id.toUpperCase().indexOf(input) > -1) {
		    target.style.display = "";
		} else {
			target.style.display = "none";
		}
	}
});

sorting(sortBy.value);
sortBy.addEventListener("change", sorting);