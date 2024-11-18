import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import UserContextProvider from './Context/UserContext';
import { QueryClient } from 'react-query';

const root = ReactDOM.createRoot(document.getElementById('root'));

const queryClient = new QueryClient()


root.render(
  < client={queryClient}>

  <UserContextProvider>   

    <App />
  </UserContextProvider>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
