let Champions = document.currentScript.getAttribute("champions");
let slot = document.getElementsByClassName("buyChampion")[0];




function craeteSlot(data){
    let block = createDiv({"class": "block_champion"});

    let gem = createDiv({"class": gem});
    block.appendChild(gem);

    let outline = createDiv({"class": "outline"});
    let portrait = createDiv({"class": "portrait"});
    outline.appendChild(portrait);

    let description = createDiv({"class": "description"});
    let name = createDiv({"class": "name"});
    description.appendChild(name);

    let cost = createDiv({"class": "cost"});
    description.appendChild(cost);
    
    outline.appendChild(description);

    block.appendChild(outline);
}

function createDiv(data){
    let div = document.createElement("div");
    if("class" in data) div.className = data["class"]

    return div;
}