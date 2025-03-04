import React, { useState, useEffect } from 'react';

function ImageModal({ trainer, onClose, trainers }) {
	const [currentTrainer, setCurrentTrainer] = useState(trainer);
	const [isActive, setIsActive] = useState(false);

	useEffect(() => {
		document.body.style.overflow = 'hidden';
		setIsActive(true);
		return () => {
			document.body.style.overflow = '';
		};
	}, []);

	const handlePrev = () => {
		const currentIndex = trainers.findIndex(t => t.id === currentTrainer.id);
		const prevIndex = (currentIndex - 1 + trainers.length) % trainers.length;
		setCurrentTrainer(trainers[prevIndex]);
	};

	const handleNext = () => {
		const currentIndex = trainers.findIndex(t => t.id === currentTrainer.id);
		const nextIndex = (currentIndex + 1) % trainers.length;
		setCurrentTrainer(trainers[nextIndex]);
	};

	const handleClose = () => {
		setIsActive(false);
		setTimeout(onClose, 300); // 애니메이션이 끝난 후 모달을 닫습니다.
	};

	return (
		<div className={`modal ${isActive ? 'active' : ''}`}>
			<span className="close" onClick={handleClose}>&times;</span>
			<button className="prev-btn" onClick={handlePrev}>&lt;</button>
			<div className="modal-content-container">
				<img
					className="modal-content"
					src={currentTrainer.fullImage}
					alt={`트레이너 ${currentTrainer.id}`}
					style={{ opacity: isActive ? 1 : 0 }}
				/>
				<a href={currentTrainer.instagram} className="instagram-button" target="_blank" rel="noopener noreferrer">
					<img src="images/instagram-icon.png" alt="Instagram" className="instagram-icon" />
				</a>
			</div>
			<button className="next-btn" onClick={handleNext}>&gt;</button>
		</div>
	);
}

export default ImageModal;
