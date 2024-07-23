import { Link, useLocation } from "react-router-dom";
import styles from "./NavPedidos.module.css";

export const NavPedidos = () => {
  const location = useLocation();

  return (
    <div className={styles.navpedidos}>
      <Link 
        to="/" 
        className={`${styles.link} ${location.pathname === '/' ? styles.active : ''}`}
      >
        A fazer
      </Link>
      <Link 
        to="/feitos" 
        className={`${styles.link} ${location.pathname === '/feitos' ? styles.active : ''}`}
      >
        Feitos
      </Link>
    </div>
  );
};
