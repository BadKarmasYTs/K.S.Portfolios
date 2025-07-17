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
  container.innerHTML = ""; // clear any existing cards
  data.forEach(item => {
    const card = createCard(item);
    container.appendChild(card);
  });
}

function setup3DCarousel(section) {
  const carousel = section.querySelector(".carousel");
  const cards = Array.from(carousel.children);
  const prevBtn = section.querySelector(".carousel-nav.prev");
  const nextBtn = section.querySelector(".carousel-nav.next");

  if (cards.length < 3) {
    // fallback: show all cards visible
    cards.forEach(card => {
      card.classList.remove("hidden", "left", "right", "center");
      card.style.opacity = "1";
    });
    prevBtn.style.display = "none";
    nextBtn.style.display = "none";
    return;
  }

  let centerIndex = 0;

  function updateCarousel() {
    cards.forEach((card, i) => {
      card.classList.add("hidden");
      card.classList.remove("left", "right", "center");
    });

    const leftIndex = (centerIndex - 1 + cards.length) % cards.length;
    const rightIndex = (centerIndex + 1) % cards.length;

    cards[centerIndex].classList.add("center");
    cards[leftIndex].classList.add("left");
    cards[rightIndex].classList.add("right");
  }

  prevBtn.addEventListener("click", () => {
    centerIndex = (centerIndex - 1 + cards.length) % cards.length;
    updateCarousel();
  });

  nextBtn.addEventListener("click", () => {
    centerIndex = (centerIndex + 1) % cards.length;
    updateCarousel();
  });

  updateCarousel();
}

window.addEventListener("DOMContentLoaded", () => {
  loadCarousel(".games-carousel", window.games);
  loadCarousel(".groups-carousel", window.groups);
  loadCarousel(".people-carousel", window.people);

  document.querySelectorAll(".carousel-section").forEach(section => {
    setup3DCarousel(section);
  });
});
