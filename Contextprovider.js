import React, { createContext, useState } from 'react';

export const adddata = createContext("");
export const updatedata = createContext("");

const Contextprovider = ({ children }) => {
  const [udata, setudata] = useState(null);
  const [updata, setupdata] = useState(null);

  return (
    <adddata.Provider value={{ udata, setudata }}>
      <updatedata.Provider value={{updata, setupdata}}>
      {children}
      </updatedata.Provider>
    </adddata.Provider>
  );
}

export default Contextprovider;

// Example usage in a component
