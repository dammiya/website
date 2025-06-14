document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.card');
    const mainTitle = document.querySelector('.main-feature h1');
    const mainDescription = document.getElementById('mainDescription');

    cards.forEach(card => {
        card.addEventListener('click', function () {
            // 모든 카드에서 'active' 클래스 제거
            cards.forEach(c => c.classList.remove('active'));
            // 클릭된 카드에 'active' 클래스 추가
            this.classList.add('active');

            // data 속성에서 텍스트 가져오기
            const newTitle = this.dataset.title;
            const newDesc = this.dataset.desc;

            // 메인 콘텐츠 텍스트 변경
            mainTitle.textContent = newTitle;
            mainDescription.textContent = newDesc;
        });
    });
});

// 썸네일 스크롤 감도 및 부드럽게 이동
const thumbList = document.querySelector('.thumb-list');
document.querySelector('.thumb-scroll-area').addEventListener('wheel', function(e) {
  e.preventDefault();
  thumbList.scrollBy({
    top: e.deltaY * 1.2, // 스크롤 속도 살짝 증폭
    behavior: 'smooth'
  });
}, { passive: false });