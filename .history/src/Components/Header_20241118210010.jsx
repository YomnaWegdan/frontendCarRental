import React from 'react'
import { NavLink } from 'react-router-dom'
import { useContext } from 'react';
import { userContext } from '../Context/UserContext';
import { useNavigate } from 'react-router-dom';
const Header = () => {
  const { userToken } = useContext(userContext);
  const navigate = useNavigate();
  const Logout = () => {
    localStorage.removeItem('userToken');
    window.location.reload();
    navigate('/login');
  }
    return (
    <>
    <nav className="navbar navbar-expand-md bg-dark border-bottom border-body fixed-top" data-bs-theme="dark">
    <div className="container">
    <NavLink className="navbar-brand fw-bolder fs-4 text-light" to={"/"}>CarRental</NavLink>
    <button className="navbar-toggler " type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav ms-auto">
        <NavLink className="nav-link active " aria-current="page" to={"/"}>Home</NavLink>
        <NavLink className="nav-link " to={"/cars"}>Cars</NavLink>
        <NavLink className="nav-link " to={"/brands"}>Brands</NavLink>


        <NavLink className="nav-link" to={"/profile"}>Booking</NavLink>
        <NavLink className="nav-link "  to={"/contact"}>Contact</NavLink>


        
      </div>

      {userToken ? (
        <div className="navbar-nav ms-auto">
          <NavLink className="nav-link "  onClick={Logout}>Logout</NavLink>
        </div>
      ):
      (
         <div className="navbar-nav ms-auto">
        <NavLink className="nav-link "  to={"/register"}>Register</NavLink>
        <NavLink className="nav-link "  to={"/login"}>Login</NavLink>

        
      </div>
      )}
     
    </div>
  </div>
</nav>
      
    </>
  )
}
export default Header;
