document.addEventListener('DOMContentLoaded', function () {
    // 1. 히어로 섹션 페이드인
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSection.style.display = 'flex'; // fadeIn 효과 대체 (jQuery 미사용)
        heroSection.style.opacity = 0;
        setTimeout(() => {
            heroSection.style.transition = 'opacity 1s';
            heroSection.style.opacity = 1;
        }, 10);
    }

    // 2. 스크롤 애니메이션
    ScrollReveal().reveal('.reveal', {
        duration: 800,
        distance: '40px',
        origin: 'bottom',
        interval: 120,
        viewFactor: 0.2,
        viewOffset: { top: 20, bottom: 0, left: 0, right: 0 }
    });

    // 3. 페이드아웃 클래스 제거
    document.body.classList.remove('fade-out');

    // 4. 헤더/푸터 비동기 로드 (필요하면)
    fetch('header.html')
        .then(res => res.text())
        .then(html => {
            document.getElementById('header').innerHTML = html;
            if (typeof initializeHeader === 'function') initializeHeader();
        });
    fetch('footer.html')
        .then(res => res.text())
        .then(html => {
            document.getElementById('footer').innerHTML = html;
        });

    // 5. 순차 애니메이션 (CSS로 대체 가능)
    document.querySelectorAll('.animate-sequence').forEach((el, i) => {
        el.style.transitionDelay = `${i * 0.5}s`;
        el.classList.add('active');
    });

    // 6. 페이지 전환 페이드아웃 (내부 링크에만 적용)
    document.querySelectorAll('a[href]').forEach(link => {
        const url = link.getAttribute('href');
        if (url && !url.startsWith('http')) { // 내부 링크만
            link.addEventListener('click', event => {
                event.preventDefault();
                document.body.classList.add('fade-out');
                setTimeout(() => {
                    window.location.href = url;
                }, 700);
            });
        }
    });
});
