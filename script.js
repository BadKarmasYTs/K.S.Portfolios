function createCard(data) {
  const div = document.createElement("div");
  div.className = "card";

  const img = document.createElement("img");
  img.src = data.image;
  div.appendChild(img);

  const title = document.createElement("h3");
  title.textContent = data.name;
  div.appendChild(title);

  if (data.role) {
    const role = document.createElement("p");
    role.textContent = data.role;
    div.appendChild(role);
  }

  const desc = document.createElement("p");
  desc.textContent = data.desc || "";
  div.appendChild(desc);

  return div;
}

function loadCarousel(containerClass, data) {
  const container = document.querySelector(containerClass);
  data.forEach(item => container.appendChild(createCard(item)));
}

window.addEventListener("DOMContentLoaded", () => {
  loadCarousel(".games-carousel", window.games);
  loadCarousel(".groups-carousel", window.groups);
  loadCarousel(".people-carousel", window.people);
});
