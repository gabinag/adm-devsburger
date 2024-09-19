import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { Menu } from '../../components/Menu/Menu';
import { CardPedido } from '../../components/CardPedido/CardPedido';
import Modal from '../../components/Modal/Modal'; 
import '../../App.css';

export const PedidosCancelados = () => {
  const [canceledOrders, setCanceledOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);

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

  const handleDeleteOrder = async (id) => {
    try {
      await api.delete("/order", {
        params: { id }
      });

      const updatedOrders = canceledOrders.filter((order) => order.id !== id);
      setCanceledOrders(updatedOrders);
      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const openModal = (orderId) => {
    setOrderToDelete(orderId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setOrderToDelete(null);
  };

  return (
    <>
      <Menu />
      <CardPedido
        orders={canceledOrders}
        onDelete={openModal} 
        deleteButtonLabel="Deletar"
      />
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={() => orderToDelete && handleDeleteOrder(orderToDelete)}
        message="Tem certeza que deseja deletar este pedido?"
      />
    </>
  );
};
