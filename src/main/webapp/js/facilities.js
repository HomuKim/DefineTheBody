document.addEventListener('DOMContentLoaded', function () {

	// 페이지 로드 후 fade-out 클래스 제거 (페이드 인 효과)
	document.body.classList.remove('fade-out');

	// 링크 클릭 시 페이드 아웃 효과 적용
	document.querySelectorAll('a').forEach(link => {

		link.addEventListener('click', event => {
			event.preventDefault(); // 기본 링크 동작 방지
			const url = link.getAttribute('href');

			document.body.classList.add('fade-out'); // 페이드 아웃 효과 시작
			setTimeout(() => {
				window.location.href = url; // 페이지 이동
			}, 700); // CSS transition-duration과 동일한 시간 설정
		});
	});

	// 헤더/푸터 동적 로드
	$("#header").load("header.html", function () {
		// 헤더 로드 완료 후 실행될 코드
		if (typeof initializeHeader === 'function') {
			initializeHeader();
		}
	});
	$("#footer").load("footer.html");

	// 탭 전환 기능
	document.querySelectorAll('.tab-item').forEach(tab => {
		tab.addEventListener('click', function () {
			console.log("탭전환 클릭")
			// 활성 탭 업데이트
			document.querySelectorAll('.tab-item').forEach(item => item.classList.remove('active'));
			this.classList.add('active');

			// 콘텐츠 영역 전환
			const targetTab = this.getAttribute('data-tab');
			document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
			const targetContent = document.getElementById(targetTab);
			if (targetContent) targetContent.classList.add('active');
		});
	});

	// 초기 활성 탭 설정 (1층)
	const initialTab = document.querySelector('.tab-item[data-tab="floor1"]');
	if (initialTab) initialTab.click();
});
