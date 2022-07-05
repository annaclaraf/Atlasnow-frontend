import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import React, { useContext } from 'react';

import { Inicial } from './pages/inicial/index'
import { Login } from './pages/login/index'
import { Home } from './pages/home/index'
import { Funcionario } from './pages/funcionario/index'
import { FuncionarioCadastro } from './pages/funcionario/cadastrar/index'
import { FuncionarioEditar } from './pages/funcionario/editar/index' //
import { FuncionarioView } from './pages/funcionario/view/index'
import { Emissor } from './pages/emissor/index'
import { EmissorEditar } from './pages/emissor/editar/index'
import { EmissorView } from './pages/emissor/view/index'
import { EmissorCadastro } from './pages/emissor/cadastrar/index'
import { Setor } from './pages/setor/index'
import { SetorCadastro } from './pages/setor/cadastrar/index'
import { SetorEditar } from './pages/setor/editar/index'
import { Ata } from './pages/ata/index'
import { AtaCadastro } from './pages/ata/cadastrar/index'
import { AtaEditar } from './pages/ata/editar/index'
import { AtaView } from './pages/ata/view/index'


import './App.css'

import { AuthProvider, AuthContext } from './context/AuthContext';

function App() {

  const Private = ({ children }) => {
    const { authenticated } = useContext(AuthContext);

    if (!authenticated) {
      return <Navigate to="/login" />
    }

    return children;
  };

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route exact path="/" element={<Inicial />} />
          <Route path="/login" element={<Login />} />

          <Route path="/home" element={<Private>  <Home /> </Private>} />
          <Route path="/funcionarios" element={<Private> <Funcionario /> </Private>} />
          <Route path="/funcionarios/cadastro" element={<Private> <FuncionarioCadastro /> </Private>} />
          <Route path="/funcionarios/editar" element={<Private> <FuncionarioEditar /> </Private>} />
          <Route path="/funcionarios/view" element={<Private> <FuncionarioView /> </Private>} />
          <Route path="/emissor" element={<Private> <Emissor /> </Private>} />
          <Route path="/emissor/editar" element={<Private> <EmissorEditar /> </Private>} />
          <Route path="/emissor/view" element={<Private> <EmissorView /> </Private>} />
          <Route path="/emissor/cadastrar" element={<Private> <EmissorCadastro /> </Private>} />
          <Route path="/setor" element={<Private> <Setor /> </Private>} />
          <Route path="/setor/cadastrar" element={<Private> <SetorCadastro /> </Private>} />
          <Route path="/setor/editar" element={<Private> <SetorEditar /> </Private>} />
          <Route path="/atas" element={<Private> <Ata /> </Private>} />
          <Route path="/atas/cadastrar" element={<Private> <AtaCadastro /> </Private>} />
          <Route path="/atas/editar" element={<Private> <AtaEditar /> </Private>} />
          <Route path="/atas/view" element={<Private> <AtaView /> </Private>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
