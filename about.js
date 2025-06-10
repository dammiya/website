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

  // 팝업 HTML 삽입
  const popupHTML = `
    <div id="popup" class="popup hidden">
      <span class="close-btn">&times;</span>
      <img id="popup-img" src="" alt="popup image">
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', popupHTML);

  const popup = document.getElementById('popup');
  const popupImg = document.getElementById('popup-img');
  const closeBtn = document.querySelector('.close-btn');

  closeBtn.addEventListener('click', () => {
    popup.classList.add('hidden');
    popupImg.src = '';
  });

  function renderSliderPage(page) {
    if (!track) return;

    track.innerHTML = '';
    const start = page * itemsPerPage;
    const items = imageData.slice(start, start + itemsPerPage);

    items.forEach(data => {
      const item = document.createElement('div');
      item.className = 'thumb-item';
      item.innerHTML = `
        <img src="${data.src}" alt="${data.title}">
        <div class="thumb-title">${data.title}</div>
      `;

      // 이미지 클릭 시 팝업 열기
      item.querySelector('img').addEventListener('click', () => {
        popupImg.src = data.src;
        popup.classList.remove('hidden');
      });

      track.appendChild(item);
    });

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

  renderSliderPage(currentPage);

  // ✅ 나가기 버튼 클릭 → 이전 페이지로 이동
  const exitBtn = document.getElementById('exitBackBtn');
  if (exitBtn) {
    exitBtn.addEventListener('click', () => {
      window.history.back(); // ← 이전 위치로 되돌아감
    });
  }
});
  closeBtn.addEventListener('click', () => {
    popup.classList.add('hidden');
    popupImg.src = '';
    document.body.classList.remove('popup-active'); // ✨ 효과 해제
  });

  function renderSliderPage(page) {
    ...
      item.querySelector('img').addEventListener('click', () => {
        popupImg.src = data.src;
        popup.classList.remove('hidden');
        document.body.classList.add('popup-active'); // ✨ 흐림효과 적용
      });
    ...
  }