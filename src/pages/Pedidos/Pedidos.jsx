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
          <p>Nenhum pedido encontrado</p>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="order">
              <p>Nome: {order.name}</p>
              <p>Telefone: {order.phone}</p>
              <p>Endereço: {order.address}</p>
              <p>Forma de Pagamento: {order.paymentMethod}</p>
              <h4>Itens:</h4>
              <ul>
                {order.orderItems.map((item, index) => (
                  <li key={index}>
                    {item.product.name} - Quantidade: {item.quantity}
                  </li>
                ))}
              </ul>
              <button onClick={() => handleDeleteOrder(order.id)}>Cancelar pedido</button>
            </div>
        ))
      )}
      </main>
    </>
  );
}