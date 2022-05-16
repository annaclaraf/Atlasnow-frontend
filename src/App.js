import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Login } from './pages/login/index'
import { Home } from './pages/home/index'

import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/home" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
      </Routes>
    </BrowserRouter>
 );
}

export default App;
