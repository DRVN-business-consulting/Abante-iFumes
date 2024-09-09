import React, { createContext, useState, useContext } from 'react';

const ColorContext = createContext();

export const ColorProvider = ({ children }) => {
  const [logoColor, setLogoColor] = useState('#000'); // Default logo color

  return (
    <ColorContext.Provider value={{ logoColor, setLogoColor }}>
      {children}
    </ColorContext.Provider>
  );
};

export const useColor = () => useContext(ColorContext);
