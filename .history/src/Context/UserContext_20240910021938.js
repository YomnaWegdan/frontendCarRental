// import { createContext, useState } from "react";

// export let userContext = createContext();

// export default function UserContextProvider(props){
//     const [userToken , setUserToken]=useState(null)

//     return <userContext.Provider value={{ userToken , setUserToken}}>
//     {props.children} 
//     </userContext.Provider>

// }

import { createContext, useState, useEffect } from 'react';

export const userContext = createContext();

export default function UserContextProvider(props) {
    const [userToken, setUserToken] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('userToken');
        if (token) {
            setUserToken(token);
        }
    }, []);

    return (
        <userContext.Provider value={{ userToken, setUserToken }}>
            {props.children}
        </userContext.Provider>
    );
}
