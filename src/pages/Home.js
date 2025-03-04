import React from 'react';
import EventBanner from '../components/EventBanner';

const Home = () => {
	return (
		<main>
			{/* 히어로 섹션: 메인 콘텐츠 소개 */}
			<section className="hero-section">
				<div className="hero-content">
					<h1 className="editable">건강한 삶을 시작하세요</h1>
					<p className="editable">최신 장비와 전문 트레이너가 여러분을 기다리고 있습니다.</p>
					<a
						href="https://map.naver.com/p/entry/place/1960250523?placePath=%252Fhome%253Fentry%253Dplt&searchType=place&lng=127.0151611&lat=37.6086138&c=15.00,0,0,0,dh"
						className="cta-button editable"
					>
						지금 방문하기
					</a>
				</div>
			</section>

			{/* 콘텐츠 섹션: 이벤트 배너 및 기능 카드 */}
			<section className="content-section">
				
				{/* 이벤트 배너 슬라이더 */}
					<EventBanner />

				{/* 기능 카드: 각 페이지로 연결되는 링크 */}
				<div className="feature-cards">
					<a href="event.html" className="card">
						<h3 className="editable">이벤트</h3>
						<p className="editable">
							디파인더바디만의 <br />
							다양한 이벤트와 프로모션을 확인하세요
						</p>
					</a>
					<a href="Trainers" className="card">
						<h3 className="editable">팀원 소개</h3>
						<p className="editable">
							디파인더바디의 <br />
							스태프들을 만나보세요
						</p>
					</a>
					<a href="facilities.html" className="card">
						<h3 className="editable">시설 소개</h3>
						<p className="editable">
							디파인더바디의 <br />
							최신 장비와 쾌적한 환경을 경험하세요
						</p>
					</a>
					<a href="contact.html" className="card">
						<h3 className="editable">고객 지원</h3>
						<p className="editable">
							디파인더바디에게 <br />
							궁금한 점이 있으면 문의해주세요
						</p>
					</a>
				</div>
			</section>
		</main>
	);
};

export default Home;
