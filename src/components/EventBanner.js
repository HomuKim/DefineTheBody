import React, { useState, useEffect } from 'react';
import styles from './EventBanner.module.css'; // CSS Modules import

const EventBanner = () => {
	const [currentSlide, setCurrentSlide] = useState(0);

	const imageUrls = [
		'../../images/event/event-banner1.jpg',
		'../../images/event/event-banner2.jpg',
		'../../images/event/event-banner3.jpg',
		'../../images/event/event-banner4.jpg',
	];

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentSlide((prevSlide) => (prevSlide + 1) % imageUrls.length);
		}, 7000);
		return () => clearInterval(timer);
	}, [imageUrls]);

	return (
		<div className={styles.eventBanner}>
			<img src={imageUrls[currentSlide]} alt="Event Banner" />
		</div>
	);
};

export default EventBanner;
