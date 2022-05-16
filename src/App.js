import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Login } from './pages/login/index'
import { Home } from './pages/home/index'
import { Funcionario } from './pages/funcionario/index'
import { FuncionarioCadastro } from './pages/funcionario/cadastrar/index'


import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/home" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/funcionarios" element={<Funcionario/>} />
          <Route path="/funcionarios/cadastro" element={<FuncionarioCadastro/>} />
      </Routes>
    </BrowserRouter>
 );
}

export default App;
