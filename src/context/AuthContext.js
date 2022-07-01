import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router';

import { api } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ( {children} ) => {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(localStorage.getItem('authenticated'));

  useEffect( () => {
    const token = localStorage.getItem("token")
    const authenticated = localStorage.getItem("authenticated")

    if(authenticated && token){
      api.defaults.headers.Authorization = `Bearer ${token}`;
    }

    setAuthenticated(localStorage.getItem('authenticated'));
  }, [])
  
  const login = async (email,password) => {
    const response = await api.post('/login', { email, password })

    const token = response.data.token;

    localStorage.setItem("token", token);
    localStorage.setItem("authenticated", true);

    api.defaults.headers.Authorization = `Bearer ${token}`;

    navigate("/home");
  }

  const logout = () => {
    if(window.confirm("Deseja realmente sair?")) {
        localStorage.removeItem("token");  
        localStorage.removeItem("authenticated");     
        api.defaults.headers.Authorization = null;
        
        navigate("/login");
    }
  }

  return (
    <AuthContext.Provider value= { {authenticated, login, logout } }>
      {children}
    </AuthContext.Provider>
  );
} 