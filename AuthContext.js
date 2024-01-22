import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (credentials) => {
    if (credentials.username === 'lui' && credentials.password === 'lui') {
      setUser({ username: credentials.username, role: 'admin' });
    } else if (credentials.username === 'waiter' && credentials.password === 'waiter') {
      setUser({ username: credentials.username, role: 'waiter' });
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};