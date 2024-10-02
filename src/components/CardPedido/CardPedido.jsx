import { NavPedidos } from '../NavPedidos/NavPedidos';
import styles from './CardPedido.module.css';

export const CardPedido = ({ orders, onCancel, onDelete, onStatusChange, statusButtonLabel, cancelButtonLabel, deleteButtonLabel }) => {

  const formatarData = (dataISO) => {
    const data = new Date(dataISO);
    return data.toLocaleString('pt-BR', {
      timeZone: 'America/Sao_Paulo', 
    });
  };

  return (
    <div className="bgGeral">
      <div className={styles.pedidos}>
        <h1>Pedidos</h1>
        <NavPedidos/>
        {orders.length === 0 ? (
          <p className="loading">Buscando pedidos...</p>
        ) : (
          orders.map((order) => (
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
            </div>
          ))
        )}
      </div>
    </div>
  );
};
