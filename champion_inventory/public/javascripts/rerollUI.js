let selectable = document.getElementsByClassName("select")[0];
let selected = document.getElementsByClassName("selected")[0];

let resetButton = document.getElementsByClassName("reset_button")[0];
let searchBar = document.getElementsByClassName("bar")[0];
let costOption = document.getElementsByClassName("cost")[0];
let traitOption = document.getElementsByClassName("trait")[0];


function addEvent(){
    for(let i = 0; i < selectable.childElementCount; i++){
        selectable.childNodes[i].addEventListener('click', selectableEventAdd);
    }

    resetButton.addEventListener('click', resetSearchOption)
}

function selectableEventAdd(e){
    let parent = e.target;
    let element;
    while(parent.className.search("block")){
        parent = parent.parentElement;
    }
    let id = parent.childNodes[3].dataset.id;

    // everything inside .selected will be to check what champion to hit
    // check if added to .selected or not
    if(!selected.getElementsByClassName(id)[0]){
        //not added, add to .selected 
        element = selectable.getElementsByClassName(id)[0];
        selected.appendChild(element.cloneNode(true));
        element.style.filter = "brightness(30%) grayscale(100%)";

        element = selected.getElementsByClassName(id)[0];
        element.addEventListener('click', selectableEventAdd);
    }else{
        //is added, remove from .selected
        element = selected.getElementsByClassName(id)[0];
        element.remove();
        
        element = selectable.getElementsByClassName(id)[0];
        element.style.filter = "";
    }

}

function resetSearchOption(e){
    searchBar.value = "";
    costOption.value = "";
    traitOption.value = "";

}

function searchEvent(e){
    
}


addEvent();
