let blocks = document.getElementsByClassName("block");
let addChampion = document.getElementsByClassName("addChampion")[0];
let traits = document.getElementsByClassName("traits")[0];
let trait = document.getElementsByClassName("traits")[0];

for (let i = 0; i < blocks.length; i++) {
	blocks[i].addEventListener("click", (e) => {
		e.preventDefault();
		let target;

		e.target.tagName != "A"
			? (target = e.target.parentElement)
			: (target = e.target);
		let data = target.childNodes[3].dataset;

        addSelectedChampion(data.id)
	});
}

let options = document.getElementsByClassName("trait")[0].cloneNode(true);
addChampion.addEventListener("click", (e) => {
	traits.appendChild(options.cloneNode(true));
	removeTraitElem();
});

function addSelectedChampion(id){
    let wrapper = document.createElement("div");
    wrapper.className = "trait";

    let select = document.createElement("select");
    select.disabled = true;
    let option = document.createElement("option");
    option.value="id"
    option.innerText = id.split("_")[1];

    select.appendChild(option);
    let removeButton = options.getElementsByClassName("remove")[0].cloneNode(true);
    wrapper.appendChild(removeButton);

    wrapper.appendChild(select);
    trait.appendChild(wrapper);
    removeTraitElem();
}

function removeTraitElem() {
	let removeButton = document.getElementsByClassName("remove");

	for (let i = 0; i < removeButton.length; i++) {
		removeButton[i].addEventListener("click", (e) => {
			e.target.parentNode.remove();
		});
	}
}
removeTraitElem();
