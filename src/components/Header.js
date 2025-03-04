import React, { useRef, useEffect } from 'react';
import '../css/header.css';

const Header = () => {
	const menuToggleRef = useRef(null);
	const navLinksRef = useRef(null);
	const menuOverlayRef = useRef(null);

	useEffect(() => {
		const menuToggle = menuToggleRef.current;
		const navLinks = navLinksRef.current;
		const menuOverlay = menuOverlayRef.current;

		const toggleMenu = () => {
			menuToggle.classList.toggle('active');
			navLinks.classList.toggle('active');
			if (menuOverlay) menuOverlay.classList.toggle('active');
			document.body.classList.toggle('menu-open');
		};

		const closeMenu = () => {
			menuToggle.classList.remove('active');
			navLinks.classList.remove('active');
			if (menuOverlay) menuOverlay.classList.remove('active');
			document.body.classList.remove('menu-open');
		};

		menuToggle.addEventListener('click', toggleMenu);
		navLinks.querySelectorAll('a').forEach(link => {
			link.addEventListener('click', closeMenu);
		});
		if (menuOverlay) {
			menuOverlay.addEventListener('click', closeMenu);
		}

		return () => {
			menuToggle.removeEventListener('click', toggleMenu);
			navLinks.querySelectorAll('a').forEach(link => {
				link.removeEventListener('click', closeMenu);
			});
			if (menuOverlay) {
				menuOverlay.removeEventListener('click', closeMenu);
			}
		};
	}, []);

	return (
		<>
			<header>
				<nav className="navbar">
					<div className="logo">
						<a href="https://www.instagram.com/define_thebody_fitness">
							<img src="images/logo.png" alt="Define The Body Logo" />
						</a>
						<a href="index.html" className="logo-text">디파인더바디 피트니스</a>
					</div>
					<button className="menu-toggle" aria-label="메뉴 열기" ref={menuToggleRef}>
						<span></span>
						<span></span>
						<span></span>
					</button>
					<ul className="nav-links" ref={navLinksRef}>
						<li><a href="/">홈</a></li>
						<li><a href="intro.html">인사말</a></li>
						<li><a href="trainers">팀원소개</a></li>
						<li><a href="facilities.html">시설소개</a></li>
						<li><a href="contact.html">고객지원</a></li>
					</ul>
				</nav>
			</header>
			<div className="menu-overlay" ref={menuOverlayRef}></div>
		</>
	);
};

export default Header;
