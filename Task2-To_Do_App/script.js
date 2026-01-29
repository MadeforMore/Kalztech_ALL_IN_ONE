const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// Load tasks when page opens
window.addEventListener("load", loadTasks);

// Add task on button click
addBtn.addEventListener("click", addTask);

function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task");
    return;
  }

  addTaskToUI(taskText);
  saveTaskToStorage(taskText);

  taskInput.value = "";
}

// Add task to DOM
function addTaskToUI(taskText) {
  const li = document.createElement("li");
  li.textContent = taskText;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "X";

  deleteBtn.addEventListener("click", function () {
    li.remove();
    removeTaskFromStorage(taskText);
  });

  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

// Save task permanently
function saveTaskToStorage(taskText) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(taskText);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from permanent storage
function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => addTaskToUI(task));
}

// Remove task from permanent storage
function removeTaskFromStorage(taskText) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter(task => task !== taskText);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
