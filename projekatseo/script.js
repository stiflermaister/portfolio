const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("list");

let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

function save() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function render() {
  list.innerHTML = "";

  tasks.forEach((t, i) => {
    const li = document.createElement("li");
    if (t.done) li.classList.add("done");

    const text = document.createElement("span");
    text.textContent = t.text;

    text.addEventListener("click", () => {
      tasks[i].done = !tasks[i].done;
      save();
      render();
    });

    const del = document.createElement("button");
    del.className = "del";
    del.textContent = "✖";

    del.addEventListener("click", () => {
      tasks.splice(i, 1);
      save();
      render();
    });

    li.appendChild(text);
    li.appendChild(del);
    list.appendChild(li);
  });
}

function addTask() {
  const value = input.value.trim();
  if (!value) return;

  tasks.push({ text: value, done: false });
  input.value = "";
  save();
  render();
}

addBtn.addEventListener("click", addTask);

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTask();
});

render();
