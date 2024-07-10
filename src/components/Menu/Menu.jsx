import styles from './Menu.module.css';
import { NavLink } from 'react-router-dom';

export const Menu = () =>  {
    return (
      <div className={styles.menu}>
        <p>Adm Devs Burger</p>
        <nav className={styles.navMenu}>
            <ul>
                <li><NavLink to='/'>Pedidos</NavLink></li>
                <li><NavLink to='/produtos'>Produtos</NavLink></li>
            </ul>
            <button>Sair</button>
        </nav>
      </div>
    );
  }