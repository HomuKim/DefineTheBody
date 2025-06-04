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
            title: '🎉 디파인더바디짐 1주년 혜택 오픈! 🎉',
            description: '헬스장 1년 등록 고민 중이라면 지금이 찬스💥<br><br>✔️ 기존가 599,000원 → ✅ 330,000원<br>✔️ 단 100명! 선착순 마감 ⏳<br>✔️ 운동 초보부터 체형교정·다이어트까지 OK!<br><br>👇 이 글 저장하거나 공유해서<br>운동 고민 중인 친구에게 알려주세요!<br>“같이 시작하자💬” 멘션도 환영!<br><br>💭 운동 시작하고 싶은 사람 👉 댓글에 ”🔥“<br>💭 친구랑 같이 가고 싶은 사람 👉 멘션하기'
        },
        {
            image: 'images/event/event-banner2.png',
            title: '🎉 디파인더바디짐 1주년 혜택 오픈! 🎉',
            description: '💪 진짜 회원들이 남긴 리얼 후기 대공개!<br><br>🔥 “운동이 두려웠던 제가 달라졌어요!”<br>🔥 “통증도 사라지고 에너지가 넘쳐요!”<br>🔥 “기초부터 꼼꼼하게 케어해줘서 믿고 다녀요!”<br>🔥 “필라테스+헬스 수업 덕분에 지루할 틈 없어요!”<br><br>✔️ 정릉 • 길음 근처 제대로 된 PT 찾고 계세요?<br>지금 바로 체험해보세요!<br>→ 1:1 맞춤 수업<br>→ 확실한 변화<br>→ 체계적인 운동 루틴<br>'
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