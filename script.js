const addBtn = document.getElementById("add-btn");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Load saved tasks
window.addEventListener("DOMContentLoaded", loadTasks);

function loadTasks() {
  tasks.forEach((task) => {
    createTaskElement(task.text, task.completed);
  });
}

// Add new task
addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", function(e) {
  if (e.key === "Enter") addTask();
});

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;
  
  const newTask = { text: taskText, completed: false };
  tasks.push(newTask);
  saveTasks();
  
  createTaskElement(taskText, false);
  taskInput.value = "";
}

// Create task list item
function createTaskElement(text, completed) {
  const li = document.createElement("li");
  li.textContent = text;
  if (completed) li.classList.add("completed");
  
  const delBtn = document.createElement("button");
  delBtn.textContent = "Delete";
  delBtn.onclick = () => {
    li.remove();
    tasks = tasks.filter((t) => t.text !== text);
    saveTasks();
  };
  
  li.onclick = () => {
    li.classList.toggle("completed");
    tasks = tasks.map((t) =>
      t.text === text ? { ...t, completed: !t.completed } : t
    );
    saveTasks();
  };
  
  li.appendChild(delBtn);
  taskList.appendChild(li);
}

// Save tasks to local storage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}