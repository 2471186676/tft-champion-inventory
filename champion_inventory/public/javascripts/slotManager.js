let importCreate = import("./createSlot.js");

let slot = document.getElementsByClassName("buyChampion")[0];
let buyXP = document.getElementsByClassName("XP")[0];
let reRoll = document.getElementsByClassName("refresh")[0];
let rollDisplay = document.getElementsByClassName("chance");
let levelSlider = document.getElementsByClassName("slider")[0];
let levelDisplay = document.getElementsByClassName("levelDisplay")[0];

let rollChance = {
	1: [100, 0, 0, 0, 0],
	2: [100, 0, 0, 0, 0],
	3: [75, 25, 0, 0, 0],
	4: [55, 30, 15, 0, 0],
	5: [45, 33, 20, 2, 0],
	6: [25, 40, 30, 5, 0],
	7: [19, 30, 35, 15, 1],
	8: [16, 20, 35, 25, 4],
	9: [9, 15, 30, 30, 16],
	10: [5, 10, 20, 40, 25],
	11: [1, 2, 12, 50, 35],
};

let attribute = document.currentScript.getAttribute("champions");
attribute = JSON.parse(attribute);
let Champions = {};

attribute.forEach((e) => {
	Champions[e._id] = {
		_id: e._id,
		cost: e.cost,
		name: e.name,
		trait: e.trait,
		portraitURL: "../images/SET7/protrait/" + e._id + ".png",
		gemURL:
			e.cost < 6
				? "../images/cost gem/" + e.cost + "cost.png"
				: "../images/cost gem/" + e.cost / 2 + "cost.png",
	};
});
let champList = Object.keys(Champions);
let champPool = { 1: [], 2: [], 3: [], 4: [], 5: [] };

function fillPool() {
	// pool 1:29 2:22 3:18 4:12 5:10
	for (let i = 0; i < champList.length; i++) {
		let get = Champions[champList[i]];
		switch (get.cost) {
			case 1:
				addToPool(get._id, 1, 29);
				break;
			case 2:
				addToPool(get._id, 2, 22);
				break;
			case 3:
				addToPool(get._id, 3, 18);
				break;
			case 4 || 8:
				addToPool(get._id, 4, 12);
				break;
			case 5 || 10:
				addToPool(get._id, 5, 10);
				break;
		}
	}
	function addToPool(id, cost, amount) {
		for (let x = 0; x < amount; x++) {
			champPool[cost].push(id);
		}
	}
}

function getPool(cost) {
	let pool = champPool[cost];
	let random = Math.floor(Math.random() * pool.length);
	return pool[random];
}

function removePool(id) {
	Object.keys(champPool).forEach((key) => {
		for (let i = 0; i < champPool[key].length; i++) {
			console.log(champPool[key][i]);
			if (champPool[key][i] == id) {
				let copy = champPool[key][i];
				champPool[key].splice(i, 1);
				return copy;
			}
		}
	});
	return null;
}

fillPool();

async function createBlock(id) {
	const creater = (await importCreate).createSlotBlock;
	slot.appendChild(creater(Champions[id]));
}

function getRandom(chances) {
	let dice = Math.floor(Math.random() * 100);
	let num = 0;
	for (let i = 0; i < chances.length; i++) {
		num += chances[i];
		if (dice <= num) {
			let random = Math.floor(Math.random() * champPool[i + 1].length);
			return champPool[i + 1][random];
		}
	}
	return null;
}

function clearBlock() {
	slot.innerHTML = "";
}

reRoll.addEventListener("click", rerollEvent);
document.onkeyup = (e) => {
	if (e.key.toLowerCase() == "d") {
		rerollEvent();
	}
};

async function rerollEvent(e) {
	clearBlock();

	let childs = [
		createBlock(await getRandom(rollChance[levelSlider.value])),
		createBlock(await getRandom(rollChance[levelSlider.value])),
		createBlock(await getRandom(rollChance[levelSlider.value])),
		createBlock(await getRandom(rollChance[levelSlider.value])),
		createBlock(await getRandom(rollChance[levelSlider.value])),
	];

    Promise.all(childs).then(()=>{
        addEventToBlock();
    })
}

levelSlider.addEventListener("mousemove", sliderEvent);

function sliderEvent(e = undefined) {
	e == undefined ? (e = levelSlider.value) : (e = e.target.value);

	let chance = rollChance[e];
	levelDisplay.innerText = "Lvl. " + e;
	for (let i = 0; i < rollDisplay.length; i++) {
		rollDisplay[i].innerText = chance[i] + "%";
	}
}

function addEventToBlock() {
    let blocks = document.getElementsByClassName("block_champion");

    for(let i = 0; i<blocks.length;i++){
        blocks[i].addEventListener('click', blockEvent);
		blocks[i].addEventListener('mouseenter', blockMouseEnter);
		blocks[i].addEventListener('mouseleave', blockMouseLeave);
    }
}

function blockEvent(e) {
    let parent = e.target;
    while(parent.className.split(" ")[0] != "block_champion"){
        parent = parent.parentElement;
    }
    console.log(parent);
	parent.replaceChildren();
	parent.style.backgroundImage = "url('../images/UI_asset/emptyBlock.png')";
	parent.removeEventListener('mouseenter', blockMouseEnter);
	parent.removeEventListener('mouseleave', blockMouseLeave);

}

function blockMouseEnter(e){
	let parent = e.target;
    while(parent.className.split(" ")[0] != "block_champion"){
        parent = parent.parentElement;
    }
	parent.style.filter = "brightness(130%)"
}

function blockMouseLeave(e){
	let parent = e.target;
    while(parent.className.split(" ")[0] != "block_champion"){
        parent = parent.parentElement;
    }
	parent.style.filter = "brightness(100%)"
}

sliderEvent();
