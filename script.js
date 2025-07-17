
const games = [
  { name: 'Dumpster Dive', desc: 'Scavenge dumpsters for food and profit.', image: '' },
  { name: 'Island Survival', desc: 'Craft, build and survive on a remote island.', image: '' },
  { name: 'Tycoon Empire', desc: 'Grow your business from scratch.', image: '' },
  { name: 'Zombie Rush', desc: 'Fight waves of zombies with your friends.', image: '' },
  { name: 'Space Miner', desc: 'Mine asteroids and upgrade your gear.', image: '' },
  { name: 'Tower Defense X', desc: 'Defend your base with powerful towers.', image: '' }
];

const groups = [
  'KS Studios', 'BlockCore', 'DevUnit', 'ScriptSquad', 'ObbyBuilders',
  'GameForge', 'RobloxXtreme', 'ScriptVerse', 'UIElite', 'StudioRift'
].map(name => ({ name, desc: 'Game development group', image: '' }));

const people = [
  { name: 'DevRayn', role: 'UI/UX Designer', desc: '', image: '' },
  { name: 'xBuilderz', role: 'Builder/Modeler', desc: '', image: '' },
  { name: 'CodeKid', role: 'Scripter', desc: '', image: '' },
  { name: 'MapQueen', role: 'Environment Artist', desc: '', image: '' },
  { name: 'Animix', role: 'Animator', desc: '', image: '' }
];

function createCard(data) {
  const div = document.createElement("div");
  div.className = "card";
  const title = document.createElement("h3");
  title.textContent = data.name;
  div.appendChild(title);
  const desc = document.createElement("p");
  desc.textContent = data.desc || data.role || "";
  div.appendChild(desc);
  return div;
}

function loadCarousel(containerClass, data) {
  const container = document.querySelector(containerClass);
  const wrapper = document.createElement("div");
  wrapper.className = "carousel-wrapper";
  container.appendChild(wrapper);
  data.forEach(item => {
    const card = createCard(item);
    wrapper.appendChild(card);
  });

  if (wrapper.children.length > 1) {
    wrapper.children[0].classList.add("center");
    wrapper.children[wrapper.children.length - 1].classList.add("left");
    wrapper.children[1].classList.add("right");
  }

  let index = 0;
  const rotate = () => {
    const cards = wrapper.children;
    [...cards].forEach(c => c.className = "card");
    const left = (index - 1 + cards.length) % cards.length;
    const center = index;
    const right = (index + 1) % cards.length;
    cards[left].classList.add("left");
    cards[center].classList.add("center");
    cards[right].classList.add("right");
  };

  setInterval(() => {
    index = (index + 1) % wrapper.children.length;
    rotate();
  }, 4000);
}

window.onload = () => {
  loadCarousel("#games .carousel", games);
  loadCarousel("#groups .carousel", groups);
  loadCarousel("#people .carousel", people);
};
