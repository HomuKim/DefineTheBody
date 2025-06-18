// 페이지 전체가 로드되면 header와 footer를 각각 불러옴
window.addEventListener('load', function () {
    $("#header").load("header.html", function () {
        if (typeof initializeHeader === 'function') {
            initializeHeader();
        }
    });
    $("#footer").load("footer.html");
});

document.addEventListener('DOMContentLoaded', function () {

    // 페이지 로드 후 fade-out 클래스 제거 (페이드 인 효과)
    setTimeout(() => {
        document.body.classList.remove('fade-out');
    }, 10);

    // 링크 클릭 시 페이드 아웃 효과 적용
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', event => {
            if (document.body.classList.contains('fade-out')) return; // 중복 방지
            event.preventDefault();
            const url = link.getAttribute('href');
            document.body.classList.add('fade-out');
            setTimeout(() => {
                window.location.href = url;
            }, 700);
        });
    });

    // 이벤트 배너 관련 DOM 요소 가져오기
    const eventImage = document.getElementById('eventImage');
    const eventTitle = document.getElementById('eventTitle');
    const eventDescription = document.getElementById('eventDescription');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    // 이벤트 데이터 배열 (이미지, 제목, 설명)
    const events = [
        {
            image: 'images/event/event-banner1.jpg',
            title: '다시는 없을 기회! 오픈 1주년 역대급 혜택 공개',
            description: '1년에 단 한 번! 오픈 1주년을 맞아 역대급 혜택을 준비했습니다.<br>헬스장 등록을 고민하셨다면, 지금이 최고의 기회입니다.<br><br>프로모션 혜택<br>1년 회원권<br>정가 599,000원 → 330,000원 (VAT 포함)<br><br>1년 회원권 + PT 12회<br>정가 1,655,000원 → 780,000원 (VAT 포함)<br><br>안내사항<br>본 이벤트는 선착순 100명 한정으로 진행됩니다.<br><br>조기 마감될 수 있으니 서둘러 신청해 주세요.<br><br>자세한 문의 및 상담은 메인페이지[방문하기] 버튼 또는 대표전화로 연락해 주세요.<br><br>지금 바로 최고의 혜택을 만나보세요!<br>여러분의 건강한 변화를 응원합니다.'
        },
        {
            image: 'images/event/event-banner2.jpg',
            title: '',
            description: ''
        }
    ];

    // 현재 보여지는 이벤트 인덱스
    let currentIndex = 0;

    // 이미지 파일이 실제로 존재하는지 확인하는 함수 (Promise 반환)
    function imageExists(url) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = url;
        });
    }

    // 이미지가 존재하는 이벤트만 필터링해서 반환 (비동기)
    async function filterEventsByImage(events) {
        const filtered = [];
        for (const event of events) {
            if (await imageExists(event.image)) {
                filtered.push(event);
            }
        }
        return filtered;
    }

    // 이벤트 초기화: 이미지가 있는 이벤트만 남기고, 버튼/섹션 표시 제어
    async function initEvents() {
        const filteredEvents = await filterEventsByImage(events);

        // 이벤트가 1개 이하라면 화살표 버튼 숨김
        if (filteredEvents.length <= 1) {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
        }

        // 이벤트가 0개라면 전체 이벤트 섹션 숨김
        if (filteredEvents.length === 0) {
            document.getElementById('eventSection').style.display = 'none';
            return;
        }

        // 실제 이벤트 내용을 화면에 표시하는 함수 (애니메이션 포함)
        function updateEvent(index) {
            const event = filteredEvents[index];
            eventImage.style.display = '';
            eventImage.classList.add('fade-out');
            eventTitle.classList.add('fade-out');
            eventDescription.classList.add('fade-out');

            setTimeout(() => {
                eventImage.src = event.image;
                eventTitle.textContent = event.title;
                eventDescription.innerHTML = event.description;

                eventImage.classList.remove('fade-out');
                eventImage.classList.add('fade-in');
                eventTitle.classList.remove('fade-out');
                eventTitle.classList.add('fade-in');
                eventDescription.classList.remove('fade-out');
                eventDescription.classList.add('fade-in');

                setTimeout(() => {
                    eventImage.classList.remove('fade-in');
                    eventTitle.classList.remove('fade-in');
                    eventDescription.classList.remove('fade-in');
                }, 300);
            }, 300);
        }

        // 이전/다음 버튼 클릭 시 이벤트 변경
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + filteredEvents.length) % filteredEvents.length;
            updateEvent(currentIndex);
        });
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % filteredEvents.length;
            updateEvent(currentIndex);
        });

        // 첫 번째 이벤트 표시
        updateEvent(currentIndex);
    }

    // 이벤트 영역 초기화 실행
    initEvents();

});
