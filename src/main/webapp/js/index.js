// 슬라이드 인덱스 초기화
let slideIndex = 0;
let slides;

// 유효한 이미지만 필터링하는 함수
function filterValidImages() {
	return Array.from(slides).filter(slide => {
		return slide.complete && slide.naturalHeight !== 0;
	});
}

// 슬라이드쇼 기능
function showSlides() {
	const validSlides = filterValidImages();

	if (validSlides.length === 0) return;

	// 모든 슬라이드 숨기기
	validSlides.forEach(slide => {
		slide.style.display = "none";
		slide.classList.remove('active');
	});

	// 다음 슬라이드 표시
	slideIndex++;
	if (slideIndex > validSlides.length) {
		slideIndex = 1;
	}

	validSlides[slideIndex - 1].style.display = "block";
	validSlides[slideIndex - 1].classList.add('active');

	// 7초 후 다음 슬라이드로 전환
	setTimeout(showSlides, 7000);
}

// DOM 로드 완료 시 실행되는 함수
document.addEventListener('DOMContentLoaded', function () {
	const elements = document.querySelectorAll('.animate-sequence');

	//fade-out 클래스 제거
	document.body.classList.remove('fade-out');

	// 헤더와 푸터 로드
	$("#header").load("header.html", function () {
		if (typeof initializeHeader === 'function') {
			initializeHeader();
		}
	});
	$("#footer").load("footer.html");

	// 이벤트 배너 이미지 동적 로드
	const slider = document.getElementById('eventSlider');
	const imageUrls = [
		'images/event/event-banner1.jpg',
		'images/event/event-banner2.jpg',
		'images/event/event-banner3.jpg',
		'images/event/event-banner4.jpg'
	];

	function loadImage(url) {
		return new Promise((resolve, reject) => {
			const img = new Image();
			img.onload = () => resolve(img);
			img.onerror = reject;
			img.src = url;
			img.alt = '이벤트 배너';
			img.className = 'event-image editable';
		});
	}

	Promise.all(imageUrls.map(url => loadImage(url).catch(() => null)))
		.then(images => {
			images.filter(img => img !== null).forEach(img => {
				slider.appendChild(img);
			});
			slides = document.querySelectorAll('.event-image');
			showSlides();
		});

	elements.forEach((el, index) => {
		setTimeout(() => {
			el.classList.add('active'); // 순서대로 active 클래스 추가
		}, index * 700); // 각 요소마다 500ms 간격으로 애니메이션 실행
	});
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
