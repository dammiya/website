// ✅ 4. 슬라이드 갤러리
document.addEventListener('DOMContentLoaded', () => {
  console.log("JS 연결됨");

  const imageData = [
    { src: '1.jpg', title: '🍎' },
    { src: '2.jpg', title: '🍊' },
    { src: '3.jpg', title: '🍋' },
    { src: '4.jpg', title: '🍐' },
    { src: '5.jpg', title: '🫐' },
    { src: '6.jpg', title: '🍇' },
    { src: '7.jpg', title: '🍑' },
    { src: '8.jpg', title: '🍒' }
  ];

  const itemsPerPage = 4;
  const totalPages = Math.ceil(imageData.length / itemsPerPage);
  let currentPage = 0;

  const track = document.getElementById('sliderTrack');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  function renderSliderPage(page) {
    if (!track) return;

    track.innerHTML = ''; // 이전 것들 제거
    const start = page * itemsPerPage;
    const items = imageData.slice(start, start + itemsPerPage);

    items.forEach(data => {
      const item = document.createElement('div');
      item.className = 'thumb-item';
      item.innerHTML = `
        <img src="${data.src}" alt="${data.title}">
        <div class="thumb-title">${data.title}</div>
      `;
      track.appendChild(item);
    });

    // 버튼 비활성화 상태 업데이트
    prevBtn.disabled = currentPage === 0;
    nextBtn.disabled = currentPage === totalPages - 1;
  }

  prevBtn.addEventListener('click', () => {
    if (currentPage > 0) {
      currentPage--;
      renderSliderPage(currentPage);
    }
  });

  nextBtn.addEventListener('click', () => {
    if (currentPage < totalPages - 1) {
      currentPage++;
      renderSliderPage(currentPage);
    }
  });

  renderSliderPage(currentPage); // 처음 실행
});