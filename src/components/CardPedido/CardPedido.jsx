import { NavPedidos } from '../NavPedidos/NavPedidos';
import styles from './CardPedido.module.css';

export const CardPedido = ({ orders, onCancel, onDelete, onStatusChange, statusButtonLabel, cancelButtonLabel, deleteButtonLabel, showStatus }) => {

  const formatarData = (dataISO) => {
    const data = new Date(dataISO);
    return data.toLocaleString('pt-BR', {
      timeZone: 'America/Sao_Paulo', 
    });
  };

  const traduzirStatus = (status) => {
    switch (status) {
      case 'pending':
        return { text: 'Pendente', color: 'orange' };
      case 'doing':
        return { text: 'Fazendo', color: '#E48900' };
      case 'ready':
        return { text: 'Feito', color: '#214a00' };
      case 'canceled':
        return { text: 'Cancelado', color: '#992b00' };
      default:
        return { text: 'Desconhecido', color: 'gray' };
    }
  };

  return (
    <div className="bgGeral">
      <div className={styles.pedidos}>
        <h1>Pedidos</h1>
        <NavPedidos />
        {orders.length === 0 ? (
          <p className="loading">Buscando pedidos...</p>
        ) : (
          orders.map((order) => {
            const statusInfo = traduzirStatus(order.status);
            return (
              <div key={order.id} className={styles.wrapPedidos}>
                <div className={styles.wrapDados}>
                  <p>Nome: <strong>{order.name}</strong></p>
                  <p>Telefone: {order.phone}</p>
                  <p>Entrega: {order.address}</p>
                  <p>Valor total: R${order.totalPrice}</p>
                  <p>Pagamento: {order.paymentMethod}</p>
                  {order.observation && (
                    <p>Observação: {order.observation}</p>
                  )}
                  <p>Data/hora: {formatarData(order.createdAt)}</p>
                </div>
                <ul>
                  {order.orderItems.map((item, index) => (
                    <li key={index}>
                      <strong>{item.quantity}x {item.product.name}</strong>
                    </li>
                  ))}
                </ul>
                <div className={styles.wrapBtn}>
                  {cancelButtonLabel && (
                    <button onClick={() => onCancel(order.id)} className={styles.cancelButton}>{cancelButtonLabel}</button>
                  )}
                  {deleteButtonLabel && (
                    <button onClick={() => onDelete(order.id)} className={styles.deleteButton}>{deleteButtonLabel}</button>
                  )}
                  {onStatusChange && (
                    <button onClick={() => onStatusChange(order.id)} className={styles.aproveButton}>{statusButtonLabel}</button>
                  )}
                </div>

                {showStatus && order.status && (
                  <div className={`${styles.status}`} style={{ color: statusInfo.color }}>
                    {statusInfo.text}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
