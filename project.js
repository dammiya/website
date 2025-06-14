const thumbList = document.querySelector('.thumb-list');
const bgImages = document.querySelectorAll('.bg-img');

const TOTAL_CARDS = 15;
const VISIBLE_CARDS = 5;
let position = 0;
let velocity = 0;
const sensitivity = 0.0025;
const friction = 0.1;

const customPositions = [10, 80, 250, 420, 480];
const opacityMap = [0.4, 0.7, 1.0, 0.7, 0.4];
const zIndexMap = [15, 20, 30, 20, 15];
const scaleMap = [0.5, 1, 1, 1, 0.5];

const cardsData = Array.from({ length: TOTAL_CARDS }, (_, i) => ({
  img: `project${i + 1}.jpg`,
  caption: `${i + 1}번 카드 문구입니다`
}));

function createCards() {
  cardsData.forEach(data => {
    const card = document.createElement('div');
    card.className = 'thumb-card';

    const img = document.createElement('img');
    img.src = data.img;
    img.alt = data.caption;

    const caption = document.createElement('div');
    caption.className = 'thumb-caption';
    caption.textContent = data.caption;

    card.appendChild(img);
    card.appendChild(caption);

    thumbList.appendChild(card);
  });
}
createCards();

const cards = document.querySelectorAll('.thumb-card');

function update() {
  let scrollTop = thumbList.scrollTop;
  let position = scrollTop / 160; // 카드 높이 + 마진 총합

  let centerIndex = Math.round(position);
  if (centerIndex < 0) centerIndex += TOTAL_CARDS;
  centerIndex %= TOTAL_CARDS;

  if (bgImages.length >= 2) {
    const imgSrc = cardsData[centerIndex].img;
    bgImages[0].src = imgSrc;
    bgImages[1].src = imgSrc;
  }

  cards.forEach((card, i) => {
    if (Math.abs(i - centerIndex) <= 2) {
      card.style.opacity = 1;
      card.style.pointerEvents = 'auto';
      card.style.display = 'flex';
      card.classList.toggle('center', i === centerIndex);
    } else {
      card.style.opacity = 0;
      card.style.pointerEvents = 'none';
      card.style.display = 'none';
      card.classList.remove('center');
    }
  });
}

thumbList.addEventListener('scroll', update);
update();