import React from 'react';

function TrainerCard({ trainer, onSelect }) {
	return (
		<div className="trainer-card" onClick={onSelect}>
			<img src={trainer.thumbnail} alt={`트레이너 ${trainer.id}`} className="trainer-image" />
		</div>
	);
}

export default TrainerCard;
