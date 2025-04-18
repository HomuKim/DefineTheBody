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

    const eventImage = document.getElementById('eventImage');
    const eventTitle = document.getElementById('eventTitle');
    const eventDescription = document.getElementById('eventDescription');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    const events = [
        {
            image: 'images/event/event-banner1.jpg',
            title: '여름 준비 아직 안 끝났다면? 지금이 찬스!',
            description: '성북구 최고의 시설, 디파인더바디짐에서 3만 원대부터 시작하세요!<br><br>✔️ 수건 무료 제공<br>✔️ 하루 무제한 입장<br>✔️ 일시정지 가능<br>✔️ 시작일 자유 조정<br><br>게다가 1년 등록 시 PT 2회 무료!<br>헬린이부터 운동 고수까지 모두 환영합니다.<br><br>지하 2,3,4층 총 300평 규모<br>•해머스트렝스 오피셜 머신<br>•천국의 계단 6대<br>•고급 장비 7종 추가 입고<br><br>2025 KCIA 한국소비자산업평가 우수업체 선정 (성북구 헬스장 부문) 믿을 수 있는 퀄리티로 여러분을 기다립니다!'
        },
        {
            image: 'images/event/event-banner2.jpg',
            title: '[SPECIAL COMBO 이벤트]',
            description: '회원권 + 그룹PT + 개인PT<br>한 번에! 제대로! 알차게!<br><br>✨디파인더바디짐이 준비한<br>스페셜 콤보 패키지 출시!<br><br>⸻<br><br>구성<br>📌 헬스 회원권 4개월<br>📌 그룹PT 8회<br>📌 1:1 개인PT 2회<br><br>→ 총 408,000원!<br><br>⸻<br><br>헬스장 등록도 하고,<br>PT도 부담 없이 체험하고,<br>그룹 운동으로 재미까지!<br>지금이 바로 운동 루틴 잡을 타이밍!'
        }
    ];

    let currentIndex = 0;

    function updateEvent(index) {
        // 기존 콘텐츠에 페이드 아웃 클래스 추가
        eventImage.classList.add('fade-out');
        eventTitle.classList.add('fade-out');
        eventDescription.classList.add('fade-out');

        setTimeout(() => {
            eventImage.src = events[index].image;
            eventTitle.textContent = events[index].title;
            eventDescription.innerHTML = events[index].description;

            // 페이드 아웃 제거, 페이드 인 추가
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
            }, 300); // CSS transition 시간과 동일하게 설정
        }, 300); // CSS transition 시간과 동일하게 설정 (0.3초)
    }

    function changeEvent(direction) {
        currentIndex = (currentIndex + direction + events.length) % events.length;
        updateEvent(currentIndex);
    }

    prevBtn.addEventListener('click', () => changeEvent(-1));
    nextBtn.addEventListener('click', () => changeEvent(1));

    // 초기 이벤트 표시
    updateEvent(currentIndex);

    // 링크 클릭 시 페이드 아웃 효과 적용
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            const url = link.getAttribute('href');
            document.body.classList.add('fade-out');
            setTimeout(() => {
                window.location.href = url;
            }, 700);
        });
    });
});