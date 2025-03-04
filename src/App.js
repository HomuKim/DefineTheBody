import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Trainers from './pages/Trainers';
// import Event from './pages/Event';
// import Facilities from './pages/Facilities';
// import Contact from './pages/Contact';

const App = () => {
	return (
		<Router>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/trainers" element={<Trainers />} />
				{/* <Route path="/event" element={<Event />} /> */}
				{/* <Route path="/facilities" element={<Facilities />} /> */}
				{/* <Route path="/contact" element={<Contact />} /> */}
			</Routes>
			<Footer />
		</Router>
	);
};

export default App;
