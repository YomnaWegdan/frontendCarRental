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
    <div className='row accordion accordion-flush' id="accordionFlushExample">

    {brands.map((brand) => (
      <div className='col-md-6 col-sm-12 '>
      <div className="card-item mb-3 accordion-item " id="flush-collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample" key={brand._id}>

      <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
        Accordion Item #1
      </button>
    </h2>
        <div className="card-header accordion-body ">
        <h4 className='fw-bolder'> {brand.name}</h4>

        </div>
        </div>
    
  
        
      </div>
    ))}
  </div></div>
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
 