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
  data.forEach(item => {
    const card = createCard(item);
    container.appendChild(card);
  });
}

function setupCarouselNavigation(section) {
  const carousel = section.querySelector(".carousel");
  const prevBtn = section.querySelector(".carousel-nav.prev");
  const nextBtn = section.querySelector(".carousel-nav.next");

  if (!carousel.querySelector(".card")) return;

  const cardStyle = getComputedStyle(carousel.querySelector(".card"));
  const cardWidth = carousel.querySelector(".card").offsetWidth + parseInt(cardStyle.marginRight || 16);

  prevBtn.addEventListener("click", () => {
    carousel.scrollBy({ left: -cardWidth, behavior: "smooth" });
  });

  nextBtn.addEventListener("click", () => {
    carousel.scrollBy({ left: cardWidth, behavior: "smooth" });
  });
}

// Animate cards when they enter viewport
function setupCardAnimations(containerClass) {
  const container = document.querySelector(containerClass);
  const cards = container.querySelectorAll(".card");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.3 });

  cards.forEach(card => observer.observe(card));
}

window.addEventListener("DOMContentLoaded", () => {
  loadCarousel(".games-carousel", window.games);
  loadCarousel(".groups-carousel", window.groups);
  loadCarousel(".people-carousel", window.people);

  document.querySelectorAll(".carousel-section").forEach(section => {
    setupCarouselNavigation(section);
  });

  setupCardAnimations(".games-carousel");
  setupCardAnimations(".groups-carousel");
  setupCardAnimations(".people-carousel");
});
