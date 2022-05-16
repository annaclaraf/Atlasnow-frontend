import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Login } from './pages/login/index'
import { Home } from './pages/home/index'
import { Funcionario } from './pages/funcionario/index'

import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/home" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/funcionarios" element={<Funcionario/>} />
      </Routes>
    </BrowserRouter>
 );
}

export default App;
