// This connects the HTML elements to the JS file
const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list'); //const creates a variable which bindings cannot be reassigned.

// Function to handle adding a task
function addTask() {

    const taskText = taskInput.value.trim();

    // Prevent adding empty tasks
    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    //max of 3 active tasks
    if (taskList.children.length >= 3) {
        alert("You can only have 3 active tasks. Complete them to do more!")
        return;
    }
    // Create a new list item
    const li = document.createElement('li');
    
    //create the task text
    const taskTextSpan = document.createElement('span');
    taskTextSpan.textContent = taskText;

    //creating container for buttons
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('task-buttons');

    //create complete button
    const completeBtn = document.createElement("button");
    completeBtn.textContent = "Complete";
    completeBtn.classList.add('complete-btn');

    //create delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');

    //complete task
    completeBtn.addEventListener('click', function() {

        //prevent button being used twice to get coin
        if (completeBtn.disabled){
            return;
        }
        //mark task as completed
        taskTextSpan.style.textDecoration = 'line-through';
        taskTextSpan.style.opacity = '0.5';

        //disable complete button
        completeBtn.disabled = true;
        completeBtn.textContent = 'Completed';

        //give 2 coins
        addCoins(2);
    });

    //delete button
    deleteBtn.addEventListener('click', function() {
        li.remove();
    });

    //put buttons in button container
    buttonContainer.appendChild(completeBtn);
    buttonContainer.appendChild(deleteBtn);

    //everything else inside list item
    li.appendChild(taskTextSpan);
    li.appendChild(buttonContainer);

    //add the new task to the list
    taskList.appendChild(li);

    //clear input
    taskInput.value = "";

}; //don't forget to close the function

//add task when button is clicked
    addBtn.addEventListener('click', addTask);

    //add task when 'enter' is pressed
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        };
    });