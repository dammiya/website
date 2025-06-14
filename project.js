const thumbList = document.querySelector('.thumb-list');
const bgImages = document.querySelectorAll('.bg-img');

const TOTAL_CARDS = 30;
const VISIBLE_CARDS = 5;
let position = 0;
let velocity = 0;
const sensitivity = 0.0005;
const friction = 0.08;

const customPositions = [10, 80, 250, 420, 480];
const opacityMap = [0.4, 0.7, 1.0, 0.7, 0.4];
const zIndexMap = [15, 20, 30, 20, 15];
const scaleMap = [0.5, 1, 1, 1, 0.5];

const cardsData = Array.from({ length: TOTAL_CARDS }, (_, i) => ({
  img: `project${(i % 3) + 1}.jpg`,
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
  velocity *= (1 - friction);
  position += velocity;

  if (position < 0) position += TOTAL_CARDS;
  if (position >= TOTAL_CARDS) position -= TOTAL_CARDS;

  let centerIndex = Math.round(position) % TOTAL_CARDS;
  if (centerIndex < 0) centerIndex += TOTAL_CARDS;

  // 배경 이미지 모두 중앙 카드 이미지로 변경
  if (bgImages.length > 0) {
    bgImages.forEach(bgImg => {
      bgImg.src = cardsData[centerIndex].img;
    });
  }

  cards.forEach((card, i) => {
    let offset = ((i - Math.round(position) + TOTAL_CARDS) % TOTAL_CARDS);
    if (offset > TOTAL_CARDS / 2) offset -= TOTAL_CARDS;

    if (offset >= -Math.floor(VISIBLE_CARDS / 2) && offset <= Math.floor(VISIBLE_CARDS / 2)) {
      const index = offset + Math.floor(VISIBLE_CARDS / 2);
      const y = customPositions[index];
      const opacity = opacityMap[index];
      const zIndex = zIndexMap[index];
      const scale = scaleMap[index];
      const isCenter = index === Math.floor(VISIBLE_CARDS / 2);

      if (isCenter) {
        card.classList.add('center');
      } else {
        card.classList.remove('center');
      }

      card.style.transform = `translateY(${y}px) translateZ(${isCenter ? 60 : -Math.abs(offset)*40}px) scale(${scale})`;
      card.style.opacity = opacity;
      card.style.zIndex = zIndex;
      card.style.pointerEvents = 'auto';

      const caption = card.querySelector('.thumb-caption');
      if (caption) {
        caption.textContent = cardsData[i].caption;
      }
    } else {
      card.style.opacity = 0;
      card.style.pointerEvents = 'none';
    }
  });

  requestAnimationFrame(update);
}

thumbList.addEventListener('wheel', e => {
  e.preventDefault();
  velocity += e.deltaY * sensitivity;
}, { passive: false });

update();