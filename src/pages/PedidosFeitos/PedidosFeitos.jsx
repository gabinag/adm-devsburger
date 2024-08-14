import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { Menu } from '../../components/Menu/Menu';
import { CardPedido } from '../../components/CardPedido/CardPedido';

export const PedidosFeitos = () => {
  const [completedOrders, setCompletedOrders] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchCompletedOrders = async () => {
      try {
        const response = await api.get("/orders", {
          params: { status: 'ready' }
        });
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

      const updatedOrders = completedOrders.filter((order) => order.id !== id);
      setCompletedOrders(updatedOrders);
    } catch (error) {
      console.error('Erro ao excluir pedido:', error);
    }
  }

  async function handleCancelOrder(id) {
    try {
      await api.post("/order/status", { orderId: id, status: "canceled" });
  
      const remainingOrders = orders.filter((order) => order.id !== id);
      setOrders(remainingOrders);
    } catch (error) {
      console.error('Erro ao cancelar pedido:', error);
    }
  }

  return (
    <>
      <Menu />
      <CardPedido
        orders={completedOrders}
        onCancel={handleCancelOrder}
        onDelete={handleDeleteOrder}
        cancelButtonLabel="Cancelar"
        deleteButtonLabel="Deletar"
      />
    </>
  );
};
