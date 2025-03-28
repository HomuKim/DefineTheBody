document.addEventListener('DOMContentLoaded', function () {
	let currentIndex = 0;
	const images = document.querySelectorAll('.thumbnail');
	const mainImage = document.getElementById('mainImage');
	let isAnimating = false;

	// 페이지 로드 후 fade-out 클래스 제거 (페이드 인 효과)
	document.body.classList.remove('fade-out');

	function showImage(index) {
		if (isAnimating) return;
		isAnimating = true;

		const mainImg = document.getElementById('mainImage');
		mainImg.classList.add('fade-out');

		setTimeout(() => {
			mainImg.src = images[index].src;
			mainImg.classList.remove('fade-out');
			mainImg.classList.add('fade-in');

			images.forEach((thumb, i) => {
				thumb.classList.toggle('active', i === index);
			});

			setTimeout(() => {
				isAnimating = false;
				mainImg.classList.remove('fade-in');
			}, 500);
		}, 500);
	}

	function changeSlide(direction) {
		if (isAnimating) return;

		// 현재 메인 이미지의 src와 일치하는 썸네일 찾기
		const currentMainSrc = mainImage.src;
		let currentMainIndex = Array.from(images).findIndex(img => img.src === currentMainSrc);

		// 찾은 인덱스가 유효하지 않으면 currentIndex 사용
		if (currentMainIndex === -1) currentMainIndex = currentIndex;

		// 다음/이전 인덱스 계산
		let nextIndex = currentMainIndex + direction;

		// 범위 체크
		if (nextIndex >= images.length) nextIndex = 0;
		if (nextIndex < 0) nextIndex = images.length - 1;

		currentIndex = nextIndex;
		showImage(nextIndex);
	}

	// 썸네일 클릭 이벤트
	images.forEach((thumbnail, index) => {
		thumbnail.addEventListener('click', () => showImage(index));
	});

	// 이전/다음 버튼 이벤트
	document.querySelector('.prev').addEventListener('click', () => changeSlide(-1));
	document.querySelector('.next').addEventListener('click', () => changeSlide(1));

	// 초기 이미지 표시
	showImage(0);
});

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

window.addEventListener('load', function () {
	if (sessionStorage.getItem('adminLoggedIn') === 'true') {
		document.body.classList.add('admin-logged-in');
		makeContentEditable(true);
	}
	$("#header").load("header.html", function () {
		// 헤더 로드 완료 후 실행될 코드
		if (typeof initializeHeader === 'function') {
			initializeHeader();
		}
	});
	$("#footer").load("footer.html");
});