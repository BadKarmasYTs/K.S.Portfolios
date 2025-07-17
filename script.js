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

function setupCarousel(containerClass, data) {
  const section = document.querySelector(containerClass);
  const carousel = section.querySelector(".carousel");
  const prevBtn = section.querySelector(".carousel-nav.prev");
  const nextBtn = section.querySelector(".carousel-nav.next");

  const innerTrack = document.createElement("div");
  innerTrack.className = "carousel-track";
  carousel.appendChild(innerTrack);

  data.forEach((item) => {
    const card = createCard(item);
    innerTrack.appendChild(card);
  });

  let index = 0;

  function updateCarousel() {
    const cards = innerTrack.querySelectorAll(".card");
    cards.forEach((card, i) => {
      card.classList.remove("center", "side");
      if (i === index) {
        card.classList.add("center");
      } else if (i === (index - 1 + data.length) % data.length || i === (index + 1) % data.length) {
        card.classList.add("side");
      }
    });

    innerTrack.style.transform = `translateX(calc(-${index * (260)}px))`;
  }

  prevBtn.addEventListener("click", () => {
    index = (index - 1 + data.length) % data.length;
    updateCarousel();
  });

  nextBtn.addEventListener("click", () => {
    index = (index + 1) % data.length;
    updateCarousel();
  });

  updateCarousel();
}

window.addEventListener("DOMContentLoaded", () => {
  setupCarousel("#projects", window.games);
  setupCarousel("#groups", window.groups);
  setupCarousel("#people", window.people);
});
