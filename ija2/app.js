const form = document.getElementById("studentForm");
const nameInput = document.getElementById("nameInput");
const gradeInput = document.getElementById("gradeInput");
const list = document.getElementById("list");
const reportBox = document.getElementById("report");
const reportBtn = document.getElementById("reportBtn");
const themeBtn = document.getElementById("themeBtn");
let students = [];

function addStudent(name, grade) {
  const s = { id: Date.now(), name, grade: Number(grade) };
  students.push(s);
  return s;
}

function average(nums) {
  let sum = 0;
  for (let i = 0; i < nums.length; i++) sum += nums[i];
  return nums.length ? +(sum / nums.length).toFixed(2) : 0;
}

function render() {
  list.innerHTML = "";
  students.forEach(s => {
    const li = document.createElement("li");
    li.className = "item";
    const badge = document.createElement("span");
    const status = s.grade >= 51 ? "pass" : "fail";
    badge.className = "badge " + status;
    badge.textContent = s.grade;
    const title = document.createElement("span");
    title.textContent = s.name;
    title.style.cursor = "pointer";
    title.addEventListener("click", () => removeById(s.id));
    li.appendChild(title);
    li.appendChild(badge);
    list.appendChild(li);
  });
}

function removeById(id) {
  students = students.filter(x => x.id !== id);
  render();
}

function buildReport() {
  const grades = students.map(s => s.grade);
  const avg = average(grades);
  const best = grades.length ? Math.max(...grades) : 0;
  const worst = grades.length ? Math.min(...grades) : 0;
  let level;
  if (avg >= 90) level = "A";
  else if (avg >= 80) level = "B";
  else if (avg >= 70) level = "C";
  else if (avg >= 60) level = "D";
  else level = "E";
  return `Prosek: ${avg} | Najbolja: ${best} | Najslabija: ${worst} | Nivo: ${level}`;
}

form.addEventListener("submit", e => {
  e.preventDefault();
  const name = nameInput.value.trim();
  const grade = gradeInput.value.trim();
  if (!name || grade === "") return;
  addStudent(name, grade);
  form.reset();
  render();
});

reportBtn.addEventListener("click", () => {
  reportBox.textContent = buildReport();
});

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
