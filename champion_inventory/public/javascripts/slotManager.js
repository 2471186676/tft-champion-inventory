let importCreate = import("./createSlot.js");

let slot = document.getElementsByClassName("buyChampion")[0];
let buyXP = document.getElementsByClassName("XP")[0];
let reRoll = document.getElementsByClassName("refresh")[0];

let attribute = document.currentScript.getAttribute("champions");
attribute = JSON.parse(attribute);
let Champions = {};

attribute.forEach(e => {
    Champions[e._id] = { 
        _id: e._id,
        cost: e.cost,
        name: e.name,
        trait: e.trait,
        portraitURL: "../images/SET7/protrait/"+e._id+".png",
        gemURL: e.cost < 6 ? 
            "../images/cost gem/"+e.cost+"cost.png":
            "../images/cost gem/"+(e.cost/2)+"cost.png",
    }
});
let champList = Object.keys(Champions)


async function createBlock(id) {
    const creater = (await importCreate).createSlotBlock;
    slot.appendChild(creater(Champions[id]))
}

function getRandom(){
    let num = Math.floor(Math.random() * champList.length);
    return champList[num]
}

function clearBlock() {
    slot.innerHTML = "";
}

reRoll.addEventListener('click', async (e)=>{
    clearBlock();
    createBlock(getRandom());
    createBlock(getRandom());
    createBlock(getRandom());
    createBlock(getRandom());
    createBlock(getRandom());
})

