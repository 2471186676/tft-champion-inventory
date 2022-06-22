let item = document.currentScript.getAttribute('item'); 
item = JSON.parse(item);
let table = document.getElementsByClassName("item")[0];
// console.log(item);

let row_id = [null, 1, 2, 3, 4, 5, 6, 7, 9, 8];
let column_id = [null, 1, 2, 3, 4, 5, 6, 7, 9, 8];

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

        rowElem.appendChild(elem);
    }
    table.appendChild(rowElem);
}

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

    block.addEventListener('mouseenter', blockEnter);
    block.addEventListener('mouseleave', blockLeave);

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

let timeout = null
function blockEnter(e){
    changeBrightness(20);
    
    let cord = e.target.className.split(" ")[1].split("-");
    relatedBrightness(cord[0], cord[1]);
    e.target.childNodes[0].style.filter = "brightness(100%)";

    timeout = setTimeout(() => {
        e.target.childNodes[1].style.display = "block"
    }, 500);
}

function blockLeave(e){
    e.target.childNodes[1].style.display = "none";
    clearTimeout(timeout)
}


function changeBrightness(p) {
    let row = table.childNodes;
    
    for(let x = 0; x < row.length; x++){
        let child = row[x].childNodes;

        for(let y = 0; y < child.length; y++){
            if(child[y].childNodes.length != 0){
                child[y].childNodes[0].style.filter = "brightness("+ p +"%)";
            }
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

table.addEventListener("mouseenter", (e) =>{
    console.log("enter")
    changeBrightness(20);
})

table.addEventListener("mouseleave", (e) =>{
    console.log("leave")
    changeBrightness(100);
})

