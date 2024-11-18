import { Router, Routes } from 'react-router-dom';
import './App.css';
import Footer from './Components/Footer.jsx';
import Header from './Components/Header.jsx';

function App() {
  return (
    <Router>
            <Header />
            <main className="container">
                <Routes>
                    <Route path="/" element={<Home />} exact />
                    <Route path="/car/:id" element={<CarDetail />} />
                    <Route path="/booking/:carId" element={<Booking />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </main>
            <Footer />
        </Router>
  );
}

export default App;
