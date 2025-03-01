import React, { useState, useEffect } from 'react';
import * as styles from './EventBanner.module.css';

console.log('Styles:', styles);

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

	const safeClassName = (className) => styles ? styles[className] || '' : '';

	if (imageUrls.length === 0) {
		return <div className={`eventBanner ${safeClassName('container')}`}>No images available</div>;
	}

	if (!imagesLoaded && !imageError) {
		return <div className={`eventBanner ${safeClassName('container')}`}>Loading...</div>;
	}

	return (
		<div className={styles.eventBanner}>
			<div className={styles.slider}>
				{imageError ? (
					<div>Error loading image</div>
				) : (
					imageUrls.map((url, index) => (
						<img
							key={url}
							src={url}
							alt={`Event Banner ${index + 1}`}
							onError={handleImageError}
							className={`${styles.image} ${currentSlide === index ? styles.active : ''}`}
						/>
					))
				)}
			</div>
		</div>
	);
};

export default EventBanner;
