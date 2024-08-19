import { NavPedidos } from '../NavPedidos/NavPedidos';
import styles from './CardPedido.module.css';

export const CardPedido = ({ orders, onCancel, onDelete, onStatusChange, statusButtonLabel, cancelButtonLabel, deleteButtonLabel }) => {
  return (
    <main className={styles.pedidos}>
      <h1>Pedidos</h1>
      <NavPedidos/>
      {orders.length === 0 ? (
        <p>Buscando pedidos...</p>
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
                <button onClick={() => onCancel(order.id)}>{cancelButtonLabel}</button>
              )}
              {deleteButtonLabel && (
                <button onClick={() => onDelete(order.id)}>{deleteButtonLabel}</button>
              )}
              {onStatusChange && (
                <button onClick={() => onStatusChange(order.id)}>{statusButtonLabel}</button>
              )}
            </div>
          </div>
        ))
      )}
    </main>
  );
};
