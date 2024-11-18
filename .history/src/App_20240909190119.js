import { Route, Routes } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import './App.css';
import Footer from './Components/Footer.jsx';
import Header from './Components/Header.jsx';
import Home from './pages/Home.jsx';
import CarDetail from './pages/CarDetails.jsx';
import Booking from './pages/Booking.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import { useContext, useEffect } from 'react';
import { userContext } from './Context/UserContext.js';
import CarItems from './Components/CarItems.jsx';

function App() {
  let {setUserToken} =useContext(userContext)
  useEffect(()=>{
  if(localStorage.getItem('userToken')){
    setUserToken(localStorage.getItem('userToken'))
  }
  },[])
  return (
    <Router>
            <Header />
                <Routes>
                    <Route path="/" element={<Home/>} exact />
                    <Route path="/cars" element={<CarItems/>} />
                    <Route path="/cars/:id" element={<CarDetail/>} />
                    <Route path="/booking/:carId" element={<Booking/>} />
                    <Route path="/login" element={<Login/>} />
                    <Route path="/register" element={<Register/>} />
                </Routes>
            <Footer />
        </Router>
  );
}

export default App;
