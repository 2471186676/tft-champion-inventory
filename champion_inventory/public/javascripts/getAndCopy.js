let parent = document.getElementsByClassName("relation");
let copyFrom = document.getElementsByClassName("champ_container")[0];


// copy by id from champion block
for(let i = 0; i < parent.length; i++){
    for(let x = 0; x < parent[i].childNodes.length; x++){
        let get = searchForChild(copyFrom.childNodes, parent[i].childNodes[x].id);

        parent[i].childNodes[x].innerHTML = get[0];
        parent[i].childNodes[x].className = get[1];
        parent[i].childNodes[x].href = get[2];
    }
    sortByCost(parent[i]);
}



function searchForChild(nodeList, id){
    for(let i = 0; i < nodeList.length; i++){
        if(nodeList[i].id == id){
            return [nodeList[i].innerHTML, nodeList[i].className, nodeList[i].href];
        }
    }
}

function sortByCost (parent) {
    let childs = parent.childNodes;
    let byCost = {};

    // sort by cost
    for(let i = 0; i < childs.length; i++){
        let cost = childs[i].className.split("-")[1];
        if(byCost[cost] == undefined){
            byCost[cost] = []
        }
        byCost[cost].push(childs[i]);
    }

    parent.innerHTML = "";
    for (const [key, entries] of Object.entries(byCost)) {
		entries.forEach((elem) => {
			parent.appendChild(elem);
		});
	}
}