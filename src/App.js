import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Login } from './pages/login/index'
import { Home } from './pages/home/index'
import { Funcionario } from './pages/funcionario/index'
import { FuncionarioCadastro } from './pages/funcionario/cadastrar/index'
import { FuncionarioEditar } from './pages/funcionario/editar/index'
import {Emissor} from './pages/emissor/index'
import {EmissorEditar} from './pages/emissor/editar/index'
import {EmissorLista} from './pages/emissor/lista/index'


import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/home" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/funcionarios" element={<Funcionario/>} />
          <Route path="/funcionarios/cadastro" element={<FuncionarioCadastro/>} />
          <Route path="/funcionarios/editar" element={<FuncionarioEditar/>} />
          <Route path="/emissor" element={<Emissor/>} />
          <Route path="/emissor/editar" element={<EmissorEditar/>} />
          <Route path="/emissor/lista" element={<EmissorLista/>} />
      </Routes>
    </BrowserRouter>
 );
}

export default App;
