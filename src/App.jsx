import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Pedidos } from './pages/Pedidos/Pedidos';
import { Produtos }  from './pages/Produtos/Produtos';
import { Login } from './pages/Login/Login';
import { PedidosFeitos } from './pages/PedidosFeitos/PedidosFeitos';
import { PedidosFazendo } from './pages/PedidosFazendo/PedidosFazendo';
import { Usuarios } from './pages/Usuarios/Usuarios';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/pedidos' element={<PrivateRoute><Pedidos/></PrivateRoute>}></Route>
          <Route path='/fazendo' element={<PrivateRoute><PedidosFazendo/></PrivateRoute>}></Route>
          <Route path='/feitos' element={<PrivateRoute><PedidosFeitos/></PrivateRoute>}></Route>
          <Route path='/produtos' element={<PrivateRoute><Produtos/></PrivateRoute>}></Route>
          <Route path='/usuarios' element={<PrivateRoute><Usuarios/></PrivateRoute>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

