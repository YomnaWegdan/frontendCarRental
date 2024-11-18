// import React, { useContext, useEffect, useState } from 'react';
// import emailjs from 'emailjs-com';
// import { userContext } from '../Context/UserContext';

// const Contact = () => {
//   const [formData, setFormData] = useState({ name: '', email: '', message: '' });
//   const [status, setStatus] = useState(null);
//   const { userId } = useContext(userContext);
// console.log(userId)
// console.log(typeof userId)

// useEffect(() => {
//   emailjs.init('KJ2W43KLCUZHSNZYFFXDSLY5FYIHMAB2LNVRARCKFRSEYEIIH4IEMJJXOAXBILKT'); 
// }, []);

// const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     emailjs.send('service_34rctbp', 'template_rutx1c4', formData, userId)
//       .then((response) => {
//         setStatus('Success! Your message has been sent.');
//         setFormData({ name: '', email: '', message: '' });
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//         setStatus('Error sending message. Please try again.');
//       });
//   };

//   return (
//     <div className='container vh-100'>
//       <h2 className='text-center mt-5 mb-5 pt-5 main-color fw-bold'>Get In Touch</h2>

//       <div className='contact row justify-content-center align-items-center align-content-center h-75 w-75 mx-auto p-5 rounded-end-pill shadow'>
//         <form onSubmit={handleSubmit}>
//           <div>
//             <label htmlFor="name">Name</label>
//             <input
//               type="text" className='form-control mb-3'
//               id="name"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="email">Email</label>
//             <input
//               type="email" className='form-control mb-3'
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="message">Message</label>
//             <textarea
//               id="message" className='form-control mb-3'
//               name="message"
//               value={formData.message}
//               onChange={handleChange}
//               required
//             ></textarea>
//           </div>
//           <button type="submit" className='btn btn-main w-100'>Send</button>
//         </form>
//         {status && <p>{status}</p>}
//       </div>
//     </div>
//   );
// };

// export default Contact;

// import React, { useContext, useState, useEffect, useRef } from 'react';
// import emailjs from 'emailjs-com';
// import { userContext } from '../Context/UserContext';

// const Contact = () => {
//   const [formData, setFormData] = useState({ name: '', email: '', message: '' });
//   const [status, setStatus] = useState(null);
//   const { userId } = useContext(userContext);
//   const form = useRef();

//   // Initialize EmailJS
//   // useEffect(() => {
//   //   emailjs.init('KJ2W43KLCUZHSNZYFFXDSLY5FYIHMAB2LNVRARCKFRSEYEIIH4IEMJJXOAXBILKT');  // Replace with your actual public key
//   // }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // emailjs.send('service_34rctbp', 'template_rutx1c4', formData, userId).then((response) => {
//       emailjs
//       .sendForm('service_34rctbp', '__ejs-test-mail-service__', form.current, {
//         publicKey: 'gcuLIX3xL65h433VY',
//       }).then((response) => {
//       setStatus('Success! Your message has been sent.');
//         setFormData({ name: '', email: '', message: '' });
//       })
//       .catch((error) => {
//         console.error('Error sending message:', error);
//         setStatus('Error sending message. Please try again.');
//       });
//   };

//   return (
//     <div className='container vh-100'>
//       <h2 className='text-center mt-5 mb-5 pt-5 main-color fw-bold'>Get In Touch</h2>
//       <div className='contact row justify-content-center align-items-center align-content-center h-75 w-75 mx-auto p-5 rounded-end-pill shadow'>
//         <form ref={form} onSubmit={handleSubmit}>
//           <div>
//             <label htmlFor="name">Name</label>
//             <input
//               type="text" className='form-control mb-3'
//               id="name"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="email">Email</label>
//             <input
//               type="email" className='form-control mb-3'
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="message">Message</label>
//             <textarea
//               id="message" className='form-control mb-3'
//               name="message"
//               value={formData.message}
//               onChange={handleChange}
//               required
//             ></textarea>
//           </div>
//           <button type="submit" className='btn btn-main w-100'>Send</button>
//         </form>
//        <div className=' alert alert-danger w-75 mx-auto mt-4'>{status && <p>{status}</p>}</div> 
//       </div>
//     </div>
//   );
// };

// export default Contact;



import React, { useContext, useState, useRef } from 'react';
import { userContext } from '../Context/UserContext';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);
  const { userId } = useContext(userContext);
  const form = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    
    emailjs.sendForm('service_34rctbp', 'template_bwm7qug', form.current, {
      publicKey: 'OlRjltBCyEJDy-uAi',
      name: formData.name,
      email: formData.email,
      message: formData.message,})
      .then((response) => {
        setStatus('Success! Your message has been sent.');
        setFormData({ name: '', email: '', message: '' });
      })
      .catch((error) => {
        console.error('Error sending message:', error);
        setStatus('Error sending message. Please try again.');
      });
  };

  return (
    <div className='container vh-100'>
      <h2 className='text-center mt-5 mb-5 pt-5 main-color fw-bold'>Get In Touch</h2>
      <div className='row justify-content-center'>
        <div className='col-md-8 col-lg-6 col-sm-12'>
          <div className='contact p-5 rounded-end-pill shadow'>
            <form ref={form} onSubmit={handleSubmit}>
              <div className='mb-3'>
                <label htmlFor="name" className='form-label'>Name</label>
                <input
                  type="text"
                  className='form-control w-'
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='mb-3'>
                <label htmlFor="email" className='form-label'>Email</label>
                <input
                  type="email"
                  className='form-control'
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='mb-3'>
                <label htmlFor="message" className='form-label'>Message</label>
                <textarea
                  id="message"
                  className='form-control'
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <button type="submit" className='btn btn-main w-100'>Send</button>
            </form>
            {status && <div className={`alert ${status.includes('Error') ? 'alert-danger' : 'alert-success'} mt-4`}>{status}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
