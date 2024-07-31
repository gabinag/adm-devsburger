import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { Menu } from '../../components/Menu/Menu';
import { CardPedido } from '../../components/CardPedido/CardPedido';

export const PedidosFazendo = () => {
  const [doingOrders, setDoingOrders] = useState([]);

  useEffect(() => {
    const fetchDoingOrders = async () => {
      try {
        const response = await api.get("/orders", {
          params: { status: 'doing' }
        });
        setDoingOrders(response.data);
      } catch (error) {
        console.error('Erro ao buscar pedidos em andamento:', error);
      }
    };

    fetchDoingOrders();
    const intervalId = setInterval(fetchDoingOrders, 1000);
    return () => clearInterval(intervalId);
  }, []);

  async function handleDeleteOrder(id) {
    try {
      await api.delete("/order", {
        params: { id }
      });

      const updatedOrders = doingOrders.filter((order) => order.id !== id);
      setDoingOrders(updatedOrders);
    } catch(error) {
      console.error('Erro ao excluir pedido:', error);
    }
  }

  async function markOrderAsReady(orderId) {
    try {
      await api.post("/order/status", { orderId, status: "ready" });

      const updatedOrders = doingOrders.filter((order) => order.id !== orderId);
      setDoingOrders(updatedOrders);
    } catch (error) {
      console.error('Erro ao marcar pedido como pronto:', error);
    }
  }

  return (
    <>
      <Menu />
      <CardPedido
        orders={doingOrders}
        onDelete={handleDeleteOrder}
        onStatusChange={markOrderAsReady}
        statusButtonLabel="Feito"
      />
    </>
  );
};
