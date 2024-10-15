import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Pedidos } from './pages/Pedidos/Pedidos';
import { Produtos }  from './pages/Produtos/Produtos';
import { Login } from './pages/Login/Login';
import { PedidosFeitos } from './pages/PedidosFeitos/PedidosFeitos';
import { PedidosFazendo } from './pages/PedidosFazendo/PedidosFazendo';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import { PedidosCancelados } from './pages/PedidosCancelados/PedidosCancelados';
import { PedidosPendentes } from './pages/PedidosPendentes/PedidosPendentes';

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}></Route>
          <Route path='/pedidos' element={<PrivateRoute><Pedidos/></PrivateRoute>}></Route>
          <Route path='/pendentes' element={<PrivateRoute><PedidosPendentes/></PrivateRoute>}></Route>
          <Route path='/fazendo' element={<PrivateRoute><PedidosFazendo/></PrivateRoute>}></Route>
          <Route path='/feitos' element={<PrivateRoute><PedidosFeitos/></PrivateRoute>}></Route>
          <Route path='/cancelados' element={<PrivateRoute><PedidosCancelados/></PrivateRoute>}></Route>
          <Route path='/produtos' element={<PrivateRoute><Produtos/></PrivateRoute>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

