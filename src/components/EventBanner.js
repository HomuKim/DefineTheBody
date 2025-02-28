import React, { useState, useEffect } from 'react';
import styles from './EventBanner.module.css';

const EventBanner = () => {
	const [currentSlide, setCurrentSlide] = useState(0);
	const [imageError, setImageError] = useState(false);
	const [imagesLoaded, setImagesLoaded] = useState(false);
	const [imageUrls, setImageUrls] = useState([]);
	if (!styles || typeof styles !== 'object') {
		console.error('Styles not loaded correctly for EventBanner');
		console.log('Styles object:', styles);
		return null;
	}

	useEffect(() => {
		// 동적으로 이미지 import
		const importImages = async () => {
			const imageContext = require.context('../images/event', false, /\.(png|jpe?g|svg)$/);
			const images = await Promise.all(
				imageContext.keys().map(async (key) => {
					const image = await import(`../images/event/${key.replace('./', '')}`);
					return image.default;
				})
			);
			setImageUrls(images);
		};

		importImages();
	}, []);

	useEffect(() => {
		if (imageUrls.length > 0) {
			// 이미지 프리로딩
			const loadImages = async () => {
				try {
					await Promise.all(imageUrls.map(src => {
						return new Promise((resolve, reject) => {
							const img = new Image();
							img.src = src;
							img.onload = resolve;
							img.onerror = reject;
						});
					}));
					setImagesLoaded(true);
				} catch (error) {
					console.error("Error preloading images:", error);
					setImageError(true);
				}
			};

			loadImages();

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

	if (imageUrls.length === 0) {
		return <div className={styles?.eventBanner || ''}>No images available</div>;
	}

	if (!imagesLoaded && !imageError) {
		return <div className={styles?.eventBanner || ''}>Loading...</div>;
	}

	return (
		<div className={styles.eventBanner}>
			{!imageError ? (
				imageUrls.map((url, index) => (
					<img
						key={url}
						src={url}
						alt={`Event Banner ${index + 1}`}
						onError={handleImageError}
						className={currentSlide === index ? styles.active : ''}
					/>
				))
			) : (
				<div>Error loading image</div>
			)}
		</div>
	);
};

export default EventBanner;
