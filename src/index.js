import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './css/index.css';

const container = document.getElementById('react-root');
if (container) {
	const root = createRoot(container);
	root.render(
		<React.StrictMode>
			<App />
		</React.StrictMode>
	);
} else {
	console.error('Root element not found');
}
