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
  container.innerHTML = ""; // Clear old cards

  data.forEach(item => {
    const card = createCard(item);
    container.appendChild(card);
  });

  // After adding cards, update visibility and styles for the 3-card visible effect
  updateVisibleCards(container);
}

function updateVisibleCards(container, centerIndex = 0) {
  const cards = container.querySelectorAll(".card");
  const total = cards.length;
  if (total === 0) return;

  cards.forEach(card => {
    card.classList.remove("left", "center", "right", "visible");
    card.style.opacity = "0";
    card.style.transform = "translateX(0) scale(0.85) rotateY(0deg)";
    card.style.zIndex = "0";
  });

  // Calculate indexes for left, center, right cards (looping)
  const leftIndex = (centerIndex - 1 + total) % total;
  const rightIndex = (centerIndex + 1) % total;

  // Style center card
  cards[centerIndex].classList.add("center", "visible");
  cards[centerIndex].style.opacity = "1";
  cards[centerIndex].style.transform = "translateX(0) scale(1.1) rotateY(0deg)";
  cards[centerIndex].style.zIndex = "3";

  // Style left card
  cards[leftIndex].classList.add("left", "visible");
  cards[leftIndex].style.opacity = "0.8";
  cards[leftIndex].style.transform = "translateX(-150px) scale(0.85) rotateY(20deg)";
  cards[leftIndex].style.zIndex = "2";

  // Style right card
  cards[rightIndex].classList.add("right", "visible");
  cards[rightIndex].style.opacity = "0.8";
  cards[rightIndex].style.transform = "translateX(150px) scale(0.85) rotateY(-20deg)";
  cards[rightIndex].style.zIndex = "2";
}

function setupCarouselNavigation(section) {
  const container = section.querySelector(".carousel");
  const prevBtn = section.querySelector(".carousel-nav.prev");
  const nextBtn = section.querySelector(".carousel-nav.next");

  if (!container.querySelector(".card")) return;

  let currentIndex = 0;
  const totalCards = container.querySelectorAll(".card").length;

  updateVisibleCards(container, currentIndex);

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + totalCards) % totalCards;
    updateVisibleCards(container, currentIndex);
  });

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % totalCards;
    updateVisibleCards(container, currentIndex);
  });

  // Auto loop every 4 seconds
  setInterval(() => {
    currentIndex = (currentIndex + 1) % totalCards;
    updateVisibleCards(container, currentIndex);
  }, 4000);
}

// Animate cards fade-in on viewport entry (optional, keep original)
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
