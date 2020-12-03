import React, { createContext, useState, useEffect } from "react";
const context = createContext(null);

const UserProvider = ({ children }) => {
    const [user, setUser] = useState({});


    useEffect(() => {
      // Get user data from back-end following authentication
        fetch("http://localhost:3001/api/auth/users/me", {
            method: "GET",
            credentials: "include",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true
            }
        })
        .then(response => {
            if (response.status === 200) return response.json();
            throw new Error("failed to authenticate user");
          })
        .then(responseJson => {
          setUser({
            authenticated: true,
            user: responseJson.user
          });
          // Get an array of event types using the user's id
        })
        .catch(error => {
          setUser({
            authenticated: false,
            error: "Failed to authenticate user"
          });
        });          
    }, []); 


    return (
        <context.Provider value={user}>
            {children}
        </context.Provider>
    );
};

UserProvider.context = context;

export default UserProvider;