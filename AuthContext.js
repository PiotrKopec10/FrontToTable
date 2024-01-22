import { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [waiterInfo, setWaiterInfo] = useState(null);
  const [restaurantId, setRestaurantId] = useState(null);
  const [tableNr, setTableNr] = useState(null);
  return (
    <AuthContext.Provider value={{ waiterInfo, setWaiterInfo ,restaurantId, setRestaurantId, tableNr, setTableNr}}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
export default AuthContext;
