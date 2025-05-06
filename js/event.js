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
            title: '[디파인더바디짐] 5월 한정 특가 이벤트!',
            description: '가정의 달을 맞아,<br>2인 동반 연회원권 등록 시 → 399,000원!<br>(정가 468,000원 → 파격 할인!)<br><br>게다가 1인만 연회원권 등록해도 무료 PT 제공!<br>혼자 등록해도 혜택은 확실하게 챙겨가세요!<br><br>업그레이드된 머신존 → 머신 7종 추가입고!<br>해머스트랭스 정식 매장 + 천국의 계단 6대 보유<br><br>✔️ 총 300평 초대형 공간 (2,3,4층)<br>✔️ 탈의실 / 필라테스존 / 유산소존 완비<br>✔️ 수건 무료 / 무료 주차 / 시작일 조정 가능<br>✔️ 하루 무제한 입장 가능<br><br>2025 KCIA 선정 성북구 우수 헬스장<br><br>지금 바로 디파인더바디짐에서<br>가성비+시설+PT 혜택까지 모두 잡으세요!'
        },
        {
            image: 'images/event/event-banner2.jpg',
            title: '[SPECIAL COMBO 이벤트]',
            description: '회원권 + 그룹PT + 개인PT<br>한 번에! 제대로! 알차게!<br><br>✨디파인더바디짐이 준비한<br>스페셜 콤보 패키지 출시!<br><br>⸻<br><br>구성<br>📌 헬스 회원권 4개월<br>📌 그룹PT 8회<br>📌 1:1 개인PT 2회<br><br>→ 총 408,000원!<br><br>⸻<br><br>헬스장 등록도 하고,<br>PT도 부담 없이 체험하고,<br>그룹 운동으로 재미까지!<br>지금이 바로 운동 루틴 잡을 타이밍!'
        },
        {
            image: 'images/event/event-banner3.png',
            title: '✅ [친구소개 EVENT 진행 중!]',
            description: '디파인더바디짐에서 함께 운동할 친구 있으신가요?<br>지금 소개해주시면 선물은 저희가 준비할게요!<br><br>⸻<br><br>🎁 이벤트 혜택<br><br>👥 1명 소개 시<br>→ 리유저블 텀블러 증정!<br>(기존회원 & 신규회원 모두 증정)<br><br>👥 3명 이상 소개 시<br>→ 손목 스트랩 or 폼롤러 택 1 증정!<br>(기존회원 대상)<br><br>⸻<br><br>💪 주변에 운동 같이 시작하고 싶은 분 계시다면<br>지금 디파인더바디짐으로 초대해주세요!'
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