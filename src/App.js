import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
// import Event from './pages/Event';
// import Trainers from './pages/Trainers';
// import Facilities from './pages/Facilities';
// import Contact from './pages/Contact';

const App = () => {
	return (
		<Router>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				{/* <Route path="/event" element={<Event />} /> */}
				{/* <Route path="/trainers" element={<Trainers />} /> */}
				{/* <Route path="/facilities" element={<Facilities />} /> */}
				{/* <Route path="/contact" element={<Contact />} /> */}
			</Routes>
			<Footer />
		</Router>
	);
};

export default App;