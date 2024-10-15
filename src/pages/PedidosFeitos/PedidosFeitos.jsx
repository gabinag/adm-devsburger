import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { Menu } from '../../components/Menu/Menu';
import { CardPedido } from '../../components/CardPedido/CardPedido';
import Modal from '../../components/Modal/Modal'; 

export const PedidosFeitos = () => {
  const [completedOrders, setCompletedOrders] = useState([]);
  const [orders, setOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);

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

  const handleDeleteOrder = async (id) => {
    try {
      await api.delete("/order", {
        params: { id }
      });

      const updatedOrders = completedOrders.filter((order) => order.id !== id);
      setCompletedOrders(updatedOrders);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Erro ao excluir pedido:', error);
    }
  };

  const handleCancelOrder = async (id) => {
    try {
      await api.post("/order/status", { orderId: id, status: "canceled" });
  
      const remainingOrders = orders.filter((order) => order.id !== id);
      setOrders(remainingOrders);
    } catch (error) {
      console.error('Erro ao cancelar pedido:', error);
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
        orders={completedOrders}
        onCancel={handleCancelOrder}
        onDelete={openModal} 
        cancelButtonLabel="Cancelar"
        deleteButtonLabel="Deletar"
        showStatus={false}
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
