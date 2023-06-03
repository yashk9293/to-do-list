const title = document.getElementById("title");
const description = document.getElementById("description");
const form = document.querySelector("form");
const container = document.querySelector(".container");
let time = document.getElementById("current-time");

setInterval(() => {
  let d = new Date();
  time.innerHTML = d.toLocaleTimeString();
}, 1000);

// when reloading the page if local storage contains the tasks then it will be displayed else it will be empty 
// and when user will input the task, it will display.
const tasks = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : [];
showAllTasks();


function showAllTasks() {
  tasks.forEach((value, index) => {
    const div = document.createElement("div");
    div.setAttribute("class", "task");

    const innerDiv = document.createElement("div");
    div.append(innerDiv);

    const p = document.createElement("p");
    p.innerText = value.title;
    innerDiv.append(p);


    const span = document.createElement("span");
    span.innerText = value.description;
    innerDiv.append(span);

    

    const btn = document.createElement("button");
    btn.setAttribute("class", "deleteBtn");

    btn.innerText = "-";

    // Deleting the tasks
    btn.addEventListener("click", () => {
      removeTasks();
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      showAllTasks();
    });

    div.append(btn);

    container.append(div);
  });
}

// removing the tasks created in for each loop again n again.
function removeTasks() {
  tasks.forEach(() => {
    const div = document.querySelector(".task");
    div.remove();
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  removeTasks();

  tasks.push({
    title: title.value,
    description: description.value,
  });

  // saving the data in local storage immediately when tasks is pushed
  localStorage.setItem("tasks", JSON.stringify(tasks));
  showAllTasks();
});