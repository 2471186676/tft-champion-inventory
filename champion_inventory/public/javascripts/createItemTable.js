let item = document.currentScript.getAttribute('item'); 
item = JSON.parse(item);
let normalTable = document.getElementsByClassName("normalItem")[0];
let armoryTable = document.getElementsByClassName("armoryItem")[0];
let radiantTable = document.getElementsByClassName("radiantItem")[0];
let shimmerscaleTable = document.getElementsByClassName("shimmerscaleItem")[0];
let timeout = null;
// console.log(item);

let row_id = [null, 1, 2, 3, 4, 5, 6, 7, 9, 8];
let column_id = [null, 1, 2, 3, 4, 5, 6, 7, 9, 8];

// create craftable item table
for(let row = 0; row < row_id.length; row++){
    let rowElem = createRow();
    for(let column = 0; column < column_id.length; column++){
        let elem;

        if(row_id[row] == null && column_id[column] == null){
            elem = createEmptyBlock();
        }

        else if(row_id[row] == null || column_id[column] == null){
            let id;
            row_id[row] == null ? id = column_id[column] : id = row_id[row];
            elem = createBlock(getItem(id), row, column);
        }

        else{
            let id = parseInt(row_id[row].toString() + column_id[column].toString());
            elem = createBlock(getItem(id), row, column);
        }

        elem.addEventListener('mouseenter', (e) => blockEnter(e, normalTable.childNodes, [row, column]));
        elem.addEventListener('mouseleave', (e) => blockLeave(e));
        rowElem.appendChild(elem);
    }
    normalTable.appendChild(rowElem);
}

// create special item table
// ornn armory
function getArmoryItem(){
    // _id start with 3, length of 3
    let armory = []
    for(let i = 0; i < item.length; i++){
        let id = item[i]._id.toString();
        let length = id.length,
            start = id.charAt(0);

        if(start == 3 && length == 3){ armory.push(item[i]) }
    }
    return armory;
}
let armoryItem = getArmoryItem();
for(let i = 0; i < armoryItem.length; i++){
    let block = createBlock(armoryItem[i], 0, i);

    block.addEventListener('mouseenter', (e) =>{
        blockEnter(e, armoryTable.childNodes, [])
    });
    block.addEventListener('mouseleave', (e) =>{
        e.target.childNodes[1].style.display = "none";
        clearTimeout(timeout);
    });
    armoryTable.appendChild(block);
}

// radiant relic
function getRadiantItem(){
    // start with 20, length of 4
    let radiant = []
    for(let i = 0; i < item.length; i++){
        let id = item[i]._id.toString();
        let length = id.length,
            start = id.charAt(0) + id.charAt(1);

        if(start == "20" && length == 4){ radiant.push(item[i]) }
    }
    return radiant;
}

let radiantItem = getRadiantItem();
for(let i = 0; i < radiantItem.length; i++){
    let block = createBlock(radiantItem[i], 0, i);

    block.addEventListener('mouseenter', (e) =>{
        blockEnter(e, radiantTable.childNodes, [])
    });
    block.addEventListener('mouseleave', (e) =>{
        e.target.childNodes[1].style.display = "none";
        clearTimeout(timeout);
    });
    radiantTable.appendChild(block);
}

// shimmerscale
function getShimmerscale(){
    // id start from 3002 to 3009, 3001 is dragon blessing
    let length,
        shimmerscale = [],
        id;
    for(let i = 0; i < item.length; i++){
        id = item[i]._id.toString();
        length = id.length;
        if(length == 4 && id.startsWith("300") && id.endsWith("1") == false){shimmerscale.push(item[i])}
    }
    return shimmerscale;
}

let shimmerscale = getShimmerscale();
for(let i = 0; i < shimmerscale.length; i++){
    let block = createBlock(shimmerscale[i], 0, i);

    block.addEventListener('mouseenter', (e) =>{
        blockEnter(e, shimmerscaleTable.childNodes, [])
    });
    block.addEventListener('mouseleave', (e) =>{
        e.target.childNodes[1].style.display = "none";
        clearTimeout(timeout);
    });
    shimmerscaleTable.appendChild(block);
}

// add eventlistener wrapper
normalTable.addEventListener("mouseleave", (e) =>{
    changeBrightness(normalTable.childNodes, 100);
})

armoryTable.addEventListener("mouseleave", (e) =>{
    changeBrightness(armoryTable.childNodes, 100);
})

radiantTable.addEventListener("mouseleave", (e) =>{
    changeBrightness(radiantTable.childNodes, 100);
})

shimmerscaleTable.addEventListener("mouseleave", (e) =>{
    changeBrightness(shimmerscaleTable.childNodes, 100);
})

// add eventlistener function
function blockEnter(e, node, cord){
    changeBrightness(node, 20);
    
    cord.length == 2 ? relatedBrightness(cord[0], cord[1]):{}
    e.target.childNodes[0].style.filter = "brightness(140%)";

    timeout = setTimeout(() => {
        e.target.childNodes[1].style.display = "block"
    }, 300);
}

function blockLeave(e){
    e.target.childNodes[1].style.display = "none";
    clearTimeout(timeout)
}


// change css
function changeBrightness(nodes, p) {

    if(nodes[0].className.includes("item_row")){
        for(let x = 0; x < nodes.length; x++){
            let child = nodes[x].childNodes;
            
            for(let y = 0; y < child.length; y++){
                if(child[y].childNodes.length != 0){
                    child[y].childNodes[0].style.filter = "brightness("+ p +"%)";
                }
            }
            
        }
    } else {    
        for(let i = 0; i < nodes.length; i++){
            nodes[i].childNodes[0].style.filter = "brightness("+ p +"%)"
        }
    }
}

function relatedBrightness(x,y){
   // get row
   let row = document.getElementsByClassName("item_row")[x].childNodes;
   row.forEach(e =>{
        if(e.childElementCount != 0){
            e.childNodes[0].style.filter = "brightness(75%)";
        }
   })

   //get column
   let column = [];
   let allRow = document.getElementsByClassName("item_row");
   for(let i = 0; i < allRow.length; i++){
        let img = allRow[i].childNodes[y].childNodes[0];
        img != undefined ? column.push(allRow[i].childNodes[y].childNodes[0]) : {};
   }
   
   column.forEach(e =>{
        e.style.filter = "brightness(75%)";
   })
}

// create element
function createBlock (item, x, y){
    let block = document.createElement("div");
    block.className = "item_block " + x + "-" + y;

    let info = document.createElement("div");
    info.className = "info";

    let itemName = document.createElement("h");
    itemName.className = "name";
    itemName.innerText = item.name;
    info.appendChild(itemName);

    let itemDesc = document.createElement("p");
    itemDesc.className = "description";
    itemDesc.innerText = item.description;
    info.appendChild(itemDesc);
    
    let image = document.createElement("img");
    image.src = "/images/SET7/items/" + item._id +".png";
    image.alt = item.name;
    
    block.appendChild(image);
    block.appendChild(info);

    return block
}

function createEmptyBlock(){
    let block = document.createElement("div");
    block.className = "item_block";
    return block;
}

function createRow(){
    let row = document.createElement("div");
    row.className = "item_row";

    return row;
}


function getItem(id){
    let obj = null;
    // check id but in reverse
    let idString = id.toString();
    reverse = idString.charAt(1) + idString.charAt(0)

    for(let i = 0; i < item.length; i++){
        if(item[i]._id == id || item[i]._id == reverse){
            // console.log(id, item[i]);
            obj = item[i];
            i = item.length + 2;
        }
    }
    
    return obj;
}