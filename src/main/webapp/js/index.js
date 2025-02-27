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

// 콘텐츠 편집 가능 상태 변경 함수
function makeContentEditable(editable) {
	const editableElements = document.querySelectorAll('.editable');
	editableElements.forEach(el => el.contentEditable = editable);
}

// DOM 로드 완료 시 실행되는 함수
document.addEventListener('DOMContentLoaded', function() {
	// 헤더와 푸터 로드
	$("#header").load("header.html", function() {
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
});

document.addEventListener('DOMContentLoaded', function() {

	if (typeof App !== 'undefined' && document.getElementById('react-root')) {
		ReactDOM.render(React.createElement(App), document.getElementById('react-root'));
	}
});
