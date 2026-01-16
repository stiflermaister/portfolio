
const links = document.querySelectorAll(".nav-link");
const sections = ["home", "ponuda", "onama"].map(id => document.getElementById(id));

function setActive() {
  const y = window.scrollY + 120;
  let current = "home";

  for (const sec of sections) {
    if (sec && sec.offsetTop <= y) current = sec.id;
  }

  links.forEach(a => {
    const target = a.getAttribute("href")?.replace("#", "");
    a.classList.toggle("active", target === current);
  });
}

window.addEventListener("scroll", setActive);
setActive();

document.getElementById("year").textContent = new Date().getFullYear();
