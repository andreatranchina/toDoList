//*********Variabless ******************/
//buttons
var priorityButton = document.querySelector("#add-priority-task");
var notPriorityButton = document.querySelector("#add-not-priority-task");
var checkButtons = document.querySelectorAll(".fa-check");//returns array of all check buttons
var trashButtons = document.querySelectorAll(".fa-trash");//returns array of all trash buttons
var colorThemeButton = document.querySelector(".color-theme-button");

//task and date inputs
var newTaskInput = document.querySelector("#task-input");
var newDueDateInput = document.querySelector("#due-date-input");
var submissionContainer = document.querySelector(".new-submission-container");

//list components
var list = document.querySelector(".list");
var listItem = document.querySelector(".list-item");
var tasks = document.querySelectorAll(".task");

//audio effects
var audioCheer = new Audio ("sounds/audience-cheering.wav");
var audioAww = new Audio ("sounds/aww.mp3");
//**************************/
var success;
var errorMessage;

//adding new list item function
function addNewListItem(button){
    if (!(newTaskInput.value === "" || newDueDateInput.value === "")){

        var newListItem = document.createElement("li");        
        newListItem.classList.add("list-item");

        var newTask = document.createElement("span");
        newTask.innerHTML = newTaskInput.value;
        newTask.classList.add("task");

        // newListItem.innerHTML = '<span class="task">' + newTaskInput.value + '</span>';
        
        var newDueDate = document.createElement("span");
        newDueDate.innerText = newDueDateInput.value;
        newDueDate.classList.add("due-date");       

        var checkIcon = document.createElement("i");
        checkIcon.classList.add("fa-solid", "fa-check");

        var trashIcon = document.createElement("i");
        trashIcon.classList.add("fa-solid", "fa-trash");

        if (button.id === "add-priority-task"){
            // newListItem.style.color = "red";
            newListItem.classList.add("priority-list-item");
        }

        list.appendChild(newListItem);
        newListItem.appendChild(newTask);
        newListItem.appendChild(newDueDate);
        newListItem.appendChild(checkIcon);
        newListItem.appendChild(trashIcon);
        //grandparent <ul> --> list
        //parent <li> --> new list item
        // children of <li>: <span> newTask, <span> newDueDate, <i> checkIcon, <i> trashIcon

        checkIcon.addEventListener("click", completeTask);
        trashIcon.addEventListener("click", deleteTask);
        newTask.addEventListener("click", addNewSubtask);

        newTaskInput.value = "";
        newDueDateInput.value = "";
        // success = true;
        submissionContainer.removeChild(errorMessage);
    }   
    else {
        success = false;
        if (!(submissionContainer.lastChild.innerText === "Please input BOTH a task and a due date")){
            errorMessage = document.createElement("p");
            errorMessage.innerText = "Please input BOTH a task and a due date";
            errorMessage.classList.add("error-message");
            submissionContainer.appendChild(errorMessage);
        }    
    }
    // if (success === true){
    //     errorMessage.style.visibility = "hidden";
    // } 
}//end addNewListItem() function

//function for: toggling line-through for completed/uncompleted task
function completeTask(){//this = check icon <i>
    var parentListItem = this.parentElement; //or this.parentNode, gives parent <li>
    var taskToStrike = parentListItem.firstElementChild; //gives task <span>
    var dateToStrike = parentListItem.children[1]; // gives date <span>

    taskToStrike.classList.toggle("completed");
    dateToStrike.classList.toggle("completed");
    
    
    //complete and uncomplete subtasks as well
    var mySubLists = parentListItem.querySelectorAll("ul"); //gives child sublists <ul> array

    mySubLists.forEach(subList => {
        var mySubtasks = subList.querySelectorAll("li"); //gives back the subtasks

        if (taskToStrike.classList.contains("completed")){        
            mySubtasks.forEach(task => task.classList.add("completed"));
        }
        else {
            mySubtasks.forEach(task => task.classList.remove("completed"));
        }   
    })         

    //THE FOLLOWING IS THE SAME AS TOGGLING CLASS - USING IF AND ELSE STATEMENETS
    // if (itemToStrike.style.textDecorationLine === "line-through"){
    //     itemToStrike.style.textDecorationLine = "none"
    //     otherItemToStrike.style.textDecorationLine = "none";
    // }
    // else {
    // itemToStrike.style.textDecorationLine = "line-through";   
    // otherItemToStrike.style.textDecorationLine = "line-through";
    // }
    if (taskToStrike.classList.contains("completed")){
        audioCheer.play();
    } 
    else{
        audioAww.play();
    }
}

//function to delete task (also works for deleting subtask)
function deleteTask(){// this = trash icon <i>
    var list = this.parentElement.parentElement; //gives <ul> grandparent
    var listItem = this.parentElement; //gives <li> parent
    list.removeChild(listItem); 
}

function addNewSubtask(){ //this = task <span>
    var newSubList = document.createElement("ul");
    var tempInput = document.createElement("input");
    
    tempInput.setAttribute("type", "text");
    tempInput.classList.add("temp-input");
    
    var tempButton = document.createElement("button");
    tempButton.innerText = "+";
    tempButton.classList.add("temp-button");

    var trash = document.createElement("i");
    trash.classList.add("fa-solid", "fa-trash");

    var check = document.createElement("i");
    check.classList.add("fa-solid", "fa-check");

    newSubList.appendChild(tempInput);
    newSubList.appendChild(tempButton);
    newSubList.appendChild(check);
    check.style.visibility = "hidden";
    newSubList.appendChild(trash);

    trash.addEventListener("click", deleteTask);

    //submit new subtask
    tempButton.addEventListener("click", function(){
        var subTask = document.createElement("li");
        subTask.innerText = "- " + tempInput.value;
        subTask.classList.add("sub-task");

        newSubList.removeChild(tempInput);
        newSubList.removeChild(tempButton);
        newSubList.appendChild(subTask);

        if (tempInput.value !== ""){
        check.style.visibility = "visible";
        }
        //enable check to add-remove completed task for line-through
        check.addEventListener("click", function(){
            subTask.classList.toggle("completed");

            if (subTask.classList.contains("completed")){
                audioCheer.play();
            }
            else {
                audioAww.play();
            }
        })  
    })
    var currentListItem = this.parentElement;
    newSubList.classList.add("sub-list");
    currentListItem.appendChild(newSubList);
    //at end will have grandparent <li> list item, parent <ul> sublist, children: all <i> checkIcon, all <i> trashIcon and all the <li> subTasks
}


priorityButton.addEventListener("click", function(){
    addNewListItem(priorityButton);
});

notPriorityButton.addEventListener("click", addNewListItem); 
//when passing a function to be called at the spot no parenthesis --> not addNewListItem()

for (var i = 0; i<checkButtons.length; i++){
    checkButtons[i].addEventListener("click", completeTask)
}

for (var i = 0; i<trashButtons.length; i++){
    trashButtons[i].addEventListener("click", deleteTask);
}

//event listener to add subtasks to tasks
for (var i = 0; i < tasks.length; i++){
    tasks[i].addEventListener("click", addNewSubtask);
} 

//eventlistener and function for changing color theme
colorThemeButton.addEventListener("click", function(){
    document.querySelector("body").classList.toggle("alt-theme");
})

