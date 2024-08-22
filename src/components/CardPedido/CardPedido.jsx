import { NavPedidos } from '../NavPedidos/NavPedidos';
import styles from './CardPedido.module.css';

export const CardPedido = ({ orders, onCancel, onDelete, onStatusChange, statusButtonLabel, cancelButtonLabel, deleteButtonLabel }) => {
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
                <p>Nome: {order.name}</p>
                <p>Telefone: {order.phone}</p>
                <p>Entrega: {order.address}</p>
                <p>Pagamento: {order.paymentMethod}</p>
                {order.observation && (
                    <p>Observação: {order.observation}</p>
                  )}
              </div>
              <ul>
                {order.orderItems.map((item, index) => (
                  <li key={index}>
                    {item.quantity}x {item.product.name}
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
