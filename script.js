function createCard(data) {
  const div = document.createElement("div");
  div.className = "card";

  const img = document.createElement("img");
  img.src = data.image;
  img.style.width = "100%";
  img.style.height = "100%";
  img.style.objectFit = "fill";
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
  const cards = container.querySelectorAll(".card");

  const leftIndex = (currentIndex - 1 + length) % length;
  const centerIndex = currentIndex;
  const rightIndex = (currentIndex + 1) % length;

  const positions = [leftIndex, centerIndex, rightIndex];

  if (cards.length === 0) {
    for (let i = 0; i < 3; i++) {
      const card = createCard(data[positions[i]]);
      card.classList.add(i === 1 ? "center" : "side");
      container.appendChild(card);
    }
  } else {
    cards.forEach((card, i) => {
      const itemData = data[positions[i]];
      const img = card.querySelector("img");
      const title = card.querySelector("h3");
      const desc = card.querySelector("p");

      img.src = itemData.image;
      title.textContent = itemData.name;
      if (itemData.role) {
        desc.textContent = itemData.role;
      } else {
        desc.textContent = itemData.desc || "";
      }

      card.className = "card";
      if (i === 1) card.classList.add("center");
      else card.classList.add("side");

      if (i === 0) {
        card.style.transform = "translateX(-90%) scale(0.8)";
        card.style.opacity = "0.6";
        card.style.zIndex = "1";
      } else if (i === 1) {
        card.style.transform = "translateX(0) scale(1)";
        card.style.opacity = "1";
        card.style.zIndex = "3";
      } else if (i === 2) {
        card.style.transform = "translateX(90%) scale(0.8)";
        card.style.opacity = "0.6";
        card.style.zIndex = "1";
      }
    });
  }
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
