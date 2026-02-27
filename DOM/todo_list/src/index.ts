interface TODO{
    id:string;
    task:string;
}

// ! to store the data
let todos:TODO[] = [];


// ! Targetting the elements
let form = document.getElementById("form") as HTMLFormElement; //Type Assertion-> Telling typescript that we know more than about you
let input = document.getElementById("inputValues") as HTMLInputElement;
let listItems = document.getElementById("items") as HTMLUListElement;


// ! Adding task
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    let value = input.value;//getting the values which user has entered
    let newTask:TODO={
        id:Date.now().toString(),
        task:value,
    };//creating new task with the values that provided by the users
    todos.push(newTask);//pushing new Task into todo array
    
    input.value = "";
    render();
});

function render(){
    listItems.innerHTML ="";
    for(let i=0;i<todos.length;i++){
       let display = todos[i];
       let li = document.createElement("li");
       li.textContent = display.task;
       li.style.marginTop = "10px";

       let delBtn = document.createElement("button");
       delBtn.textContent = "DELETE";
       delBtn.style.marginLeft = "20px";
       delBtn.style.marginTop = "10px";


       let editBtn = document.createElement("button");
       editBtn.textContent = "EDIT";
       editBtn.style.marginLeft = "20px";
       editBtn.style.marginTop = "10px";

       delBtn.addEventListener("click",()=>{
        deleteTask(display.id);
       });

       editBtn.addEventListener("click",()=>{
        editTask(display.id);
       })

       li.appendChild(delBtn);
       li.appendChild(editBtn);
       listItems.appendChild(li);
    }
    
}

function deleteTask(id: string) { 
    todos = todos.filter((todo) => todo.id != id); 
    render(); 
}

function editTask(id:string){
    let todoEdit = todos.find((todo)=>todo.id==id);

    if(todoEdit){
        let updatedValue = prompt("Edit your task : ",todoEdit.task);
        if (updatedValue !== null && updatedValue.trim() !== "") {
            todoEdit.task = updatedValue;
            render();
        }
    }
}