
const CHECK = document.querySelector("done")
const UNCHECK = document.querySelector("remove");
const LINE_THROUGH = "lineThrough"
const list= document.getElementById('list')
const input=document.getElementById("myinput");
let data = localStorage.getItem("TODO");
let LIST,id,

if(data){
    LIST = JSON.parse(data);
    id = LIST.length; // set the id to the last one in the list
    loadList(LIST); // load the list to the user interface
}else{
    // if data isn't empty
    LIST = [];
    id = 0;
}
function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });
}


function addtodo(task,id,done,trash){

    if(trash){ return; }
    
    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";
    
const text= `<li class="item">
<span class="done ${DONE} id="${id}">Complete!</span>
<span class="remove"id="${id}">Delete</span>
<p class="text ${LINE}">${task}</p>
</li>
`

const position="beforeend";

list.insertAdjacentHTML(position,text)}
document.addEventListener("keyup",function(event){
    if (event.keyCode==13){
        const toDo=input.value ;
        if(toDo){
            addtodo(toDo,id,false,false);
            LIST.push(
                { name:toDo,
                    id: id,
                    done:false,
                    trash:false,

                }

            );

            localStorage.setItem("TODO", JSON.stringify(LIST));
            id++
            input.value="";
            
        }
       
    }
});
function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH)
    LIST[element.id].done = LIST[element.id].done ? false : true;
}


function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    
    LIST[element.id].trash = true;
}
list.addEventListener("click", function(event){
    const element = event.target; // return the clicked element inside list
    const elementJob = element.attributes.job.value; // complete or delete
    
    if(elementJob == "complete"){
        completeToDo(element);
    }else if(elementJob == "delete"){
        removeToDo(element);
    }
    
    // add item to localstorage ( this code must be added where the LIST array is updated)
    localStorage.setItem("TODO", JSON.stringify(LIST));
});