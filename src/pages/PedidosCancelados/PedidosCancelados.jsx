import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { Menu } from '../../components/Menu/Menu';
import { CardPedido } from '../../components/CardPedido/CardPedido';
import '../../App.css';

export const PedidosCancelados = () => {
  const [canceledOrders, setCanceledOrders] = useState([]);

  useEffect(() => {
    const fetchCanceledOrders = async () => {
      try {
        const response = await api.get("/orders", {
          params: { status: 'canceled' }
        });
        setCanceledOrders(response.data);
      } catch (error) {
        console.error('Erro ao buscar pedidos em andamento:', error);
      }
    };

    fetchCanceledOrders();
    const intervalId = setInterval(fetchCanceledOrders, 1000);
    return () => clearInterval(intervalId);
  }, []);

  async function handleDeleteOrder(id) {
    try {
      await api.delete("/order", {
        params: { id }
      });

      const updatedOrders = canceledOrders.filter((order) => order.id !== id);
      setCanceledOrders(updatedOrders);
    } catch(error) {
      console.log(error);
    }
  }

  return (
    <>
      <Menu />
      <CardPedido
        orders={canceledOrders}
        onDelete={handleDeleteOrder}
        cancelButtonLabel="Deletar"
      />
    </>
  );
};
