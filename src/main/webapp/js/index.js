// DOM 로드 완료 시 실행되는 핵심 함수
document.addEventListener('DOMContentLoaded', function () {
    
	// 1. 순차 애니메이션 요소 선택
    const elements = document.querySelectorAll('.animate-sequence');

    // 2. 히어로 섹션 페이드인 효과
    $(document).ready(function () {
        $(".hero-section").fadeIn(1000); // 1000ms 동안 서서히 나타남
    });

    // 3. 스크롤 애니메이션 초기화
    ScrollReveal().reveal('.reveal', {
        duration: 1000,         // 1초 동안 애니메이션
        distance: '50px',       // 이동 거리
        origin: 'bottom',       // 아래쪽에서 등장
        interval: 200,          // 요소간 200ms 간격으로 순차 실행
        viewFactor: 0.3,        // 요소가 30% 보일 때 애니메이션 트리거
        viewOffset: { top: 30 } // 뷰포트 상단에서 30px 더 내려와야 실행
    });

    // 4. 초기 페이드아웃 효과 제거
    document.body.classList.remove('fade-out');

    // 5. 헤더/푸터 동적 로드
    $("#header").load("header.html", function () {
        if (typeof initializeHeader === 'function') {
            initializeHeader(); // 헤더 초기화 함수 호출(header.html에 정의 필요)
        }
    });
    $("#footer").load("footer.html"); // 푸터 단순 로드

    // 6. 순차 애니메이션 실행
    elements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('active'); // 700ms 간격으로 요소 활성화
        }, index * 700);
    });
});

// 7. 페이지 전환 페이드아웃 효과
document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', event => {
        event.preventDefault(); // 기본 링크 동작 차단
        const url = link.getAttribute('href');

        document.body.classList.add('fade-out'); // 페이드아웃 시작
        setTimeout(() => {
            window.location.href = url; // 700ms 후 페이지 이동
        }, 700);
    });
});
