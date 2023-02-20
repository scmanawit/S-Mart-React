import React from "react";

// Create a Context object
// A context object as the name states is a data type of an object that can be used to store info that can be shared to other components within the app.
// it is a diff approach of passing info between component and allows easier access by avoiding the use of prop drilling.

const UserContext = React.createContext();

// The "Provider" property of createContext allows other component to consume / use the context object and supply the necessary info
export const UserProvider = UserContext.Provider;

export default UserContext;