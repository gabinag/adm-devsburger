import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import {Menu} from '../../components/Menu/Menu';
import styles from './Pedidos.module.css';

export const Pedidos = () =>  {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get("/orders");
        setOrders(response.data);
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
      setOrders(allOrders);
    } catch(error) {
      console.log(error);
    }
  }

  return (
    <>
      <Menu></Menu>
      <main className={styles.pedidos}>
        <h1>Pedidos</h1>
        {orders.length === 0 ? (
          <p>Carregando...</p>
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
                <button>Feito</button>
              </div>
            </div>
        ))
      )}
      </main>
    </>
  );
}