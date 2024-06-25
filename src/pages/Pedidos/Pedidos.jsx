import {Menu} from '../../components/Menu/Menu'
import styles from './Pedidos.module.css';

export const Pedidos = () =>  {
  return (
    <div className={styles.pedidos}>
      <Menu></Menu>
      <h1>Pedidos</h1>
    </div>
  );
}