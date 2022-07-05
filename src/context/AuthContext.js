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
  
  const login = async (email,password, user ) => {
    try{
      const response = await api.post(`${user}/login`, { email, password })

      const token = response.data.token;
      const emissor = response.data.e

      localStorage.setItem("token", token);
      localStorage.setItem("user", user);
      localStorage.setItem("emissor", emissor);
      localStorage.setItem("authenticated", true);

      setAuthenticated(localStorage.getItem('authenticated'))

      api.defaults.headers.Authorization = `Bearer ${token}`;

      navigate("/home");

    } catch (err) {
      alert(err.response.data.error)
    }
    
  }

  const logout = () => {
    if(window.confirm("Deseja realmente sair?")) {
        localStorage.removeItem("token");  
        localStorage.removeItem("authenticated"); 
        localStorage.removeItem("user");
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