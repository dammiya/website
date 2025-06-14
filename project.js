const thumbList = document.querySelector('.thumb-list');
const thumbCards = document.querySelectorAll('.thumb-card');

// 무한 스크롤용 복제
thumbList.innerHTML += thumbList.innerHTML;

thumbList.addEventListener('scroll', () => {
  const center = thumbList.scrollTop + thumbList.clientHeight / 2;

  thumbCards.forEach((card, index) => {
    const rect = card.getBoundingClientRect();
    const cardCenter = rect.top + rect.height / 2;
    const distance = Math.abs(cardCenter - window.innerHeight / 2);

    const scale = distance < 80 ? 1.2 : 0.85;
    const rotateX = (cardCenter - window.innerHeight / 2) * 0.15;

    card.style.transform = `translateZ(0px) rotateX(${rotateX}deg) scale(${scale})`;
  });

  // 무한 스크롤 (아래로 넘어갈 때)
  if (thumbList.scrollTop > thumbList.scrollHeight / 2) {
    thumbList.scrollTop -= thumbList.scrollHeight / 2;
  }
  // 무한 스크롤 (위로 올라갈 때)
  if (thumbList.scrollTop < 0) {
    thumbList.scrollTop += thumbList.scrollHeight / 2;
  }
});