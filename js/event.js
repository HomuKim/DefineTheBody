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
            description: '헬스장 1년 등록, 지금이 가장 합리적인 기회입니다! 💪<br><br>💰 정상가 599,000원 → 330,000원 (12개월권 혜택가)<br>⏳ 선착순 100명 한정!<br><br>🏋️‍♂️ 운동 초보부터 체형교정, 다이어트까지 맞춤 프로그램 제공<br><br>👇 이런 분께 추천합니다!<br>✅ 운동을 처음 시작하시는 분<br><br>✅ 체형교정이나 다이어트가 필요하신 분<br><br>✅ 건강한 라이프스타일을 원하시는 분<br><br>📢 프로모션 안내<br>📅 기간: 2025년 6월 11일 ~ 선착순 마감 시까지<br><br>👥 대상: 신규 및 기존 회원 모두<br><br>🎁 1주년 한정 혜택을 놓치지 마세요!'
        },
        {
            image: 'images/event/event-banner2.png',
            title: '🎉 디파인더바디짐 1주년 혜택 오픈! 🎉',
            description: '💬 진짜 회원들이 남긴 리얼 후기<br>디파인더바디짐을 선택한 회원님들의 생생한 변화를 직접 확인해보세요!<br><br>⭐ 회원 후기<br>“운동이 두려웠던 제가 달라졌어요!”<br><br>“통증도 사라지고 에너지가 넘쳐요!”<br><br>“기초부터 꼼꼼하게 케어해줘서 믿고 다녀요!”<br><br>“필라테스+헬스 수업 덕분에 지루할 틈 없어요!”<br><br>👍 이런 분께 추천합니다<br>정릉 - 길음 인근에서 제대로 된 PT를 찾으시는 분<br><br>1:1 맞춤 수업을 원하시는 분<br><br>확실한 변화를 경험하고 싶은 분<br><br>체계적인 운동 루틴이 필요하신 분<br><br>지금 바로 디파인더바디짐에서<br>직접 체험하고 변화를 시작하세요! 🚀'
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