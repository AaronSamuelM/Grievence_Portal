import { createContext, useContext, useState } from "react";

const WarningContext = createContext();

export const WarningProvider = ({ children }) => {
  const [warning, setWarning] = useState("");

  const showWarning = (msg) => {
    setWarning(msg);
    setTimeout(() => setWarning(""), 3000); // Auto-hide after 3s
  };

  return (
    <WarningContext.Provider value={{ warning, showWarning }}>
      {children}
      
    </WarningContext.Provider>
  );
};

export const useWarning = () => useContext(WarningContext);
