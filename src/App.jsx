import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Pedidos } from './pages/Pedidos/Pedidos';
import { Produtos }  from './pages/Produtos/Produtos';
import { Login } from './pages/Login/Login';
import './App.css';

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='' element={<Pedidos/>}></Route>
          <Route path='/produtos' element={<Produtos/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

