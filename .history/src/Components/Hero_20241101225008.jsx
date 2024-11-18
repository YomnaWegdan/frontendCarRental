import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  const handleScroll = () => {
    navigate('/'); // Ensure you're on the correct page
    const element = document.getElementById("carsItem");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
    <div className="hero-section vh-100">
      <div className="container text-center text-white h-100">
        <div className="row align-items-center h-100">
          <div className="col-lg-6 col-md-12 text-dark">
            <div className="text-start">
              <h1 className="fw-bolder fs-1">
                Car Rent <br />
                <span className="main-color"> For You</span>
              </h1>
              <p className="text-black-50 py-3">
                Discover the best deals and book your rental car today!
              </p>
            </div>
            <div className="d-flex">
              <button className="btn btn-main px-5 py-3 me-2" onClick={handleScroll}>
                Explore Cars
              </button>
              
            </div>
          </div>
        </div>
      </div>
    </div>
    <section id="process">
    <div className=" process-content container">
        <h2 className=" text-center my-5 pb-5">Our renting <span class="main-color fs-1 fw-bolder"> process </span> </h2>
        <hr className=""/>
        <div className="row process-block">
            <div className="col-6 col-lg-3 text-start my-4">
                <div className="bullet"></div>
                <h5 className="text-uppercase mt-5"> Choose a vehicle </h5>
                <p>Sed euismod mauris corper libero.</p>
            </div>

            <div className="col-6 col-lg-3 text-start my-4">
                <div className="bullet"></div>
                <h5 className="text-uppercase mt-5"> Pick date </h5>
                <p>Nisi maecenas fermentum neque.</p>
            </div>

            <div className="col-6 col-lg-3 text-start my-4">
                <div className="bullet"></div>
                <h5 className="text-uppercase mt-5"> Book your car </h5>
                <p>Mauris corper accumsan urna sed.</p>
            </div>

            <div className="col-6 col-lg-3 text-start my-4">
                <div className="bullet"></div>
                <h5 className="text-uppercase mt-5"> Finish process </h5>
                <p>Orci duis ut lectus metus nam sette.</p>
            </div>

        </div>


    </div>
</section>



  
  </>
);}

export default Hero;