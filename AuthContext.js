import { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [waiterInfo, setWaiterInfo] = useState(null);

  return (
    <AuthContext.Provider value={{ waiterInfo, setWaiterInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
export default AuthContext;
