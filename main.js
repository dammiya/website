// main.js
window.addEventListener("load", () => {
  const bgm = document.getElementById("bgm");
  bgm.muted = false;
  bgm.volume = 0.7;

  bgm.play().catch((err) => {
    console.warn("브라우저가 자동재생을 차단했어요:", err);
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const enterButton = document.querySelector('.enter-button');
  const character = document.querySelector('.character');
  const introContainer = document.querySelector('.intro');
  const portfolioContainer = document.querySelector('.container');

  enterButton.addEventListener('click', function () {
    // 텍스트와 버튼 서서히 사라짐
    enterButton.style.transition = 'opacity 0.5s';
    introContainer.style.transition = 'opacity 0.5s';
    enterButton.style.opacity = '0';
    introContainer.style.opacity = '0';

    // 캐릭터 이동
    character.style.transition = 'left 1s ease, transform 1s ease';
    character.style.left = '80%';
    character.style.transform = 'translate(-50%, -50%) scale(0.95)';

    // 일정 시간 후 Intro 제거 + 포트폴리오 등장
    setTimeout(() => {
      introContainer.style.display = 'none';
      portfolioContainer.style.display = 'flex';
      setTimeout(() => {
        portfolioContainer.style.opacity = '1';
      }, 10); // display 전환 후 opacity transition 작동 위해 delay
    }, 1000);
  });
});

// visualizer.js

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const audioElement = document.getElementById("bgm");
const source = audioCtx.createMediaElementSource(audioElement);
const analyser = audioCtx.createAnalyser();

source.connect(analyser);
analyser.connect(audioCtx.destination);

const bars = document.querySelectorAll(".bar");
const dataArray = new Uint8Array(bars.length);

function animate() {
  requestAnimationFrame(animate);
  analyser.getByteFrequencyData(dataArray);

  bars.forEach((bar, i) => {
    const value = dataArray[i];
    bar.style.height = `${10 + value / 3}px`;
  });
}

audioElement.addEventListener("play", () => {
  audioCtx.resume();
  animate();
});

// ✅ 4. 슬라이드 갤러리
document.addEventListener('DOMContentLoaded', () => {
  console.log("JS 연결됨");

  const imageData = [
    { src: '1.jpg', title: '사진1' },
    { src: '2.jpg', title: '사진2' },
    { src: '3.jpg', title: '사진3' },
    { src: '4.jpg', title: '사진4' },
    { src: '5.jpg', title: '사진5' },
    { src: '6.jpg', title: '사진6' },
    { src: '7.jpg', title: '사진7' },
    { src: '8.jpg', title: '사진8' }
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