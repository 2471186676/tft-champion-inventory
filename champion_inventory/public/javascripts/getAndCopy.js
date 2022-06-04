let parent = document.getElementsByClassName("relation");
let copyFrom = document.getElementsByClassName("champ_container")[0];

for(let i = 0; i < parent.length; i++){
    for(let x = 0; x < parent[i].childNodes.length; x++){
        let get = searchForChild(copyFrom.childNodes, parent[i].childNodes[x].id);

        parent[i].childNodes[x].innerHTML = get[0];
        parent[i].childNodes[x].className = get[1];
        parent[i].childNodes[x].href = get[2];
    }
}

function searchForChild(nodeList, id){
    for(let i = 0; i < nodeList.length; i++){
        if(nodeList[i].id == id){
            return [nodeList[i].innerHTML, nodeList[i].className, nodeList[i].href];
        }
    }
}