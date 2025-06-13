const mainImage   = document.getElementById('mainImage');
const epTxt       = document.querySelector('.gallery-text .episode');
const titleTxt    = document.querySelector('.gallery-text .title');
const descTxt     = document.querySelector('.gallery-text .description');
const thumbs      = document.querySelectorAll('.thumb');
const openBtn     = document.getElementById('openFullscreen');
const modal       = document.getElementById('modal');
const modalImg    = document.getElementById('modalImage');
const modalCaption= document.getElementById('modalCaption');
const closeModal  = document.getElementById('closeModal');

// 썸네일 클릭 → 메인 업데이트
thumbs.forEach(btn => {
  btn.addEventListener('click', () => {
    // active 표시
    thumbs.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    // 데이터 읽어서 메인 반영
    mainImage.src    = btn.dataset.src;
    epTxt.textContent    = btn.dataset.ep;
    titleTxt.textContent = btn.dataset.title;
    descTxt.textContent  = btn.dataset.desc;
  });
});

// 전체화면 모달 열기
openBtn.addEventListener('click', () => {
  modalImg.src      = mainImage.src;
  modalCaption.textContent = `${epTxt.textContent} ${titleTxt.textContent}\n${descTxt.textContent}`;
  modal.classList.remove('hidden');
});

// 모달 닫기
closeModal.addEventListener('click', () => {
  modal.classList.add('hidden');
});