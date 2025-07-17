function createCard(data, type = "center") {
  const div = document.createElement("div");
  div.className = "card " + type;

  if (type === "center") {
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
  } else {
    const title = document.createElement("h3");
    title.textContent = data.name;
    div.appendChild(title);
  }

  return div;
}

function renderCarousel(container, data, currentIndex) {
  container.innerHTML = "";
  const length = data.length;

  // Calculate indices for left, center, right with looping
  const leftIndex = (currentIndex - 1 + length) % length;
  const rightIndex = (currentIndex + 1) % length;

  const leftCard = createCard(data[leftIndex], "side");
  const centerCard = createCard(data[currentIndex], "center");
  const rightCard = createCard(data[rightIndex], "side");

  container.appendChild(leftCard);
  container.appendChild(centerCard);
  container.appendChild(rightCard);
}

function setupCarouselNavigation(section, data) {
  const carousel = section.querySelector(".carousel");
  const prevBtn = section.querySelector(".carousel-nav.prev");
  const nextBtn = section.querySelector(".carousel-nav.next");

  if (data.length === 0) return;

  let currentIndex = 0;
  renderCarousel(carousel, data, currentIndex);

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + data.length) % data.length;
    renderCarousel(carousel, data, currentIndex);
  });

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % data.length;
    renderCarousel(carousel, data, currentIndex);
  });
}

window.addEventListener("DOMContentLoaded", () => {
  const gamesSection = document.querySelector("#projects.carousel-section");
  const groupsSection = document.querySelector("#groups.carousel-section");
  const peopleSection = document.querySelector("#people.carousel-section");

  setupCarouselNavigation(gamesSection, window.games);
  setupCarouselNavigation(groupsSection, window.groups);
  setupCarouselNavigation(peopleSection, window.people);
});
