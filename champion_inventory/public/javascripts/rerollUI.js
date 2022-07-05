let selectable = document.getElementsByClassName("select")[0];
let selected = document.getElementsByClassName("selected")[0];

let resetButton = document.getElementsByClassName("reset_button")[0];
let searchBar = document.getElementsByClassName("bar")[0];
let costOption = document.getElementsByClassName("cost")[0];
let traitOption = document.getElementsByClassName("trait")[0];

function addEvent() {
	for (let i = 0; i < selectable.childElementCount; i++) {
		selectable.childNodes[i].addEventListener("click", selectableEventAdd);
	}

	resetButton.addEventListener("click", resetSearchOption);
	searchBar.addEventListener("input", searchEvent);
    costOption.addEventListener("change", searchEvent);
    traitOption.addEventListener("change", searchEvent);
}

function selectableEventAdd(e) {
	let parent = e.target;
	let element;
	while (parent.className.search("block")) {
		parent = parent.parentElement;
	}
	let id = parent.childNodes[3].dataset.id;

	// everything inside .selected will be to check what champion you want to hit
	// check if added to .selected or not
	if (!selected.getElementsByClassName(id)[0]) {
		//not added, add to .selected
		element = selectable.getElementsByClassName(id)[0];
		selected.appendChild(element.cloneNode(true));
		element.style.filter = "brightness(30%) grayscale(100%)";

		element = selected.getElementsByClassName(id)[0];
		element.addEventListener("click", selectableEventAdd);
	} else {
		//is added, remove from .selected instead
		element = selected.getElementsByClassName(id)[0];
		element.remove();

		element = selectable.getElementsByClassName(id)[0];
		element.style.filter = "";
	}
}

function resetSearchOption(e) {
	searchBar.value = "";
	costOption.value = "";
	traitOption.value = "";

    searchEvent();
}

function searchEvent(e) {
	let champions = selectable.childNodes;
	// sort by name
    if(searchBar.value){
        champions = byName(champions, searchBar.value);
    }
	// sort by trait
    if(traitOption.value){
        champions = byTrait(champions, traitOption.value);
    }
	// sort by cost
    if(costOption.value){
        champions = byCost(champions, costOption.value);
    }

    displaySorted(champions);
}

function byName(array, search) {
	let filter = search.toUpperCase();
	let sorted = [];
	let txtValue;

	for (let i = 0; i < array.length; i++) {
		txtValue = array[i].className.split("_")[1];
		// console.log(txtValue);

		if (txtValue.toUpperCase().indexOf(filter) > -1) {
			sorted.push(array[i]);
		} else {
		}
	}
    return sorted;
}

function byCost(array, cost){
    let sorted = [];

    for(let i = 0; i < array.length; i++){
        if(array[i].childNodes[3].dataset.cost == cost){
            sorted.push(array[i])
        }
    }

    return sorted;
}

function byTrait(array, trait){
    let sorted = [];

    for(let i = 0; i < array.length; i++){
        if(array[i].childNodes[3].dataset.trait.includes(trait)){
            sorted.push(array[i])
        }
    }

    return sorted;
}

function displaySorted(sorted){
    for(let i = 0; i < selectable.childElementCount; i++){
        selectable.childNodes[i].style.display = "none";
    }

    for(let i = 0; i < sorted.length; i++){
        sorted[i].style.display = "";
    }
}



addEvent();
