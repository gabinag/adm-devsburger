import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { Menu } from '../../components/Menu/Menu';
import styles from './Pedidos.module.css';

export const Pedidos = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get('/orders');
        const fetchedOrders = response.data;

        const pendingOrders = fetchedOrders.filter(order => order.status === 'pending');

        const sortedOrders = pendingOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setOrders(sortedOrders);
      } catch (error) {
        console.error('Erro ao buscar pedidos:', error);
      }
    };

    fetchOrders();
    const intervalId = setInterval(fetchOrders, 1000);
    return () => clearInterval(intervalId);
  }, []);

  async function handleDeleteOrder(id) {
    try {
      await api.delete("/order", {
        params: { id }
      });

      const allOrders = orders.filter((order) => order.id !== id);
      const sortedOrders = allOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setOrders(sortedOrders);
    } catch(error) {
      console.log(error);
    }
  }

  async function markOrderAsReady(orderId) {
    try {
      await api.post("/order/status", { orderId, status: "ready" });

      const updatedOrders = orders.map((order) =>
        order.id === orderId ? { ...order, status: "ready" } : order
      );
      const sortedOrders = updatedOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setOrders(sortedOrders);
    } catch (error) {
      console.error('Erro ao marcar pedido como pronto:', error);
    }
  }

  return (
    <>
      <Menu />
      <main className={styles.pedidos}>
        <h1>Pedidos</h1>
        <button onClick={() => navigate('/')}>A fazer</button>
        <button onClick={() => navigate('/feitos')}>Feitos</button>
        {orders.length === 0 ? (
          <p>Buscando pedidos...</p>
        ) : (
          orders.map((order) => (
            <div key={order.id} className={styles.wrapPedidos}>
              <div className={styles.wrapDados}>
                <p>Nome: {order.name}</p>
                <p>Telefone: {order.phone}</p>
                <p>Entrega: {order.address}</p>
                <p>Pagamento: {order.paymentMethod}</p>
              </div>
              <ul>
                {order.orderItems.map((item, index) => (
                  <li key={index}>
                    {item.quantity}x {item.product.name}
                  </li>
                ))}
              </ul>
              <div className={styles.wrapBtn}>
                <button onClick={() => handleDeleteOrder(order.id)}>Cancelar</button>
                {order.status === 'pending' && (
                  <button onClick={() => markOrderAsReady(order.id)}>Feito</button>
                )}
              </div>
            </div>
          ))
        )}
      </main>
    </>
  );
};
