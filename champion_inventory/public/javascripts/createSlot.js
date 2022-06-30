

// slot.appendChild(craeteSlot(Champions["TFT7_Aatrox"]));
// slot.appendChild(craeteSlot(Champions["TFT7_Zoe"]));
// slot.appendChild(craeteSlot(Champions["TFT7_Idas"]));
// slot.appendChild(craeteSlot(Champions["TFT7_AoShin"]));
// slot.appendChild(craeteSlot(Champions["TFT7_Yone"]));



function createSlotBlock(data){
    let block = createDiv({"class": "block_champion"});

    let border = createDiv({"class": "border"});
    block.appendChild(border);

    let gem = createDiv({"class": "gem"});
    data.cost !== 1 ? gem.appendChild(createImg({"src":data.gemURL})) : {};

    block.appendChild(gem);

    let outline = createDiv({"class": "outline"});

    let portrait = createDiv({"class": "portrait"});
    portrait.style.backgroundImage = "url(../images/SET7/protrait/"+data._id+".png)";
    if("trait" in data){
        for(let i = 0; i < data.trait.length; i++){
            let trait = createDiv({"class": "trait"});
            
            let traitIMG = createDiv({"class": "traitIMG"});
            let bg = createImg({"class": "bg", "src":"../images/UI_asset/traitBG.png"});
            let icon = createImg({
                "class": "icon", 
                "src":"../images/SET7/traits/"+data.trait[i].split("_")[1]+".svg"
            });
            traitIMG.appendChild(bg);
            traitIMG.appendChild(icon);

            let p = document.createElement("p");
            p.innerText = data.trait[i].split("_")[1];

            trait.appendChild(traitIMG);
            trait.appendChild(p);

            portrait.appendChild(trait)
        }
    }

    outline.appendChild(portrait);

    let description = createDiv({"class": "description"});
    
    let name = createDiv({"class": "name"});
    let p1 = document.createElement("p");
    p1.innerText = data.name;
    name.appendChild(p1)
    description.appendChild(name);

    let cost = createDiv({"class": "cost"});
    let goldIcon = createImg({"src": "../images/UI_asset/goldIcon.png"});
    cost.appendChild(goldIcon);
    
    let p2 = document.createElement("p");
    p2.innerText = data.cost;
    cost.appendChild(p2);

    description.appendChild(cost);
    
    outline.appendChild(description);


    block.appendChild(outline);

    return block;
}

function createDiv(data){
    let div = document.createElement("div");
    if("class" in data) div.className = data["class"];
    if("innerText" in data) div.innerText = data["innerText"];

    return div;
}

function createImg(data){
        let img = document.createElement("img");
        if("class" in data) img.className = data["class"];
        if("src" in data) img.src = data["src"];

        return img;
}

export {createSlotBlock}