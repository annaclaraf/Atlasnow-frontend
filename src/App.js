import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Inicial } from './pages/inicial/index'
import { Login } from './pages/login/index'
import { Home } from './pages/home/index'
import { Funcionario } from './pages/funcionario/index'
import { FuncionarioCadastro } from './pages/funcionario/cadastrar/index'
import { FuncionarioEditar } from './pages/funcionario/editar/index'//
import { FuncionarioView } from './pages/funcionario/view/index'
import { Emissor } from './pages/emissor/index'
import { EmissorEditar } from './pages/emissor/editar/index'
import { EmissorView } from './pages/emissor/view/index'
import { EmissorCadastro } from './pages/emissor/cadastrar/index'


import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Inicial />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/funcionarios" element={<Funcionario />} />
        <Route path="/funcionarios/cadastro" element={<FuncionarioCadastro />} />
        <Route path="/funcionarios/editar" element={<FuncionarioEditar />} />
        <Route path="/funcionarios/view" element={<FuncionarioView />} />        
        <Route path="/emissor" element={<Emissor />} />
        <Route path="/emissor/editar" element={<EmissorEditar />} />
        <Route path="/emissor/view" element={<EmissorView />} />
        <Route path="/emissor/cadastrar" element={<EmissorCadastro />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
