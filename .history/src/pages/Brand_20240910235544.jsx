// src/components/Brands.js
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import Loading from '../Components/Loading';

// Define the fetch function
const fetchBrands = async () => {
  const { data } = await axios.get('https://backend-car-rentals.vercel.app/brand');
  return data;
};

const Brand = () => {
  const { data: brands, error , isError, isLoading } = useQuery(['brands'], fetchBrands);

  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  if (isLoading) return <Loading/>

  if (isError) return <div>{error.message}</div>;

  return (
    <div className="container my-5">
    <h2 className='main-color py-5 text-center'>Brands</h2>

    <div className="row accordion" id="brandsAccordion">
    {brands.map((brand, index) => (
      <div className="col-md-6 col-sm-12" key={brand._id}>
      <div className="card border-0 shadow bg-light" >
        <div className="card-header " id={`heading${index}`}>
          <h5 className="mb-0">
            <button
              className="btn btn-link w-100 main-color card-item" 
              type="button"
              data-toggle="collapse"
              data-target={`#collapse${index}`}
              aria-expanded={activeIndex === index}
              aria-controls={`collapse${index}`}
              onClick={() => handleToggle(index)}
            >
              {brand.name}
            </button>
          </h5>
        </div>
        <div
          id={`collapse${index}`}
          className={`collapse ${activeIndex === index ? 'show' : ''}`}
          aria-labelledby={`heading${index}`}
          data-parent="#brandsAccordion"
        >
          <div className="card-body">
            <ul>
              {brand.cars.map((car) => (
                <li key={car._id}>{car.model} - {car.year}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      </div>
    ))}
  </div>


    
</div>
  );
};

export default Brand;

/*
<div class="accordion accordion-flush" id="accordionFlushExample">
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
        Accordion Item #1
      </button>
    </h2>
    <div id="flush-collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the first item's accordion body.</div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
        Accordion Item #2
      </button>
    </h2>
    <div id="flush-collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the second item's accordion body. Let's imagine this being filled with some actual content.</div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
        Accordion Item #3
      </button>
    </h2>
    <div id="flush-collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the third item's accordion body. Nothing more exciting happening here in terms of content, but just filling up the space to make it look, at least at first glance, a bit more representative of how this would look in a real-world application.</div>
    </div>
  </div>
</div>
*/
 