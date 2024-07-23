import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { Menu } from '../../components/Menu/Menu';
import styles from './PedidosFeitos.module.css';
import { NavPedidos } from '../../components/NavPedidos/NavPedidos';

export const PedidosFeitos = () => {
  const [completedOrders, setCompletedOrders] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchCompletedOrders = async () => {
      try {
        const response = await api.get("/orders", {
          params: { status: 'ready' }  
        });
        console.log("Pedidos Feitos:", response.data);
        setCompletedOrders(response.data);
      } catch (error) {
        console.error('Erro ao buscar pedidos feitos:', error);
      }
    };

    fetchCompletedOrders();
    const intervalId = setInterval(fetchCompletedOrders, 1000);
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

  return (
    <>
      <Menu />
      <main className={styles.pedidosFeito}>
        <h1>Pedidos Concluídos</h1>
        <NavPedidos/>
        {completedOrders.length === 0 ? (
          <p>Buscando pedidos feitos...</p>
        ) : (
          completedOrders.map((order) => (
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
              <button onClick={() => handleDeleteOrder(order.id)}>Excluir</button>
            </div>
          ))
        )}
      </main>
    </>
  );
};
