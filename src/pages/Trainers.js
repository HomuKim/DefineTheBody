import React, { useState, useEffect } from 'react';
import TrainerCard from '../components/TrainerCard';
import ImageModal from '../components/ImageModal';
import '../css/trainers.css';

console.log('제대로 랜더링 됨')

function Trainers() {
	const [trainers, setTrainers] = useState([]);
	const [selectedTrainer, setSelectedTrainer] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchTrainers = async () => {
			setLoading(true);
			setError(null);
			try {
				const data = [
					{ id: 1, thumbnail: '/images/member/trainer1-thumbnail.jpg', fullImage: '/images/member/trainer1-full.jpg', instagram: 'https://www.instagram.com/define_thebody_leader' },
					{ id: 2, thumbnail: '/images/member/trainer2-thumbnail.jpg', fullImage: '/images/member/trainer2-full.jpg', instagram: 'https://www.instagram.com/define_thebody_joo' },
					{ id: 3, thumbnail: '/images/member/trainer3-thumbnail.jpg', fullImage: '/images/member/trainer3-full.jpg', instagram: 'https://www.instagram.com/define_thebody_kwon' },
					{ id: 4, thumbnail: '/images/member/trainer4-thumbnail.jpg', fullImage: '/images/member/trainer4-full.jpg', instagram: 'https://www.instagram.com/woosungpark4' },
					{ id: 5, thumbnail: '/images/member/trainer5-thumbnail.jpg', fullImage: '/images/member/trainer5-full.jpg', instagram: 'https://www.instagram.com/define_thebody_han' },
					{ id: 6, thumbnail: '/images/member/trainer6-thumbnail.jpg', fullImage: '/images/member/trainer6-full.jpg', instagram: 'https://www.instagram.com/define_thebody_wang' },
					{ id: 7, thumbnail: '/images/member/trainer7-thumbnail.jpg', fullImage: '/images/member/trainer7-full.jpg', instagram: 'https://www.instagram.com/define_thebody_kim_' },
					{ id: 8, thumbnail: '/images/member/trainer8-thumbnail.png', fullImage: '/images/member/trainer8-full.png', instagram: 'https://www.instagram.com/ri0___0ha' },
					{ id: 9, thumbnail: '/images/member/trainer9-thumbnail.jpg', fullImage: '/images/member/trainer9-full.jpg', instagram: 'https://www.instagram.com/eu____b' },
				];
				setTrainers(data);
			} catch (err) {
				setError('트레이너 데이터를 불러오는 데 실패했습니다.');
			} finally {
				setLoading(false);
			}
		};

		fetchTrainers();
	}, []);

	if (loading) return <p>로딩 중...</p>;
	if (error) return <p>에러: {error}</p>;

	return (
		<main>
			<section className="trainer-hero">
				<h1>함께하는 피트니스 여정</h1>
				<p>디파인더바디의 열정적인 스태프들을 만나보세요</p>
			</section>
			<section className="trainers-grid">
				{trainers.map(trainer => (
					<TrainerCard
						key={trainer.id}
						trainer={trainer}
						onSelect={() => setSelectedTrainer(trainer)}
					/>
				))}
			</section>
			{selectedTrainer && (
				<ImageModal
					trainer={selectedTrainer}
					onClose={() => setSelectedTrainer(null)}
					trainers={trainers}
				/>
			)}
		</main>
	);
}

export default Trainers;
