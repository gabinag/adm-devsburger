import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Pedidos } from './pages/Pedidos/Pedidos';
import { Produtos }  from './pages/Produtos/Produtos';
import './App.css';

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/pedidos' element={<Pedidos/>} />
          <Route path='' element={<Produtos/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

