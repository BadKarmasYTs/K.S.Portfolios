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
  } else {
    const desc = document.createElement("p");
    desc.textContent = data.desc || "";
    div.appendChild(desc);
  }

  return div;
}

function renderCarousel(container, data, currentIndex) {
  const length = data.length;
  container.innerHTML = "";

  // Calculate indices with wrap-around
  const leftIndex = (currentIndex - 1 + length) % length;
  const rightIndex = (currentIndex + 1) % length;

  const leftCard = createCard(data[leftIndex]);
  const centerCard = createCard(data[currentIndex]);
  const rightCard = createCard(data[rightIndex]);

  // Add classes
  leftCard.classList.add("side", "left");
  centerCard.classList.add("center");
  rightCard.classList.add("side", "right");

  // Apply inline styles for positioning and scale (will animate)
leftCard.style.transform = "translateX(-10%) scale(0.7)";
  leftCard.style.opacity = "0.6";
  leftCard.style.zIndex = "1";

  centerCard.style.transform = "translateX(0) scale(1)";
  centerCard.style.opacity = "1";
  centerCard.style.zIndex = "3";

rightCard.style.transform = "translateX(10%) scale(0.7)";
  rightCard.style.opacity = "0.6";
  rightCard.style.zIndex = "1";

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
