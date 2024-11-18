// import { createContext, useState } from "react";

import { createContext, useState } from "react";

// export let userContext = createContext();

// export default function UserContextProvider(props){
//     const [userToken , setUserToken]=useState(null)

//     return <userContext.Provider value={{ userToken , setUserToken}}>
//     {props.children} 
//     </userContext.Provider>

// }

export let userContext = createContext();
export const UserContextProvider = ({ children }) => {
    const [userToken, setUserToken] = useState(localStorage.getItem('userToken') || null);
    const [userId, setUserId] = useState(localStorage.getItem('userId'));  // Add this

  
    return (
      <userContext.Provider value={{ userToken, setUserToken , userId, setUserId }}>
        {children}
      </userContext.Provider>
    );
  };

// import { createContext, useState, useEffect } from 'react';

// export const userContext = createContext();

// export default function UserContextProvider(props) {
//     const [userToken, setUserToken] = useState(null);

//     useEffect(() => {
//         const token = localStorage.getItem('userToken');
//         if (token) {
//             setUserToken(token);
//         }
//     }, []);

//     return (
//         <userContext.Provider value={{ userToken, setUserToken }}>
//             {props.children}
//         </userContext.Provider>
//     );
// }
