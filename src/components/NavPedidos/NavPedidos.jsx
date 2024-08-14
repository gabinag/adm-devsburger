import { Link, useLocation } from "react-router-dom";
import styles from "./NavPedidos.module.css";

export const NavPedidos = () => {
  const location = useLocation();

  return (
    <div className={styles.navpedidos}>
      <Link 
        to="/pedidos" 
        className={`${styles.link} ${location.pathname === '/pedidos' ? styles.active : ''}`}
      >
        Aprovação pendente
      </Link>
      <Link 
        to="/fazendo" 
        className={`${styles.link} ${location.pathname === '/fazendo' ? styles.active : ''}`}
      >
        Fazendo
      </Link>
      <Link 
        to="/feitos" 
        className={`${styles.link} ${location.pathname === '/feitos' ? styles.active : ''}`}
      >
        Feitos
      </Link>
      <Link 
        to="/cancelados" 
        className={`${styles.link} ${location.pathname === '/cancelados' ? styles.active : ''}`}
      >
        Cancelados
      </Link>
    </div>
  );
};
