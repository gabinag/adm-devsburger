import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { Menu } from '../../components/Menu/Menu';
import { CardPedido } from '../../components/CardPedido/CardPedido';
import '../../App.css';

export const Pedidos = () => {
  const [orders, setOrders] = useState([]);

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

  async function markOrderAsDoing(orderId) {
    try {
      await api.post("/order/status", { orderId, status: "doing" });

      const updatedOrders = orders.filter((order) => order.id !== orderId);
      setOrders(updatedOrders);
    } catch (error) {
      console.error('Erro ao marcar pedido como em andamento:', error);
    }
  }

  return (
    <>
      <Menu />
      <CardPedido
        orders={orders}
        onDelete={handleDeleteOrder}
        onStatusChange={markOrderAsDoing}
        statusButtonLabel="Aprovar"
      />
    </>
  );
};
