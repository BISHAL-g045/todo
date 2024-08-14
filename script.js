// Initialize the todo array from localStorage or as an empty array
let todo = JSON.parse(localStorage.getItem("todo")) || [];

// Get references to the DOM elements
let inputField = document.getElementById("todoInput");
let todoList = document.querySelector(".todolist");
let addBtn = document.querySelector(".btn"); 
let deleteAllBtn = document.querySelector(".deletebtn");
let count = document.getElementById("todoCounter");

document.addEventListener("DOMContentLoaded" , function(){
    addBtn.addEventListener("click", addTask);

    inputField.addEventListener("keydown", function(event){
        if(event.key === "Enter"){
            event.preventDefault();
            addTask();
        }
    });

    deleteAllBtn.addEventListener("click", ()=>{
        todo = [];
        localStorage.setItem("todo", JSON.stringify(todo));
        showItems(); // Update the displayed tasks
        updateCounter();
    })
    
});

function addTask(){
    let task = inputField.value.trim();
    if (todo.includes(task)) {
        alert("This task already exists.");
        return;
    }
    if(task){
        todo.push(task);
        localStorage.setItem("todo", JSON.stringify(todo));
        inputField.value = "";
        showItems();
    }
    else{
        alert("Input field is empty");
    }
    
}

function showItems(){
    todoList.innerHTML = ""; // Clear the list before displaying
    todo.forEach((item, index) => {
        const li = document.createElement("li");
        li.classList.add("todo-item"); // Add a class for styling
        li.innerHTML = `
            <div class="todo-container">
                <input type="checkbox" class="todo-checkbox" id="input-${index}">
                <p id="todo-${index}" class="task-text">${item}</p>
            </div>
        `;
            todoList.appendChild(li);
            updateCounter();   
        });
    }
    

function updateCounter() {
    count.textContent = todo.length;
}