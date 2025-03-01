import React, { useState, useEffect } from 'react';
import styles from './EventBanner.module.css';

console.log('Loaded styles:', styles); // 스타일 객체 로깅

const EventBanner = () => {
	const [currentSlide, setCurrentSlide] = useState(0);
	const [imageError, setImageError] = useState(false);
	const [imagesLoaded, setImagesLoaded] = useState(false);
	const [imageUrls, setImageUrls] = useState([]);

	useEffect(() => {
		const importImages = async () => {
			try {
				const imageContext = require.context('../images/event', false, /\.(png|jpe?g|svg)$/);
				const images = await Promise.all(
					imageContext.keys().map(async (key) => {
						const image = await import(`../images/event/${key.replace('./', '')}`);
						return image.default;
					})
				);
				setImageUrls(images);
				setImagesLoaded(true);
			} catch (error) {
				console.error("Error loading images:", error);
				setImageError(true);
			}
		};

		importImages();
	}, []);

	useEffect(() => {
		if (imageUrls.length > 0) {
			const timer = setInterval(() => {
				setCurrentSlide((prevSlide) => (prevSlide + 1) % imageUrls.length);
			}, 7000);

			return () => clearInterval(timer);
		}
	}, [imageUrls]);

	const handleImageError = () => {
		console.error("Image failed to load:", imageUrls[currentSlide]);
		setImageError(true);
	};

	// styles 객체가 undefined일 경우를 대비한 안전한 클래스 이름 생성
	const safeClassName = (className) => styles ? styles[className] || '' : '';

	if (imageUrls.length === 0) {
		return <div className={safeClassName('eventBanner')}>No images available</div>;
	}

	if (!imagesLoaded && !imageError) {
		return <div className={safeClassName('eventBanner')}>Loading...</div>;
	}

	return (
		<div className={safeClassName('eventBanner')}>
			{imageError ? (
				<div>Error loading image</div>
			) : (
				imageUrls.map((url, index) => (
					<img
						key={url}
						src={url}
						alt={`Event Banner ${index + 1}`}
						onError={handleImageError}
						className={currentSlide === index ? safeClassName('active') : ''}
					/>
				))
			)}
		</div>
	);
};

export default EventBanner;
