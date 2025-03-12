$(document).ready(function() {
	// 1. 헤더와 푸터 로드
	loadHeaderFooter();

	// 2. 트레이너 카드 클릭 시 모달 창 열기
	$('.trainer-card').on('click', openModal);

	// 3. 모달 창 닫기
	$('.close').on('click', closeModal);
	$('#imageModal').on('click', closeModalBackground);

	// 4. 모달 탭 전환
	$('.trainer-item').on('click', switchTab);
});

// 헤더와 푸터 로드 함수
function loadHeaderFooter() {
	$('#header').load('header.html', function() {
		if (typeof initializeHeader === 'function') {
			initializeHeader();
		}
	});
	$('#footer').load('footer.html');
}

// 모달 열기 함수
function openModal(e) {
	e.preventDefault();
	e.stopPropagation();

	const trainerCard = $(this);
	const modal = $('#imageModal');

	const trainerName = trainerCard.find('.trainer-name').text() || '트레이너 이름 없음';
	const profileImage = trainerCard.find('.trainer-profile-image').attr('src') || '기본 프로필 이미지 경로';
	const career = trainerCard.find('.trainer-career').text() || '경력 정보 없음';
	const certification = trainerCard.find('.trainer-certification').text() || '자격증 정보 없음';
	const reviewImage = trainerCard.find('.trainer-review-image').attr('src') || '기본 후기 이미지 경로';
	const instagramLink = trainerCard.data('instagram') || '';

	$('#trainerName').text(trainerName);
	$('#modalProfileImage').attr('src', profileImage);
	$('#trainerCareer').text(career);
	$('#trainerCertification').text(certification);
	$('#modalReviewImage').attr('src', reviewImage);
	$('#instagramLink').attr('href', instagramLink);

	// 1번 탭 활성화 및 내용 표시
	$('.trainer-item').removeClass('active');
	$('.trainer-item[data-trainer="1"]').addClass('active');
	$('.modal-content-container > div').hide();
	$('.modal-content-container > div[data-trainer="1"]').show();

	modal.show();
}

// 모달 닫기 함수
function closeModal() {
	$('#imageModal').hide();
	// 모달 창을 닫을 때 초기화
	$('.trainer-item').removeClass('active');
	$('.trainer-item[data-trainer="1"]').addClass('active');
	$('.modal-content-container > div').hide();
	$('.modal-content-container > div[data-trainer="1"]').show();
}


function closeModalBackground(e) {
	if ($(e.target).is('#imageModal')) {
		closeModal();
	} else {
		e.stopPropagation();
	}
}

// 탭 전환 함수
function switchTab() {
	$('.trainer-item').removeClass('active');
	$(this).addClass('active');

	const tabIndex = $(this).data('trainer');
	$('.modal-content-container > div').hide();
	$(`.modal-content-container > div[data-trainer="${tabIndex}"]`).show();
}
