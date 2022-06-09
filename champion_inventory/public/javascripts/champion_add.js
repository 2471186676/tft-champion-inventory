let template = document.getElementsByClassName("block");
let form = document.getElementsByClassName("form")[0];
let addNewTrait = document.getElementsByClassName("addTrait")[0];
let traits = document.getElementsByClassName("traits")[0];

// console.log(template);

for (let i = 0; i < template.length; i++) {
	template[i].addEventListener("click", (e) => {
		e.preventDefault();
		let target;

		e.target.tagName != "A"
			? (target = e.target.parentElement)
			: (target = e.target);
		let data = target.childNodes[3].dataset;
		// console.log(data)

		let id = form.getElementsByClassName("id")[0];
		let name = form.getElementsByClassName("name")[0];
		let cost = form.getElementsByClassName("cost")[0];

		id.value = data.id;
		name.value = data.name;
		cost.value = data.cost;
	});
}

addNewTrait.addEventListener("click", (e) => {
	let copy = document.createElement("div");
	copy.className = "trait";
	copy.innerHTML = traits.childNodes[traits.childNodes.length - 1].innerHTML;
	traits.appendChild(copy);
	removeTraitElem();
});

function removeTraitElem() {
	let removeButton = document.getElementsByClassName("remove");
    let parent = document.getElementsByClassName("traits")[0];

	for (let i = 0; i < removeButton.length; i++) {
		removeButton[i].addEventListener("click", (e) => {
			if (parent.childElementCount != 1) {
				e.target.parentNode.remove();
			}
		});
	}
}
removeTraitElem();
