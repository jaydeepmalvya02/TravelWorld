import { useState } from "react";
import { createContext } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const AgentContext = createContext();
const AgentContextProvider = (props) => {
  const [dToken, setAToken] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const value = {
    dToken,
    setAToken,
    backendUrl,
  };
  return (
    <AgentContext.Provider value={value}>
      {props.children}
    </AgentContext.Provider>
  );
};
export default AgentContextProvider;
